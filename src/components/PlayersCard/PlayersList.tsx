import React, { useState, useMemo, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

import PlayersCard from './PlayersCard';
import { useLazyLoadPlayers } from '../../hooks/useLazyloadPlayers';
import { RootState } from '../../store';

interface IProps {
  activeTeam: number;
  setActiveStats: (activeStats: string) => void;
}

const PER_PAGE = 8;

const PlayersList = ({ activeTeam, setActiveStats }: IProps) => {
  const [page, setPage] = useState(1);

  const { players } = useSelector((store: RootState) => store.teams);
  const loadPlayers = useLazyLoadPlayers();

  const playersList = players[activeTeam]?.slice(0, PER_PAGE * page);
  const totalCount = players[activeTeam]?.length;

  useEffect(() => {
    loadPlayers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPage(1);
  }, [activeTeam]);

  const showPagination = useMemo(() => {
    return totalCount <= 8 && page === 1;
  }, [totalCount, page]);

  function handleChangePage() {
    setPage((page) => page + 1);
    loadPlayers();
  }

  return (
    <>
      <ListGroup as="ul">
        {playersList?.map((player) => {
          return (
            <ListGroup.Item className="py-2" as="li" key={player.id}>
              <PlayersCard player={player} setActiveStats={setActiveStats} />
            </ListGroup.Item>
          );
        })}
      </ListGroup>{' '}
      {!showPagination && (
        <Button
          className={`pagination-btn fs-4 text-black text-center link-underline link-underline-opacity-0`}
          variant="link"
          onClick={handleChangePage}
        >
          Show more
        </Button>
      )}
    </>
  );
};

export default PlayersList;
