/* global chrome */

function normalizeUrl(url) {
  return url.replaceAll("https://", "").replaceAll("http://", "").split("/")[0];
}

// Function to update the badge when a page changes
function updateBadge(tabId, details) {
  chrome.storage.local.get("challenges", function (data) {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
      return;
    }
    const rawChallenges = data.challenges;
    const obj = rawChallenges ? JSON.parse(rawChallenges).challenges : null;
    if (!obj || !obj[details]) {
      chrome.action.setBadgeText({ text: "1", tabId: tabId });
      chrome.action.setBadgeBackgroundColor({
        color: [255, 0, 0, 255],
        tabId: tabId,
      });
    }
  });
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete") {
    updateBadge(tabId, normalizeUrl(tab.url));
  }
});
