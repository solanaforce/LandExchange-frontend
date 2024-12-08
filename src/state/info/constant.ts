import { BLOCKS_CLIENT, INFO_CLIENT } from 'config/constants/endpoints'
import { infoClient } from 'utils/graphql'

import { ChainId } from 'config/chains'
import {
  PCS_V2_START,
} from 'config/constants/info'

export type MultiChainName = 'BSC'

export const multiChainQueryMainToken = {
  BSC: 'BSC',
}

export const multiChainBlocksClient = {
  BSC: BLOCKS_CLIENT
}

export const multiChainStartTime = {
  BSC: PCS_V2_START
}

export const multiChainId = {
  BSC: ChainId.BSC
}

export const multiChainPaths = {
  [ChainId.BSC]: '',
}

export const multiChainQueryClient = {
  BSC: infoClient
}

export const multiChainQueryEndPoint = {
  BSC: INFO_CLIENT
}

export const multiChainScan = {
  BSC: 'BscScan',
}

export const getMultiChainQueryEndPointWithStableSwap = (chainName: MultiChainName) => {
  return multiChainQueryClient[chainName]
}
