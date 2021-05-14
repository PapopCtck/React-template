import { HTMLAttributes } from 'react';
import styled from '@emotion/styled';

export interface ITextGradient extends HTMLAttributes<HTMLDivElement> {
  color?: string,
}

export const TextGradient = styled.div<ITextGradient>`
    background: ${props => props.color ? props.color : props.theme.primaryColor};
    background-clip: text;
    -webkit-text-fill-color: transparent;
`;
