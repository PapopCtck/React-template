import { css } from '@emotion/react/macro';
import styled from '@emotion/styled/macro';
import { IStyledButtonProps } from './Button.interfaces';

export const StyledButton = styled('button')<IStyledButtonProps>(
  props => css`
    font-weight: ${props.theme.buttonFontWeight ?? '700'};
    border: 0;
    border-radius: ${props.theme.borderRadiusBase};
    transition: all .3s;
    cursor: pointer;
    display: ${props.block ? 'block' : 'inline-block'};
    width: ${props.block ? '100%' : 'unset'};
    line-height: 1;
    padding: ${props.theme.spaces.pd2} ${props.theme.spaces.pd5};
    font-size: 1rem;
    :focus {
      outline: none;
    };
    &:active {
      transform: translateY(2px);
    }
  `, props => {
    let result = {
    };
    switch (props.buttonType){
      case 'primary':
        result = {
          ...result,
          color: props.theme.textColorLight,
          background: props.theme.primaryColor,
          boxShadow: props.theme.boxShadowButton,
          '&:hover': {
            background: props.theme.primaryHoverColor,
          },
        };
        break;
      case 'secondary':
        result = {
          ...result,
          color: props.theme.textColor,
          background: 'transparent',
          boxShadow: props.theme.boxShadowButton,
          border: `1px solid ${props.theme.borderColorSecondary}`,
          '&:hover': {
            color: props.theme.primaryHoverColor,
            borderColor: props.theme.primaryHoverColor,
          },
        };
        break;
      case 'link':
        result = {
          ...result,
          color: props.theme.linkColor,
          background: 'transparent',
        };
        break;
      case 'warning':
        result = {
          ...result,
          color: props.theme.textColor,
          background: 'transparent',
          boxShadow: props.theme.boxShadowButton,
          border: `1px solid ${props.theme.borderColorBase}`,
          '&:hover': {
            color: props.theme.warningColor,
            border: `1px solid ${props.theme.warningColor}`,
          },
        };
        break;
      case 'danger':
        result = {
          ...result,
          color: props.theme.textColor,
          background: 'transparent',
          boxShadow: props.theme.boxShadowButton,
          border: `1px solid ${props.theme.borderColorBase}`,
          '&:hover': {
            color: props.theme.errorColor,
            border: `1px solid ${props.theme.errorColor}`,
          },
        };
        break;
      default:
        result = {
          ...result,
          color: props.theme.textColor,
          background: 'transparent',
          boxShadow: props.theme.boxShadowButton,
          border: `1px solid ${props.theme.borderColorSecondary}`,
          '&:hover': {
            color: props.theme.primaryHoverColor,
            borderColor: props.theme.primaryHoverColor,
          },
        };
    } 

    if (props.size){
      switch (props.size){
        case 'small':
          result = {
            ...result,
            fontSize: '0.85rem',
            padding: `${props.theme.spaces.pd3} ${props.theme.spaces.pd4}`,
          };
          break;
        case 'medium':
          result = {
            ...result,
            fontSize: '1rem',
            padding: `${props.theme.spaces.pd3} ${props.theme.spaces.pd5}`,
          };
          break;
        case 'large':
          result = {
            ...result,
            fontSize: '1.15rem',
            padding: `${props.theme.spaces.pd3} ${props.theme.spaces.pd5}`,
          };
          break;
        default:
          break;
      }
    }
    if (props.backgroundColor){
      result = {
        ...result,
        backgroundColor: props.backgroundColor,
      };
    }
    
    return result;
  },
);
