import { MouseEventHandler, ReactElement, ReactNode } from 'react';
import styled from '@emotion/styled';
import { colorMix } from '../../utils';

export interface IStyledCheckbox {
  borderColor?: string
}

export interface ICheckbox {
  label?: ReactNode, 
  checked?: boolean, 
  className?: string,
  containerClassname?: string, 
  checkmarkColor?: string, 
  borderColor?: string,
  onClick?: MouseEventHandler,
  type?: 'circle' | 'box',
  id?: string,
  readOnly?: boolean,
}

export const StyledCheckboxContainer = styled.div<IStyledCheckbox>`
  display: block;
  position: relative;
  padding-left: 30px;
  margin-bottom: 12px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
    &:checked {
      & ~ .checkmark {
        border-style: solid;
        border-width: 2px;
        border-color: ${props => props.borderColor ?? '#2C2C2C'};
        display: flex;
        justify-content: center;
        align-items: center;
        svg {
          display: block;
          position: relative;
          margin-top: -2px;
        }
      }
    }
  }
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    border: 2px solid ${props => props.theme.borderColorBase};
    svg {
      display: none;
    }
  }
  &:active{
    background: transparent;
  }
  &:hover {
    background: transparent;
  }
`;

export const StyledBoxCheckboxContainer = styled.div`
  position: relative;
    label {
      margin-left: 25px;
      color: ${props => props.theme.textColor};
      display: inline-block;
    }
    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
    }
    input:checked {
      ~ .checkmark {
        background-color: ${props => props.theme.primaryColor};
        border: 1px solid ${props => props.theme.primaryColor};
      }
      ~ .checkmark:after {
        display: block;
      }
    }
    input:focus, input:active{
      ~ .checkmark{
        box-shadow: ${props => `${props.theme.boxShadowInput} ${colorMix(props.theme.primaryColor,2)}`}
      }
    }
    .checkmark {
      position: absolute;
      left: 0;
      height: 15px;
      width: 15px;
      background-color: #fff;
      border: 1px solid ${props => props.theme.borderColorBase};
      border-radius: 3px;
      cursor: pointer;
      transition: .3s all;
    }
    .checkmark:after {
      content: "";
      position: absolute;
      display: none;
      left: calc(50% - 3.5px);
      top: calc(50% - 7px);
      width: 5px;
      height: 8px;
      border: solid #fff;
      border-width: 0 2px 2px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }
`;

export const Checkbox = ({ label, checked = false, className,containerClassname, checkmarkColor = '#2C2C2C', borderColor = '#2C2C2C', onClick, type = 'circle',id, ...rest }: ICheckbox): ReactElement => {
  if (type === 'circle'){
    return <StyledCheckboxContainer className={containerClassname} borderColor={borderColor}>
      <label onClick={onClick}>
        {label}
      </label>
      <input className={className} type="checkbox" id={id} checked={checked} onClick={onClick} {...rest} />
      <span className="checkmark" onClick={onClick}>
        <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.85273 1.09275C10.2524 0.69304 10.9005 0.69304 11.3002 1.09275C11.6999 1.49247 11.6999 2.14053 11.3002 2.54024L5.15904 8.68142C4.75933 9.08113 4.11126 9.08113 3.71155 8.68142L0.299785 5.26965C-0.0999283 4.86994 -0.0999283 4.22188 0.299785 3.82217C0.699498 3.42245 1.34756 3.42245 1.74727 3.82217L4.43529 6.51019L9.85273 1.09275Z" fill={checkmarkColor}/>
        </svg>
      </span>
    </StyledCheckboxContainer>;
  } else {
    return (
      <StyledBoxCheckboxContainer>
        <label onClick={onClick}>
          {label}
        </label>
        <input className={className} type="checkbox" id={id} checked={checked} onClick={onClick} {...rest} />
        <span className="checkmark" onClick={onClick} />
      </StyledBoxCheckboxContainer>
    );
  }
};
