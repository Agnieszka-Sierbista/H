import { smallDevicesBreakpoint } from "../utils/breakpoints.js";
import { mobileNavigationTogglerIcon, navigation } from "../utils/selectors.js";
import { state } from "../utils/state.js";

export function initializeMobileMenuHider() {
  window.addEventListener("load", hideMobileNavigation);
  smallDevicesBreakpoint.addEventListener("change", navigationListener);
}

function hideMobileNavigation() {
  if (window.innerWidth >= 768) {
    navigation.classList.remove("u-hide");
    mobileNavigationTogglerIcon.src = "assets/icons/hamburger.svg";
  }
}

/**
 * @param {MediaQueryListEvent} event
 */
function navigationListener(event) {
  if (event.matches) {
    navigation.classList.add("u-hide");
    mobileNavigationTogglerIcon.src = "assets/icons/hamburger.svg";
    state.isMenuOpened = false;
  } else {
    navigation.classList.remove("u-hide");
  }
}
