import { CSSProperties } from 'react';

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

export interface ILi {
  active?: boolean
  disabled?: boolean,
}
