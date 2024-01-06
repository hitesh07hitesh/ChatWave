import React from 'react'
import { ChatState } from '../Context/ChatProvider'
import SingleChat from './SingleChat'

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
    const { selectedChat } = ChatState()
    return (
        // <div className={`flex ${selectedChat ? 'flex' : 'hidden'} md:flex items-center flex-col p-3 bg-white w-full md:w-68% rounded-lg border-1 border-gray-300`}>
        // <div className={`items-center flex-col p-3 bg-[#0000004d]  md:w-68 w-full 
        // hidden md:flex   ${selectedChat ? "" : "sm:flex"}  `}>
        <>
            <div className={`items-center flex-col md:p-3 bg-[#0000004d] md:w-68 w-full 
                flex ${selectedChat ? "sm:flex" : "hidden"}`}>
                <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
            </div>
            <div className={`hidden  ${selectedChat ?  "hidden": "md:flex"}   w-full justify-center h-full items-center flex-col md:p-3 bg-[#0000004d] mx-auto text-xl  text-white pb-3`} >
                Click on a user to start chatting
            </div>
        </>
    )
}

export default ChatBox


// <div className={`items-center flex-col p-3 bg-[rgba(0,0,0,0.3)]  md:w-68 w-full hidden md:flex   ${selectedChat ? "flex" : "flex"}`}>
//             ${selectedChat ? "hi" : "flex"}
