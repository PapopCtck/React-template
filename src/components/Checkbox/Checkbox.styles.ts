import { colorMix } from '@/utils';
import styled from '@emotion/styled/macro';
import { IStyledCheckbox } from './Checkbox.interfaces';

export const StyledCheckboxContainer = styled.div<IStyledCheckbox>`
display: block;
position: relative;
padding-left: ${props => props.theme.spaces.pd6};
margin-bottom: ${props => props.theme.spaces.mg3};
cursor: pointer;
-webkit-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  &:checked {
    & ~ .checkmark {
      border-style: solid;
      border-width: 2px;
      border-color: ${props => props.borderColor ?? '#2C2C2C'};
      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        display: block;
        position: relative;
        margin-top: -2px;
      }
    }
  }
}
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  margin: auto;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  border: 2px solid ${props => props.theme.borderColorBase};
  svg {
    display: none;
  }
}
&:active{
  background: transparent;
}
&:hover {
  background: transparent;
}
`;

export const StyledBoxCheckboxContainer = styled.div`
position: relative;
  label {
    margin-left: ${props => props.theme.spaces.mg5};
    color: ${props => props.theme.textColor};
    display: inline-block;
  }
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }
  input:checked {
    ~ .checkmark {
      background: ${props => props.theme.primaryColor};
      border: 1px solid transparent;
    }
    ~ .checkmark:after {
      display: block;
    }
  }
  input:focus, input:active{
    ~ .checkmark{
      box-shadow: ${props => `${props.theme.boxShadowInput} ${colorMix(props.theme.primaryColor,2)}`}
    }
  }
  .checkmark {
    position: absolute;
    left: 0;
    height: 15px;
    width: 15px;
    background-color: #fff;
    border: 1px solid ${props => props.theme.borderColorBase};
    border-radius: 3px;
    cursor: pointer;
    transition: .3s all;
  }
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
    left: calc(50% - 3.5px);
    top: calc(50% - 7px);
    width: 5px;
    height: 8px;
    border: solid #fff;
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;
