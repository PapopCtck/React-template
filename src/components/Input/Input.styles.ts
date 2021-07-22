import { colorMix } from '@/utils';
import styled from '@emotion/styled';
import { Block, IStyledInput } from './Input.interfaces';

export const Input = styled.input<IStyledInput>(props => `
  padding: ${props.theme.spaces.pd2};
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
  margin: `${props.theme.spaces.mg3} 0`,
  width: '100%',
  boxSizing: 'border-box',
}),
props => props.pref && ({
  paddingLeft: '35px', //prefix maxwidth + padding(left)
}),
props => props.suff && ({
  paddingRight: '35px', //suffixfix maxwidth + padding(right)
}),
);


export const InputContainer = styled.div`
  margin: ${props => `${props.theme.spaces.mg3} 0`};
  position: relative;
  width: 100%;

`;

export const ErrorMessage = styled.div`
    max-height: 0;
      opacity: 0;
      overflow: hidden;
      transition: max-height 0.3s ease-in;
      transition: opacity 0.3s ease-in;
`;

export const Label = styled.div`
 margin-bottom: ${props => props.theme.spaces.mg1};
`;

export const PrefixIcon = styled.span`
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

export const SuffixIcon = styled.span`
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

export const InputWrapper = styled.div`
  position: relative;
`;

export const CountWrapper = styled.div<Block>`
width: ${props => props.block ? '100%' : 'fit-content'};
  position: relative;
`;

export const TextCount = styled.div`
text-align: right;
    color: ${props => props.theme.textColorSecondary};

`;
