chrome.runtime.onInstalled.addListener(() => {
  // Save default comment
  chrome.storage.sync.set({ comment: ':angry: Approve merging these changes with eye roll or tut...' }, () => {
    console.log('Default comment saved in storage during installation.');
  });
});

chrome.webNavigation.onHistoryStateUpdated.addListener(details => {
  const { url, tabId } = details;
  
  chrome.tabs.sendMessage(tabId, { url }, function (response) {
    if (chrome.runtime.lastError) {
      console.log('no receiver yet');
    } else if (response) {
      console.log(response.farewell);
    }
  });
});
