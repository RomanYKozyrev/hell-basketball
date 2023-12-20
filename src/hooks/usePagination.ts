import { useMemo } from 'react';
const FIRST_PAGE = 1;
// STATIC_PAGINATION_ITEM consist of: first page + last page + current page + leftdots + rightdots
const STATIC_PAGINATION_ITEM = 5;
//  min pages amount for hide
const HIDE_PAGE_AMOUNT = 3;

const getRange = (start: number, end: number) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

interface IProps {
  totalPageCount: number;
  siblingCount?: number;
  currentPage: number;
}

export const usePagination = ({
  totalPageCount,
  siblingCount = 1,
  currentPage,
}: IProps) => {
  const paginationRange = useMemo(() => {
    // siblingCount is amount of pages to the right and left of the current page
    // sideItemCount is amount of pages that we show on the one of sides (totalPageNumbers - right(left) dots - last(first) page)
    const totalPageNumbers = STATIC_PAGINATION_ITEM + siblingCount * 2;
    const sideItemCount = totalPageNumbers - 2;

    if (totalPageNumbers >= totalPageCount) {
      // show all pages
      return getRange(FIRST_PAGE, totalPageCount);
    }

    // get last page to the right or left side of the current page
    const leftSiblingPage = Math.max(currentPage - siblingCount, FIRST_PAGE);
    const rightSiblingPage = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    // we want to show dots if there are two or more pages beetwen first(last) page and sibling page
    const isLeftDotsShow = leftSiblingPage > HIDE_PAGE_AMOUNT;
    const isRightDotsShow =
      rightSiblingPage <= totalPageCount - HIDE_PAGE_AMOUNT;

    if (!isLeftDotsShow && isRightDotsShow) {
      // in this case we need to show only right dots
      let leftRange = getRange(FIRST_PAGE, sideItemCount);
      return [...leftRange, 'rightDots', totalPageCount];
    }

    if (isLeftDotsShow && !isRightDotsShow) {
      // in this case we need to show only right dots and start is page from which we need to show pages after dots
      const start = totalPageCount - sideItemCount + 1;
      let rightRange = getRange(start, totalPageCount);
      return [FIRST_PAGE, 'leftDots', ...rightRange];
    }

    if (isLeftDotsShow && isRightDotsShow) {
      // in this case we need to show both dots
      let middleRange = getRange(leftSiblingPage, rightSiblingPage);
      return [
        FIRST_PAGE,
        'leftDots',
        ...middleRange,
        'rightDots',
        totalPageCount,
      ];
    }
  }, [totalPageCount, siblingCount, currentPage]);

  return paginationRange;
};
