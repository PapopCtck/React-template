import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { ReactElement, ReactNode } from 'react';

export interface IStyledButtonProps {
  buttonType?: 'primary' | 'secondary' | 'link',
  size?: 'small' | 'medium' | 'large',
  backgroundColor? : string,
  onClick?: () => void,
  type?: 'button' | 'submit' | 'reset',
}

export interface IButtonProps extends IStyledButtonProps {
  label?: string,
  children?: ReactNode,
  className?: 'string',
}

export const StyledButton = styled('button')<IStyledButtonProps>(
  css`
    font-weight: 700;
    border: 0;
    border-radius: 3em;
    transition: all .3s;
    cursor: pointer;
    display: inline-block;
    line-height: 1;
    padding: 11px 20px;
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
          backgroundColor: props.theme.primaryColor,
        };
        break;
      case 'secondary':
        result = {
          ...result,
          color: props.theme.textColor,
          backgroundColor: 'transparent',
          boxShadow: props.theme.boxShadowButton,
        };
        break;
      case 'link':
        result = {
          ...result,
          color: props.theme.linkColor,
          backgroundColor: 'transparent',
        };
        break;
      default:
        result = {
          ...result,
          color: props.theme.textColor,
          backgroundColor: 'transparent',
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
