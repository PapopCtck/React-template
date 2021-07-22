import { FormEvent, ReactElement,useState } from 'react';

import { ITextArea } from './TextArea.interfaces';
import { TextAreaContainer, Label, Textarea, TextCount } from './TextArea.styles';

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

