import { ReactElement } from 'react';

import { IButton } from './Button.interfaces';
import { StyledButton } from './Button.styles';

export const Button = ({ label, children ,...rest }: IButton): ReactElement => <StyledButton {...rest}>{label ? label : children}</StyledButton>;
