// src/layouts/MainLayout.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import TopMenu from './TopMenu';
import SideDrawer from './SideDrawer';
import RightMenu from './RightMenu';

const MainLayout = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query); // Set search query to be used globally
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden pb-4">
      <TopMenu onSearch={handleSearch} />
      <div className="flex h-full overflow-hidden">
        <SideDrawer />
        <div className="flex-grow overflow-auto">
        <Outlet context={{ searchQuery }} />
        </div>
        <RightMenu />
      </div>
    </div>
  );
};

export default MainLayout;
