import React from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { IGame } from '../../dto/teams';
import { AppDispatch } from '../../store';
import { getStats } from '../../api/teams';

interface IProps {
  game: IGame;
  setActiveStats: (activeStats: string) => void;
}

const GameCard = ({ game, setActiveStats }: IProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleBtnClick = () => {
    setActiveStats('Game');
    dispatch(getStats({ gameId: game.id }));
  };

  return (
    <Card className="rounded">
      <Card.Body className="py-2">
        <Card.Text as="div" className="game-info">
          <span className="team-name">{game.home_team.full_name} </span>
          <span className="team-score">{game.home_team_score} : </span>
          <span className="team-score">{game.visitor_team_score}</span>{' '}
          <span className="team-name">{game.visitor_team.full_name}</span>
        </Card.Text>
        <Card.Text as="div" className="game-info">
          Date: {new Date(game.date).toLocaleDateString()} Period: {game.period}{' '}
          Status: {game.status}
          <button onClick={handleBtnClick} className="show-stats-btn">
            {' '}
            Show Stats
          </button>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default GameCard;
