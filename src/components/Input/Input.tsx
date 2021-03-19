import { ChangeEvent, ChangeEventHandler, ReactElement, ReactNode, useState } from 'react';
import styled from '@emotion/styled';

import { colorMix } from '../../utils';

export interface IInput {
  onChange?: ChangeEventHandler,
  value?: string | number | readonly string[],
  type?: string,
}

export interface IInputWithLength {
  label?: string,
  className?: string,
  block?: boolean, 
  suffix?: ReactNode, 
  maxLength?: number, 
  errorMessage?: string, 
  value?: string | readonly string[],
  customValidate?: boolean,
  customValidateMessage?: string,
  required?: boolean,
}

export const Input = styled.input`
  padding: 10px;
  border: 1px solid ${props => props.theme.borderColorBase};
  border-radius: ${props => props.theme.borderRadiusBase};
  outline: none;
  transition: all .3s;
  :focus {
    border-color: ${props => props.theme.primaryColor};
    box-shadow: ${props => `${props.theme.boxShadowInput} ${colorMix(props.theme.primaryColor,2)}`};
  }
  &.block {
      display: block;
      margin: 10px 0;
      width: 100%;
      box-sizing: border-box;
    }
    & + .error-message {
      max-height: 0;
      opacity: 0;
      overflow: hidden;
      transition: max-height 0.3s ease-in;
      transition: opacity 0.3s ease-in;
  }
`;

const InputContainer = styled.div`
  margin: 10px 0;
  .label{
    margin-bottom: 5px;
  }
 .suffix-icon {
    position: relative;
    float: right;
    top: -45px;
    right: 10px;
    &.disabled {
      color: ${props => props.theme.disabledColor};
    }
  }
  .text-count {
    font-size: 12px;
    margin-right: -5px;
    float: right;
    color: ${props => props.theme.textColorSecondary};
  }
`;

export const InputWithLength = ({ 
  label,
  className,
  block, suffix, 
  maxLength, errorMessage, value,
  customValidate,customValidateMessage, ...rest }: IInputWithLength): ReactElement => {
  const [length,setLength] = useState(0);
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { length } = e.target.value;
    setLength(length);
  };
  return (
    <InputContainer>
      {
        label && <div className="label">{label}</div>
      }
      <Input 
        className={`${className} ${block ? 'block' : ''} ${customValidate ? 'showcustom' : ''}`}
        onInput={handleInput}
        value={value}
        maxLength={maxLength}
        {...rest}
      />
      {
        errorMessage && <div className="error-message">{customValidate ? customValidateMessage : errorMessage}</div>
      }
      {
        suffix && <span className="suffix-icon">
          {suffix}
        </span>
      }
      { maxLength && <span className="text-count">
        {`${value?.length ? value.length : length}/${maxLength}`}
      </span>}
    
    </InputContainer>
  );};
