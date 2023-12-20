import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Nav from 'react-bootstrap/Nav';
import { Button } from 'react-bootstrap';

import { AppDispatch, RootState } from '../../store';
import { getTeams } from '../../api/teams';
import { useLazyLoadPlayers } from '../../hooks/useLazyloadPlayers';

interface IProps {
  activeTeam: number;
  handleTeamClick: (id: number) => void;
}

const Navbar = ({ activeTeam, handleTeamClick }: IProps) => {
  const { teams, teamsMeta } = useSelector((store: RootState) => store.teams);
  const dispatch = useDispatch<AppDispatch>();

  const loadPlayers = useLazyLoadPlayers();

  const hanldeShowAllClick = () => {
    dispatch(getTeams({ page: 2 }));
    loadPlayers();
  };

  return (
    <Nav
      defaultActiveKey="/home"
      variant="pills"
      className="flex-column"
      as="ul"
    >
      {teams?.map((team) => (
        <Nav.Item key={team.id} as="li">
          <Button
            className={`team-btn fs-4 text-black text-left link-underline link-underline-opacity-0 ${
              activeTeam === team.id && 'active-team'
            }`}
            variant="link"
            onClick={() => handleTeamClick(team.id)}
          >
            {team.full_name}
          </Button>
        </Nav.Item>
      ))}

      {teamsMeta?.total_pages &&
        teamsMeta?.total_pages !== teamsMeta?.current_page &&
        teamsMeta?.current_page && (
          <Nav.Item as="li">
            <Button
              className={`pagination-btn fs-4 text-black text-center link-underline link-underline-opacity-0`}
              variant="link"
              onClick={hanldeShowAllClick}
            >
              Show All
            </Button>
          </Nav.Item>
        )}
    </Nav>
  );
};

export default Navbar;
