import { bscTokens } from 'libraries/tokens'
import { SerializedFarmConfig } from '..'

const farms: SerializedFarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'PATTIE',
    lpAddress: '0x4Ea62aEf0f9ECE90625D5bC03b332810AD298697',
    quoteToken: bscTokens.usdt,
    token: bscTokens.gtoken,
    isTokenOnly: true,
  },
  {
    pid: 1,
    lpSymbol: 'PATTIE-BNB LP',
    lpAddress: '0x8AD70483F5cfb225476Fb3809F7A7053E4B5bb38',
    quoteToken: bscTokens.wbnb,
    token: bscTokens.gtoken,
  },
  {
    pid: 2,
    lpSymbol: 'PATTIE-USDT LP',
    lpAddress: '0x1E2d6994012da475e45c40FeAFCbc35d9275a160',
    quoteToken: bscTokens.usdt,
    token: bscTokens.gtoken,
  },
  {
    pid: 3,
    lpSymbol: 'BNB-USDT LP',
    lpAddress: '0xb36d3427D6229EfC153a2D2eC0bA64F706349127',
    quoteToken: bscTokens.wbnb,
    token: bscTokens.usdt,
  }
].map((p) => ({ ...p, lpAddress: p.lpAddress as `0x${string}`, token: p.token.serialize, quoteToken: p.quoteToken.serialize }))

export default farms
