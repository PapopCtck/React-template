import tinycolor from 'tinycolor2';

const hueStep = 2;
const saturationStep = 0.16;
const saturationStep2 = 0.05;
const brightnessStep1 = 0.05;
const brightnessStep2 = 0.15;
const lightColorCount = 5;
const darkColorCount = 4;

const getHue = (hsv: tinycolor.ColorFormats.HSVA, i: number, isLight: boolean) => {
  let hue: number;
  if (Math.round(hsv.h) >= 60 && Math.round(hsv.h) <= 240) {
    hue = isLight ? Math.round(hsv.h) - hueStep * i : Math.round(hsv.h) + hueStep * i;
  } else {
    hue = isLight ? Math.round(hsv.h) + hueStep * i : Math.round(hsv.h) - hueStep * i;
  }
  if (hue < 0) {
    hue += 360;
  } else if (hue >= 360) {
    hue -= 360;
  }
  return hue;
};
const getSaturation = (hsv: tinycolor.ColorFormats.HSVA, i: number, isLight: boolean) => {
  // grey color don't change saturation
  if (hsv.h === 0 && hsv.s === 0) {
    return hsv.s;
  }
  let saturation;
  if (isLight) {
    saturation = hsv.s - saturationStep * i;
  } else if (i === darkColorCount) {
    saturation = hsv.s + saturationStep;
  } else {
    saturation = hsv.s + saturationStep2 * i;
  }
  if (saturation > 1) {
    saturation = 1;
  }
  if (isLight && i === lightColorCount && saturation > 0.1) {
    saturation = 0.1;
  }
  if (saturation < 0.06) {
    saturation = 0.06;
  }
  return Number(saturation.toFixed(2));
};
const getValue = (hsv: tinycolor.ColorFormats.HSVA, i: number, isLight: boolean) => {
  let value;
  if (isLight) {
    value = hsv.v + brightnessStep1 * i;
  } else {
    value = hsv.v - brightnessStep2 * i;
  }
  if (value > 1) {
    value = 1;
  }
  return Number(value.toFixed(2));
};

export const colorMix = (color: string, index: number): string => {
  const isLight = index <= 6;
  const hsv = tinycolor(color).toHsv();
  const i = isLight ? lightColorCount + 1 - index : index - lightColorCount - 1;
  return tinycolor({
    h: getHue(hsv, i, isLight),
    s: getSaturation(hsv, i, isLight),
    v: getValue(hsv, i, isLight),
  }).toHexString();
};

export const setAlpha = (color: string, alpha: number): string => tinycolor(color).setAlpha(alpha).toRgbString();
