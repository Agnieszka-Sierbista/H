import { testimonialsSlider } from "../utils/selectors.js";
import { state } from "../utils/state.js";
import { mediumDeviceWidth } from "../utils/constants.js";
import { mediumDeviceBreakpointGoingUp } from "../utils/breakpoints.js";

export function initializeGrabbableSlider() {
  if (window.innerWidth > mediumDeviceWidth) {
    startTestimonialsSlider();
  }

  window.addEventListener("resize", toggleTestimonialsSlider);
}

function toggleTestimonialsSlider() {
  if (!mediumDeviceBreakpointGoingUp.matches) {
    startTestimonialsSlider();
  } else {
    stopTestimonialsSlider();
  }
}

function startTestimonialsSlider() {
  getMaxDistance();
  testimonialsSlider.addEventListener("mousedown", handleMouseDown);
  testimonialsSlider.addEventListener("mouseup", handleMouseUp);
  testimonialsSlider.addEventListener("mousemove", handleMouseMove);
  testimonialsSlider.addEventListener("mouseout", handleMouseOut);
}

function stopTestimonialsSlider() {
  testimonialsSlider.removeEventListener("mousedown", handleMouseDown);
  testimonialsSlider.removeEventListener("mouseup", handleMouseUp);
  testimonialsSlider.removeEventListener("mousemove", handleMouseMove);
  testimonialsSlider.removeEventListener("mouseout", handleMouseOut);
}

function getMaxDistance() {
  state.grabbableSlider.maxDistance = testimonialsSlider.scrollWidth - testimonialsSlider.offsetWidth;
}

/**
 * @param {MouseEvent} e
 */
function handleMouseDown(e) {
  state.grabbableSlider.clientX = e.clientX;
  state.grabbableSlider.grabbing = true;
}

function handleMouseUp() {
  state.grabbableSlider.grabbing = false;
  state.grabbableSlider.prevDistanceScrolled += state.grabbableSlider.distanceToScroll;
}

function handleMouseOut() {
  state.grabbableSlider.grabbing = false;
}

/**
 * @param {MouseEvent} e
 */
function handleMouseMove(e) {
  if (state.grabbableSlider.grabbing) {
    state.grabbableSlider.distanceToScroll = e.clientX - state.grabbableSlider.clientX;
    let distance = state.grabbableSlider.distanceToScroll + state.grabbableSlider.prevDistanceScrolled;

    if (state.grabbableSlider.maxDistance <= Math.abs(distance) && distance < 0) {
      distance = -state.grabbableSlider.maxDistance;
    }

    if (distance > 0) {
      distance = 0;
    }

    testimonialsSlider.style.transform = `translateX(${distance}px)`;
  }
}
