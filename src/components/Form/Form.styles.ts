import styled from '@emotion/styled/macro';

import { colorMix } from '@/utils';

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
