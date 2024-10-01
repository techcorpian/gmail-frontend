import React, { useState, useContext } from "react";
import { DrawerContext } from "../../context/DrawerContext";
import AuthService from '../../../services/auth.service.jsx';
import { FiMenu } from "react-icons/fi";
import { LuLogOut } from "react-icons/lu";
import { CgMenuGridO } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdHelpCircleOutline } from "react-icons/io";

const TopMenu = ({ onSearch }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    AuthService.logout();
    window.location.href = '/';
  };

  const currentUser = AuthService.getCurrentUser();
  const initial = currentUser.firstname.charAt(0).toUpperCase();
  console.log(currentUser);

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value); // Notify parent about search query changes
  };


  const { toggleDrawer } = useContext(DrawerContext);
  return (
    <div className="flex justify-between py-2 pb-3 px-4 w-full items-center">
      <div className="flex items-center">
        <button className="text-black p-3 mr-1 hover:bg-gray-200 rounded-full text-2xl" onClick={toggleDrawer}>
          <FiMenu />
        </button>
        <div>
          <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png" alt="" />
        </div>
        <div className="ml-6">
          <input
            type="text"
            className="border border-gray-300 rounded-full px-4 py-2 w-[500px]"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-2xl"><IoMdHelpCircleOutline /></div>
        <div className="text-2xl"><IoSettingsOutline /></div>
        <div className="text-2xl"><CgMenuGridO /></div>
        <div className="relative inline-block text-left">


          {/* Button to trigger the dropdown */}
          <button
            onClick={toggleDropdown}
            className="inline-flex justify-center items-center w-8 h-8 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <div className="text-lg font-medium">{initial}</div>
          </button>

          {/* Conditionally rendered dropdown */}
          {isDropdownOpen && (
            <div className="flex flex-col gap-6 p-4 z-20 justify-center items-center absolute right-0 mt-2 w-[400px] rounded-3xl shadow-lg bg-cyan-200 ring-1 ring-black ring-opacity-5 z-10">
              <div className="text-sm">{currentUser.email}</div>
              <div className="flex flex-col justify-center items-center gap-2">
                <button
                  onClick={toggleDropdown}
                  className="w-20 h-20 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  <div className="text-5xl font-medium pb-1">{initial}</div>
                </button>
                <div className="text-2xl">Hi, {currentUser.firstname.charAt(0).toUpperCase() + currentUser.firstname.slice(1)}!</div>
                <button className="border border-gray-500 rounded-full text-sm p-2 px-6 text-blue-800 font-semibold">Manage Your Google Account</button>
              </div>
              <div className="flex flex-col p-1 px-6 bg-white rounded-3xl w-full">
                <div className="flex items-center gap-3 border-b py-3">
                  <button
                    onClick={toggleDropdown}
                    className="w-10 h-10 bg-blue-500 text-center text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    <div className="text-lg font-medium">{initial}</div>
                  </button>
                  <div>
                    <div>{currentUser.firstname}</div>
                    <div className="text-sm">{currentUser.email}</div>
                  </div>
                </div>
                {/* <div className="flex items-center gap-3 py-3">
                <button
                  onClick={toggleDropdown}
                  className="w-10 h-10 bg-blue-500 text-center text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  <div className="text-lg font-medium">{initial}</div>
                </button>
                <div>
                  <div>{currentUser.firstname}</div>
                  <div className="text-sm">{currentUser.email}</div>
                </div>
              </div> */}
                <div className="flex items-center gap-3 p-4 cursor-pointer" onClick={handleLogout}><LuLogOut className="text-xl" /> <span>Sign out from the account</span></div>
              </div>

              {/* <ul className="flex items-center gap-3 p-3 bg-white rounded-3xl w-full">
              <li className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Option 1</li>
              <li className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Option 2</li>
              <li className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Option 3</li>
            </ul> */}
            </div>

          )}
        </div>
      </div>
    </div>
  )
}

export default TopMenu