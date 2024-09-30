import React, { useState, useContext } from "react";
import { DrawerContext } from "../../context/DrawerContext";
import { NavLink, useLocation } from 'react-router-dom';
import ComposePopup from "./ComposePopup";

import { MdInbox, MdEdit, MdOutlineInbox } from "react-icons/md";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import { BiSend, BiSolidSend } from "react-icons/bi";
import { IoDocument, IoDocumentOutline } from "react-icons/io5";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { FaRegClock, FaClock } from "react-icons/fa6";
import { FaRegTrashAlt, FaTrashAlt } from "react-icons/fa";
import { MdOutlineChat, MdMarkUnreadChatAlt } from "react-icons/md";
import { LuMails } from "react-icons/lu";
import { MdOutlineReport } from "react-icons/md";

const SideDrawer = () => {
    const { isOpen, toggleDrawer, handleMouseEnter, handleMouseLeave, isManualOpen } = useContext(DrawerContext);


    const MenuTitles = [
        {
            title: "Inbox",
            icon: <MdOutlineInbox />,
            active_icon: <MdInbox />,
            link: '/'
        },
        {
            title: "Starred",
            icon: <IoIosStarOutline />,
            active_icon: <IoIosStar />,
            link: '/starred'
        },
        {
            title: "Snoozed",
            icon: <FaRegClock />,
            active_icon: <FaClock />,
            link: '/snoozed'
        },
        {
            title: "Sent",
            icon: <BiSend />,
            active_icon: <BiSolidSend />,
            link: '/sent'
        },
        {
            title: "Drafts",
            icon: <IoDocumentOutline />,
            active_icon: <IoDocument />,
            link: '/drafts'
        },
    ];

    const AdditionalMenuTitles = [
        {
            title: "Chats",
            icon: <MdOutlineChat />,
            active_icon: <MdMarkUnreadChatAlt />,
            link: '/chats'
        },
        {
            title: "All Mail",
            icon: <LuMails />,
            active_icon: <LuMails />,
            link: '/all-mail'
        },
        {
            title: "Spam",
            icon: <MdOutlineReport />,
            active_icon: <MdOutlineReport />,
            link: ''
        },
        {
            title: "Trash",
            icon: <FaRegTrashAlt />,
            active_icon: <FaTrashAlt />,
            link: '/trash'
        },

    ];

    const [compose, setCompose] = useState(false);
    const [addMenu, setAddMenu] = useState(false);
    const handleComposeOpen = () => setCompose(true);
    const handleAdditionalMenu = () => {
        if (!addMenu) {
            setAddMenu(true);
        } else {
            setAddMenu(false);
        }
    }


    const location = useLocation();
    return (
        <>
            <div className={`flex z-20 flex-col h-screen ${isManualOpen ? "" : "fixed"}`}>
                <div
                    className={`flex flex-col ${isOpen ? "w-64" : "w-[4.8rem]"} h-full bg-[#f6f8fd] transition-all overflow-hidden`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className={`side-links flex flex-col items-start pr-6`} >
                        <div className={`flex items-center mb-4 justify-between space-x-2 gap-4 mx-4 rounded-xl hover:shadow-lg transition-all cursor-pointer ${isOpen ? "bg-[#c2e7fb]" : ""}`} onClick={handleComposeOpen}>
                            <div className="flex items-center gap-2">
                                <div className={`text-black p-3 rounded-xl text-2xl ${isOpen ? "" : "bg-[#c2e7fb]"}`}>
                                    <MdEdit />
                                </div>
                                <span
                                    className={`text-black whitespace-nowrap transition-opacity duration-100 pr-4 text-sm ${isOpen ? "opacity-100" : "opacity-0"}`}
                                >
                                    Compose
                                </span>
                            </div>
                        </div>

                        {MenuTitles.map((menu, index) => (
                            <NavLink
                                key={index}
                                to={menu.link}
                                className={`flex items-center justify-between space-x-2 px-6 cursor-pointer ${isOpen ? "nav hover:bg-gray-200 w-full rounded-r-full" : ""}`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`icon text-black p-2 text-xl ${!isOpen && location.pathname === menu.link ? "hover:bg-gray-200 rounded-full bg-[#c2e7fb]" : ""}`}>
                                        {location.pathname === menu.link ? menu.active_icon : menu.icon}
                                    </div>
                                    <span className={`text-black whitespace-nowrap transition-opacity text-sm duration-100 ${isOpen ? "opacity-100" : "opacity-0"}`}>
                                        {menu.title}
                                    </span>
                                </div>
                                {/* <div className="text-sm">1234</div> */}
                            </NavLink>
                        ))}

                        <div className={`flex items-center justify-between space-x-2 px-6 rounded-r-full cursor-pointer w-full ${isOpen ? "bg-[#c2e7fb]" : ""}`} onClick={handleAdditionalMenu}>
                            <div className="flex items-center gap-4">
                                <div className={`text-black p-2 rounded-full text-lg ${isOpen ? "" : "bg-[#c2e7fb]"}`}>
                                    {addMenu ? <FaAngleUp /> : <FaAngleDown />}
                                </div>
                                <span
                                    className={`text-black whitespace-nowrap transition-opacity duration-100 pr-4 text-sm ${isOpen ? "opacity-100" : "opacity-0"}`}
                                >
                                    {addMenu ? 'Less' : 'More'}
                                </span>
                            </div>
                        </div>

                        {addMenu && (
                            AdditionalMenuTitles.map((menu, index) => (
                                <NavLink
                                    key={index}
                                    to={menu.link}
                                    className={`flex items-center justify-between space-x-2 px-6 cursor-pointer ${isOpen ? "nav hover:bg-gray-200 w-full rounded-r-full" : ""}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`icon text-black p-2 text-xl ${!isOpen && location.pathname === menu.link ? "hover:bg-gray-200 rounded-full bg-[#c2e7fb]" : ""}`}>
                                            {location.pathname === menu.link ? menu.active_icon : menu.icon}
                                        </div>
                                        <span className={`text-black whitespace-nowrap transition-opacity text-sm duration-100 ${isOpen ? "opacity-100" : "opacity-0"}`}>
                                            {menu.title}
                                        </span>
                                    </div>
                                    {/* <div className="text-sm">1234</div> */}
                                </NavLink>
                            ))
                        )}




                    </div>
                </div>
            </div>
            <ComposePopup compose={compose} setCompose={setCompose} />

        </>
    );
};

export default SideDrawer;
