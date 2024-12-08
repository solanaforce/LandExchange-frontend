import { ChainId } from 'config/chains'
import { TokenAddressMap as TTokenAddressMap, TokenInfo, TokenList, WrappedTokenInfo } from 'libraries/token-lists'
import { ListsState } from 'libraries/token-lists/react'
import { EMPTY_LIST } from 'libraries/tokens'
import { enumValues } from 'utils/enumValues'
import {
  DEFAULT_LIST_OF_LISTS,
  MULTI_CHAIN_LIST_URLS,
  OFFICIAL_LISTS,
  UNSUPPORTED_LIST_URLS,
} from 'config/constants/lists'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { atom, useAtomValue } from 'jotai'
import groupBy from 'lodash/groupBy'
import keyBy from 'lodash/keyBy'
import mapValues from 'lodash/mapValues'
import _pickBy from 'lodash/pickBy'
import uniqBy from 'lodash/uniqBy'
import { useMemo } from 'react'
import { notEmpty } from 'utils/notEmpty'
import DEFAULT_TOKEN_LIST from 'config/constants/tokenLists/pancake-default.tokenlist.json'
import { safeGetAddress } from 'utils'
import { listsAtom } from './lists'

type TokenAddressMap = TTokenAddressMap<ChainId>

// use ordering of default list of lists to assign priority
function sortByListPriority(urlA: string, urlB: string) {
  const first = DEFAULT_LIST_OF_LISTS.includes(urlA) ? DEFAULT_LIST_OF_LISTS.indexOf(urlA) : Number.MAX_SAFE_INTEGER
  const second = DEFAULT_LIST_OF_LISTS.includes(urlB) ? DEFAULT_LIST_OF_LISTS.indexOf(urlB) : Number.MAX_SAFE_INTEGER

  // need reverse order to make sure mapping includes top priority last
  if (first < second) return 1
  if (first > second) return -1
  return 0
}

function enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
  return Object.keys(obj).filter((k) => Number.isNaN(+k)) as K[]
}

// -------------------------------------
//   Selectors
// -------------------------------------
const selectorActiveUrlsAtom = atom((get) => get(listsAtom)?.activeListUrls ?? [])
export const selectorByUrlsAtom = atom((get) => get(listsAtom)?.byUrl ?? {})

const activeListUrlsAtom = atom((get) => {
  const urls = get(selectorActiveUrlsAtom)
  return urls?.filter((url) => !UNSUPPORTED_LIST_URLS.includes(url))
})

const combineTokenMapsWithDefault = (lists: ListsState['byUrl'], urls: string[]) => {
  const defaultTokenMap = listToTokenMap(DEFAULT_TOKEN_LIST as TokenList, 'address')
  if (!urls) return defaultTokenMap
  return combineMaps(combineTokenMaps(lists, urls), defaultTokenMap)
}

const combineTokenMaps = (lists: ListsState['byUrl'], urls: string[]): any => {
  if (!urls) return EMPTY_LIST
  return (
    [...urls]
      // sort by priority so top priority goes last
      .sort(sortByListPriority)
      .reduce((allTokens, currentUrl) => {
        const current = lists[currentUrl]?.current
        if (!current) return allTokens
        try {
          const newTokens = Object.assign(listToTokenMap(current, 'address'))
          return combineMaps(allTokens, newTokens)
        } catch (error) {
          console.error('Could not show token list due to error', error)
          return allTokens
        }
      }, EMPTY_LIST)
  )
}

export const combinedTokenMapFromActiveUrlsAtom = atom((get) => {
  const [selectorByUrls, selectorActiveUrls] = [get(selectorByUrlsAtom), get(selectorActiveUrlsAtom)]
  return combineTokenMapsWithDefault(selectorByUrls, selectorActiveUrls)
})

const inactiveUrlAtom = atom((get) => {
  const [lists, urls] = [get(selectorByUrlsAtom), get(selectorActiveUrlsAtom)]
  return Object.keys(lists).filter((url) => !urls?.includes(url) && !UNSUPPORTED_LIST_URLS.includes(url))
})

export const combinedTokenMapFromInActiveUrlsAtom = atom((get) => {
  const [lists, inactiveUrl] = [get(selectorByUrlsAtom), get(inactiveUrlAtom)]
  return combineTokenMaps(lists, inactiveUrl)
})

export const combinedTokenMapFromOfficialsUrlsAtom = atom((get) => {
  const lists = get(selectorByUrlsAtom)
  return combineTokenMapsWithDefault(lists, OFFICIAL_LISTS)
})

export const tokenListFromOfficialsUrlsAtom = atom((get) => {
  const lists: ListsState['byUrl'] = get(selectorByUrlsAtom)

  const mergedTokenLists: TokenInfo[] = OFFICIAL_LISTS.reduce<TokenInfo[]>((acc, url) => {
    if (lists?.[url]?.current?.tokens) {
      acc.push(...(lists?.[url]?.current?.tokens || []))
    }
    return acc
  }, [])

  const mergedList =
    mergedTokenLists.length > 0 ? [...DEFAULT_TOKEN_LIST.tokens, ...mergedTokenLists] : DEFAULT_TOKEN_LIST.tokens
  return mapValues(
    groupBy(
      uniqBy(mergedList, (tokenInfo) => `${tokenInfo.chainId}#${tokenInfo.address}`),
      'chainId',
    ),
    (tokenInfos) => keyBy(tokenInfos, 'address'),
  )
})

const listCache: WeakMap<TokenList, TokenAddressMap> | null =
  typeof WeakMap !== 'undefined' ? new WeakMap<TokenList, TokenAddressMap>() : null

export function listToTokenMap(list: TokenList, key?: string): TokenAddressMap {
  const result = listCache?.get(list)
  if (result) return result

  const tokenMap: WrappedTokenInfo[] = uniqBy(
    list.tokens,
    (tokenInfo: TokenInfo) => `${tokenInfo.chainId}#${tokenInfo.address}`,
  )
    .map((tokenInfo) => {
      const checksummedAddress = safeGetAddress(tokenInfo.address)
      if (checksummedAddress) {
        return new WrappedTokenInfo({ ...tokenInfo, address: checksummedAddress })
      }
      return null
    })
    .filter(notEmpty)

  const groupedTokenMap: { [chainId: string]: WrappedTokenInfo[] } = groupBy(tokenMap, 'chainId')

  const tokenAddressMap = mapValues(groupedTokenMap, (tokenInfoList) =>
    mapValues(keyBy(tokenInfoList, key), (tokenInfo) => ({ token: tokenInfo, list })),
  ) as TokenAddressMap

  // add chain id item if not exist
  enumKeys(ChainId).forEach((chainId) => {
    if (!(ChainId[chainId] in tokenAddressMap)) {
      Object.defineProperty(tokenAddressMap, ChainId[chainId], {
        value: {},
      })
    }
  })

  listCache?.set(list, tokenAddressMap)
  return tokenAddressMap
}

// -------------------------------------
//   Hooks
// -------------------------------------
export function useAllLists(): {
  readonly [url: string]: {
    readonly current: TokenList | null
    readonly pendingUpdate: TokenList | null
    readonly loadingRequestId: string | null
    readonly error: string | null
  }
} {
  const { chainId } = useActiveChainId()

  const urls = useAtomValue(selectorByUrlsAtom)

  return useMemo(
    () => _pickBy(urls, (_, url) => chainId && MULTI_CHAIN_LIST_URLS[chainId]?.includes(url)),
    [chainId, urls],
  )
}

function combineMaps(map1: TokenAddressMap, map2: TokenAddressMap): TokenAddressMap {
  const combinedMap: TokenAddressMap = {} as TokenAddressMap
  for (const chainId of enumValues(ChainId)) {
    combinedMap[chainId as number] = { ...map1[chainId], ...map2[chainId] }
  }
  return combinedMap
}

// filter out unsupported lists
export function useActiveListUrls(): string[] | undefined {
  const { chainId } = useActiveChainId()
  const urls = useAtomValue(activeListUrlsAtom)

  return useMemo(() => urls.filter((url) => chainId && MULTI_CHAIN_LIST_URLS[chainId]?.includes(url)), [urls, chainId])
}

export function useInactiveListUrls() {
  return useAtomValue(inactiveUrlAtom)
}

// get all the tokens from active lists, combine with local default tokens
export function useCombinedActiveList(): TokenAddressMap {
  const activeTokens = useAtomValue(combinedTokenMapFromActiveUrlsAtom)
  return activeTokens
}

// all tokens from inactive lists
export function useCombinedInactiveList(): TokenAddressMap {
  return useAtomValue(combinedTokenMapFromInActiveUrlsAtom)
}

export function useIsListActive(url: string): boolean {
  const activeListUrls = useActiveListUrls()
  return useMemo(() => Boolean(activeListUrls?.includes(url)), [activeListUrls, url])
}
