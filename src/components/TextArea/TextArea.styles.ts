import { colorMix } from '@/utils';
import styled from '@emotion/styled';

export const TextAreaContainer = styled.div`
  outline: none;
`;

export const Label = styled.div`
margin-bottom: ${props => props.theme.spaces.mg1};
`;

export const Textarea = styled.textarea`
    width: 100%;
    min-height: 150px;
    border-color: ${props => props.theme.borderColorBase};
    border-radius: ${props => props.theme.borderRadiusBase};
    font-family: ${props => props.theme.fontFamily};
    padding: ${props => props.theme.spaces.pd1};
    font-size: ${props => props.theme.fontSizeBase};
    &:focus {
      border: solid 1px ${props => props.theme.primaryColor};
      outline: none;
      box-shadow: ${props => `${props.theme.boxShadowInput} ${colorMix(props.theme.primaryColor,2)}`};
    }
    & + .error-message {
      max-height: 0;
      opacity: 0;
      overflow: hidden;
      transition: max-height 0.3s ease-in;
      transition: opacity 0.3s ease-in;
    }
`;

export const TextCount = styled.span`
  font-size: 0.75rem;
    margin-right: -5px;
    float: right;
    color: ${props => props.theme.textColorSecondary};
`;
