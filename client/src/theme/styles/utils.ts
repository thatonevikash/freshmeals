// -------------------------------------------------------------

export function setFont(fontFamily: string): string {
  return `${fontFamily} system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;`;
}

// -------------------------------------------------------------

export function pxToRem(value: number): string {
  return `${value / 16}rem`;
}
