chrome.runtime.onInstalled.addListener(() => {
  // Save default comment
  chrome.storage.sync.set({ comment: ':angry: Approve merging these changes with eye roll or tut...' }, () => {
    console.log('Default comment saved in storage during installation.');
  });
});
