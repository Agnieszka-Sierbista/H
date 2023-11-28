import { chevron, dropdownBtn, dropdownContent } from "../utils/selectors.js";

export function initializeDropdownToggler() {
  dropdownBtn.addEventListener("click", toggleDropdown);
}

function toggleDropdown() {
  dropdownContent.classList.toggle("u-hide");
  chevron.classList.toggle("u-turn-over");
}
