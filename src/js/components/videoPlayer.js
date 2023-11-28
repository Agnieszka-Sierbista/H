import { videoOverlay } from "../utils/selectors.js";

export function initiateVideoPlaying() {
  videoOverlay.addEventListener("click", playVideo);
}

function playVideo() {
  videoOverlay.style.display = "none";
  console.log("play!");
}
