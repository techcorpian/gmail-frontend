import React, { useState } from 'react'
import axios from 'axios';
import ComposeModal from './ComposeModal.jsx';
import { MdOutlineMinimize } from "react-icons/md";
import { MdOutlineMaximize } from "react-icons/md";
import { FiMaximize2 } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import AuthService from '../../../services/auth.service.jsx'
import { useToast } from '../hooks/useToast.jsx';

import { BiFontColor } from "react-icons/bi";
import { MdAttachFile } from "react-icons/md";
import { IoMdLink } from "react-icons/io";
import { MdOutlineAddReaction } from "react-icons/md";
import { LiaGoogleDrive } from "react-icons/lia";
import { MdOutlineImage } from "react-icons/md";
import { LiaPenSolid } from "react-icons/lia";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";

const ComposePopup = ({ compose, setCompose }) => {
    const [toAddress, setToAddress] = useState('');
    const [addressArr, setAddressArr] = useState([]);
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const currentUser = AuthService.getCurrentUser();
    const userFirstname = currentUser.firstname;
    const userLastname = currentUser.lastname;
    const userMail = currentUser.email;

    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    const { showToast, ToastComponent } = useToast();

    // console.log('myUser:', userFirstname + userLastname);
    // console.log('myEmail:', userMail);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent form submission or page reload
            addAddressToArray();
        }
    };
    
    const handleBlur = () => {
        addAddressToArray();
    };
    
    const addAddressToArray = () => {
        if (toAddress.trim() !== '') {
            setAddressArr([...addressArr, toAddress]); // Add value to the array
            setToAddress(''); // Clear the input field
        }
    };


    const handleToDelete = (indexToRemove) => {
        setAddressArr(addressArr.filter((_, index) => index !== indexToRemove));
    }

    const validateUser = () => {
        if (addressArr == '') {
            showToast('Atleast 1 Email ID is Required', 'warning');
            return false;
        } else if (subject == '') {
            showToast('Subject is Required', 'warning');
            return false;
        }
        return true;
    }
    

    const handleSendMessage = async () => { // Added async keyword here
        if (!validateUser()) return;
        try {
            const res = await axios.post(`${apiUrl}/inbox/send`, {
                addressArr,
                subject,
                message,
                userFirstname,
                userLastname,
                userMail

            });
            console.log(res.data); // Handle registration success
            showToast('Success! Your email has been sent.', 'success');
            setCompose(false);
            setSubject('');
            setMessage('');
            setToAddress('');
            setAddressArr([]);

        } catch (err) {
            console.error(err.response?.data || err.message); // Handle error and null-safe access to response data
        }
    };

    const [composeMin, setComposeMin] = useState(false);
    const handleComposeMin = () => {
        setComposeMin(true);
    }

    const handleComposeMax = () => {
        setComposeMin(false);
    }

    const [composeMax, setComposeMax] = useState(false);
    const handleComposeModalOpen = () => {
        setComposeMax(true);
        setCompose(false);
    }

    const handleComposeClose = async () => {
        if (addressArr == '' && subject == '' && message == '') {
            // showToast('Type any Input', 'success');
            console.log('not saved to drafts');
        }
        else {
            try {
                const res = await axios.post(`${apiUrl}/draft/send`, {
                    addressArr,
                    subject,
                    message,
                    userFirstname,
                    userLastname,
                    userMail

                });
                console.log(res.data); // Handle registration success
                showToast('Email sent to drafts.', 'success');
                setCompose(false);
                setSubject('');
                setMessage('');
                setToAddress('');
                setAddressArr([]);

            } catch (err) {
                console.error(err.response?.data || err.message); // Handle error and null-safe access to response data
            }
        }

        setComposeMax(false);
        setComposeMin(false);
        setCompose(false);
    }

    const discardDrafts = async () => {
        console.log('discard drafts');
        showToast('Draft Discarded.', 'info');
        setCompose(false);
        setSubject('');
        setMessage('');
        setToAddress('');
        setAddressArr([]);
        setComposeMax(false);
        setComposeMin(false);
        setCompose(false);
    }

    return (
        <>
            < div className={`absolute bottom-0 right-14 bg-white w-1/2 rounded-t-xl shadow-xl z-10 ${compose ? "block" : "hidden"}`
            }>
                <div className="flex justify-between text-sm items-center bg-cyan-200 py-3 px-5 rounded-t-xl" onClick={composeMin ? handleComposeMax : handleComposeMin}>
                    <div>New Message</div>
                    <div className="flex gap-2 items-center z-10">
                        <div onClick={handleComposeMin} className="cursor-pointer">{!composeMin ? <MdOutlineMinimize /> : <MdOutlineMaximize />}</div>
                        <div onClick={handleComposeModalOpen}><FiMaximize2 /></div>
                        <div onClick={handleComposeClose} className="cursor-pointer"><IoMdClose /></div>
                    </div>
                </div>
                <div className={composeMin ? "hidden" : ""}>
                    <div className="flex py-2 px-5 gap-2 text-sm items-center">
                        <div>To</div>
                        {
                            addressArr.map((address, index) => (
                                <div className="flex items-center gap-1 bg-gray-200 py-1 px-2 rounded-full">
                                    <div>{address}</div>
                                    <div onClick={() => handleToDelete(index)}><IoMdClose /></div>
                                </div>
                            ))
                        }
                        <input type="text" value={toAddress} className="focus:outline-none w-full" onChange={(e) => setToAddress(e.target.value)} onKeyDown={handleKeyDown} onBlur={handleBlur}/>
                    </div>
                    <hr />
                    <div className="flex py-2 px-5 gap-2 text-sm items-center">
                        {/* <div>Subject</div> */}
                        <input type="text" value={subject} className="focus:outline-none w-full" onChange={(e) => setSubject(e.target.value)} placeholder="Subject" />
                    </div>
                    <hr />
                    <div className="flex py-2 px-5 gap-2 text-sm items-center">
                        {/* <div>Subject</div> */}
                        <textarea value={message} className="focus:outline-none w-full resize-none" rows="18" onChange={(e) => setMessage(e.target.value)}> </textarea>
                    </div>
                    <div className="flex items-center relative bottom-0 justify-between px-5 py-3">
                        <div className='flex items-center gap-4'>
                            <div onClick={handleSendMessage} className="bg-blue-700 text-white text-sm py-2 px-5 rounded-full cursor-pointer">Send</div>

                            {/* fontButtton */}
                            <div className='text-xl'><BiFontColor /></div>

                            {/* AttachFileButton */}
                            <div className='text-xl'><MdAttachFile /></div>

                            {/* InsertLinkButton */}
                            <div className='text-xl'><IoMdLink /></div>

                            {/* reactionButton */}
                            <div className='text-xl'><MdOutlineAddReaction /></div>

                            {/* driveButton */}
                            <div className='text-xl'><LiaGoogleDrive /></div>

                            {/* insertPhotoButton */}
                            <div className='text-xl'><MdOutlineImage /></div>

                            {/* insertSignatureButton */}
                            <div className='text-xl'><LiaPenSolid /></div>

                            {/* moreButton */}
                            <div className='text-xl'><BsThreeDotsVertical /></div>
                        </div>
                        <div onClick={discardDrafts}>
                            <FaRegTrashAlt />
                        </div>
                    </div>
                </div>
            </div>
            {composeMax ? <ComposeModal composeMax={composeMax} composeMin={composeMin} handleComposeClose={handleComposeClose} handleComposeMin={handleComposeMin} handleComposeMax={handleComposeMax} addressArr={addressArr} handleToDelete={handleToDelete} toAddress={toAddress} setToAddress={setToAddress} handleKeyDown={handleKeyDown} subject={subject} setSubject={setSubject} message={message} setMessage={setMessage} handleSendMessage={handleSendMessage} /> : ''}
            <ToastComponent />
        </>
    )
}

export default ComposePopup