// Listen when the user switches tabs
chrome.tabs.onActivated.addListener((activeInfo) => {
  handleTabChange();
});

// Listen when the user switches to another application
chrome.windows.onFocusChanged.addListener((windowId) => {
  // If the window ID is -1, the user switched to another app
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    pauseYouTubeVideoInCurrentTab();
  }
});

function handleTabChange() {
  // Check the current active tab
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    console.log(tabs);
    const currentTab = tabs[0];
    console.log(currentTab);

    // If the current tab is not a YouTube video, pause any active video
    if (!currentTab.url.includes("youtube.com/watch")) {
      pauseYouTubeVideoInCurrentTab();
    }
  });
}

function pauseYouTubeVideoInCurrentTab() {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    const activeTab = tabs[0];

    // Check if the current active tab is a YouTube video page
    if (activeTab && activeTab.url.includes("youtube.com/watch")) {
      // Pause the video
      chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        function: pauseVideo,
      });
    }
  });
}

// Pause the YouTube video, executed in the content of the page
function pauseVideo() {
  const video = document.querySelector("video");
  if (video && !video.paused) {
    video.pause();
  }
}
