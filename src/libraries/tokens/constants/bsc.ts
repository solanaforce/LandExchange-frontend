import { ChainId } from 'config/chains'
import { WETH9, WNATIVE } from 'libraries/swap-sdk'
import { USDC, USDT, GTOKEN } from './common'

export const bscTokens = { 
  wbnb: WNATIVE[ChainId.BSC],
  eth: WETH9[ChainId.BSC],
  usdt: USDT[ChainId.BSC],
  usdc: USDC[ChainId.BSC],
  gtoken: GTOKEN[ChainId.BSC],
}
