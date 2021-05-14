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
`;

const Label = styled.div`
margin-bottom: 5px;
`;

const Textarea = styled.textarea`
    width: 100%;
    min-height: 150px;
    border-color: ${props => props.theme.borderColorBase};
    border-radius: ${props => props.theme.borderRadiusBase};
    font-family: ${props => props.theme.fontFamily};
    padding: 5px;
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

const TextCount = styled.span`
  font-size: 0.75rem;
    margin-right: -5px;
    float: right;
    color: ${props => props.theme.textColorSecondary};
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
        label && <Label>{label}</Label>
      }
      <Textarea 
        onInput={handleInput}
        maxLength={maxLength}
        value={value}
        {...rest}
      />
      { maxLength && <TextCount>
        {`${value?.length ? value.length : length}/${maxLength}`}
      </TextCount>}
    </TextAreaContainer>
  );};

