import { useWeb3Modal } from '@web3modal/wagmi/react'
import { Currency, CurrencyAmount } from 'libraries/swap-sdk'
import { ApprovalState } from 'hooks/useApproveCallback'
import { Button, Text } from 'components'
import { AutoRow, RowBetween } from 'components/Layout/Row'
import { CommitButton } from 'components/CommitButton'
import CircleLoader from 'components/Loader/CircleLoader'
import useCatchTxError from 'hooks/useCatchTxError'
import { ToastDescriptionWithTx } from 'components/Toast'
import { useToast } from 'contexts'
import useMigrate from '../hooks/useMigrate'

interface SwapCommitButtonPropsType {
  account?: string
  value: string
  approval: ApprovalState
  approveCallback: () => Promise<any>
  approvalSubmitted: boolean
  setApprovalSubmitted: (b: boolean) => void
  currency?: Currency
  swapInputError?: string
  currencyBalance?: CurrencyAmount<Currency>
}

export default function SwapCommitButton({
  account,
  value,
  approval,
  approveCallback,
  approvalSubmitted,
  setApprovalSubmitted,
  currency,
  swapInputError,
}: SwapCommitButtonPropsType) {
  const { open } = useWeb3Modal()

  const { toastSuccess } = useToast()
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()

  const { onMigrate } = useMigrate()

  // Handlers
  const handleSwap = async () => {
    const receipt = await fetchWithCatchTxError(() => onMigrate(
      value
    ))

    setApprovalSubmitted(false)

    if (receipt) {
      toastSuccess(
        'Migrate Successful!',
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          You've just migrated old PATTIE to new
        </ToastDescriptionWithTx>,
      )
    }
  }

  if (!account) {
    return <Button
      width="100%"
      variant='primary'
      height="58px"
      onClick={() => open()}
    >
      <Text fontSize="20px">
        Connect Wallet
      </Text>
    </Button>
  }

  // show approve flow when: no error on inputs, not approved or pending, or approved in current session
  // never show if price impact is above threshold in non expert mode
  const showApproveFlow =
    !swapInputError &&
    (approval === ApprovalState.NOT_APPROVED ||
      approval === ApprovalState.PENDING ||
      (approvalSubmitted && approval === ApprovalState.APPROVED))

  if (showApproveFlow) {
    return (
      <>
        <RowBetween>
          <CommitButton
            variant={approval === ApprovalState.APPROVED ? 'success' : 'primary'}
            onClick={approveCallback}
            disabled={approval !== ApprovalState.NOT_APPROVED || approvalSubmitted}
            width="48%"
            height="58px"
            style={{fontSize: "20px"}}
          >
            {approval === ApprovalState.PENDING ? (
              <AutoRow gap="6px" justify="center">
                Enabling <CircleLoader stroke="white" />
              </AutoRow>
            ) : approvalSubmitted && approval === ApprovalState.APPROVED ? (
              'Enabled'
            ) : (
              `Enable ${currency?.symbol ?? ''}`
            )}
          </CommitButton>
          <CommitButton
            variant="primary"
            onClick={handleSwap}
            width="48%"
            height="58px"
            id="swap-button"
            disabled={!!swapInputError || approval !== ApprovalState.APPROVED || pendingTx}
            style={{fontSize: "20px"}}
          >
            {
              pendingTx ? 
                <AutoRow gap="6px" justify="center">
                  Migrating <CircleLoader stroke="white" />
                </AutoRow> 
              : 
                'Migrate'
            }
          </CommitButton>
        </RowBetween>
      </>
    )
  }

  return (
    <>
      <CommitButton
        variant='primary'
        onClick={handleSwap}
        id="swap-button"
        width="100%"
        height="58px"
        disabled={!!swapInputError || approval !== ApprovalState.APPROVED || pendingTx}
        style={{fontSize: "20px"}}
      >
        {swapInputError ||
          (pendingTx ? 
            <AutoRow gap="6px" justify="center">
              Migrating <CircleLoader stroke="white" />
            </AutoRow>
          : 
          'Migrate')}
      </CommitButton>
    </>
  )
}
