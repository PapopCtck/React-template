import styled from '@emotion/styled';

export const Table = styled.table`
  position: relative;
  width: 100%;
  thead {
    th {
      padding: ${props => `${props.theme.spaces.pd1} ${props.theme.spaces.pd5}`};
      font-weight: 500;
      white-space: nowrap;
      background-color: ${props => props.theme.baseBackgroundColor};
      border-bottom: 1px solid ${props => props.theme.borderColorBase};
    }
  }
  tbody {
    tr {
      border-bottom: 1px solid ${props => props.theme.borderColorBase};
      &:hover{
        background-color: ${props => props.theme.baseBackgroundColor};
      }
      td {
        padding:${props => `${props.theme.spaces.pd4} ${props.theme.spaces.pd4}`};
        color: ${props => props.theme.textColor};
        i {
          color: ${props => props.theme.textColor};
        }
      }
    }
    .loading {
      text-align: center;
    }
  }
`;
