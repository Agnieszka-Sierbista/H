import { mediumDeviceWidth } from "../utils/constants.js";
import { maxiContainer, miniContainer, switchButton } from "../utils/selectors.js";
import { mediumDeviceBreakpointGoingDown } from "../utils/breakpoints.js";

export function initializeArticleReader() {
  mediumDeviceBreakpointGoingDown.addEventListener("change", handleOnResizeListeners);
  handleInitialListeners();
}

/**
 * @param {MediaQueryListEvent} event
 */
function handleOnResizeListeners(event) {
  if (event.matches) {
    stopSwitch();
    initializeAccordion();
  } else {
    stopAccordion();
    initializeSwitch();
  }
}

function handleInitialListeners() {
  if (window.innerWidth < mediumDeviceWidth) {
    initializeAccordion();
  } else {
    initializeSwitch();
  }
}

function initializeSwitch() {
  resetAllItems();
  switchButton.classList.remove("u-hide");
  switchButton.addEventListener("click", handleSwitching);
}

function stopSwitch() {
  switchButton.classList.add("u-hide");
  switchButton.removeEventListener("click", handleSwitching);
}

function handleSwitching() {
  const onlyChild = document.querySelector(".find-more__maxi-item");
  const firstChild = document.querySelector(".find-more__mini-item");

  const copyOnlyChild = onlyChild.cloneNode(true);
  const copyFirstChild = firstChild.cloneNode(true);

  replaceMiniWithMaxi(copyFirstChild);
  copyFirstChild.classList.remove("find-more__mini-item");
  copyFirstChild.classList.add("find-more__maxi-item");
  if (maxiContainer.hasChildNodes()) {
    maxiContainer.removeChild(maxiContainer.children[0]);
  }
  maxiContainer.appendChild(copyFirstChild);

  replaceMaxiWithMini(copyOnlyChild);
  copyOnlyChild.classList.remove("find-more__maxi-item");
  copyOnlyChild.classList.add("find-more__mini-item");
  if (miniContainer.hasChildNodes()) {
    miniContainer.removeChild(miniContainer.children[0]);
  }
  miniContainer.appendChild(copyOnlyChild);
}

function initializeAccordion() {
  const miniArticles = document.querySelectorAll(".find-more__mini-item");
  const maxiArticles = document.querySelectorAll(".find-more__maxi-item");
  miniArticles.forEach((miniItem) => miniItem.addEventListener("click", handleAccordionClick));
  maxiArticles.forEach((maxiItem) => maxiItem.addEventListener("click", handleAccordionClick));
}

function stopAccordion() {
  const miniArticles = document.querySelectorAll(".find-more__mini-item");
  const maxiArticles = document.querySelectorAll(".find-more__maxi-item");

  miniArticles.forEach((miniItem) => miniItem.removeEventListener("click", handleAccordionClick));
  maxiArticles.forEach((maxiItem) => maxiItem.removeEventListener("click", handleAccordionClick));
}

/**
 * @param {MouseEvent} e
 */
function handleAccordionClick(e) {
  const miniItem = e.target.closest(".find-more__mini-item");
  const maxiItem = e.target.closest(".find-more__maxi-item");

  if (miniItem) {
    replaceMiniWithMaxi(miniItem);
    miniItem.classList.add("find-more__maxi-item");
    miniItem.classList.remove("find-more__mini-item");
  } else if (maxiItem) {
    replaceMaxiWithMini(maxiItem);
    maxiItem.classList.add("find-more__mini-item");
    maxiItem.classList.remove("find-more__maxi-item");
  }
}

/**
 * @param {HTMLElement} maxiItem
 */
function replaceMaxiWithMini(maxiItem) {
  const originalContent = maxiItem.innerHTML;
  const modifiedContent = originalContent.replace(/maxi/g, "mini");
  maxiItem.innerHTML = modifiedContent;
}

/**
 * @param {HTMLElement} miniItem
 */
function replaceMiniWithMaxi(miniItem) {
  const originalContent = miniItem.innerHTML;
  const modifiedContent = originalContent.replace(/mini/g, "maxi");
  miniItem.innerHTML = modifiedContent;
}

function resetAllItems() {
  Array.from(miniContainer.children).forEach((miniChild) => {
    replaceMaxiWithMini(miniChild);
    miniChild.classList.add("find-more__mini-item");
    miniChild.classList.remove("find-more__maxi-item");
  });

  Array.from(maxiContainer.children).forEach((maxiChild) => {
    replaceMiniWithMaxi(maxiChild);
    maxiChild.classList.add("find-more__maxi-item");
    maxiChild.classList.remove("find-more__mini-item");
  });
}
