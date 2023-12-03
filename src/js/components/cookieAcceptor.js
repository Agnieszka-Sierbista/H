import { cookie, cookieClose } from "../utils/selectors.js";
import { state } from "../utils/state.js";

export function initializeCookieAcceptor() {
  cookieClose.addEventListener("click", acceptCookie);
}

function acceptCookie() {
  state.isCookieAccepted = true;
  cookie.classList.toggle("u-hide");
}
