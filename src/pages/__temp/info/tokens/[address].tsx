import Token from 'views/Info/Tokens/TokenPage'
// import { GetStaticPaths, GetStaticProps } from 'next'
import { InfoPageLayout } from 'views/Info'
// import { getTokenStaticPaths, getTokenStaticProps } from 'utils/pageUtils'
import { useRouter } from 'next/router'

const TokenPage = () => {
  const router = useRouter()
  return <Token routeAddress={String(router.query.address)} />
}

TokenPage.Layout = InfoPageLayout
TokenPage.chains = [] // set all

export default TokenPage

// export const getStaticPaths: GetStaticPaths = getTokenStaticPaths()

// export const getStaticProps: GetStaticProps = getTokenStaticProps()