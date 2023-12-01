import { initializeCarousel } from "./components/carousel.js";
import { initializeDropdownToggler } from "./components/dropdownToggler.js";
import { initializeInputPlaceholderToggler } from "./components/inputPlaceholderToggler.js";
import { initializeMenuToggler } from "./components/menuToggler.js";
import { initializeMobileMenuHider } from "./components/mobileMenuHider.js";
import { initializeSlider } from "./components/slider.js";
import { initiateVideoPlaying } from "./components/videoPlayer.js";
import { initializeGrabbableSlider } from "./components/grabbableSlider.js";
import { initializeArticleReader } from "./components/articleReader.js";

function initialize() {
  initializeCarousel();
  initializeDropdownToggler();
  initializeInputPlaceholderToggler();
  initializeMenuToggler();
  initializeMobileMenuHider();
  initializeSlider();
  initializeSlider();
  initiateVideoPlaying();
  initializeGrabbableSlider();
  initializeArticleReader();
}

initialize();
