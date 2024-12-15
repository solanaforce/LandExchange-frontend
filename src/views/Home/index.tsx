import $ from 'jquery'
import { useEffect } from 'react'
import Chart, { ChartItem } from 'chart.js/auto'
import styled from 'styled-components'
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown'
import '@leenguyen/react-flip-clock-countdown/dist/index.css'
import { Box, Button, FacebookIcon, Flex, GithubIcon, LanguageIcon, Link, NextLinkFromReactRouter, RefreshIcon, SearchIcon, TelegramIcon, Text, TwitterIcon } from 'components'
import Presale from './presale'

const StyleFlex = styled(Flex)`
  background-image: url('/images/background.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`

const Home: React.FC<React.PropsWithChildren> = () => {
  useEffect(() => {
    function getHeight() {
      return $('.promo').outerHeight()
    }
    $('.scroll-down').on('click', function (e) {
      $('html, body').animate(
        {
          scrollTop: getHeight(),
        },
        10,
      )
    })

    // eslint-disable-next-line no-var, vars-on-top
    var ctx = document.getElementById('myChart')
    // eslint-disable-next-line no-var, vars-on-top
    var myChart = new Chart(ctx as ChartItem, {
      type: 'doughnut',
      data: {
        labels: ['Liquidity Incentives', 'Team', 'Treasury + Marketing', 'Initial Mint'],
        datasets: [
          {
            label: 'Percent of total supply',
            data: [89, 5, 5, 1],
            backgroundColor: ['#01F4FF', '#2ACCFE', '#43B3FD', '#6F87FC'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        elements: {
          arc: {
            borderColor: '#1f2641',
            borderWidth: 2,
          },
        },
      },
    })
    return () => {
      myChart.destroy()
    }
  })
  return (
    <>
      {/* <section className="promo">
        <div className="container">
          <div className="row">
            <div className="col-12 promo__content" data-aos="fade-right">
              <h1>
                Land Vault <span>Presale</span>
              </h1>
              <p>
                LandVault envisions becoming the premier global platform for land investment and development, 
                empowering individuals and communities through shared ownership and sustainable income opportunities. 
                By integrating blockchain transparency, tokenized assets, and smart contracts, LandVault aims to create a decentralized, 
                user-driven ecosystem that transforms underutilized land into high-value, income-generating properties.
              </p>

              <div className="timer-wrap">
                <FlipClockCountdown
                  to={new Date().getTime() + 24 * 3600 * 1000 + 5000}
                  labels={['DAYS', 'HOURS', 'MINUTES', 'SECONDS']}
                  labelStyle={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase' }}
                  digitBlockStyle={{
                    width: 40,
                    height: 60,
                    fontSize: 30,
                    color: 'black',
                    background: '#fffefc',
                    fontWeight: 700,
                  }}
                  dividerStyle={{ color: 'white', height: 0 }}
                  // separatorStyle={{ color: 'red', size: '6px' }}
                  duration={0.5}
                >
                  Finished
                </FlipClockCountdown>
              </div>

              <div className="promo__btns-wrap">
                <Button as={NextLinkFromReactRouter} to="/presale" variant="primary" height="60px" px="25px">
                  <Text color="background">Join in Presale</Text>
                </Button>
                <Button as={NextLinkFromReactRouter} to="https://docs.dexfinity.finance/" target="_blank" variant="secondary" height="60px" ml="12px" px="25px">
                  Documentation
                </Button>
              </div>
            </div>
          </div>
          <img src="images/home/promo-bg.png" data-aos="fade-up" alt="" className="promo__img" />
        </div>
        <div className="scroll-down">
          <img src="images/home/scroll-down.png" alt="" />
        </div>
      </section> */}
      {/* <section className="economy">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-4">
              <a
                data-jarallax-element="-40"
                href="https://www.youtube.com/watch?v=3cZjVFKzugY&list=PLcpkKchW7Xe5K578xRCwQbPbeVQGN5K9h&index=10"
                className="economy__video-btn video-btn popup-youtube"
              >
                <img src="images/home/video-btn.png" alt="" />
              </a>

              <div className="economy__block">
                <div className="economy__block-content">
                  <div className="section-header section-header--white section-header--tire section-header--small-margin">
                    <h4>decentralised economy</h4>
                    <h2>
                      A peer-to-peer platform <span> designed for exchanging cryptocurrencies</span>
                    </h2>
                  </div>
                  <p>
                  Dexfinity presents itself as a fully developed platform ready to transform the landscape of decentralized exchanges (DEX).
                  Our platform has been designed to directly address the most significant obstacles in the sector, offering a superior trading experience that focuses on cost reduction, ease of use, and future user education.
                  </p>
                  <ul>
                    <li>
                      <span>Low transaction fee: </span> Dexfinity has solved it by implementing its operation on the Bitfinity Network.
                    </li>
                    <li>
                      <span>Attractive design: </span> The platform features a visually attractive and easy-to-navigate interface, designed with the end user in mind.
                    </li>
                    <li>
                      <span>Future educational strategy:</span> We plan to establish a strong presence on social media and video platforms like YouTube, 
                      where we will collaborate with industry influencers to expand our reach.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img src="images/home/video-bg.png" alt="" className="economy__bg" />
      </section> */}
      <StyleFlex width="100%" alignItems="center" justifyContent="center">
        <Flex 
          width="100%"
          maxWidth="1200px" 
          padding="0 24px"
          justifyContent="space-between"
          alignItems="center"
          style={{gap: "24px"}}
          flexDirection={["column", "column", "column", "column", "row"]}
        >
          <Flex flexDirection="column" width="100%">
            <Text fontSize="48px">Land Exchange Presale</Text>
            <Text fontSize="22px">Empowering Landowners with Liquidity and Flexibility</Text>
            <br />
            {/* <Text fontSize="24px">Bridge the Gap Between Land Ownership and Immediate Cash Flow</Text> */}
            <p style={{color: 'white'}}>
              Welcome to LandX Presale, a revolutionary blockchain-based solution designed to provide landowners and developers with fast, secure, and flexible liquidity. 
              By leveraging the power of blockchain, LandX helps unlock the value of your properties, offering immediate funding while ensuring a favorable selling process through our extensive agent network.
            </p>
          </Flex>
          <Box width="100%">
            <img src="images/logo.png" alt="logo" />
          </Box>
        </Flex>
      </StyleFlex>
      <section className="section token" id="sale">
        <Presale 
          countdownNode={
            <FlipClockCountdown
            to={new Date().getTime() + 24 * 3600 * 1000 + 5000}
            labels={['DAYS', 'HOURS', 'MINUTES', 'SECONDS']}
            labelStyle={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase' }}
            digitBlockStyle={{
              width: 40,
              height: 60,
              fontSize: 30,
              color: 'black',
              background: '#fffefc',
              fontWeight: 700,
            }}
            dividerStyle={{ color: 'white', height: 0 }}
            // separatorStyle={{ color: 'red', size: '6px' }}
            duration={0.5}
          >
            Finished
          </FlipClockCountdown>
          } 
        />
      </section>

      {/* <section className="section token" id="token">
        <div className="container">
          <div className="row">
            <img src="images/logo.png" className="token__img" alt="" />
            <div data-aos="fade-left" className="col-lg-6 offset-lg-6 token__animated-content">
              <div className="section-header section-header--tire section-header--small-margin">
                <h4>About token</h4>
                <h2>Token Sale</h2>
              </div>

              <ul className="token__info-list">
                <li>
                  <span>Token name:</span> Land Exchange Token
                </li>
                <li>
                  <span>Token Symbol:</span> LDX
                </li>
                <li>
                  <span>Initial Supply:</span> 20,000,000
                </li>
                <li>
                  <span>Initial Price:</span> 0.001 BNB
                </li>
              </ul>

              <div className="token__desc">
                <div className="token__desc-title">LDX is Stable, Structured, & Transparent</div>
                <div className="token__desc-text">
                  <p></p>
                  <ul>
                    <li>
                    Strategic Distribution: Public sale, institutional partnerships, and reserve fund allocation.
                    </li>
                    <li>Staking Incentives: Long-term holding encourages scarcity and price stability.</li>
                    <li>Liquidity Pool: Provide enough supporting coins to support the transaction maintaining coin price</li>
                  </ul>
                </div>
              </div>

              <Button as={NextLinkFromReactRouter} to="#sale" variant="primary" height="60px" px="25px">
                <Text color="background">Buy Token</Text>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="data token-data section section--no-pad-bot">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="section-header section-header--animated section-header--medium-margin section-header--center">
                <h4>Our data</h4>
                <h2>Token Distribution</h2>
                <div className="bg-title">Token Distribution</div>
              </div>
            </div>
          </div>
          <div className="row chart__row align-items-center">
            <div className="col-lg-6">
              <div className="chart">
                <div className="chart__wrap">
                  <canvas id="myChart" width="400" height="400" />
                </div>
              </div>
            </div>
            <div data-aos="fade-left" className="col-lg-6 token-data__animated-content">
              <div className="chart__title">Allocation of token supply</div>
              <p className="chart__text">Token Max Supply - 100,000,000</p>
              <ul className="chart__legend">
                <li>
                  <span style={{ width: '289px' }} />
                  89% Liquidity Incentives
                </li>
                <li>
                  <span style={{ width: '18px' }} />
                  5% Team
                </li>
                <li>
                  <span style={{ width: '18px' }} />
                  5% Treasury + Marketing
                </li>
                <li>
                  <span style={{ width: '4px' }} />
                  1% Initial Mint
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section> */}

      <section className="section faq" id="faq">
        <Flex width="100%" alignItems="center" justifyContent="center" mb="60px">
          <Flex 
            width="100%"
            maxWidth="1200px" 
            padding="0 24px"
            justifyContent="space-between"
            alignItems="center"
            style={{gap: "24px"}}
            flexDirection={["column", "column", "column", "column", "row"]}
          >
          <div className="container">
            <img src="images/faq1.jpg" alt="" />
          </div>
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="section-header section-header--center section-header--medium-margin">
                  <h4>FAQ</h4>
                  <h2>Frequency Asked Questions</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 offset-lg-2">
                <ul className="accordion">
                  <li>
                    <a href="/">What is the LandX Token (LDX), and why should I participate in the presale?</a>
                    <p>
                    The LDX token is the native cryptocurrency of the LandX platform. It powers the liquidity pool, enables staking for passive income, and allows holders to participate in profit sharing and governance. By joining the presale, you can secure LDX tokens at an 85% discount before public trading, which is set to begin in September 2025. Early participation allows you to benefit from staking rewards, loan interest returns, and ecosystem growth.
                    </p>
                  </li>
                  <li>
                    <a href="/">When does the presale begin, and what are the key details?</a>
                    <p>
                    The LandX Token Presale starts on 13 December 2024 and ends for Phase 1 on 31 December 2024. Key details include:
                    </p>
                    <p>* Discount: 85% off the projected trading price.</p>
                    <p>* Lock-Up Period: Staked tokens have a 6-month lock-up period.</p>
                    <p>* Accepted Payments: Primary payment is BNB. Alternative payments include Bitcoin, USDT, and ETH, processed via Web3 wallets (e.g., MetaMask, Trust Wallet).</p>
                    <p>* Loan Interest Returns: Investors in the liquidity pool and staked coin holders will earn a share of the interest generated from crypto-loan activities, proportional to their contributions.
                    This is a limited-time opportunity to acquire tokens before they are publicly listed.</p>
                  </li>
                  <li>
                    <a href="/">How do I participate in the LandX Token Presale?</a>
                    <p>
                    * Visit app.landx.io and create an account.
                    </p>
                    <p>* Link your Web3 wallet (e.g., MetaMask or Trust Wallet).</p>
                    <p>* Purchase LDX tokens using BNB, Bitcoin, USDT, or ETH. (Special Crypto Bridge Required)</p>
                    <p>* Complete the KYC verification process to purchase more LDX Tokens</p>
                    <p>* Stake your tokens to start earning rewards, including loan interest returns, and contribute to the LandX liquidity pool. Phase 2</p>
                  </li>
                  <li>
                    <a href="/">WWhat is the utility of LDX tokens, and how do staking rewards and loan interest returns work?</a>
                    <p>
                    LDX tokens are the foundation of the LandX ecosystem, offering multiple benefits:
                    </p>
                    <p>
                    * Staking Rewards: Stake your tokens to earn passive income through profit sharing.
                    </p>
                    <p>* Loan Interest Returns: A portion of the interest generated from crypto loans provided to borrowers is distributed to liquidity pool contributors and staked coin holders, based on their proportional contribution.</p>
                    <p>* Profit Sharing: Earn a share of the platform’s overall profits generated by its ecosystem.</p>
                    <p>* Governance: Participate in voting on important decisions that shape the platform’s future.</p>
                    <p>Rewards are distributed regularly and are tied directly to the performance of the platform.</p>
                  </li>
                  <li>
                    <a href="/">When can I trade LDX tokens, and what happens after the presale?</a>
                    <p>
                    While trading will begin on major exchanges in September 2025, tokens purchased during the presale can be staked immediately to earn rewards, including loan interest returns. After the presale, the LandX platform will activate staking, expand its liquidity pool, and grow its ecosystem, offering early participants significant opportunities for long-term returns.
                    </p>
                  </li>
                  <li>
                    <a href="/">How do I stay updated and learn more about LandX?</a>
                    <p>
                    For updates and announcements, visit app.landx.io for presale and landx.io for LandX Platform, follow LandX on social media, or subscribe to our newsletter. Stay informed about presale developments, token listings, and new opportunities in the LandX ecosystem.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          </Flex>
        </Flex>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              {/* <img className="logo__img logo__img--big" src="/images/logo.png" alt="" /> */}
              <img src="images/logo.png" width="84px" alt="" />
              <div className="copyright">© 2024, LandX </div>
            </div>
            <div className="col-lg-4">
              <div className="social-block">
                <div className="social-block__title">Stay connected:</div>

                <ul className="social-list">
                  <li className="social-list__item">
                    <a href="https://x.com/LandXio" className="social-list__link">
                      {/* <img src="images/home/twitter.png" width={32}/> */}
                      <TwitterIcon mt="2px" />
                    </a>
                  </li>
                  <li className="social-list__item">
                    <a href="https://landx.io/" className="social-list__link">
                      {/* <img src="images/home/telegram.png" width={32}/> */}
                      <LanguageIcon width="24px" />
                    </a>
                  </li>
                  <li className="social-list__item">
                    <a href="https://facebook.com/landxtoken" className="social-list__link">
                      {/* <img src="images/home/github.png" width={32}/> */}
                      {/* <GithubIcon /> */}
                      <FacebookIcon mt="2px" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4">
              <form action="#" className="form subscribe" id="subscribe-form">
                <div className="form__title">Subscribe</div>
                <div className="form__row">
                  <input type="email" name="subscribe_email" className="form__input" placeholder="Email" />
                  <Button variant="primary" height="55px" px="25px">
                    <Text color="background">Send</Text>
                  </Button>
                  {/* <button className="form__btn btn btn--uppercase btn--orange btn--small">
                    <span>Send</span>
                  </button> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Home
