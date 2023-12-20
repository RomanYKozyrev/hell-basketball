import React, { useState, useMemo, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { useDispatch, useSelector } from 'react-redux';

import GameCard from './GameCard';
import { Pagination } from '../Pagination/Pagination';
import { getGames } from '../../api/teams';
import { AppDispatch, RootState } from '../../store';

interface IProps {
  activeTeam: number;
  setActiveStats: (activeStats: string) => void;
}

const GameList = ({ activeTeam, setActiveStats }: IProps) => {
  const [page, setPage] = useState(1);

  const { games, gamesMeta } = useSelector((store: RootState) => store.teams);

  const dispatch = useDispatch<AppDispatch>();

  const totalCount = gamesMeta.total_count || 0;

  useEffect(() => {
    dispatch(getGames({ id: activeTeam, page }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, activeTeam]);

  useEffect(() => {
    setPage(1);
  }, [activeTeam]);

  const showPagination = useMemo(() => {
    return totalCount <= 10 && page === 1;
  }, [totalCount, page]);

  if (page * 10 - 10 === totalCount && page > 1) {
    setPage(page - 1);
  }

  const isLastPage = useMemo(() => {
    return page * 10 >= totalCount;
  }, [page, totalCount]);

  function handleChangePage(actualPage: number) {
    if (actualPage <= 0) {
      return;
    }
    if (isLastPage && actualPage > page) {
      return;
    }
    setPage(actualPage);
  }

  return (
    <>
      <ListGroup as="ul">
        {games.map((game) => (
          <ListGroup.Item className="py-2" as="li" key={game.id}>
            <GameCard game={game} setActiveStats={setActiveStats} />
          </ListGroup.Item>
        ))}
      </ListGroup>{' '}
      {!showPagination ? (
        <Pagination
          totalCount={totalCount}
          page={page}
          onChangePage={handleChangePage}
          itemCount={10}
        />
      ) : null}
    </>
  );
};

export default GameList;
