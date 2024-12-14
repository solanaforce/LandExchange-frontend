import { MenuItemsType } from 'widgets/Menu'
import { DropdownMenuItems } from 'components/DropdownMenu'
import {
  EarnFillIcon,
  EarnIcon,
  TradeIcon
} from '../../Svg'

export type ConfigMenuDropDownItemsType = DropdownMenuItems & { hideSubNav?: boolean }
export type ConfigMenuItemsType = Omit<MenuItemsType, 'items'> & { hideSubNav?: boolean; image?: string } & {
  items?: ConfigMenuDropDownItemsType[]
}

const addMenuItemSupported = (item, chainId) => {
  if (!chainId || !item.supportChainIds) {
    return item
  }
  if (item.supportChainIds?.includes(chainId)) {
    return item
  }
  return {
    ...item,
    disabled: true,
  }
}

const config: (
  isDark: boolean,
  chainId?: number,
) => ConfigMenuItemsType[] = (isDark, chainId) =>
  [
    // {
    //   label: 'Trade',
    //   icon: TradeIcon,
    //   fillIcon: TradeIcon,
    //   href: '/swap',
    //   showItemsOnMobile: true,
    //   items: [
    //     {
    //       label: 'Swap',
    //       href: '/swap',
    //     },
    //     {
    //       label: 'Pool',
    //       href: '/pool',
    //     },
    //   ].map((item) => addMenuItemSupported(item, chainId)),
    // },
    // {
    //   label: 'Farms',
    //   href: '/earn',
    //   icon: EarnIcon,
    //   fillIcon: EarnFillIcon,
    //   image: '/images/decorations/pe2.png',
    //   showItemsOnMobile: false,
    //   items: [].map((item) => addMenuItemSupported(item, chainId)),
    // },
    // {
    //   label: 'Migrate',
    //   href: '/migrate',
    //   icon: EarnIcon,
    //   fillIcon: EarnFillIcon,
    //   image: '/images/decorations/pe2.png',
    //   showItemsOnMobile: false,
    //   items: [].map((item) => addMenuItemSupported(item, chainId)),
    // },
    // {
    //   label: 'Info',
    //   href: '/info',
    //   icon: EarnIcon,
    //   fillIcon: EarnIcon,
    //   image: '/images/decorations/pe2.png',
    //   items: [].map((item) => addMenuItemSupported(item, chainId)),
    // },
    // {
    //   label: 'Launchpad',
    //   href: 'https://pattiepad.com',
    //   icon: EarnIcon,
    //   fillIcon: EarnIcon,
    //   image: '/images/decorations/pe2.png',
    //   items: [].map((item) => addMenuItemSupported(item, chainId)),
    // },
    // {
    //   label: 'Presale',
    //   href: '/presale',
    //   items: [].map((item) => addMenuItemSupported(item, chainId)),
    // },
  ].map((item) => addMenuItemSupported(item, chainId))

export default config
