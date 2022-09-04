const providerURLs = [
  'http://member.onstove.com/oauth/google',
  'https://member.onstove.com/oauth/google',
]

const normalTabDetectKey = '&lost_ark_sign_normal_tab=1'

chrome.tabs.onCreated.addListener(tab => {
  const isProviderSignTab = providerURLs.some(providerURL => tab.pendingUrl.indexOf(providerURL) === 0)
  const isNormalTab = tab.pendingUrl.includes(normalTabDetectKey)

  if (isProviderSignTab && !isNormalTab) {
    chrome.windows.create({
      incognito: false,
      url: tab.pendingUrl + normalTabDetectKey
    })

    chrome.tabs.remove(tab.id)
  }
})