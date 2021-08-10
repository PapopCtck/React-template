import styled from '@emotion/styled/macro';

import { ITextGradient } from './TextGradient.interfaces';

export const TextGradient = styled.div<ITextGradient>`
    background: ${props => props.color ? props.color : props.theme.primaryColor};
    background-clip: text;
    -webkit-text-fill-color: transparent;
`;
