import '@emotion/react';
import * as colors from './themes/colors';

declare module '@emotion/react' {
  export interface Theme {
    colors: typeof colors,
    primaryColor: string,
    primaryHoverColor: string,
    linkColor: string,
    successColor: string,
    warningColor: string,
    errorColor: string,
    fontSizeBase: string,
    buttonFontWeight: string,
    headingColor: string,
    textColor: string,
    textColorLight: string,
    textColorSecondary: string,
    textColorSecondaryLight: string,
    textColorTertiary: string,
    textColorTertiaryLight,
    disabledColor: string,
    borderRadiusBase: string,
    borderColorBase: string,
    borderColorSecondary: string,
    boxShadowBase: string,
    boxShadowSecondary: string,
    boxShadowButton: string,
    boxShadowInput: string,
    fontFamily: string,
    baseBackgroundColor: string,
    componentBackgroundColor: string,
    modalBackgroundColor: string,
    contentMaxWidth: string,
  }
}
