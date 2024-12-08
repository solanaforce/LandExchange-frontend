import { useState } from 'react'
import { Currency, Pair } from 'libraries/swap-sdk'
import { Button, Text, Flex, Box } from 'components'
import NumericalInput from 'components/NumericalInput'
import styled from 'styled-components'

import { useBUSDCurrencyAmount } from 'hooks/useBUSDPrice'
import { formatNumber } from 'utils/formatBalance'

import { useAccount } from 'wagmi'
import { useMatchBreakpoints } from 'contexts'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import { CurrencyLogo, DoubleCurrencyLogo } from '../Logo'

const CurrencySelectButton = styled(Button).attrs({ variant: 'text' })`
  padding: 0 30px 0 8px;
  margin-right: 16px;
  border: 1px solid ${({theme}) => theme.colors.cardBorder};
  // background-color: ${({theme}) => theme.colors.primary0f};
  height: 36px;
  width: 100px;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 200px;
  }
`

const Container = styled(Box)`
  background-color: ${({ theme }) => theme.colors.input};
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.input};
  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.primary3D};
  }
`

const LabelRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0 1rem 0 1rem;
`
const InputPanel = styled.div`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  // background-color: ${({ theme }) => theme.colors.backgroundAlt};
  z-index: 1;
`
const InputContainer = styled.div<{ error?: boolean }>`
  width: 100%;
  border-radius: 8px;
  // background-color: ${({ theme }) => theme.colors.input};
  // box-shadow: ${({ theme, error }) => theme.shadows[error ? 'warning' : 'inset']};
  // border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  padding-bottom: 0.5rem;
`

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.6;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
`

interface CurrencyInputPanelProps {
  value: string
  onUserInput: (value: string) => void
  onInputBlur?: () => void
  onMax?: () => void
  label?: string
  currency?: Currency | null
  hideBalance?: boolean
  pair?: Pair | null
  id: string
  beforeButton?: React.ReactNode
  disabled?: boolean
  error?: boolean
  showBUSD?: boolean
}
export default function CurrencyInputPanel({
  label,
  value,
  onUserInput,
  onInputBlur,
  onMax,
  currency,
  hideBalance = false,
  beforeButton,
  pair = null, // used for double token logo
  id,
  disabled,
  error,
  showBUSD,
}: CurrencyInputPanelProps) {
  const { address: account } = useAccount()
  const { isMobile } = useMatchBreakpoints()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)

  const amountInDollar = useBUSDCurrencyAmount(
    showBUSD ? currency ?? undefined : undefined,
    Number.isFinite(+value) ? +value : undefined,
  )
  
  const [, setCurrentClickedPercent] = useState('')

  return (
    <Container position="relative" id={id}>
      <Box mx="16px" mt="16px">
        <Text fontSize="14px" color="textDisabled">{label}</Text>
      </Box>
      <Flex alignItems="center" justifyContent="space-between">
        <InputContainer as="label" error={error}>
          <LabelRow>
            <NumericalInput
              error={error}
              placeholder='0'
              disabled={disabled}
              className="token-amount-input"
              value={value}
              onBlur={onInputBlur}
              onUserInput={(val) => {
                onUserInput(val)
                setCurrentClickedPercent('')
              }}
            />
          </LabelRow>
        </InputContainer>
        <Flex>
          {beforeButton}
          <CurrencySelectButton
            selected={!!currency}
            onClick={() => {}}
          >
            <Flex alignItems="center" justifyContent="space-between">
              {pair ? (
                <DoubleCurrencyLogo currency0={pair.token0} currency1={pair.token1} size={16} />
              ) : currency ? (
                <CurrencyLogo currency={currency} size="24px" style={{ marginRight: '8px' }} />
              ) : null}
              <Text id="pair" fontSize="20px">
                {
                  label === "From" ?
                    (isMobile ? "old" : "old PATTIE") : (isMobile ? "new" : "new PATTIE")
                }
              </Text>
            </Flex>
          </CurrencySelectButton>
        </Flex>
      </Flex>
      <InputPanel>
        <Flex alignItems="center" justifyContent="space-between" p="0 1rem 0.75rem 0.75rem">
          {!!currency && showBUSD && Number.isFinite(amountInDollar) ? (
            <Flex justifyContent="flex-end">
              <Flex maxWidth="200px">
                <Text fontSize="14px" color="textDisabled">
                  ${formatNumber(amountInDollar ?? 0)}
                </Text>
              </Flex>
            </Flex>
          ) : <div />}
          {account ? <Text
            onClick={!disabled ? onMax : () => {}}
            color="textSubtle"
            fontSize="14px"
            style={{ display: 'inline', cursor: 'pointer' }}
          >
            {!hideBalance && !!currency
              ? `Balance: ${selectedCurrencyBalance?.toSignificant(6) ?? 'Loading'}`
              : ' -'}
          </Text> : <div />}
        </Flex>
        {disabled && <Overlay />}
      </InputPanel>
    </Container>
  )
}
