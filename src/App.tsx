import React from 'react';
import './App.css';
import { Container } from 'react-bootstrap';
import { Outlet, useOutletContext } from 'react-router-dom';

import Header from './components/Header/Header';

type ContextType = {
  showMenu: boolean;
  setShowMenu: (showMenu: boolean) => void;
};

function App() {
  const [showMenu, setShowMenu] = React.useState(false);

  return (
    <>
      <Header showMenu={showMenu} setShowMenu={setShowMenu} />
      <main className="py-3">
        <Container className="d-flex gap-3">
          <Outlet context={{ showMenu, setShowMenu }} />
        </Container>
      </main>
    </>
  );
}

export function useMobileMenu() {
  return useOutletContext<ContextType>();
}

export default App;
