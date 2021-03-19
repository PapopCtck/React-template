import styled from '@emotion/styled';

export const Card = styled.div`
  font-weight: 700;
  border-radius: ${props => props.theme.borderRadiusBase};
  box-shadow: ${props => props.theme.boxShadowBase};
  background-color: ${props => props.theme.componentBackgroundColor};
  padding: 30px;
  .card-body{
    padding: 0;
  }
`;

