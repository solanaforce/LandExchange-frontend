import { DropdownMenuItemType, MenuItemsType } from 'widgets/Menu'
import { DropdownMenuItems } from 'components/DropdownMenu'
import {
  MoreIcon
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
  chainId?: number,
) => ConfigMenuItemsType[] = (chainId) =>
  [
    {
      label: '',
      icon: MoreIcon,
      fillIcon: MoreIcon,
      href: '',
      showItemsOnMobile: true,
      items: [
        {
          label: 'Swap',
          href: '/swap',
        },
        {
          label: 'Pool',
          href: '/pool',
        },
        {
          label: 'Migrate',
          href: '/migrate',
        },
        {
          label: 'Farms',
          href: '/earn',
        },
        {
          label: 'Info',
          href: '/info',
        },
        {
          label: 'Launchpad',
          href: 'https://pattiepad.com/',
        },
        {
          label: 'Twitter',
          href: 'https://x.com',
          type: DropdownMenuItemType.EXTERNAL_LINK
        },
        {
          label: 'Telegram',
          href: 'https://t.me',
          type: DropdownMenuItemType.EXTERNAL_LINK
        },
        {
          label: 'Reddit',
          href: 'https://reddit.com/',
          type: DropdownMenuItemType.EXTERNAL_LINK
        },
        {
          label: 'Docs',
          href: 'https://pattie-pattiepad-organization.gitbook.io/',
          type: DropdownMenuItemType.EXTERNAL_LINK
        },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
  ].map((item) => addMenuItemSupported(item, chainId))

export default config
