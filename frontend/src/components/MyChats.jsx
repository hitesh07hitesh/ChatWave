import React, { useEffect, useState } from 'react'
import { IoAdd } from "react-icons/io5";
import { ChatState } from '../Context/ChatProvider';
import GroupChatModal from './miscellaneous/GroupChatModal'
import Toastify from 'toastify-js'
import axios from 'axios';
import { BASE_URL } from '../config';
import { getSender, getSenderPic } from '../config/ChatLogics'
import groupImg from '../assets/image/group-img.jpg'

const MyChats = ({ fetchAgain }) => {
    const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
    // const [isOpen, setIsOpen] = useState(false);

    const fetchChats = async () => {
        // console.log(user._id);
        try {

            const response = await axios.get(`${BASE_URL}/chat`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            // setSearchResult(response.data);
            console.log(response.data);
            setChats(response.data)

        } catch (error) {
            Toastify({
                text: "Failed to fetech chats",
                className: "info",
                style: {
                    minWidth: '5rem',
                    background: "#01000c1f",
                    border: '1px solid white',
                    backdropFilter: 'blur(22px)'

                    // background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
            }).showToast();
        }
    };

    useEffect(() => {
        fetchChats()
    }, [fetchAgain])


    return (
        // <div className={` flex-col items-center  p-3 text-white bg-[#0000004d] w-full md:w-[40%] lg:bg-green-300 md:bg-blue-300  sm:bg-red-300  sm:${selectedChat ? "hidden" : "flex"}`}>
        // <div className={`flex-col items-center p-3 text-white bg-[#0000004d] w-full md:w-[40%]  sm:${selectedChat ? "hidden" : "flex"} ${!selectedChat && 'ahidden'}`}>
        <div className={`flex-col items-center md:p-3 text-white bg-[#0000004d] w-full md:w-[40%] min-w-[20rem]   md:flex ${selectedChat ? "hidden" : "sm:flex"}`}>
            <div className="pb-3 px-3 flex items-center w-full justify-between">
                <p className='flex px-2 font-small  text-xl  rounded-full bg-[#0000004d]'
                    fontSize={{ base: '28px', md: '30px' }}
                    fontFamily="Work sans"
                >
                    Chats
                </p>
                <div>
                    <GroupChatModal />
                </div>
                {/* <GroupChatModal>
                    <button className="flex" fontSize={{ base: '17px', md: '10px', lg: '17px' }} >
                        <IoAdd />
                        New Group Chat
                    </button>
                </GroupChatModal> */}
            </div>
            <div className="flex flex-col ap-3 abg-[#0000004d] abg-gray-200 w-full h-full arounded-lg overflow-y-hidden">
                {chats ? (
                    <div className="overflow-y-scroll ">
                        {chats.map((chat) => (
                            <div onClick={() => setSelectedChat(chat)}
                                className={`flex justify-between cursor-pointer hover:bg-transparent mb-[1px] px-3 py-2 arounded-lg ${selectedChat === chat && "bg-transparent aborder-[1px]"} bg-[#0000004d] text-white `}
                                key={chat._id}>
                                {!chat.isGroupChat
                                    ? (<div className='flex items-center capitalize'>
                                        <img className="mr-2 object-cover rounded-full cursor-pointer p-auto aborder-[2px] bg-gray-400
                                        h-10 w-10 text-3xl font-bold flex justify-center items-center" src={getSenderPic(user,chat.users)}
                                            alt={getSender(user, chat.users).charAt(0).toUpperCase()}
                                        />
                                        {getSender(user, chat.users)}
                                    </div>)
                                    :
                                    (<div className='flex items-center capitalize'>
                                        <img className="mr-2 w-10 h-10 object-cover rounded-full cursor-pointer p-auto aborder-[2px] border-white" src={groupImg} alt="" />
                                        {chat.chatName}
                                    </div>)}
                                {chat.latestMessage && (
                                    <p className="text-xs">
                                        <b>{chat.latestMessage.sender.name} : </b>
                                        {chat.latestMessage.content.length > 50
                                            ? chat.latestMessage.content.substring(0, 51) + "..."
                                            : chat.latestMessage.content}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>
                        Loading...
                    </p>
                    // <ChatLoading />
                )}
            </div>
        </div>
    )
}

export default MyChats

// 