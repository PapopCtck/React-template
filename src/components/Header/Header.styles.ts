import styled from '@emotion/styled';

export const StyledHeader = styled.header`
  .wrapper {
    font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: ${props => `${props.theme.spaces.pd4} ${props.theme.spaces.pd5}`};
    display: flex;
    align-items: center;
  }

  svg {
    display: inline-block;
    vertical-align: top;
  }

  h1 {
    font-weight: 900;
    font-size: 20px;
    line-height: 1;
    margin: ${props => `${props.theme.spaces.mg3} 0 ${props.theme.spaces.mg3} ${props.theme.spaces.mg5}`};
    display: inline-block;
    vertical-align: top;
  }

  .app-name{
    margin-right: auto;
  }

  button + button {
    margin-left: ${props => props.theme.spaces.mg3};
  }
`;
