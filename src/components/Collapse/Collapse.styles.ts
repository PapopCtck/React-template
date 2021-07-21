import styled from '@emotion/styled';
import { Standalone, ICollapseContent } from './Collapse.interfaces';

export const StyledCollapseContainer = styled.div``;

export const Hr = styled.hr`
    margin: 0;
    background: ${props => props.theme.componentBackgroundColor};
`;

export const CollapseHeader = styled.div<Standalone>(`
    display: flex;
    align-items: center;
`,props => ({
  backgroundColor: `${props.theme.componentBackgroundColor}`,
  boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.04)',
  padding: props.theme.spaces.pd4,
}));

export const Title = styled.span`
      margin-right: auto;
`;

export const Suffix = styled.span`
      img {
        transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
      }
      &:not(&.custom) {
        &.active {
          img {
            transform: rotateZ(180deg);
            transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
          }
        }
      }
`;

export const CollapseContent = styled.div<ICollapseContent>(`
    overflow: hidden;
    max-height: 0;
    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    height: auto;
`,
props => props.standalone && ({
  backgroundColor: `${props.theme.baseBackgroundColor}`,
}),
props => props.active && ({
  maxHeight: 'var(--max-height)',
  transition: 'all 1s cubic-bezier(0.075, 0.82, 0.165, 1)',
}),
);

export const ContentContainer = styled.div`
  margin: ${props => props.theme.spaces.mg4};
`;
