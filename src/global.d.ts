import '@emotion/react/macro';
import * as colors from './themes/colors';
import * as spaces from './themes/spaces';

declare module '@emotion/react/macro' {
  export interface Theme {
    colors: typeof colors,
    spaces: typeof spaces,
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
