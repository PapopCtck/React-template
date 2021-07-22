import { FormEvent, ReactElement, useState } from 'react';
import { IForm } from './Form.interfaces';
import { StyledForm } from './Form.styles';

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
