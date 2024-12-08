import { ChainId } from 'config/chains'

export const GRAPH_API_PREDICTION = process.env.REACT_APP_GRAPH_API_PREDICTION

export const INFO_CLIENT = 'https://api.studio.thegraph.com/query/88147/pattieswap/version/latest'
export const BLOCKS_CLIENT = 'https://gateway.thegraph.com/api/fda00884bf8347a3e82ca42c4ec0fe42/subgraphs/id/4TbTp1twn8San8Tti1S3kUoiJXPVXzRN5YDaTBnFXw2G'

export const BIT_QUERY = 'https://graphql.bitquery.io'

export const INFO_CLIENT_WITH_CHAIN = {
  [ChainId.BSC]: INFO_CLIENT,
}

export const BLOCKS_CLIENT_WITH_CHAIN = {
  [ChainId.BSC]: BLOCKS_CLIENT,
}
