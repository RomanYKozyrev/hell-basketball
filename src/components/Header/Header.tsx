import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

import { LinkContainer } from 'react-router-bootstrap';

import logo from '../../assets/logo.png';

interface IProps {
  showMenu: boolean;
  setShowMenu: (showMenu: boolean) => void;
}

const Header = ({ showMenu, setShowMenu }: IProps) => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logo} alt="logo" className="logo" />
              Hell Basketball
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setShowMenu(!showMenu)}
          />
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
