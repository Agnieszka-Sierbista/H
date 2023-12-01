import { largeDeviceWidth, mediumDeviceWidth, smallDeviceWidth, xLargeDeviceWidth } from "./constants.js";

export const smallDevicesBreakpoint = window.matchMedia(`(max-width: ${smallDeviceWidth}px)`);
export const largeDevicesBreakpointGoingUp = window.matchMedia(`(min-width: ${largeDeviceWidth}px)`);
export const largeDevicesBreakpointGoingDown = window.matchMedia(`(max-width: ${largeDeviceWidth}px)`);
export const mediumDeviceBreakpointGoingUp = window.matchMedia(`(min-width: ${mediumDeviceWidth}px)`);
export const mediumDeviceBreakpointGoingDown = window.matchMedia(`(max-width: ${mediumDeviceWidth}px)`);
export const extraLargeDevicesBreakpoint = window.matchMedia(`(max-width: ${xLargeDeviceWidth}px)`);
