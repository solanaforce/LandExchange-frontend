/* eslint-disable no-param-reassign */
import { ChainId } from 'config/chains'
import { ERC20Token } from 'libraries/swap-sdk'
import { Currency, NativeCurrency } from 'libraries/swap-sdk-core'

import { TokenAddressMap } from 'libraries/token-lists'
import { GELATO_NATIVE } from 'config/constants'
import { UnsafeCurrency } from 'config/constants/types'
import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { erc20Abi } from 'viem'
import { lpTokenABI } from 'config/abi/lpTokenAbi'
import {
  combinedTokenMapFromActiveUrlsAtom,
  combinedTokenMapFromOfficialsUrlsAtom,
} from 'state/lists/hooks'
import { safeGetAddress } from 'utils'
import { useToken as useToken_ } from 'wagmi'
import { useReadContracts } from 'libraries/wagmi'
import useUserAddedTokens from '../state/user/hooks/useUserAddedTokens'
import { useActiveChainId } from './useActiveChainId'
import useNativeCurrency from './useNativeCurrency'

const mapWithoutUrls = (tokenMap?: TokenAddressMap<ChainId>, chainId?: number) => {
  if (!tokenMap || !chainId) return {}
  return Object.keys(tokenMap[chainId] || {}).reduce<{ [address: string]: ERC20Token }>((newMap, address) => {
    const checksumAddress = safeGetAddress(address)

    if (checksumAddress && !newMap[checksumAddress]) {
      newMap[checksumAddress] = tokenMap[chainId][address].token
    }

    return newMap
  }, {})
}

/**
 * Returns all tokens that are from active urls and user added tokens
 */
export function useAllTokens(): { [address: string]: ERC20Token } {
  const { chainId } = useActiveChainId()
  const tokenMap = useAtomValue(combinedTokenMapFromActiveUrlsAtom)
  const userAddedTokens = useUserAddedTokens()
  return useMemo(() => {
    return (
      userAddedTokens
        // reduce into all ALL_TOKENS filtered by the current chain
        .reduce<{ [address: string]: ERC20Token }>(
          (tokenMap_, token) => {
            const checksumAddress = safeGetAddress(token.address)

            if (checksumAddress) {
              tokenMap_[checksumAddress] = token
            }

            return tokenMap_
          },
          // must make a copy because reduce modifies the map, and we do not
          // want to make a copy in every iteration
          mapWithoutUrls(tokenMap, chainId),
        )
    )
  }, [userAddedTokens, tokenMap, chainId])
}

/**
 * Returns all tokens that are from officials token list and user added tokens
 */
export function useOfficialsAndUserAddedTokens(): { [address: string]: ERC20Token } {
  const { chainId } = useActiveChainId()
  const tokenMap = useAtomValue(combinedTokenMapFromOfficialsUrlsAtom)

  const userAddedTokens = useUserAddedTokens()
  return useMemo(() => {
    return (
      userAddedTokens
        // reduce into all ALL_TOKENS filtered by the current chain
        .reduce<{ [address: string]: ERC20Token }>(
          (tokenMap_, token) => {
            const checksumAddress = safeGetAddress(token.address)

            if (checksumAddress) {
              tokenMap_[checksumAddress] = token
            }

            return tokenMap_
          },
          // must make a copy because reduce modifies the map, and we do not
          // want to make a copy in every iteration
          mapWithoutUrls(tokenMap, chainId),
        )
    )
  }, [userAddedTokens, tokenMap, chainId])
}

export function useIsTokenActive(token: ERC20Token | undefined | null): boolean {
  const activeTokens = useAllTokens()

  if (!activeTokens || !token) {
    return false
  }

  const tokenAddress = safeGetAddress(token.address)

  return Boolean(tokenAddress && !!activeTokens[tokenAddress])
}

// Check if currency is included in custom list from user storage
export function useIsUserAddedToken(currency: Currency | undefined | null): boolean {
  const userAddedTokens = useUserAddedTokens()

  if (!currency?.equals) {
    return false
  }

  return !!userAddedTokens.find((token) => currency?.equals(token))
}

// undefined if invalid or does not exist
// null if loading
// otherwise returns the token
export function useToken(tokenAddress?: string): ERC20Token | undefined | null {
  const { chainId } = useActiveChainId()
  const tokens = useAllTokens()

  const address = safeGetAddress(tokenAddress)

  const token: ERC20Token | undefined = address ? tokens[address] : undefined

  const { data, isLoading } = useToken_({
    address: address || undefined,
    chainId,
    query: {
      enabled: Boolean(!!address && !token),
    },
    // consider longer stale time
  })

  return useMemo(() => {
    if (token) return token
    if (!chainId || !address) return undefined
    if (isLoading) return null
    if (data) {
      return new ERC20Token(
        chainId,
        data.address,
        data.decimals,
        data.symbol ?? 'UNKNOWN',
        data.name ?? 'Unknown Token',
      )
    }
    return undefined
  }, [token, chainId, address, isLoading, data])
}

export function useLPToken(tokenAddress?: string): [string, string, string] | undefined | null {
  const { chainId } = useActiveChainId()
  const address = safeGetAddress(tokenAddress)

  const { data: results, isLoading } = useReadContracts({
    query: {
      enabled: Boolean(tokenAddress),
    },
    contracts: [
      {
        chainId,
        abi: lpTokenABI,
        address: address || undefined,
        functionName: 'factory'
      },
      {
        chainId,
        abi: lpTokenABI,
        address: address || undefined,
        functionName: 'token0'
      },
      {
        chainId,
        abi: lpTokenABI,
        address: address || undefined,
        functionName: 'token1'
      },
    ],
    watch: true,
  })

  const factory = results?.[0]?.result as string
  const token0 = results?.[1]?.result as `0x${string}`
  const token1 = results?.[2]?.result as `0x${string}`

  const { data: dataTokens, isLoading: status } = useReadContracts({
    query: {
      enabled: Boolean(tokenAddress) && !isLoading,
    },
    contracts: [
      {
        chainId,
        abi: erc20Abi,
        address: token0,
        functionName: 'symbol'
      },
      {
        chainId,
        abi: erc20Abi,
        address: token1,
        functionName: 'symbol'
      },
    ],
    watch: true,
  })

  const token0_ = dataTokens?.[0]?.result as string
  const token1_ = dataTokens?.[1]?.result as string

  return useMemo(() => {
    if (!chainId || !address) return undefined
    if (status) return null
    if (token1 && token1_) {
      return [factory, token0_, token1_]
    }
    return undefined
  }, [address, chainId, status, factory, token1, token0_, token1_])
}

export function useCurrency(currencyId: string | undefined): UnsafeCurrency {
  const native: NativeCurrency = useNativeCurrency()
  const isNative =
    currencyId?.toUpperCase() === native.symbol?.toUpperCase() || currencyId?.toLowerCase() === GELATO_NATIVE

  const token = useToken(isNative ? undefined : currencyId)
  return isNative ? native : token
}