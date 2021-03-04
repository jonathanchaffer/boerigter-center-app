export function getPinSize(numChildren: number, numOnScreen: number): number {
  // return 25 + Math.min((numChildren / numOnScreen) * 30, 125);
  return 25 + 50 * (numChildren / numOnScreen) ** 0.25;
}

/**
 * Returns the z-index to be used for a given map pin based on how many children it has.
 * Right now it just returns the parameter passed in, but this is extracted to a function
 * in case the behavior needs to be changed later.
 */
export function getPinZIndex(numChildren: number): number {
  return numChildren;
}

export function getPinOpacity(numChildren: number): number {
  return 1 - 0.33 * numChildren ** -1;
}
