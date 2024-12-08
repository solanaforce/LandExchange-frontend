import { useAccount } from 'wagmi'
import { ChainId } from 'config/chains'
import styled from 'styled-components'
import { useMatchBreakpoints } from 'contexts'
import { Flex } from './Box'
import { ChainLogo } from './Logo/ChainLogo'
import { Text } from './Text'

const StyledFlex = styled(Flex)`
  padding: 12px;
`

const ConnectWalletButton = () => {
  const { isConnected } = useAccount()
  const { isMobile } = useMatchBreakpoints()
  if (!isConnected)
    return <Flex alignItems="center">
      <StyledFlex alignItems="center">
        <ChainLogo chainId={ChainId.BSC} />
        {isMobile ? <></> : <Text ml="4px">BNB Smart Chain</Text>}
      </StyledFlex>
      <w3m-button size="sm" />
    </Flex>
  return <w3m-button size="sm" />
}

export default ConnectWalletButton
