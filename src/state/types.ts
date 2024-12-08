import BigNumber from 'bignumber.js'
import { SerializedFarmsState } from 'libraries/farms'
import { parseEther } from 'viem'

export enum GAS_PRICE {
  default = '1',
  fast = '4',
  instant = '5',
  testnet = '10',
}

export const GAS_PRICE_GWEI = {
  rpcDefault: 'rpcDefault',
  default: parseEther(GAS_PRICE.default, 'gwei').toString(),
  fast: parseEther(GAS_PRICE.fast, 'gwei').toString(),
  instant: parseEther(GAS_PRICE.instant, 'gwei').toString(),
  testnet: parseEther(GAS_PRICE.testnet, 'gwei').toString(),
}

export type SerializedBigNumber = string

// Global state

export interface State {
  farms: SerializedFarmsState
}

// Predictions

export enum BetPosition {
  BULL = 'Bull',
  BEAR = 'Bear',
  HOUSE = 'House',
}

export enum PredictionStatus {
  INITIAL = 'initial',
  LIVE = 'live',
  PAUSED = 'paused',
  ERROR = 'error',
}

export enum PredictionSupportedSymbol {
  BNB = 'BNB',
  BTC = 'BTC',
  SSTR = 'SSTR',
}

export interface Round {
  id: string
  epoch: number | null
  position: BetPosition | null
  failed: boolean
  startAt: number | null
  startBlock: number | null
  startHash: string
  lockAt: number | null
  lockBlock: number | null
  lockHash: string
  lockPrice: number
  lockRoundId: string
  closeAt: number | null
  closeBlock: number | null
  closeHash: string
  closePrice: number
  closeRoundId: string
  totalBets: number | null
  totalAmount: number
  bullBets: number | null
  bullAmount: number
  bearBets: number | null
  bearAmount: number
  bets?: Bet[]
}

export interface Market {
  paused: boolean
  epoch: number
}

export interface Bet {
  id?: string
  hash?: string
  amount: number
  position: BetPosition
  claimed: boolean
  claimedAt: number
  claimedBlock: number
  claimedHash: string
  claimedBNB: number
  claimedNetBNB: number
  createdAt: number
  updatedAt: number
  user?: PredictionUser
  round?: Round
}

export interface PredictionUser {
  id: string
  createdAt: number | null
  updatedAt: number | null
  block: number | null
  totalBets: number | null
  totalBetsBull: number | null
  totalBetsBear: number | null
  totalBNB: number
  totalBNBBull: number
  totalBNBBear: number
  totalBetsClaimed: number | null
  totalBNBClaimed: number
  winRate: number
  averageBNB: number
  netBNB: number
  bets?: Bet[]
}

export enum HistoryFilter {
  ALL = 'all',
  COLLECTED = 'collected',
  UNCOLLECTED = 'uncollected',
}

export interface LedgerData {
  [key: string]: {
    [key: string]: ReduxNodeLedger
  }
}

export interface RoundData {
  [key: string]: ReduxNodeRound
}

export interface ReduxNodeLedger {
  position: BetPosition
  amount: string
  claimed: boolean
}

export interface NodeLedger {
  position: BetPosition
  amount: BigNumber
  claimed: boolean
}

export interface ReduxNodeRound {
  epoch: number
  startTimestamp: number | null
  lockTimestamp: number | null
  closeTimestamp: number | null
  lockPrice: string | null
  closePrice: string | null
  totalAmount: string
  bullAmount: string
  bearAmount: string
  rewardBaseCalAmount: string
  rewardAmount: string
  oracleCalled: boolean
  lockOracleId: string | null
  closeOracleId: string | null
}

export interface NodeRound {
  epoch: number
  startTimestamp: number | null
  lockTimestamp: number | null
  closeTimestamp: number | null
  lockPrice: BigNumber | null
  closePrice: BigNumber | null
  totalAmount: BigNumber
  bullAmount: BigNumber
  bearAmount: BigNumber
  rewardBaseCalAmount: BigNumber
  rewardAmount: BigNumber
  oracleCalled: boolean
  closeOracleId: string
  lockOracleId: string
}

export enum LeaderboardLoadingState {
  INITIAL,
  LOADING,
  IDLE,
}

export type LeaderboardFilterTimePeriod = '1d' | '7d' | '1m' | 'all'

export interface LeaderboardFilter {
  address?: string
  orderBy?: string
  timePeriod?: LeaderboardFilterTimePeriod
}

export interface PredictionsState {
  status: PredictionStatus
  isLoading: boolean
  isHistoryPaneOpen: boolean
  isChartPaneOpen: boolean
  isFetchingHistory: boolean
  historyFilter: HistoryFilter
  currentEpoch: number
  intervalSeconds: number
  minBetAmount: string
  bufferSeconds: number
  lastOraclePrice: string
  history: Bet[]
  totalHistory: number
  currentHistoryPage: number
  hasHistoryLoaded: boolean
  rounds?: RoundData
  ledgers?: LedgerData
  claimableStatuses: {
    [key: string]: boolean
  }
  leaderboard: {
    loadingState: LeaderboardLoadingState
    filters: LeaderboardFilter
    skip: number
    hasMoreResults: boolean
    addressResults: {
      [key: string]: PredictionUser
    }
    results: PredictionUser[]
  }
}
