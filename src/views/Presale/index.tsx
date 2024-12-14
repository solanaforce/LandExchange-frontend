import { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
// import { Currency, ERC20Token } from 'libraries/swap-sdk'
import { bscTokens } from 'libraries/tokens'
import { Flex, Card, Box, TokenLogo, Text, LinkExternal, CopyButton, Button, AutoRenewIcon, AtomBox, Skeleton } from "components"
import { ModalInputForTrigger } from "widgets/Modal"
import { useToast } from 'contexts'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { trimTrailZero } from 'utils/trimTrailZero'
import getTimePeriods from 'utils/getTimePeriods'
import { useAccount } from 'wagmi'
import { BAD_SRCS } from 'components/Logo/constants'
import Page from 'components/Layout/Page'
import Divider from 'components/Divider'
import { useActiveChainId } from 'hooks/useActiveChainId'
import useCatchTxError from "hooks/useCatchTxError";
import { useToken } from 'hooks/Tokens'
import useTotalSupply from 'hooks/useTotalSupply'
import useNativeCurrency from 'hooks/useNativeCurrency'
import { getBlockExploreLink } from 'utils'
import { getPresaleAddress } from 'utils/addressHelpers'
import { ToastDescriptionWithTx } from "components/Toast";
import SocialLinks from './components/Socials'
import YoutubeEmbed from './components/Youtube'
import useCountdown from './hooks/useCountdown'
import { useAccountInfo } from './hooks/useAccountInfo'
import { usePublicInfo } from './hooks/usePublicInfo'
import usePresale from './hooks/usePresale'

const StyledAppBody = styled(Card)`
  border-radius: 8px;
  width: 100%;
  z-index: 1;
  padding: 1px;
`

const StyledLogo = styled(TokenLogo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 50%;
`

const Badge = styled(Box)<{ status: string}>`
  background: ${({theme, status}) => status === "upcoming" ? theme.colors.warning33 : status === "live" || status === "success" ? theme.colors.success19 : theme.colors.text99};
  color: ${({theme, status}) => status === "upcoming" ? theme.colors.primary : status === "live" || status === "success" ? theme.colors.success : theme.colors.text};
  font-size: 14px;
  border-radius: 8px;
  padding: 3px 15px;
  height: 20px;
`

const StyledBox = styled(Box)`
  background: ${({theme}) => theme.colors.backgroundAlt2};
  border: 1px solid ${({theme}) => theme.colors.primary};
  border-radius: 4px;
  padding: 4px;
`

const DepositPanel = styled(Box)`
  border-radius: 8px;
  margin-top: 30px;
`

const ProgressBase = styled(Box)<{cap: number, pos: number}>`
  border-radius: 8px;
  height: 16px;
  background: ${({ theme, cap, pos }) => cap >= pos ? theme.colors.text99 : theme.colors.primary};
`

const ProgressBar = styled(Box)<{cap: number, pos: number}>`
  border-radius: 8px;
  width: ${({ cap, pos }) => cap >= pos ? pos / cap * 100 : cap / pos * 100}%;
  border: 8px solid ${({ theme, cap, pos }) => cap >= pos ? theme.colors.primary : theme.colors.primaryDark};
`

const accountEllipsis = (address: string) => {
  return address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : null
}

const padTime = (num: number) => num.toString().padStart(2, '0')

const formatRoundTime = (secondsBetweenBlocks: number) => {
  const { days, hours, minutes, seconds } = getTimePeriods(secondsBetweenBlocks)
  const minutesSeconds = `${padTime(days)}:${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`

  return minutesSeconds
}

const getStatus = (startTime: any, endTime: any) => {
  const now = Date.now() / 1000
  if (startTime > now)
    return ["upcoming", "UPCOMING", "Presale Starts In"]
  if (startTime < now && endTime > now)
    return ["live", "SALE LIVE", "Presale Ends In"]
  if (endTime < now)
    return ["ended", "ENDED", "The pool has ended."]
  return ["", "", ""]
}

const Presale = () => {
  const { totalInvestors, totalDeposit, start, end, finalized } = usePublicInfo()
  // const totalInvestors = "0"
  // const totalDeposit = "0"
  // const start = 1734037200
  // const end = 1734642000
  // const finalized = false

  const { btfBalance, defBalance, deposit, claim } = useAccountInfo()
  const limit = BigInt(1e20);
  const { chainId } = useActiveChainId()

  const [val, setVal] = useState("0");
  const [pendingTx, setPendingTx] = useState(false)

  const tokenSupply = useTotalSupply(bscTokens.gtoken)

  const [status, statusText, banText] = getStatus(Number(start), Number(end))
  // const status: string = "upcoming"
  // const statusText = "UPCOMING"
  // const banText = "Presale Starts In"

  const { secondsRemaining } = useCountdown(status === "upcoming" ? Number(start) : Number(end))
  
  const countdown = formatRoundTime(secondsRemaining).split(":")

  const fullBalance = useMemo(() => {
    if (!limit) return "0"
    const max = limit - (deposit ?? 0n) > btfBalance ? btfBalance : limit - (deposit ?? 0n)
    return getFullDisplayBalance(new BigNumber(max.toString()), 6)
  }, [limit, btfBalance])

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        const inputVal = e.currentTarget.value.replace(/,/g, ".")
        setVal(inputVal);
      }
    },
    [setVal]
  )

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  const { fetchWithCatchTxError, loading: enablePendingTx } = useCatchTxError()
  const { toastSuccess } = useToast()

  const { onDeposit: onDepositBTF, onClaim: onClaimDEF } = usePresale()

  const onDeposit = async (amount: string) => {
    const receipt = await fetchWithCatchTxError(() => onDepositBTF(amount))

    if (receipt?.status) {
      toastSuccess(
        `Deposited!`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          You have deposited BNB.
        </ToastDescriptionWithTx>,
      )
    }
  }

  const onClaim = async () => {
    const receipt = await fetchWithCatchTxError(() => onClaimDEF())

    if (receipt?.status) {
      toastSuccess(
        `Claimed!`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          You have claimed LDX.
        </ToastDescriptionWithTx>,
      )
    }
  }

  const isDepositDisabled = new BigNumber(val).times(10 ** 18).isGreaterThan(btfBalance?.toString() ?? "0") ||
    new BigNumber(val).times(10 ** 18).isGreaterThan((limit-(deposit ?? 0n))?.toString() ?? "0") ||
    new BigNumber(val).times(10 ** 18).plus(deposit?.toString() ?? "0").isLessThan(11250000000)

  const isClaimDisabled = !finalized || 
    new BigNumber(deposit?.toString() ?? "0").times(10 ** 18).div(112500000).isLessThanOrEqualTo(claim?.toString() ?? "0")

  return (
      <Flex width="100%" flexDirection={["column", "column", "column", "column", "column", "column", "row"]} justifyContent="center">
        <Box
          maxWidth={["100%", "100%", "100%", "100%", "100%", "100%", "100%"]} 
          minWidth={["100%", "100%", "100%", "100%", "100%", "100%", "65%"]} 
          mr={["0", "0", "0", "0", "0", "0", "15px"]}
        >
          <StyledAppBody>
            <Box p="20px">
              <Flex flexDirection={["column", "column", "column","row"]} justifyContent={["center", "center", "center", "space-between"]}>
                <AtomBox display={{ xs: "block", md: "none" }}>
                  <Flex justifyContent="right">
                    <Badge status={status}>{statusText}</Badge>
                  </Flex>
                </AtomBox>
                <Flex width="100%">
                  <StyledLogo size="56px" srcs={["/logo.png"]} alt="landvault" />
                  <Box ml="15px">
                    <Flex mb="10px">
                      <Text fontSize="20px" fontWeight="600">
                        LandExchange Token Presale
                      </Text>
                    </Flex>
                    <SocialLinks links={[
                      "https://x.com/",
                      "https://t.me/",
                      "https://discord.gg/",
                      "https://docs.landx.io/"
                    ]} />
                  </Box>
                </Flex>
                <Flex width="100%" justifyContent="right" mt="10px">
                  <AtomBox display={{ xs: "none", md: "block" }}>
                  {statusText ? 
                    <Badge status={status}>{statusText}</Badge> :
                    <Skeleton height="20px" width="80px" />
                  }
                  </AtomBox>
                </Flex>
              </Flex>
              <Box mt="15px">
                <Box mb="20px">
                  <Text small>
                    {`
                      LandVault envisions becoming the premier global platform for land investment and development, 
                      empowering individuals and communities through shared ownership and sustainable income opportunities. 
                      By integrating blockchain transparency, tokenized assets, and smart contracts, 
                      LandVault aims to create a decentralized, user-driven ecosystem that transforms underutilized land into high-value, 
                      income-generating properties.
                    `}
                  </Text>
                </Box>
                {/* <YoutubeEmbed embedId="/introduction.mp4" /> */}
                <Box>
                  <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
                    <Text small>Presale Address</Text>
                    <Flex alignItems="center">
                      <LinkExternal href={getBlockExploreLink(getPresaleAddress(148), 'address', chainId)}>
                        <Text small color="primary">{accountEllipsis(getPresaleAddress(148))}</Text>
                      </LinkExternal>
                      {/* <Text small color="primary">To be announced</Text> */}
                      <CopyButton 
                        width="16px"
                        ml="5px"
                        buttonColor="textSubtle"
                        text={getPresaleAddress(148)}
                        tooltipMessage='Presale address copied'
                      />
                    </Flex>
                  </Flex>
                  <Divider />
                  <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
                    <Text small>Token Name</Text>
                    <Text small>LandExchange Token</Text>
                  </Flex>
                  <Divider />
                  <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
                    <Text small>Token Symbol</Text>
                    <Text small>LDX</Text>
                  </Flex>
                  <Divider />
                  <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
                    <Text small>Token Decimals</Text>
                    <Text small>18</Text>
                  </Flex>
                  <Divider />
                  <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
                    <Text small>Token Address</Text>
                    <Flex alignItems="center">
                      <LinkExternal href={getBlockExploreLink(bscTokens.gtoken.address, 'token', chainId)}>
                        <Text small color="primary">{accountEllipsis(bscTokens.gtoken.address)}</Text>
                      </LinkExternal>
                      {/* <Text small color="primary">To be announced</Text> */}
                      <CopyButton 
                        width="16px"
                        ml="5px"
                        buttonColor="textSubtle"
                        text={bscTokens.gtoken.address}
                        tooltipMessage='Token address copied'
                      />
                    </Flex>
                  </Flex>
                  <Divider />
                  <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
                    <Text small>Initial Total Supply</Text>
                    <Text small>20,000,000 LDX</Text>
                    {/* <Text small>1,000,000 DEF</Text> */}
                  </Flex>
                  <Divider />
                  <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
                    <Text small>Presale Rate</Text>
                    <Text small>1 LDX = 0.0009 BNB</Text>
                  </Flex>
                  <Divider />
                  <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
                    <Text small>Listing Rate</Text>
                    <Text small>1 LDX = 0.001 BNB</Text>
                  </Flex>
                  <Divider />
                  <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
                    <Text small>Presale Start</Text>
                    <Text small>{new Date(Number(start) * 1000).toLocaleString('en-GB', { timeZone: 'UTC'})} (UTC)</Text>
                  </Flex>
                  <Divider />
                  <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
                    <Text small>Presale End</Text>
                    <Text small>{new Date(Number(end) * 1000).toLocaleString('en-GB', { timeZone: 'UTC'})} (UTC)</Text>
                  </Flex>
                  <Divider />
                  {/* <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
                    <Text small>Listing On</Text>
                    <Text small>Dexfinity Router</Text>
                  </Flex>
                  <Divider /> */}
                  <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
                    <Text small>Listing Method</Text>
                    <Text small color="success">Manually</Text>
                  </Flex>
                  <Divider />
                  <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
                    <Text small>Owner Address</Text>
                    <Flex alignItems="center">
                      <LinkExternal href={getBlockExploreLink('0x3b0dDE7bbD2acFFABCa1A16EF00C7A97dF84a7ab', 'address', chainId)}>
                        <Text small color="primary">{accountEllipsis('0x3b0dDE7bbD2acFFABCa1A16EF00C7A97dF84a7ab')}</Text>
                      </LinkExternal>
                      <CopyButton 
                        width="16px"
                        ml="5px"
                        buttonColor="textSubtle"
                        text='0x3b0dDE7bbD2acFFABCa1A16EF00C7A97dF84a7ab'
                        tooltipMessage='Owner address copied'
                      />
                    </Flex>
                  </Flex>
                  <Divider />
                  <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
                    <Text small>Liquidity Percent</Text>
                    <Text small>To be announced</Text>
                  </Flex>
                  <Divider />
                  <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
                    <Text small>Liquidity Lockup Time</Text>
                    <Text small>To be announced</Text>
                  </Flex>
                </Box>
              </Box>
            </Box>
          </StyledAppBody>
        </Box>
        <Box 
          maxWidth={["100%", "100%", "100%", "100%", "100%", "100%", "100%"]} 
          minWidth={["100%", "100%", "100%", "100%", "100%", "100%", "35%"]} 
          mt={["15px", "15px", "15px", "15px", "15px", "15px", "0"]}
        >
          <StyledAppBody>
            <Box p="20px">
              <Flex justifyContent="center">
                <Text color="primary" fontSize="18px">{banText}</Text>
              </Flex>

              <Flex justifyContent="center" mt="10px">
                <StyledBox><Text fontSize="18px">{countdown[0]}</Text></StyledBox>
                <StyledBox ml="5px"><Text fontSize="18px">{countdown[1]}</Text></StyledBox>
                <StyledBox ml="5px"><Text fontSize="18px">{countdown[2]}</Text></StyledBox>
                <StyledBox ml="5px"><Text fontSize="18px">{countdown[3]}</Text></StyledBox>
              </Flex>
              <Flex justifyContent="space-between" mt="20px">
                <Text fontSize="12px">Total</Text>
                <Text fontSize="12px">Max Cap</Text>
              </Flex>
              <ProgressBase 
                cap={2500000}
                pos={Number(totalDeposit) / 10 ** 18}
              >
                <ProgressBar 
                  cap={2500000}
                  pos={Number(totalDeposit) / 10 ** 18} 
                />
              </ProgressBase>
              <Flex justifyContent="space-between">
              {
                totalDeposit !== undefined ? 
                  <Text small>{(Number(totalDeposit) / 10 ** 18).toLocaleString()} BNB</Text> :
                  <Skeleton width="40px" height="18px" />
              }
                <Text small>1,000 BNB</Text>
              </Flex>
              {status === "live" && <DepositPanel>
                <ModalInputForTrigger
                  value={val}
                  onSelectMax={handleSelectMax}
                  onChange={handleChange}
                  max={fullBalance}
                  symbol="BNB"
                  decimals={6}
                />
                <Flex justifyContent="space-between" alignItems="center" mt="20px">
                  <Box />
                  {pendingTx ? <Button
                    isLoading={pendingTx}
                    endIcon={<AutoRenewIcon spin color="currentColor" />}
                    mt="-10px"
                  >
                    Deposit
                  </Button> : <Button
                    onClick={async () => {
                      setPendingTx(true);
                      await onDeposit(val);
                      setPendingTx(false);
                    }}
                    disabled={isDepositDisabled}
                    mt="-10px"
                  >
                    Deposit
                  </Button>}
                </Flex>
              </DepositPanel>}
              {status === "ended" && <Flex justifyContent="space-between" alignItems="center" mt="20px">
                <Box />
                <Button
                  onClick={() => onClaim()}
                  disabled={isClaimDisabled}
                  height="36px"
                  px="10px"
                  mt="-10px"
                >
                  Claim
                </Button>
              </Flex>}
            </Box>
          </StyledAppBody>
          <StyledAppBody mt="16px">
            <Box p="20px">
              <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
                <Text small>Status</Text>
                <Text small color="primary">{status}</Text>
              </Flex>
              <Divider />
              <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
                <Text small>Minimum Buy</Text>
                <Text small>0.1 BNB</Text>
              </Flex>
              <Divider />
              <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
                <Text small>Maximum Buy</Text>
                <Text small>100 BNB</Text>
              </Flex>
              <Divider />
              <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
                <Text small>Total Deposit</Text>
                {
                  totalDeposit !== undefined ?
                    <Text small>{(Number(totalDeposit) / 10 ** 18).toLocaleString()} BNB</Text> :
                    <Skeleton width="100px" height="20px" />
                }
              </Flex>
              <Divider />
              <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
                <Text small>Total Contributors</Text>
                {
                  totalInvestors !== undefined ?
                    <Text small>{Number(totalInvestors)}</Text> :
                    <Skeleton width="100px" height="20px" />
                }
              </Flex>
              <Divider />
              <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
                <Text small>You purchased</Text>
                {
                  deposit !== undefined ?
                    <Text small>{Number(deposit) / 10 ** 18} BNB</Text> :
                    <Skeleton width="100px" height="20px" />
                }
                {/* <Text small>0 BNB</Text> */}
              </Flex>
            </Box>
          </StyledAppBody>
        </Box>
      </Flex>
  )
}

export default Presale