import * as colors from './colors';
import { setAlpha } from '../utils';

export default {
  colors: colors,
  primaryColor: colors.blue6, // primary color for all components
  primaryHoverColor: colors.blue7, // if element with primary color is hoverable
  linkColor: colors.blue6, // link color
  successColor: colors.green6, // success state color
  warningColor: colors.gold6, // warning state color
  errorColor: colors.red6, // error state color
  fontSizeBase: '14px', // major text font size
  buttonFontWeight: '400', //font weight for all button
  headingColor: setAlpha(colors.black,0.85), // heading text color
  textColor: setAlpha(colors.black,0.65), // major text color
  textColorLight: '#fff', //text color for colored background
  textColorSecondary: setAlpha(colors.black,0.45), // secondary text color
  textColorSecondaryLight: setAlpha(colors.white,0.85), // secondary text color for colored background
  textColorTertiary: colors.grey6, // tertiary text color
  textColorTertiaryLight: setAlpha(colors.white,0.45), // tertiary text color
  disabledColor: setAlpha(colors.black,0.25), // disable state color
  borderRadiusBase: '4px', // major border radius
  borderColorBase: colors.white6, // major border color
  borderColorSecondary: colors.white4, //secondary border color
  boxShadowBase: '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08),0 9px 28px 8px rgba(0, 0, 0, 0.05)', // major shadow for layers
  boxShadowSecondary: '0px 2px 4px rgba(0, 0, 0, 0.05)', // shadow for some layers
  boxShadowButton: 'rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset', //boxshadow for all buttons
  boxShadowInput: '0 0 0 2px',// glow around input on focus
  fontFamily: 'Nunito Sans,Helvetica Neue, Helvetica, Arial, sans-serif',//global font
  baseBackgroundColor: colors.white2, //bg color
  componentBackgroundColor: colors.white, //bg color for all component
  modalBackgroundColor: setAlpha(colors.black,0.45), //bg color for modal backdrop
  contentMaxWidth: '1366px', // max width for middle content
};

