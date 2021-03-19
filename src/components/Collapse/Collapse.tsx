import { useState,useEffect,useRef, ReactElement, ReactNode } from 'react';
import { ChevronDown } from 'react-feather';

import styled from '@emotion/styled';

export interface ICollapse {
  standalone?: boolean,
  title: string,
  children?: ReactNode, 
  customSuffix?: ReactNode, 
  isCollpased?: boolean, 
  onClick?: () => void, 
  seperator?: boolean, 
  noContent?: boolean, 
  containerClassName?: string
}

export const StyledCollapseContainer = styled.div`
hr {
    margin: 0;
    background: ${props => props.theme.componentBackgroundColor};
  }
  .collapse-header {
    display: flex;
    align-items: center;
    &.standalone {
      background-color: ${props => props.theme.componentBackgroundColor};
      box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.04);
      padding: 15px;
    }
    .title {
      margin-right: auto;
    }
    .suffix {
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
    }
  }
  .collapse-content {
    overflow: hidden;
    max-height: 0;
    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    height: auto;
    .content-container {
      margin: 15px;
    }
    &.standalone {
      background-color: ${props => props.theme.baseBackgroundColor};
    }
    &.active {
      max-height: var(--max-height);
      transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
  }
`;

export const Collapse = ({ standalone = false,title,children, customSuffix, isCollpased, onClick , seperator = true, noContent = false, containerClassName }: ICollapse): ReactElement => {
  const [collapse, setCollapse] = useState(true);
  const contentRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    contentRef.current?.style.setProperty('--max-height',`${contentRef.current.scrollHeight}px`);
  }, [collapse, children]);
  useEffect(() => {
    if (isCollpased !== undefined){
      setCollapse(isCollpased);
    }
  },[isCollpased]);
  return (
    <StyledCollapseContainer className={`${!collapse && 'active'} ${noContent && 'no-content'} ${containerClassName}`}>
      <div className={`collapse-header ${standalone && 'standalone'}`} onClick={ onClick ? () => onClick() : () => setCollapse(collapse => !collapse)}>
        <span className="title">{title}</span>
        <span className={`suffix ${!collapse && 'active'} ${customSuffix && 'custom'}`}>
          {
            customSuffix ? customSuffix : <ChevronDown />
          }
        </span>
      </div>
      { seperator && <hr/>}
      <div ref={contentRef} className={`collapse-content ${standalone && 'standalone'} ${!collapse && 'active'}`}>
        <div className="content-container">
          {children}
        </div>
        
      </div>
    </StyledCollapseContainer>
  );};
