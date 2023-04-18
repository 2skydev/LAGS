const normalTabDetectKey = '&lost_ark_sign_normal_tab=1'

const processUrl = (url, tabId) => {
  if (!url) return
  if (url.indexOf('https://accounts.google.com') !== 0) return
  if (!url.includes('onstove.com')) return
  if (url.includes(normalTabDetectKey)) return

  chrome.windows.create({
    incognito: false,
    url: url + normalTabDetectKey
  })

  chrome.tabs.remove(tabId)
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status !== 'loading') return
  processUrl(changeInfo.url, tab.id)
})

chrome.tabs.onCreated.addListener((tab) => {
  processUrl(tab.pendingUrl || '', tab.id)
})
