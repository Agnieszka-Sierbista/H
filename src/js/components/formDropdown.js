import { activeButton, formDropdownButtons } from "../utils/selectors.js";
import { toggleFormDropdown } from "./formDropdownToggler.js";

export function initializeFormDropdown() {
  formDropdownButtons.forEach((button) => {
    button.addEventListener("click", handleOptionsClick);
  });
}

/**
 * @param {MouseEvent} e
 */
function handleOptionsClick(e) {
  e.preventDefault();
  activeButton.innerHTML = e.target.innerHTML;
  toggleFormDropdown(e);
}
