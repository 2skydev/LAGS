const normalTabDetectKey = '&lost_ark_sign_normal_tab=1'

chrome.tabs.onCreated.addListener(tab => {
  const url = tab.pendingUrl || '';

  if (!url) return;
  if (url.indexOf('https://accounts.google.com') !== 0) return;
  if (!url.includes('onstove.com')) return;
  if (url.includes(normalTabDetectKey)) return;

  chrome.windows.create({
    incognito: false,
    url: tab.pendingUrl + normalTabDetectKey
  })

  chrome.tabs.remove(tab.id)
})