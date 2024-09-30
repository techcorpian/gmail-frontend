import React from 'react'
import { MdOutlineMinimize } from "react-icons/md";
import { MdOutlineMaximize } from "react-icons/md";
import { FiMinimize2 } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

const ComposeModal = ({ composeMin, handleComposeClose, handleComposeMin, handleComposeMax, addressArr, handleToDelete, toAddress, setToAddress, handleKeyDown, subject, setSubject, message, setMessage, handleSendMessage}) => {
  return (
    <div className='flex justify-center items-center absolute top-0 h-screen bg-black/20 w-full z-40 py-9'>
        <div className='relative bg-white w-3/4 h-full rounded-lg'>
            <div className="flex justify-between text-sm items-center bg-cyan-200 py-3 px-5 rounded-t-xl">
                <div>New Message</div>
                <div className="flex gap-2 items-center z-10">
                    <div onClick={handleComposeMin} className="cursor-pointer z-20">{!composeMin ?<MdOutlineMinimize /> : <MdOutlineMaximize />}</div>
                    <div><FiMinimize2 /></div>
                    <div onClick={handleComposeClose} className="cursor-pointer"><IoMdClose /></div>
                </div>
            </div>
            <div>
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
                    <input type="text" value={toAddress} className="focus:outline-none w-full" onChange={(e) => setToAddress(e.target.value)} onKeyDown={handleKeyDown} />
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
                <div className="flex absolute bottom-0 py-3 px-5">
                    <div onClick={handleSendMessage} className="bg-blue-700 text-white text-sm py-2 px-5 rounded-full cursor-pointer">Send</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ComposeModal