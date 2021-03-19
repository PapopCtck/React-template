import styled from '@emotion/styled';

export const Table = styled.table`
  position: relative;
  width: 100%;
  thead {
    th {
      padding: 5px 20px;
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
        padding: 20px 20px;
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
