import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';

import Tabs from '../components/Tabs/Tabs';
import { AppDispatch, RootState } from '../store';
import GameList from '../components/GameCard/GameList';
import PlayersList from '../components/PlayersCard/PlayersList';
import Navbar from '../components/Navbar/Navbar';
import GameStats from '../components/GameStats/GameStats';
import { useLazyLoadPlayers } from '../hooks/useLazyloadPlayers';
import { useWindowSize } from '../hooks/useWindowResize';
import { useMobileMenu } from '../App';
import { getTeams } from '../api/teams';

const Home = () => {
  const { teams } = useSelector((store: RootState) => store.teams);

  const [activeTeam, setActiveTeam] = useState(teams[0]?.id);
  const [activeTab, setActiveTab] = useState('Players');
  const [activeStats, setActiveStats] = useState('');

  const { width } = useWindowSize();
  const { showMenu, setShowMenu } = useMobileMenu();
  const loadPlayers = useLazyLoadPlayers();
  const dispatch = useDispatch<AppDispatch>();

  const isDesctop = width && width > 991;

  useEffect(() => {
    setActiveTeam(teams[0]?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teams[0]?.id]);

  useEffect(() => {
    dispatch(getTeams({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTeamClick = (id: number) => {
    setActiveTeam(id);
    loadPlayers();
    setActiveStats('');
    !isDesctop && setShowMenu(false);
  };

  return (
    <>
      {(isDesctop || showMenu) && (
        <Col className="teams-list  p-3" xs lg="3">
          <p className="text-left py-1 fs-2  mb-0">All Teams</p>
          <Navbar activeTeam={activeTeam} handleTeamClick={handleTeamClick} />
        </Col>
      )}

      {(isDesctop || !showMenu) && (
        <Col className={`teams-list p-3 ${!isDesctop && 'w-100'}`} lg="9">
          <p className="text-center py-1 fs-2  mb-0">
            {activeStats ? `${activeStats} Stats` : 'Team Information'}
          </p>

          {!activeStats ? (
            <>
              <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
              {activeTab === 'Games' ? (
                <GameList
                  activeTeam={activeTeam}
                  setActiveStats={setActiveStats}
                />
              ) : (
                <PlayersList
                  activeTeam={activeTeam}
                  setActiveStats={setActiveStats}
                />
              )}
            </>
          ) : (
            <GameStats
              activeStats={activeStats}
              setActiveStats={setActiveStats}
            />
          )}
        </Col>
      )}
    </>
  );
};

export default Home;
