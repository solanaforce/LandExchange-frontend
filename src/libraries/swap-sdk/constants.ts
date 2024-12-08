import { ChainId } from 'config/chains'
import { Percent } from 'libraries/swap-sdk-core'
import { ERC20Token } from './entities/token'

export const ZERO_PERCENT = new Percent('0')
export const ONE_HUNDRED_PERCENT = new Percent('1')

export const FACTORY_ADDRESS = '0x4268c38b21B5dF407d3D2121571aB3534b0e626f'

export const FACTORY_ADDRESS_MAP: Record<number, `0x${string}`> = {
  [ChainId.BSC]: FACTORY_ADDRESS,
}
export const INIT_CODE_HASH = '0xe26dceff0dbe2e4f6d5d6df7e1b94d43bce83a73cd914c8b4419706cc9a3e897'

export const INIT_CODE_HASH_MAP: Record<number, `0x${string}`> = {
  [ChainId.BSC]: INIT_CODE_HASH,
}

export const WETH9 = {
  [ChainId.BSC]: new ERC20Token(
    ChainId.BSC,
    '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    18,
    'WBNB',
    'Wrapped BNB',
    'https://binance.io/'
  ),
}

export const WNATIVE: Record<number, ERC20Token> = {
  [ChainId.BSC]: WETH9[ChainId.BSC],
}

export const NATIVE: Record<
  number,
  {
    name: string
    symbol: string
    decimals: number
  }
> = {
  [ChainId.BSC]: { name: 'BNB', symbol: 'BNB', decimals: 18 },
}
