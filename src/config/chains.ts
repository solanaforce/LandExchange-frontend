import memoize from 'lodash/memoize'

import {
  Chain,
  bsc
} from 'wagmi/chains'

export enum ChainId {
  BSC = 56,
}

export const CHAIN_QUERY_NAME: Record<ChainId, string> = {
  [ChainId.BSC]: 'bsc',
}

const CHAIN_QUERY_NAME_TO_ID = Object.entries(CHAIN_QUERY_NAME).reduce((acc, [chainId, chainName]) => {
  return {
    [chainName.toLowerCase()]: chainId as unknown as ChainId,
    ...acc,
  }
}, {} as Record<string, ChainId>)

export const CHAINS: [Chain, ...Chain[]] = [
  // mainnet,
  bsc
]

export const PUBLIC_NODES: Record<ChainId, string[] | readonly string[]> = {
  [ChainId.BSC]: [
    ...bsc.rpcUrls.default.http,
    "https://bsc-rpc.publicnode.com",
    "https://binance.llamarpc.com",
    "https://bsc-dataseed1.bnbchain.org",
    "https://bsc-dataseed2.defibit.io"
  ],
}

export const getChainId = memoize((chainName: string) => {
  if (!chainName) return undefined
  return CHAIN_QUERY_NAME_TO_ID[chainName.toLowerCase()] ? +CHAIN_QUERY_NAME_TO_ID[chainName.toLowerCase()] : undefined
})