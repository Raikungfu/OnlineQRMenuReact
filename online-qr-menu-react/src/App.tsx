import React, { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import Home from './Page/Home';
import Landing from './Page/Landing';
import Page404 from './Page/Error/Page404';

const App = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleHide = () => {
    setShowMenu(true); // Show the main menu when the splash screen is hidden
  };

  return (
    <Routes>
      <Route path="/:id" element={<Landing />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default App;
