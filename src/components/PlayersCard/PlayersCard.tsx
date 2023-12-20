import React from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { IPlayer } from '../../dto/teams';
import { AppDispatch } from '../../store';
import { getStats } from '../../api/teams';

interface IProps {
  player: IPlayer;
  setActiveStats: (activeStats: string) => void;
}

const PlayerCard = ({ player, setActiveStats }: IProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleBtnClick = () => {
    setActiveStats('Player');
    dispatch(getStats({ playerId: player.id }));
  };

  return (
    <Card className="rounded">
      <Card.Body className="py-2">
        <Card.Text as="div" className="game-info">
          <span className="team-name">
            {player.first_name} {player.last_name}
          </span>
          <Card.Text as="div" className="game-info">
            Position: {player.position || 'N/A'}
            <button onClick={handleBtnClick} className="show-stats-btn">
              {' '}
              Show Stats
            </button>
          </Card.Text>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default PlayerCard;
