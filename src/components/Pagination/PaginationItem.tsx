import React from 'react';
import './Pagination.scss';

interface IProps {
  page: string | number;
  status?: string;
  currentPage?: number;
  onClick: () => void;
}

export function PaginationItem({ page, onClick, status }: IProps) {
  const checkPage = (page: number | string) => {
    if (page === 'leftDots' || page === 'rightDots') {
      return '...';
    }
    if (Number(page)) {
      return page;
    }
  };

  return (
    <li
      className={`pagination_block--page ${page} ${status} `}
      onClick={() => onClick()}
    >
      {checkPage(page)}
    </li>
  );
}
