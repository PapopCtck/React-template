import { ChangeEvent, ChangeEventHandler, FocusEventHandler, forwardRef, ReactElement, ReactNode, Ref, useState } from 'react';
import styled from '@emotion/styled';

import { colorMix } from '../../utils';

interface Block {
  block?: boolean,
}

export interface IInputWithLength extends Block {
  label?: string,
  className?: string,
  prefix?: ReactNode,
  suffix?: ReactNode,
  maxLength?: number,
  errorMessage?: string,
  value?: string | readonly string[],
  customValidate?: boolean,
  customValidateMessage?: string,
  required?: boolean,
  placeholder?: string,
  onChange?: ChangeEventHandler,
  onBlur?: FocusEventHandler,
}

interface IStyledInput extends Block {
  pref?: boolean,
  suff?: boolean,
}

export const Input = styled.input<IStyledInput>(props => `
  padding: 10px;
  border: 1px solid ${props.theme.borderColorBase};
  border-radius: ${props.theme.borderRadiusBase};
  outline: none;
  transition: all .3s;
  font-family: ${props.theme.fontFamily};
  &:focus {
    border-color: ${props.theme.primaryColor};
    box-shadow: ${props.theme.boxShadowInput} ${colorMix(props.theme.primaryColor, 2)};
  }
`,
props => props.block && ({
  display: 'block',
  margin: '10px 0',
  width: '100%',
  boxSizing: 'border-box',
}),
props => props.pref && ({
  paddingLeft: '40px', //prefix maxwidth + padding(left)
}),
props => props.suff && ({
  paddingRight: '40px', //suffixfix maxwidth + padding(right)
}),
);


const InputContainer = styled.div`
  margin: 10px 0;
  position: relative;
  width: 100%;

`;

const ErrorMessage = styled.div`
    max-height: 0;
      opacity: 0;
      overflow: hidden;
      transition: max-height 0.3s ease-in;
      transition: opacity 0.3s ease-in;
`;

const Label = styled.div`
 margin-bottom: 5px;
`;

const PrefixIcon = styled.span`
    position: absolute;
    top: 10px; //padding
    bottom: 10px; //padding
    height: fit-content;
    left: 10px;
    max-width: 25px;
    overflow: hidden;
    &.disabled {
      color: ${props => props.theme.disabledColor};
    }
`;

const SuffixIcon = styled.span`
   position: absolute;
    top: 10px; //padding
    bottom: 10px; //padding
    height: fit-content;
    right: 10px;
    max-width: 25px;
    overflow: hidden;
    &.disabled {
      color: ${props => props.theme.disabledColor};
    }
`;

const InputWrapper = styled.div`
  position: relative;
`;

const CountWrapper = styled.div<Block>`
width: ${props => props.block ? '100%' : 'fit-content'};
  position: relative;
`;

const TextCount = styled.div`
text-align: right;
    color: ${props => props.theme.textColorSecondary};

`;

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
