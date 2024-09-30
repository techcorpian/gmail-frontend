import React, { useState, useContext } from "react";
import { useNavigate, useOutletContext } from 'react-router-dom';
import { DrawerContext } from "../../context/DrawerContext";
import { IoMdRefresh } from "react-icons/io";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { MdOutlineArrowDropDown, MdOutlineStarOutline, MdOutlineStarPurple500 } from "react-icons/md";
import { FiClock } from "react-icons/fi";
import { LuMailOpen } from "react-icons/lu";
import { IoMailUnreadOutline } from "react-icons/io5";
import { BiArchiveIn } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const Table = ({ emails, setEmails, Draft, fetchEmails, deleteMail, archiveMail, markAsRead, snoozeMail, ToastComponent, view }) => {
    const { isManualOpen } = useContext(DrawerContext);
    const [desktopOpenSubMenu, setDesktopOpenSubMenu] = useState(null);
    const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
    const [selectAll, setSelectAll] = useState(false);
    const { searchQuery } = useOutletContext();  // Get search query from context

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const emailsPerPage = 50;

    // Filter emails based on search query
    const filteredEmails = emails.filter(email =>
        email.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.message?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Calculate index of emails to display
    const startIndex = (currentPage - 1) * emailsPerPage;
    const endIndex = startIndex + emailsPerPage;
    const currentEmails = filteredEmails.slice(startIndex, endIndex);

    const toggleDesktopSubMenu = (index) => {
        if (desktopOpenSubMenu === index) {
            setDesktopOpenSubMenu(null);
        } else {
            setDesktopOpenSubMenu(index);
        }
    };

    const handleSelectAll = (e) => {
        const isChecked = e.target.checked;
        setSelectAll(isChecked);
        const updatedEmails = emails.map(email => ({
            ...email,
            checked: isChecked,
        }));
        setEmails(updatedEmails);
    };

    const handleCheckboxChange = (index) => {
        const updatedEmails = [...emails];
        updatedEmails[index].checked = !updatedEmails[index].checked;
        setEmails(updatedEmails);

        setSelectAll(updatedEmails.every(email => email.checked));
    };

    const handleStarToggle = (index) => {
        const updatedEmails = [...emails];
        updatedEmails[index].isStarred = !updatedEmails[index].isStarred;
        setEmails(updatedEmails);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();

        if (date.toDateString() === now.toDateString()) {
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        } else if (date.getFullYear() < now.getFullYear()) {
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        } else {
            const day = date.getDate();
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const month = monthNames[date.getMonth()];
            return `${month} ${day}`;
        }
    };

    const navigate = useNavigate();
    const viewNavigate = (id) => {
        navigate(`/${view}/${id}`);
    };

    // Handle pagination
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className={`flex flex-col ${isManualOpen ? "ml-0" : "ml-20"}`}>
            <div className="bg-white rounded-3xl">
                <div className="flex justify-between px-4 sticky top-0 bg-white rounded-t-3xl z-10 w-full py-4">
                    <div className="flex gap-4 text-lg items-center">
                        <div className="flex gap-1">
                            <input
                                type="checkbox"
                                checked={selectAll}
                                onChange={handleSelectAll}
                            />
                            <MdOutlineArrowDropDown
                                onClick={() => toggleDesktopSubMenu(1)}
                                className={`transition-transform ${desktopOpenSubMenu === 1 ? 'rotate-180' : 'rotate-0'}`}
                            />
                        </div>
                        <div onClick={() => fetchEmails()} className="cursor-pointer">
                            <IoMdRefresh />
                        </div>
                        <PiDotsThreeOutlineVerticalFill />
                    </div>
                    {/* Pagination filter */}
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-500">{startIndex + 1}-{Math.min(endIndex, filteredEmails.length)} of {filteredEmails.length}</span>
                        <div className="flex items-center gap-1">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                                className="px-3 hover:bg-gray-200 rounded-full py-3 text-gray-600 disabled:text-gray-400"
                            >
                                <FaAngleLeft />
                            </button>
                            <button
                                disabled={endIndex >= filteredEmails.length}
                                onClick={() => handlePageChange(currentPage + 1)}
                                className="px-3 hover:bg-gray-200 rounded-full py-3 text-gray-600 disabled:text-gray-400"
                            >
                                <FaAngleRight />
                            </button>
                        </div>
                    </div>
                </div>

                {filteredEmails.length > 0 ? (
                    <table className="w-full ">
                        <tbody>
                            {currentEmails.map((email, index) => (
                                <tr
                                    className="relative border-b border-gray-200 group cursor-pointer hover:border hover:border-b-2 hover:border-gray-300"
                                    key={index}
                                    onMouseEnter={() => setHoveredRowIndex(index)}
                                    onMouseLeave={() => setHoveredRowIndex(null)}
                                >
                                    <td className="text-2xl w-6 pb-2 pl-4 pr-3">
                                        <input
                                            type="checkbox"
                                            checked={email.checked || false}
                                            onChange={() => handleCheckboxChange(index)}
                                            onClick={(e) => e.stopPropagation()} // Prevent row click when checking
                                        />
                                    </td>
                                    <td className="text-base w-8 py-2">
                                        <div className="star-checkbox">
                                            <label
                                                htmlFor={`star${index}`}
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent row click
                                                    handleStarToggle(index);
                                                }}
                                            >
                                                {email.isStarred ? <MdOutlineStarPurple500 /> : <MdOutlineStarOutline />}
                                            </label>
                                        </div>
                                    </td>
                                    <div onClick={() => viewNavigate(email._id)} className="flex justify-between">
                                        <div className="">
                                            <td className="text-base pr-6 font-semibold py-2 ">
                                                {Draft ? (
                                                    <span className="text-red-500 font-normal ">{Draft}</span>
                                                ) : (
                                                    email.title
                                                )}
                                            </td>
                                            <td className={`text-base px-6 py-2 ${!email.subject ? "text-gray-400 font-light" : "font-semibold"}`}>
                                                {email.subject || '(No Subject)'}
                                                <span className="text-gray-500 font-normal"> - {email.message || '(No Description)'}</span>
                                            </td>
                                        </div>
                                        <td className="float-right text-sm font-semibold py-2 pr-4">{formatDate(email.date)}</td>
                                    </div>
                                    <td className="z-20 absolute flex items-center gap-2 top-1/2 right-1 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-white transition-opacity">
                                        <div onClick={() => archiveMail(email._id)} className="text-black text-lg hover:bg-gray-200 rounded-full p-2" ><BiArchiveIn /></div>
                                        <div onClick={() => deleteMail(email._id)} className="text-black text-lg hover:bg-gray-200 rounded-full p-2" ><RiDeleteBin6Line /></div>
                                        <div className="text-black text-lg hover:bg-gray-200 rounded-full p-2" ><FiClock /></div>
                                        {email.isRead ?
                                            <div className="text-black text-lg hover:bg-gray-200 rounded-full p-2"><LuMailOpen /></div>
                                            :
                                            <div className="text-black text-lg hover:bg-gray-200 rounded-full p-2"><IoMailUnreadOutline /></div>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="py-4 px-6">
                        <p>No emails found for "{searchQuery}"</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Table;
