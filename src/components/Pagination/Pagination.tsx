import { CSSProperties, ReactElement, useLayoutEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export interface IPagination {
  onPageChange?: (index: number) => void, 
  count: number,
  nextLabel?: string, 
  nextStyle?: CSSProperties,
  prevLabel?: string,
  prevStyle?: CSSProperties,
  pageRangeDisplayed: number,
  marginPagesDisplayed: number, 
  breakLabel?: string,
  currentPage?: number,
}

interface Li {
  active?: boolean
  disabled?: boolean,
}

const Container = styled.div`
  width: 100%;
  display: flex;
`;

const Ul = styled.ul`
  border-radius: 0.25rem;
  padding-left: 0;
  list-style: none;
`;

const Li = styled.li<Li>(
  () => css`
    display: inline-flex;
    border: 1px solid;
    padding: 0.5rem 0.75rem;
    margin-left: -1px;
    cursor: pointer;
    position: relative;
    transition: .3s all;
  `,
  props => props.disabled ? css`
    color:  ${props.theme.disabledColor};
    cursor: default;
` : css`
  &:hover {
      color: ${props.theme.linkColor};
      border-color: ${props.theme.linkColor};
      z-index: 99;
    }
`, props => props.active ? css`
color: ${props.theme.textColorLight};
background: ${props.theme.primaryColor};
border-color: ${props.theme.linkColor};
&:hover {
      color: ${props.theme.textColorLight};
      border-color: ${props.theme.textColorLight};
      z-index: 99;
    }
`
    : css`
color: ${props.theme.textColorSecondary};
background: ${props.theme.componentBackgroundColor};
border-color:  ${props.theme.disabledColor};
`,
);

const Next = styled(Li)`
    border-top-right-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
`;


const Prev = styled(Li)`
    border-top-left-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
`;

export const Pagination = ({ 
  onPageChange, count, nextLabel = 'Next', nextStyle,prevLabel = 'Prev',prevStyle,
  pageRangeDisplayed,marginPagesDisplayed, breakLabel = '...',
  currentPage = 1,
}: IPagination): ReactElement => {
  const [activePage, setActivePage] = useState(currentPage);
  const mounted = useRef(false);
  const halfDisplayRange = Math.floor(pageRangeDisplayed / 2);
  const startRender = activePage - halfDisplayRange > 0 ? activePage - halfDisplayRange : 1;
  const stopRender = activePage + halfDisplayRange < count ? activePage + halfDisplayRange : count;

  //check error
  useLayoutEffect(() => {
    if (currentPage < 1) {throw new Error('Page must be greater than 0');}
    if (pageRangeDisplayed < 1) {throw new Error('Page range must be greater than 0');}
    if (pageRangeDisplayed < 3) {console.warn('pageRangeDisplayed < 3 can cause some unwanted behavior. Consider use 3 or more pageRangeDisplayed');}
  },[]);

  useLayoutEffect(() => {
    if (mounted.current && onPageChange){
      onPageChange(activePage);
    } else {
      mounted.current = true;
    }
  },[activePage]);

  const addPages = (target: Array<ReactElement>,start: number,stop: number) => {
    for (let i = start; i <= stop; i++){
      target.push(
        <Li key={i} active={activePage === i} onClick={() => setActivePage(i)}>{i}</Li>,
      );
    }
  };

  const handleRenderPages = () => {
    const pagesButtons: Array<ReactElement> = [];
    //case pageRangeDisplayed <= count
    if (pageRangeDisplayed >= count){
      // > render normally
      addPages(pagesButtons,startRender,stopRender);
    } 
    //case pageRangeDisplayed > count
    else if (pageRangeDisplayed < count) {
      //> case need label in front
      if (activePage - 1 >= marginPagesDisplayed + halfDisplayRange){
        // >> add margin page to the front
        addPages(pagesButtons,1,marginPagesDisplayed);
        // >> dont add break if margin + half = active - 1
        if (activePage - 1 !== marginPagesDisplayed + halfDisplayRange){
          // >>> add breakLabel to front
          pagesButtons.push(
            <Li>{breakLabel}</Li>,
          );
        }
      } 
      //> case first few pages
      if (activePage - halfDisplayRange <= marginPagesDisplayed){
        // >> case number of thing to render = start index and not 1
        if (startRender === pageRangeDisplayed && pageRangeDisplayed > 1){
          addPages(pagesButtons,startRender,startRender + pageRangeDisplayed);
        }
        // >> case start index > thing to render
        else if (startRender > pageRangeDisplayed) {
          addPages(pagesButtons,startRender,startRender + pageRangeDisplayed < count ? startRender + pageRangeDisplayed : count);
        }
        // >> render till range
        else {
          addPages(pagesButtons,startRender,startRender + pageRangeDisplayed - 1);
        }
      }
      //> case last few pages
      else if (activePage + halfDisplayRange + marginPagesDisplayed > count) {
        addPages(pagesButtons,count - pageRangeDisplayed,count);
      } 
      //> else render normally
      else {
        addPages(pagesButtons,startRender,stopRender);
      }
      //> case need label in back
      if (count - activePage >= marginPagesDisplayed + halfDisplayRange){
        // >> dont add break if margin + half = count - activePage
        if (count - activePage !== marginPagesDisplayed + halfDisplayRange){
          // >>> add breakLabel to back
          pagesButtons.push(
            <Li>{breakLabel}</Li>,
          );
        }
        // >> add margin page to the back
        addPages(pagesButtons,count - marginPagesDisplayed + 1,count);
      }
    } 
    return pagesButtons;
  };

  const next = () => {
    if (activePage < count){
      setActivePage(activePage => activePage + 1);
    }
  };

  const prev = () => {
    if (activePage > 1){
      setActivePage(activePage => activePage - 1);
    }
  };
 
  return (
    <Container>
      <Ul>
        {
          count > 0 && <Prev style={prevStyle} disabled={activePage === 1} onClick={prev}>{prevLabel}</Prev>
        }
        {
          handleRenderPages()
        }
        {
          count > 0 && <Next style={nextStyle} disabled={activePage === count} onClick={next}>{nextLabel}</Next>
        }
      </Ul>
    </Container>
  );
};
