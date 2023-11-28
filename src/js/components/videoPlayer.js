import { furnitureContainer, sofa, videoContainer, videoOverlay } from "../utils/selectors.js";

export function initiateVideoPlaying() {
  videoOverlay.addEventListener("click", playVideo);
}

function playVideo() {
  videoContainer.classList.add("u-spaced", "u-scale", "u-shadow");
  furnitureContainer.classList.add("u-spaced", "u-scale");
  sofa.classList.add("u-scale");
  videoOverlay.style.display = "none";
}
