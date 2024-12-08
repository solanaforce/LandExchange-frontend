import { ChainId } from 'config/chains'
import { ERC20Token } from 'libraries/swap-sdk'

export const GTOKEN_BSC = new ERC20Token(
  ChainId.BSC,
  '0x8E92A01668A326e45ffaD7857877D592e28d76d7',
  18,
  'LDX',
  'Land Exchange Token',
  'https://landx.io/',
)

export const USDC_BSC = new ERC20Token(
  ChainId.BSC,
  '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
  18,
  'USDC',
  'USD Coin',
)

export const USDT_BSC = new ERC20Token(
  ChainId.BSC,
  '0x55d398326f99059fF775485246999027B3197955',
  18,
  'USDT',
  'Tether USD',
  'https://tether.to/',
)

export const BTCB_BSC = new ERC20Token(
  ChainId.BSC,
  '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
  8,
  'BTCB',
  'BTCB Token',
)

export const GTOKEN = {
  [ChainId.BSC]: GTOKEN_BSC,
}

export const USDC = {
  [ChainId.BSC]: USDC_BSC,
}

export const USDT = {
  [ChainId.BSC]: USDT_BSC,
}
