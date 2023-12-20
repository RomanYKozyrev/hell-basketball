import React from 'react';
import './Pagination.scss';
import { usePagination } from '../../hooks/usePagination';
import { PaginationItem } from './PaginationItem';

interface IProps {
  totalCount: number;
  page: number;
  itemCount: number;
  onChangePage: (page: number) => void;
}

export function Pagination({
  totalCount,
  page,
  onChangePage,
  itemCount,
}: IProps) {
  const totalPageCount = Math.ceil(totalCount / itemCount);
  const paginationRange = usePagination({
    totalPageCount,
    currentPage: page,
  });

  return (
    <ul className="pagination_block">
      <PaginationItem
        page="first_page"
        status={page === 1 ? 'disabled' : ''}
        onClick={() => onChangePage(1)}
      />
      <PaginationItem
        page="prev_page"
        status={page === 1 ? 'disabled' : ''}
        onClick={() => onChangePage(page - 1)}
      />
      {paginationRange &&
        paginationRange.map((pageNumber, index) => {
          if (pageNumber === 'leftDots' || pageNumber === 'rightDots') {
            const page: number =
              pageNumber === 'leftDots'
                ? Number(paginationRange[index + 1]) - 1
                : Number(paginationRange[index - 1]) + 1;
            return (
              <PaginationItem
                key={pageNumber}
                page={pageNumber}
                onClick={() => onChangePage(page)}
              />
            );
          }

          return (
            <PaginationItem
              key={pageNumber}
              status={pageNumber === page ? 'current' : ''}
              page={pageNumber}
              onClick={() => onChangePage(Number(pageNumber))}
            />
          );
        })}
      <PaginationItem
        page="next_page"
        status={page === totalPageCount ? 'disabled' : ''}
        onClick={() => onChangePage(page + 1)}
      />
      <PaginationItem
        page="last_page"
        status={page === totalPageCount ? 'disabled' : ''}
        onClick={() => onChangePage(totalPageCount)}
      />
    </ul>
  );
}
