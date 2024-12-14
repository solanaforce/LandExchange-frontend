import { ChainId } from 'config/chains'
import Presale from 'views/Presale'

const PresalePage = () => {
  return <Presale />
}

PresalePage.chains = [ChainId.BSC]

export default PresalePage