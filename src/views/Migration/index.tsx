import { ArrowDownIcon, Box, Button, Card, Flex, NextLinkFromReactRouter, SwapIcon, Text } from "components"
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import CurrencyInputPanel from "components/CurrencyInputPanel/migration"
import Page from "components/Layout/Page"
import { AutoRow } from "components/Layout/Row"
import { useMatchBreakpoints } from "contexts"
import { useCurrency } from "hooks/Tokens"
import { useCallback, useEffect, useState } from "react"
import { useCurrencyBalances } from "state/wallet/hooks"
import styled from "styled-components"
import { iconDownClass, switchButtonClass } from "theme/css/SwapWidget.css"
import { Wrapper } from "views/Swap/components/styleds"
import { useAccount } from "wagmi"
import contracts from "config/constants/contracts"
import { ChainId } from "config/chains"
import { CurrencyAmount } from "libraries/swap-sdk-core"
import useNativeCurrency from "hooks/useNativeCurrency"
import BigNumber from "bignumber.js"
import SwapCommitButton from "./components/SwapCommitButton"

const PageHeader = styled(Flex)`
  align-items: center;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  padding: 12px;
  border-radius: 16px;
`

export const StyledAppBody = styled(Card)`
	background: transparent;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
  padding: 4px 8px 16px 8px;
  z-index: 1;
`

const StyledBox = styled(Box)`
  background: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
`

const StyledBox1 = styled(Box)`
  background: ${({ theme }) => theme.colors.input};
  border-radius: 8px;
  border: 3px solid ${({ theme }) => theme.colors.background};
`

const accountEllipsis = (data) => `${data.substring(0, 6)}...${data.substring(data.length - 4)}`;

const Migration = () => {
	const {isMobile} = useMatchBreakpoints()
	const native = useNativeCurrency()
	const {address: account} = useAccount()
	const inputCurrency = useCurrency("0x55fC934960da407328CF8Ad664d3a42a3Cf260d6")
	const outputCurrency = useCurrency("0x4Ea62aEf0f9ECE90625D5bC03b332810AD298697")
	const [inputBalance, ] = useCurrencyBalances(
		account ?? undefined,
		[inputCurrency ?? undefined, outputCurrency ?? undefined]
	)

	const [value, setValue] = useState("")

	const {approvalState, approveCallback} = useApproveCallback(
		CurrencyAmount.fromRawAmount(
			inputCurrency ?? native, 
			new BigNumber(
				Number(value)
			).times(10 ** 18).toString()
		), 
		contracts.migration[ChainId.BSC]
	)
	const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)

	useEffect(() => {
    if (approvalState === ApprovalState.PENDING) {
      setApprovalSubmitted(true)
    }
  }, [approvalState, approvalSubmitted])

	const handleTypeInput = useCallback(
    (v: string) => {
			setValue(v)
    },
    [setValue],
  )

	const handleMaxInput = useCallback(() => {
    if (inputBalance) {
      setValue(inputBalance.toExact())
    }
  }, [inputBalance, setValue])

	let inputError: string | undefined

	if (Number(value) === 0) {
    inputError = 'Enter an amount'
  }

	if (inputBalance && inputBalance.lessThan(Number(value) * (10 ** 18))) {
		inputError = `Insufficient balance`
	}

  return (
		<Page>
			<PageHeader>
				<Flex width="100%" justifyContent="space-between" flexDirection={["column", null, "row"]}>
					<Flex maxWidth="600px" p="24px" flexDirection="column">
						<Text fontSize="32px">
							PATTIE Migration
						</Text>
						<Text mt="24px" mb="8px">
							To use DEX, you should migrate old PATTIE to new.
						</Text>
						<Flex>
							<Text mr="8px">
								Old address:
							</Text>
							<Button
								as={NextLinkFromReactRouter}
								to="https://bscscan.com/address/0x55fC934960da407328CF8Ad664d3a42a3Cf260d6"
								variant="text"
								target="_blank"
							>
								{isMobile ? accountEllipsis("0x55fC934960da407328CF8Ad664d3a42a3Cf260d6") : "0x55fC934960da407328CF8Ad664d3a42a3Cf260d6"}
							</Button>
						</Flex>
						<Flex>
							<Text mr="8px">
								New address:
							</Text>
							<Button
								as={NextLinkFromReactRouter}
								to="https://bscscan.com/address/0x4Ea62aEf0f9ECE90625D5bC03b332810AD298697"
								variant="text"
								target="_blank"
							>
								{isMobile ? accountEllipsis("0x4Ea62aEf0f9ECE90625D5bC03b332810AD298697") : "0x4Ea62aEf0f9ECE90625D5bC03b332810AD298697"}
							</Button>
						</Flex>
					</Flex>
					<Flex p="12px">
						<SwapIcon width="170px" />
					</Flex>
				</Flex>
			</PageHeader>
			<Flex justifyContent="center">
				<StyledAppBody my="24px">
					<Box p="12px" position="inherit">
						<Wrapper id="swap-page" position="relative">
							<CurrencyInputPanel
								label='From'
								value={value}
								currency={inputCurrency}
								onUserInput={handleTypeInput}
								onMax={handleMaxInput}
								id="swap-currency-input"
								showBUSD={false}
							/>
							<AutoRow justify='center' my="-19px" mx="auto" zIndex="2">
								<StyledBox>
									<StyledBox1>
										<Button
											className={switchButtonClass} 
											variant="text"
											onClick={() => {}}
											scale="sm"
											width="36px"
											height="36px"
										>
											<ArrowDownIcon className={iconDownClass} color="text" />
										</Button>
									</StyledBox1>
								</StyledBox>
							</AutoRow>
							<CurrencyInputPanel
								label='To'
								value={(Number(value)/10000).toString()}
								currency={outputCurrency}
								onUserInput={() => {}}
								onMax={() => {}}
								id="swap-currency-output"
								showBUSD={false}
							/>
							<Box mt="0.5rem">
              <SwapCommitButton
                account={account ?? undefined}
                value={value}
                approval={approvalState}
                approveCallback={approveCallback}
                approvalSubmitted={approvalSubmitted}
								setApprovalSubmitted={setApprovalSubmitted}
                currency={inputCurrency ?? undefined}
                swapInputError={inputError}
                currencyBalance={inputBalance}
              />
            </Box>
						</Wrapper>
					</Box>
				</StyledAppBody>
			</Flex>
		</Page>
	)
}

export default Migration