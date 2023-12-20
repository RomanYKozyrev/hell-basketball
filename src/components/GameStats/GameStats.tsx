import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import ListGroup from 'react-bootstrap/ListGroup';
import { AppDispatch, RootState } from '../../store';
import { getStats } from '../../api/teams';
import { resetStats } from '../../features/teams/teamsSlice';
import './GameStat.scss';

interface IProps {
  setActiveStats: (activeStats: string) => void;
  activeStats: string;
}

const GameStats = ({ activeStats, setActiveStats }: IProps) => {
  const { gameStat, gameStatMeta, teams } = useSelector(
    (store: RootState) => store.teams
  );

  const dispatch = useDispatch<AppDispatch>();

  const handleBtnClick = () => {
    setActiveStats('');
  };

  useEffect(() => {
    return () => {
      dispatch(resetStats());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mode = activeStats === 'Game' ? 'game' : 'player';

  const handleShowMoreClick = () => {
    dispatch(
      getStats({
        [`${mode}Id`]: gameStat[0][mode].id,
        page: gameStatMeta.next_page,
      })
    );
  };

  return (
    <ListGroup as="ul">
      <button onClick={handleBtnClick} className="show-stats-btn">
        Back
      </button>
      {gameStat.map((item) => (
        <ListGroup.Item className="py-2" as="li" key={item.id}>
          <Card className="rounded">
            <Card.Body className="py-2">
              {activeStats === 'Game' ? (
                <Card.Text as="div" className="game-stat--header">
                  {item.player.first_name} {item.player.last_name},{' '}
                  {item.player.position} Team: {item.team.full_name}
                </Card.Text>
              ) : (
                <>
                  <Card.Text as="div" className="game-stat--header">
                    {
                      teams.find((team) => team.id === item.game.home_team_id)
                        ?.full_name
                    }{' '}
                    {item.game.home_team_score}:{item.game.visitor_team_score}{' '}
                    {
                      teams.find(
                        (team) => team.id === item.game.visitor_team_id
                      )?.full_name
                    }
                  </Card.Text>
                </>
              )}

              <Card.Text as="div" className="game-stat--info">
                Assists: {item.ast || 0} Blocks: {item.ast || 0} Points:{' '}
                {item.ast || 0} Minutes: {item.ast || 0}
              </Card.Text>
            </Card.Body>
          </Card>
        </ListGroup.Item>
      ))}
      {gameStatMeta.next_page && (
        <button onClick={handleShowMoreClick} className="show-stats-btn">
          Show more
        </button>
      )}
    </ListGroup>
  );
};

export default GameStats;
