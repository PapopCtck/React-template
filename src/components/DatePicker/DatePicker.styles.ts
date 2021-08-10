import { colorMix } from '@/utils';
import { css } from '@emotion/react/macro';
import styled from '@emotion/styled/macro';
import { IStyledDatePickerContainer } from './DatePicker.interfaces';

export const StyledDatePickerContainer = styled('div')<IStyledDatePickerContainer>(
  props => css`
  .label{
    margin-bottom: ${props.theme.spaces.mg1};
  }
  input {
    padding: ${props.theme.spaces.pd3};
    border: 1px solid ${props.theme.borderColorBase};
    border-radius: ${props.theme.borderRadiusBase};
    outline: none;
    transition: all .3s;
    :focus {
        border: 1px solid ${props.theme.primaryColor};
        box-shadow: ${`${props.theme.boxShadowInput} ${colorMix(props.theme.primaryColor, 2)}`}
    }
    & + .error-message {
        max-height: 0;
        opacity: 0;
        overflow: hidden;
        transition: max-height 0.3s ease-in;
        transition: opacity 0.3s ease-in;
    }
  }
  .react-datepicker__day--selected{
    background-color: ${props.theme.primaryColor};
    color: ${props.theme.textColorLight};
    border-radius: 50%;
  }
`,props => props.block && (
    css`
    input{
      display: block;
        width: 100%;
        box-sizing: border-box;
    }
    .react-datepicker-wrapper {
    display: block;
  }
  `
  ));


export const StyledLegacyDatePickerContainer = styled.div`
display: grid;
grid-template-columns: auto auto auto;
grid-column-gap: 10px;
`;

export const InlinePicker = styled.div`
position: relative;
display: inline-flex;
`;

export const LDSelect = styled.select`
    outline: none;
    padding: 0;
    border: none;
    border-bottom: 1px solid ${props => colorMix(props.theme.borderColorBase,9)};
    width: 100%;
    -moz-appearance: none;
    -webkit-appearance: none;
    &.placeholder{
      color: ${props => props.theme.textColorSecondary};
      border-bottom: 1px solid ${props => colorMix(props.theme.borderColorBase,4)};
    }
`;

export const StyledLegacyTimePickerContainer = styled.div`
  display: grid;
  grid-template-columns: auto 10px auto;
  grid-column-gap: 5px;
`;

export const LTTInlinePicker = styled(InlinePicker)`
 align-items: center;
 justify-content: center;
`;

export const LTSelect = styled.select`
      outline: none;
      padding: 0;
      border: none;
      width: 100%;
      -moz-appearance: none;
      -webkit-appearance: none;
      text-align: center;
      text-align-last: center;
      border: 1px solid ${props => colorMix(props.theme.borderColorBase,9)};
      padding: ${props => `${props.theme.spaces.pd2} ${props.theme.spaces.pd3}`};
      border-radius: ${props => props.theme.borderRadiusBase};
      transition: .3s all;
      background: ${props => props.theme.componentBackgroundColor};
      &:focus {
        border-color: ${props => props.theme.linkColor};
      }
    &.placeholder{
          color: ${props => props.theme.textColorSecondary};
          border: 1px solid ${props => colorMix(props.theme.borderColorBase,4)};
    }
`;
