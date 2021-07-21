import { ChangeEvent, forwardRef, ReactElement, Ref, useState } from 'react';

import { IInputWithLength } from './Input.interfaces';
import { InputContainer, Label, CountWrapper, InputWrapper, PrefixIcon, ErrorMessage, SuffixIcon, TextCount, Input } from './Input.styles';

export const InputWithLength = forwardRef(({
  label,
  className,
  block, suffix, prefix,
  maxLength, errorMessage, value,
  customValidate, customValidateMessage,required, ...rest }: IInputWithLength, ref: Ref<HTMLInputElement>): ReactElement => {
  const [length, setLength] = useState(0);
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { length } = e.target.value;
    setLength(length);
  };

  return (
    <InputContainer>
      {
        label && <Label>{label}</Label>
      }
      <CountWrapper>
        <InputWrapper>
          {
            prefix && <PrefixIcon>
              {prefix}
            </PrefixIcon>
          }
          <Input
            className={`${className}${customValidate && 'showcustom'}`}
            block={block}
            pref={!!prefix}
            suff={!!suffix}
            onInput={handleInput}
            value={value}
            maxLength={maxLength}
            ref={ref}
            required={required}
            {...rest}
          />
          {
            errorMessage && <ErrorMessage className="error-message">{customValidate ? customValidateMessage : errorMessage}</ErrorMessage>
          }
          {
            suffix && <SuffixIcon>
              {suffix}
            </SuffixIcon>
          }
        </InputWrapper>
        {maxLength && <TextCount>
          {`${value?.length ? value.length : length}/${maxLength}`}
        </TextCount>}
      </CountWrapper>
    </InputContainer>
  );
});
