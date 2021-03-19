import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    primaryColor: string, 
    linkColor: string, 
    successColor: string, 
    warningColor: string, 
    errorColor: string, 
    fontSizeBase: string, 
    headingColor: string, 
    textColor: string, 
    textColorLight: string,
    textColorSecondary: string, 
    textColorSecondaryLight: string,
    disabledColor: string, 
    borderRadiusBase: string, 
    borderColorBase: string, 
    boxShadowBase: string,
    boxShadowButton: string,
    boxShadowInput: string,
    fontFamily: string,
    baseBackgroundColor: string,
    componentBackgroundColor: string,
    modalBackgroundColor: string,
  }
}
