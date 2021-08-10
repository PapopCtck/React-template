import { css } from '@emotion/react/macro';
import styled from '@emotion/styled/macro';

import { ILi } from './Pagination.interfaces';

export const Container = styled.div`
  width: 100%;
  display: flex;
`;

export const Ul = styled.ul`
  border-radius: 0.25rem;
  padding-left: 0;
  list-style: none;
`;

export const Li = styled.li<ILi>(
  props => css`
    display: inline-flex;
    border: 1px solid;
    padding: ${props.theme.spaces.pd2} ${props.theme.spaces.pd3};
    margin-left: -1px;
    cursor: pointer;
    position: relative;
    transition: .3s all;
  `,
  props => props.disabled ? css`
    color:  ${props.theme.disabledColor};
    cursor: default;
` : css`
  &:hover {
      color: ${props.theme.linkColor};
      border-color: ${props.theme.linkColor};
      z-index: 99;
    }
`, props => props.active ? css`
color: ${props.theme.textColorLight};
background: ${props.theme.primaryColor};
border-color: ${props.theme.linkColor};
&:hover {
      color: ${props.theme.textColorLight};
      border-color: ${props.theme.textColorLight};
      z-index: 99;
    }
`
    : css`
color: ${props.theme.textColorSecondary};
background: ${props.theme.componentBackgroundColor};
border-color:  ${props.theme.disabledColor};
`,
);

export const Next = styled(Li)`
    border-top-right-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
`;


export const Prev = styled(Li)`
    border-top-left-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
`;
