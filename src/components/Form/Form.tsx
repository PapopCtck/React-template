import { FormEvent, FormEventHandler, HTMLAttributes, ReactElement, useState } from 'react';
import styled from '@emotion/styled';
import { colorMix } from '../../utils';

interface IFormClassname {
  className?: string[],
}
export interface IFormBase extends Omit<HTMLAttributes<HTMLFormElement>,keyof IFormClassname> {
  handlesubmit?: FormEventHandler,
  customValidate?: boolean,
  beforeValidate?: () => void,
}

export type IForm = IFormBase & IFormClassname;

export const StyledForm = styled.form`
 &.was-validated {
    input:invalid {
      border: 1px solid ${props => props.theme.errorColor};
      & + .error-message {
        color: ${props => props.theme.errorColor};
        position: relative;
        top: -5px;
        max-height: fit-content;
        opacity: 1;
        display: inline;
      }
      &:focus{
        outline: none;
        box-shadow: ${props => `${props.theme.boxShadowInput} ${colorMix(props.theme.errorColor, 2)}`};
      }
    }
    input {
      &.showcustom {
        border: 1px solid ${props => props.theme.errorColor} !important;
        & + .error-message {
          display: inline;
          color: ${props => props.theme.errorColor};
          position: relative;
          top: -5px;
          max-height: fit-content;
          opacity: 1;
        }
      }
    }
  }
`;

export const Form = (props: IForm): ReactElement => {
  const [isValidated,setValidated] = useState(false);

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidated(true);
    if (props.beforeValidate) {props.beforeValidate();}
    if (event.currentTarget.checkValidity() && !props.customValidate) {
      props.handlesubmit && props.handlesubmit(event);
    }
  };

  let classNames: string[] = [];
  if (props.className) {
    classNames = [...props.className];
    // delete props.className;
  }

  if (isValidated) {
    classNames.push('was-validated');
  }

  return (
    <StyledForm onSubmit={submitHandler} {...props} className={classNames.join(' ')} noValidate>
      {props.children}
    </StyledForm>
  );
};
