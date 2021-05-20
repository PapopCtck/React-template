import { useState,useEffect,useRef, ReactElement, ReactNode } from 'react';
import { ChevronDown } from 'react-feather';

import styled from '@emotion/styled';

interface Standalone {
  standalone?: boolean,
}

export interface ICollapse extends Standalone {
  title: string,
  children?: ReactNode, 
  customSuffix?: ReactNode, 
  isCollapsed?: boolean, 
  onClick?: () => void, 
  seperator?: boolean, 
  noContent?: boolean, 
  containerClassName?: string
}

interface ICollapseContent extends Standalone {
  active?: boolean,
}

const StyledCollapseContainer = styled.div``;

const Hr = styled.hr`
    margin: 0;
    background: ${props => props.theme.componentBackgroundColor};
`;

const CollapseHeader = styled.div<Standalone>(`
    display: flex;
    align-items: center;
`,props => ({
  backgroundColor: `${props.theme.componentBackgroundColor}`,
  boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.04)',
  padding: '15px',
}));

const Title = styled.span`
      margin-right: auto;
`;

const Suffix = styled.span`
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

const CollapseContent = styled.div<ICollapseContent>(`
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

const ContentContainer = styled.div`
  margin: 15px;
`;

export const Collapse = ({ standalone = false,title,children, customSuffix, isCollapsed, onClick , seperator = true, noContent = false, containerClassName }: ICollapse): ReactElement => {
  const [collapse, setCollapse] = useState(true);
  const contentRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    contentRef.current?.style.setProperty('--max-height',`${contentRef.current.scrollHeight}px`);
  }, [collapse, children]);
  useEffect(() => {
    if (isCollapsed !== undefined){
      setCollapse(isCollapsed);
    }
  },[isCollapsed]);
  return (
    <StyledCollapseContainer className={`${!collapse && 'active'} ${noContent && 'no-content'} ${containerClassName}`}>
      <CollapseHeader standalone={standalone} onClick={ onClick ? () => onClick() : () => setCollapse(collapse => !collapse)}>
        <Title>{title}</Title>
        <Suffix className={`suffix ${!collapse && 'active'} ${customSuffix && 'custom'}`}>
          {
            customSuffix ? customSuffix : <ChevronDown />
          }
        </Suffix>
      </CollapseHeader>
      { seperator && <Hr/>}
      <CollapseContent ref={contentRef} standalone={standalone} active={!collapse}>
        <ContentContainer>
          {children}
        </ContentContainer>
      </CollapseContent>
    </StyledCollapseContainer>
  );};
