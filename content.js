// Listen for changes in the tab visibility
document.addEventListener("visibilitychange", () => {
  const video = document.querySelector("video");
  console.log("Visibility changed:", document.hidden);

  // Tab is hidden and the video is playing, pause it
  if (document.hidden && video && !video.paused) {
    video.pause();
  }

  // Tab is visible and the video is paused, play it
  if (!document.hidden && video && video.paused) {
    video.play();
  }
});
