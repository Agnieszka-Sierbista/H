import { slider, sliderLeftArrow, sliderRightArrow } from "../utils/selectors.js";
import { extraLargeDevicesBreakpoint } from "../utils/breakpoints.js";
import { state } from "../utils/state.js";
import { LEFT_MOUSE_BUTTON_CODE } from "../utils/constants.js";

export function initializeSlider() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          handleLastChildVisible();
        }
      });
    },
    { threshold: 1.0 },
  );

  const lastChild = slider.children[slider.children.length - 1];

  observer.observe(lastChild);
  setSliderWidths();

  sliderLeftArrow.addEventListener("click", moveLeftSlider);
  sliderRightArrow.addEventListener("click", moveRightSlider);
  extraLargeDevicesBreakpoint.addEventListener("change", clearTransformSlider);

  slider.addEventListener("mousedown", handleMouseDown);
  slider.addEventListener("mousemove", handleMouseMove);
  slider.addEventListener("mouseup", handleMouseUp);
}

/**
 * @param {MediaQueryListEvent} event
 */
function clearTransformSlider(event) {
  if (event.matches) {
    slider.style.removeProperty("transform");
  }
}

function moveSlider() {
  const distance = state.slider.widthsSlider
    .filter((_, index) => index < state.slider.currentItemIndexSlider)
    .reduce((acc, width) => acc + width, 0);
  slider.style.transform = `translateX(-${distance}px)`;
}

function moveLeftSlider() {
  if (state.slider.currentItemIndexSlider > 0) {
    state.slider.currentItemIndexSlider = state.slider.currentItemIndexSlider - 1;
  }

  moveSlider();
  state.slider.canMoveRight = true;
}

function moveRightSlider() {
  if (state.slider.currentItemIndexSlider < state.slider.widthsSlider.length - 1 && state.slider.canMoveRight) {
    state.slider.currentItemIndexSlider = state.slider.currentItemIndexSlider + 1;
  }
  moveSlider();
}

/**
 * @param {MouseEvent} event
 */
function handleMouseDown(event) {
  if (event.button === LEFT_MOUSE_BUTTON_CODE) {
    state.slider.isMouseDown = true;
    state.slider.startPosition = event.clientX;
    state.slider.mouseMoveDelta = 0;
    if (state.slider.isMouseDown) {
      slider.classList.remove("u-grab");
      slider.classList.add("u-grabbing");
    }
  }
}

/**
 * @param {MouseEvent} event
 */
function handleMouseMove(event) {
  if (state.slider.isMouseDown) {
    const deltaX = event.clientX - state.slider.startPosition;
    state.slider.mouseMoveDelta = deltaX;
  }
}

function handleMouseUp() {
  state.slider.isMouseDown = false;

  if (!state.slider.isMouseDown) {
    slider.classList.add("u-grab");
    slider.classList.remove("u-grabbing");
  }

  if (state.slider.mouseMoveDelta > 0) {
    moveLeftSlider();
  } else if (state.slider.mouseMoveDelta < 0 && state.slider.canMoveRight) {
    moveRightSlider();
  }
}

function handleLastChildVisible() {
  state.slider.canMoveRight = false;
}

function setSliderWidths() {
  state.slider.widthsSlider = Array.from(slider.children).map(
    (sliderChild) => sliderChild.getBoundingClientRect().width,
  );
}
