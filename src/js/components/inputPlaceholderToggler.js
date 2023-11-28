import { smallDevicesBreakpoint, smallDeviceWidth } from "../utils/breakpoints.js";
import { input } from "../utils/selectors.js";

export function initializeInputPlaceholderToggler() {
  window.addEventListener("load", toggleInputPlaceholder);
  smallDevicesBreakpoint.addEventListener("change", placeholderListener);
}

function toggleInputPlaceholder() {
  input.placeholder =
    window.innerWidth >= smallDeviceWidth ? input.dataset.placeholderLong : input.dataset.placeholderShort;
}

/**
 * @param {MediaQueryListEvent} event
 */
function placeholderListener(event) {
  input.placeholder = event.matches ? input.dataset.placeholderShort : input.dataset.placeholderLong;
}
