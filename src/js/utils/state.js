export const state = {
  isMenuOpened: false,
  carousel: {
    widths: [],
    currentItemIndex: 0,
    animateCarouselInterval: null,
    shouldBlockClicks: false,
  },
  slider: {
    currentItemIndexSlider: 0,
    isMouseDown: false,
    startPosition: 0,
    mouseMoveDelta: 0,
    widthsSlider: [],
    canMoveRight: true,
  },
  grabbableSlider: {
    clientX: null,
    grabbing: false,
    prevDistanceScrolled: null,
    distanceToScroll: 0,
    scrollWidth: 0,
    offsetWidth: 0,
    maxDistance: null,
  },
};
