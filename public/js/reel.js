const hero = document.getElementById("hero");
const reelContainer = document.getElementById("reel-container");
const video = reelContainer.querySelector("#video");
const reelClose = reelContainer.querySelector("#reel-close");
const read = reelContainer.querySelector("#read");
const popup = document.getElementById('text-popup');

hero.addEventListener("click", () => {
  if (reelContainer.classList.contains("hidden")) {
    document.body.classList.add('overflow-hidden');
    reelContainer.classList.remove("hidden");
    setTimeout(() => {
      reelContainer.classList.add("opacity-100");
      reelContainer.classList.remove("opacity-0");
      video.currentTime = 0; // Restart video
      video.play();          // Play video
    }, 10); // Small delay to trigger transition
  } else {
    document.body.classList.remove('overflow-hidden');
    reelContainer.classList.remove("opacity-100");
    reelContainer.classList.add("opacity-0");
    setTimeout(() => {
      reelContainer.classList.add("hidden");
      video.pause();         // Pause video
      video.currentTime = 0; // Reset video to start
    }, 500); // Match transition-duration
  }
});

reelClose.addEventListener("click", () => {
    reelContainer.classList.add("hidden");
    document.body.classList.remove('overflow-hidden');
    video.pause();
})

read.addEventListener('click', () => {
    popup.classList.toggle('translate-y-0');
    popup.classList.toggle('translate-y-full');
});
