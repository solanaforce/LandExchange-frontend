import memoize from 'lodash/memoize'

export type PageMeta = {
  title: string
  description?: string
  image?: string
}

export const DEFAULT_META: PageMeta = {
  title: 'LandExchange',
  description: 'Trade, earn, and own crypto on the all-in-one LandExchange'
}

interface PathList {
  paths: { [path: string]: { title: string; basePath?: boolean; description?: string; image?: string } }
  defaultTitleSuffix: string
}

const getPathList = (): PathList => {
  return {
    paths: {
      '/': { title: 'Presale'},
      '/swap': { basePath: true, title: 'Swap' },
      '/add': { basePath: true, title: 'Add Pool' },
      '/add/[[...currency]]': { basePath: true, title: 'Add Pool' },
      '/remove': { basePath: true, title: 'Remove Pool' },
      '/remove/[[...currency]]': { basePath: true, title: 'Remove Pool' },
      '/pool': { title: 'Pool' },
      '/find': { title: 'Import Pool' },
      '/earn': { title: 'Earn' },
      '/migrate': { basePath: true, title: 'Migrate' },
      '/presale': { basePath: true, title: 'Presale'},
      '/info': {
        title: "Overview - Info",
        description: 'View statistics for LandExchange exchanges.'
      },
      '/info/pairs': {
        title: 'Pairs - Info',
        description: 'View statistics for LandExchange exchanges.'
      },
      '/info/pairs/[address]': {
        title: 'Pairs - Info',
        description: 'View statistics for LandExchange exchanges.'
      },
      '/info/tokens': {
        title: "Tokens - Info",
        description: 'View statistics for LandExchange exchanges.'
      },
      '/info/tokens/[address]': {
        title: "Tokens - Info",
        description: 'View statistics for LandExchange exchanges.'
      }
    },
    defaultTitleSuffix: 'LandExchange',
  }
}

export const getCustomMeta = memoize(
  (path: string): PageMeta | null => {
    const pathList = getPathList()
    const basePath = Object.entries(pathList.paths).find(([url, data]) => data.basePath && path.startsWith(url))?.[0]
    const pathMetadata = pathList.paths[path] ?? (basePath && pathList.paths[basePath])

    if (pathMetadata) {
      return {
        title: `${pathMetadata.title}`,
        ...(pathMetadata.description && { description: pathMetadata.description }),
        image: pathMetadata.image,
      }
    }
    return null
  },
  (path) => `${path}`,
)
