import React, { useState, useContext } from "react";
import { DrawerContext } from "../../context/DrawerContext";
import { Link } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io";
import { MdOutlineArchive } from "react-icons/md";
import { MdOutlineReport } from "react-icons/md";
import { LuTrash2 } from "react-icons/lu";
import { IoMailUnreadOutline, IoMailOutline } from "react-icons/io5";
import { MdDriveFileMoveOutline } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { IoIosStarOutline, IoIosStar } from "react-icons/io";
import { VscSmiley } from "react-icons/vsc";
import { LuReply } from "react-icons/lu";

const ViewLayout = ({ emailView, backLink, tag}) => {
    const { isManualOpen } = useContext(DrawerContext);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    // const emailsPerPage = 1;
    const emailsPerPage = 50;

    // Calculate index of emails to display
    const startIndex = (currentPage - 1) * emailsPerPage;
    const endIndex = startIndex + emailsPerPage;
    const currentEmails = emailView.slice(startIndex, endIndex);

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
    return (
        <div
            className={`flex flex-col h-full ${isManualOpen ? "ml-0" : "ml-20"
                }`}
        >
            {currentEmails.length > 0 ? (
                currentEmails.map((data, index) => (
                    <div key={index} className="bg-white h-full py-4 px-6 shadow-lg rounded-2xl">
                        <div className="flex items-center text-xl justify-between">
                            <div className="flex items-center gap-9">
                                {/* BackButton */}
                                <Link to={backLink}><IoMdArrowBack /></Link>

                                {/* archiveButton */}
                                <div><MdOutlineArchive /></div>

                                {/* reportSpamButton */}
                                <div><MdOutlineReport /></div>

                                {/* deleteButton */}
                                <div><LuTrash2 /></div>

                                {/* markAsReadButton */}
                                <div><IoMailUnreadOutline /></div>

                                {/* moveToButton */}
                                <div><MdDriveFileMoveOutline /></div>

                                {/* moreButton */}
                                <div><BsThreeDotsVertical /></div>
                            </div>

                            {/* Pagination */}
                            {/* Pagination filter */}
                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-gray-500">{Math.min(endIndex, emailView.length)} of {emailView.length}</span>
                                <div className="flex items-center gap-1">
                                    <button
                                        disabled={currentPage === 1}
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        className="px-3 hover:bg-gray-200 rounded-full py-3 text-gray-600 disabled:text-gray-400"
                                    >
                                        <FaAngleLeft />
                                    </button>
                                    <button
                                        disabled={endIndex >= emailView.length}
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        className="px-3 hover:bg-gray-200 rounded-full py-3 text-gray-600 disabled:text-gray-400"
                                    >
                                        <FaAngleRight />
                                    </button>
                                </div>
                            </div>



                        </div>

                        <div className="flex items-center pl-16 py-6 gap-4">
                            <div className="text-2xl font-semibold">{data.subject}</div>
                            <div className="bg-gray-300 px-2 py-1 rounded-lg text-sm">{tag}</div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-5">
                                <div className="text-2xl px-3 py-2 rounded-full bg-gray-800 text-white">M</div>
                                <div>
                                    <div className="font-semibold">{data.title} <span className="text-gray-500 font-light text-sm">{data.fromAddress}</span></div>
                                    <div className="text-sm text-gray-500 font-light">to {data.toAddress}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 text-lg">
                                <div className="text-sm">{formatDate(data.date)}</div>

                                {/* starIcon */}
                                <div><IoIosStarOutline /></div>

                                {/* smileyIcon */}
                                <div><VscSmiley /></div>

                                {/* reply */}
                                <div><LuReply /></div>

                                {/* more */}
                                <div><BsThreeDotsVertical /></div>
                            </div>
                        </div>

                        <p className="ml-16 py-6 border-b border-gray-300">{data.message}</p>

                        {/* <hr/> */}

                        <div className="flex items-center gap-3 ml-16 py-6">
                            {/* replyButton */}
                            <div className="px-5 py-1 text-base border border-gray-400 rounded-full">Reply</div>

                            {/* forwardButton */}
                            <div className="px-5 py-1 text-base border border-gray-400 rounded-full">Forward</div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No messages to display</p>
            )}
        </div>
    )
}

export default ViewLayout


