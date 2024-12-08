import { DefaultSeoProps } from 'next-seo'

export const SEO: DefaultSeoProps = {
  titleTemplate: '%s | LandExchange',
  defaultTitle: 'LandExchange',
  description:
    'Discover LandExchange, the leading DEX on BNB Smart Chain with the best rewarding in DeFi.',
  twitter: {
    cardType: 'summary_large_image',
    handle: '@',
    site: '@',
  },
  openGraph: {
    title: 'LandExchange - A next evolution DeFi exchange on BNB Smart Chain',
    description:
      'The most popular AMM on BNB Smart Chain! Earn PATTIE through yield farming, then stake it in Pools to earn more tokens!',
    images: [{ url: 'https://app.landx.io/logo.png' }],
  },
}
