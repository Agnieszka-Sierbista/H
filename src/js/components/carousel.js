import { carousel, leftCarouselArrow, recommendedItems, rightCarouselArrow } from "../utils/selectors.js";
import { extraLargeDevicesBreakpoint } from "../utils/breakpoints.js";
import { state } from "../utils/state.js";

export function initializeCarousel() {
  setCarouselWidths();
  state.carousel.animateCarouselInterval = animateCarousel();

  recommendedItems.forEach((element) => {
    element.addEventListener("click", (event) => {
      if (state.carousel.shouldBlockClicks) {
        event.preventDefault();
        event.stopPropagation();
      }

      const recommendedItem = event.target.closest(".recommended__item");

      if (recommendedItem) {
        toggleAnimatingCarousel(event, state.carousel.animateCarouselInterval);
      }
    });
  });

  leftCarouselArrow.addEventListener("click", moveLeft);
  rightCarouselArrow.addEventListener("click", moveRight);
  extraLargeDevicesBreakpoint.addEventListener("change", clearTransform);
  window.addEventListener("resize", setCarouselWidths);
}

function animateCarousel() {
  return setInterval(() => {
    const firstItem = document.querySelector(".recommended__item");
    carousel.appendChild(firstItem);
  }, 2000);
}

/**
 * @param {Event} event
 * @param {Number} intervalID
 */
function toggleAnimatingCarousel(event, intervalID) {
  const currentItem = event.target.closest(".recommended__item");
  const items = Array.from(document.querySelectorAll(".recommended__item"));
  const shouldShowcaseItem = !currentItem.classList.contains("u-scale", "u-shadow");

  items.forEach((cardItem) => cardItem.classList.remove("u-scale", "u-shadow"));
  state.carousel.shouldBlockClicks = shouldShowcaseItem;
  clearInterval(intervalID);

  if (shouldShowcaseItem) {
    event.target.closest(".recommended__item").classList.add("u-scale", "u-shadow");
  } else {
    state.carousel.animateCarouselInterval = animateCarousel();
  }
}

function setCarouselWidths() {
  state.carousel.widths = Array.from(carousel.children).map(
    (carouselItem) => carouselItem.getBoundingClientRect().width,
  );
}

/**
 * @param {MediaQueryListEvent} event
 */
function clearTransform(event) {
  if (event.matches) {
    carousel.style.removeProperty("transform");
  }
}

function moveCarousel() {
  const distance = state.carousel.widths
    .filter((_, index) => index < state.carousel.currentItemIndex)
    .reduce((acc, width) => acc + width, 0);
  carousel.style.transform = `translateX(-${distance}px)`;
}

function moveRight() {
  if (state.carousel.currentItemIndex === 1) {
    state.carousel.currentItemIndex = state.carousel.currentItemIndex - 1;
  }
  moveCarousel();
}

function moveLeft() {
  if (state.carousel.currentItemIndex < state.carousel.widths.length - 2) {
    state.carousel.currentItemIndex = state.carousel.currentItemIndex + 1;
  }
  moveCarousel();
}
