import { FooterLinkType } from "components/Footer/types";

export const footerLinks: () => FooterLinkType[] = () => [
  {
    label: "About",
    items: [
      {
        label: "Docs",
        href: "https://docs.cyberglow.finance/",
        isHighlighted: true,
        blank: true,
      },
      {
        label: "Swap",
        href: "/swap",
      },
      {
        label: "Liquidity",
        href: "/pool",
      },
      {
        label: "Farm",
        href: "/farms",
      },
      {
        label: "Earn",
        href: "/pools",
      },
      {
        label: "Presale",
        href: "",
        blank: true,
      },
      {
        label: "NFT",
        href: "/nfts",
      },
      {
        label: "Terms of Service",
        href: "/",
        blank: true,
      },
    ],
  },
  {
    label: "Help",
    items: [
      {
        label: "Customer Support",
        href: "https://docs.pancakeswap.finance/contact-us/customer-support",
      },
      {
        label: "Troubleshooting",
        href: "https://docs.pancakeswap.finance/help/troubleshooting",
      },
      {
        label: "Guides",
        href: "https://docs.pancakeswap.finance/get-started",
      },
    ],
  },
  {
    label: "Developers",
    items: [
      {
        label: "Github",
        href: "https://github.com/pancakeswap",
      },
      {
        label: "Documentation",
        href: "https://docs.pancakeswap.finance",
      },
      {
        label: "Bug Bounty",
        href: "https://docs.pancakeswap.finance/code/bug-bounty",
      },
      {
        label: "Audits",
        href: "https://docs.pancakeswap.finance/help/faq#is-pancakeswap-safe-has-pancakeswap-been-audited",
      },
      {
        label: "Careers",
        href: "https://docs.pancakeswap.finance/hiring/become-a-chef",
      },
    ],
  }
];