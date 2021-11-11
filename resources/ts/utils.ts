export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const rgb = hex.match(/.{1,2}/g) || [];
  return {
    r: parseInt(rgb[0], 16),
    g: parseInt(rgb[1], 16),
    b: parseInt(rgb[2], 16),
  };
}

export function hexToHsl(hex: string): { h: number; s: number; l: number } {
  let { r, g, b } = hexToRgb(hex);
  (r /= 255), (g /= 255), (b /= 255);
  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  let h,
    s,
    l = (min + max) / 2;
  if (max === min) h = s = 0;
  else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h /= 6;
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export function getDarkerColor(hex: string, multiplier: number) {
  const { h, s, l } = hexToHsl(hex);
  return `hsl(${h}deg, ${s}%, ${l * multiplier}%)`;
}

export function getTextColor(bgColor: string): string {
  const color = hexToRgb(bgColor);
  const luminance = (0.299 * color.r + 0.587 * color.g + 0.114 * color.b) / 255;

  return luminance > 0.5 ? 'black' : 'white';
}
