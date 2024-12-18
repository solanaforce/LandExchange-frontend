import { ChainId } from 'config/chains'

export default {
  masterChef: {
    [ChainId.BSC]: '0x5eDE445f6B04f494bab129976b52590e8904321b',
  },
  multiCall: {
    [ChainId.BSC]: '0xcA11bde05977b3631167028862bE2a173976CA11',
  },
  migration: {
    [ChainId.BSC]: '0xc87e21b684E2484FadeD8415e251E113E0F3C852',
  },
  presale: {
    [ChainId.BSC]: '0xfB615eed44A8230970e6C6642a3B4Cb34d6794Cc',
  },
} as const satisfies Record<string, Record<number, `0x${string}`>>
