import styled from '@emotion/styled';

import { colorMix } from '../../utils';

export interface ISStyledSelectContainer {
  block?: boolean,
}

export interface ISelectContainer {
  active?: boolean,
  disabled?: boolean,
}


export const StyledSelectContainer = styled.div<ISStyledSelectContainer>(`
  max-width: 400px;
  position: relative;
`,
props => props.block && ({
  width: '100%',
  display: 'block',
  boxSizing: 'border-box',
}),
);

export const StyledCustomSelectContainer = styled.div``;

export const SelectCarret = styled.span`
    position: absolute;
    right: 0.8rem;
    top: 50%;
    transform: translateY(-50%);
`;

export const SelectContainer = styled.div<ISelectContainer>(props => `
 text-align: center;
  position: relative;
  padding: ${props.theme.spaces.pd3};
  border: 1px solid ${props.theme.borderColorBase};
  border-radius: ${props.theme.borderRadiusBase};
  outline: none;
  background: ${props.theme.componentBackgroundColor};
  transition: .3s all;
  &:focus {
    box-shadow: ${props.theme.boxShadowInput} ${colorMix(props.theme.primaryColor, 2)};
    border: 1px solid ${props.theme.primaryColor};
  }
`,
props => props.active && ({
  boxShadow: `${props.theme.boxShadowInput} ${colorMix(props.theme.primaryColor, 2)}`,
  border: `1px solid ${props.theme.primaryColor}`,
}),
props => props.disabled && ({
  color: `${props.theme.disabledColor}`,
  '& ~ .shellselect-carret': {
    color: `${props.theme.disabledColor}`,
  },
}),
);

export const SelectedText = styled.div`
    margin-right: calc(0.8rem + 15px);
    height: calc(1em + 5px);
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: normal;
    &.placeholder {
      color: #404040;
      font-weight: normal;
    }
`;

export const SelectOptionContainer = styled.div`
    position: absolute;
    width: 100%;
    z-index: 1000;
    top: calc(1em + 28px);
    left: 0;
    padding-bottom: ${props => props.theme.spaces.pd5};
`;

export const SelectOptions = styled.ul`
      margin: 0;
      padding: ${props => props.theme.spaces.pd3};
      text-align: left;
      width: 100%;
      background-color: ${props => props.theme.componentBackgroundColor};
      box-shadow:${props => props.theme.boxShadowBase};
      overflow: hidden;
      transform: translate3d(0, 0, 0);
      box-sizing: border-box;
`;

export const SelectOption = styled.li`
        list-style-type: none;
        padding: ${props => `${props.theme.spaces.pd2} ${props.theme.spaces.pd3}`};
        background: ${props => props.theme.componentBackgroundColor};
        cursor: pointer;
        display: flex;
        align-items: center;
        border-bottom: 1px solid ${props => props.theme.borderColorBase};
        color: ${props => props.theme.textColorSecondary};
`;
