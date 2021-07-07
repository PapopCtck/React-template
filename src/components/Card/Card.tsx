import styled from '@emotion/styled';

export const Card = styled.div`
  font-weight: 700;
  border-radius: ${props => props.theme.borderRadiusBase};
  box-shadow: ${props => props.theme.boxShadowBase};
  background-color: ${props => props.theme.componentBackgroundColor};
  padding: ${props => props.theme.spaces.pd6};
  .card-body{
    padding: 0;
  }
`;

