import { FormEvent, ReactElement,useState } from 'react';
import styled from '@emotion/styled';
import { colorMix } from '../../utils';

export interface ITextArea {
  label?: string,
  maxLength?: number,
  value?: string,
}

export const TextAreaContainer = styled.div`
  outline: none;
  .label{
    margin-bottom: 5px;
  }
  textarea {
    width: 100%;
    min-height: 150px;
    border-color: ${props => props.theme.borderColorBase};
    border-radius: ${props => props.theme.borderRadiusBase};
    font-family: ${props => props.theme.fontFamily};
    padding: 5px;
    font-size: ${props => props.theme.fontSizeBase};
    :focus {
      border: solid 1px ${props => props.theme.primaryColor};
      outline: none;
      box-shadow: ${props => `${props.theme.boxShadowInput} ${colorMix(props.theme.primaryColor,2)}`};
    }
    .block {
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
  }
  .text-count {
    font-size: 0.75rem;
    margin-right: -5px;
    float: right;
    color: ${props => props.theme.textColorSecondary};
  }
`;

export const TextArea = ({ label, maxLength,value,...rest }: ITextArea): ReactElement => {
  const [length,setLength] = useState(0);
  const handleInput = (e: FormEvent<HTMLTextAreaElement>) => {
    const { length } = e.currentTarget.value;
    setLength(length);
  };
  return (
    <TextAreaContainer>
      {
        label && <div className="label">{label}</div>
      }
      <textarea 
        onInput={handleInput}
        maxLength={maxLength}
        value={value}
        {...rest}
      />
      { maxLength && <span className="text-count">
        {`${value?.length ? value.length : length}/${maxLength}`}
      </span>}
    </TextAreaContainer>
  );};

