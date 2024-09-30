import React from 'react';
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <div className="sub-layout">
      {/* You can add sub-layout-specific components here, if needed */}
      <Outlet />
    </div>
  );
};
export default Home