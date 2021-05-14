import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { ButtonHTMLAttributes, ReactElement, ReactNode } from 'react';

export interface IStyledButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: 'primary' | 'secondary' | 'link' | 'warning' | 'danger',
  size?: 'small' | 'medium' | 'large',
  backgroundColor? : string,
  type?: 'button' | 'submit' | 'reset',
  block?: boolean,
}

export interface IButtonProps extends IStyledButtonProps {
  label?: string,
  children?: ReactNode,
  className?: string,
}

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
    padding: 10px 20px;
    font-size: 1rem;
    :focus{
      outline: none
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
        };
    } 

    if (props.size){
      switch (props.size){
        case 'small':
          result = {
            ...result,
            fontSize: '0.85rem',
            padding: '10px 16px',
          };
          break;
        case 'medium':
          result = {
            ...result,
            fontSize: '1rem',
            padding: '11px 20px',
          };
          break;
        case 'large':
          result = {
            ...result,
            fontSize: '1.15rem',
            padding: '12px 24px',
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

export const Button = ({ label, children ,...rest }: IButtonProps): ReactElement => <StyledButton {...rest}>{label ? label : children}</StyledButton>;
