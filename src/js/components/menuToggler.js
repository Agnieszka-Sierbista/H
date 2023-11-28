import { mobileNavigationTogglerIcon, navigation, toggleButton } from "../utils/selectors.js";
import { state } from "../utils/state.js";

export function initializeMenuToggler() {
  toggleButton.addEventListener("click", toggleMenu);
}

function toggleMenu() {
  state.isMenuOpened = !state.isMenuOpened;
  navigation.classList.toggle("u-hide");

  mobileNavigationTogglerIcon.src = `assets/icons/${state.isMenuOpened ? "arrow-r" : "hamburger"}.svg`;
}
