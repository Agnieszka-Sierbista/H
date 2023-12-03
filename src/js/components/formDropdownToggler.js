import { state } from "../utils/state.js";
import { activeButton, formDropdown } from "../utils/selectors.js";

export function initializeFormDropdownToggler() {
  activeButton.addEventListener("click", toggleFormDropdown);
}

export function toggleFormDropdown(e) {
  e.preventDefault();
  state.form.isDropdownExpanded = !state.form.isDropdownExpanded;

  activeButton.style.backgroundImage = state.form.isDropdownExpanded
    ? 'url("../assets/icons/less-grey.svg")'
    : 'url("../assets/icons/expand-grey.svg")';

  formDropdown.classList.toggle("u-hide");
}
