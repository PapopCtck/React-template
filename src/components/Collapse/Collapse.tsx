import { useState,useEffect,useRef, ReactElement } from 'react';
import { ChevronDown } from 'react-feather';

import { ICollapse } from './Collapse.interfaces';
import { StyledCollapseContainer, CollapseHeader, Title, Suffix, Hr, CollapseContent, ContentContainer } from './Collapse.styles';

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
