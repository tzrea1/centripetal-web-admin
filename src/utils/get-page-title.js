import defaultSettings from '@/settings'

const title = defaultSettings.title || '向心力后台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${title} - ${pageTitle}`
  }
  return `${title}`
}
