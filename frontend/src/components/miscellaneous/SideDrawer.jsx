import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { ChatState } from '../../Context/ChatProvider'
import ProfileModel from './ProfileModel'
import { useNavigate } from 'react-router-dom'
import Toastify from 'toastify-js'
import { IoCloseOutline } from "react-icons/io5";
import axios from 'axios';
import { BASE_URL } from '../../config';
import UserListItem from '../userAvtar/UserListItem'
import { getSender } from '../../config/ChatLogics'
const SideDrawer = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("")
    const [serachResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingChat, setLoadingChat] = useState("")
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [notificationBarShow, setNotificationBarShow] = useState(false);
    // const { user, setChats, chats, setSelectedChat } = ChatState()
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const navigate = useNavigate()

    const { selectedChat, setSelectedChat, user, notification, setNotification } = ChatState()

    const logoutHandler = () => {
        localStorage.removeItem("userInfo")
        navigate('/signup')
        Toastify({
            text: `Logout successfully `,
            // className: "info",
            style: {
                // background: "linear-gradient(to right, #01000c1f, #ffffff99)",
                minWidth: '6rem',
                background: "#01000c1f",
                border: '1px solid white',
                backdropFilter: 'blur(22px)'

            }
        }).showToast();
    }

    const handleSearch = () => {
        console.log(search)
    }


    // const handleInputChange = async (e) => {
    //     // const searchValue = e.target.value;
    //     setSearch(e.target.value);
    //     // console.log(searchValue)
    //     // console.log(e.target.value)

    //     try {
    //         setLoading(true)
    //         axios.get(`${BASE_URL}/auth/find?search=${e.target.value}`, {
    //             headers: {
    //                 Authorization: `Bearer ${user.token}`
    //             }
    //         })
    //             .then((responce) => {
    //                 // console.log(res);
    //                 console.log(responce.data);
    //                 setSearchResult(responce.data)
    //             });
    //         setLoading(false)
    //     } catch (error) {
    //         console.log(error)

    //     }
    // }
    const handleInputChange = async (e) => {
        setSearch(e.target.value);

        try {
            setLoading(true);
            const response = await axios.get(`${BASE_URL}/auth/find?search=${e.target.value}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            setSearchResult(response.data);
            console.log(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };


    const accessChat = async (userId) => {


        try {
            setLoading(true);
            const response = await axios.post(`${BASE_URL}/chat/`, { userId }, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            console.log(response.data);
            // setChats(userId)
            if (!chats.find((c) => c._id === response.data._id)) setChats([response.data, ...chats]);
            setSelectedChat(response.data)
            setLoading(false);
            setIsOpen(false)
        } catch (error) {
            console.log(error)
            console.log(error.response.data);
        }


    }


    return (
        <>
            <div className='flex justify-between text-center w-full px-[10px] py-[5px]   bg-[#0000004d]'>

                <button className='flex py-2 my-auto bg-[#0000004d] rounded-full  px-4 duration-500 arounded-[4px] ' onClick={() => setIsOpen(true)}>
                    <CiSearch className='h-[2rem] w-[2rem] text-white' />
                    {/* <p className='my-auto'>Search User</p> */}
                    <p className="hidden md:flex my-auto text-white pr-1">Search</p>
                </button>

                <div className="my-auto ">
                    <h2 className='text-white text-3xl font-bold cursor-default'>ChatWave</h2>
                </div>
                <div className="my-auto ">

                    <div className="flex items-center space-x-4">
                        {/*  */}


                        <div className=" flex items-center space-x-4 relative">
                            <div className="relative">
                                {/* <button className="p-1" onClick={() => setNotificationBarShow(!notificationBarShow)}>
                                    <IoIosNotificationsOutline className='h-[2rem] w-[2rem] text-white' />
                                </button>
                                <div className="absolute top-[14px] right-[14px] -mt-1 -mr-1 bg-red-500 text-white rounded-full p-1">

                                </div> */}
                                <div className="relative inline-block text-left">
                                    {/* Tailwind equivalent of MenuButton */}
                                    <button className="p-1" onClick={() => setNotificationBarShow(!notificationBarShow)}>
                                        <IoIosNotificationsOutline className='h-[2rem] w-[2rem] text-white' />
                                        {notification.length > 0 && (
                                            <div className="absolute top-[14px] right-[14px] -mt-1 -mr-1 bg-red-500 text-white rounded-full p-[5px]">
                                            </div>
                                        )}
                                    </button>

                                    {notificationBarShow &&
                                        <div className="origin-top-left absolute left-0 mt-2 mr-8 w-[10rem]  shadow-lg bg-[#0000004d] text-white backdrop-blur-lg z-10">
                                            <div className="" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                                {!notification.length && (
                                                    <p className="block px-4 py-2 text-sm text-white border-[1px]">No New Messages</p>
                                                )}
                                                {notification.map((notif) => (
                                                    // Tailwind equivalent of MenuItem
                                                    <button
                                                        key={notif._id}
                                                        onClick={() => {
                                                            setSelectedChat(notif.chat);
                                                            setNotification(notification.filter((n) => n !== notif));
                                                        }}
                                                        className="block px-4 py-2 text-sm  border-[1px]"
                                                        role="menuitem"
                                                    >
                                                        {notif.chat.isGroupChat
                                                            ? `New Message in ${notif.chat.chatName}`
                                                            : `New Message from ${getSender(user, notif.chat.users)}`}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>}

                                </div>
                            </div>


                            <div className="relative group">
                                <button
                                    onClick={() => { setIsDropdownOpen(!isDropdownOpen); }}
                                    className="abg-white bg-[#0000004d] text-white p-2 md:px-4 rounded-full flex items-center space-x-2"
                                >
                                    <img

                                        src={user.pic}
                                        alt={user.name.charAt(0).toUpperCase()}
                                        className="h-8 w-8 rounded-full object-cover text-3xl font-bold flex justify-center items-center"
                                    />
                                    <span className='capitalize hidden md:flex'>{user.name}</span>
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute right-0 top-full mt-2 bg-[#0000004d]  abg-white border border-gray-200 backdrop-blur-lg ">
                                        <ul className="space-y-2">
                                            <li>
                                                <ProfileModel user={user}>
                                                    <button className="block py-2 px-4 text-white w-full text-left" >
                                                        My Profile
                                                    </button>
                                                </ProfileModel>
                                                {/* <button className="block py-2 px-4 text-white w-full text-left">
                                                    My Profile
                                                </button> */}
                                            </li>
                                            <li>
                                                <hr className="amy-2 border-t border-gray-200" />
                                            </li>
                                            <li>
                                                <button
                                                    onClick={logoutHandler}
                                                    className="block py-2 px-4 text-red-500  w-full text-left"
                                                >
                                                    Logout
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div >
                {/* <div className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}> */}
                <div className={`fixed inset-0 z-50 hidden`}>
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white p-8 max-w-md rounded">
                            <h2 className="text-2xl mb-4">Search Users</h2>
                            <div className="pb-2 flex">
                                <input
                                    type="text"
                                    placeholder="Search by name, email or username"
                                    className="mr-2 p-2 border border-gray-300 rounded"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <button
                                    onClick={handleSearch}
                                    className="bg-blue-500 text-white py-2 px-4 rounded"
                                >
                                    Go
                                </button>
                            </div>
                            {loading ? (
                                <div>Loading...</div>
                            ) : (
                                serachResult.map((user) => (
                                    <div key={user._id} onClick={() => accessChat(user._id)}>
                                        {/* Render your user list item */}
                                    </div>
                                ))
                            )}
                            {loadingChat && <div>Loading chat...</div>}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {/* <button ref={btnRef} colorScheme="teal" onClick={openDrawer}>
                    Open
                </button> */}
                {isOpen && (
                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="fixed inset-y-0 left-0 max-w-full flex">
                                <div className="w-screen max-w-md">
                                    <div className="h-full flex flex-col bg-[#0000004d] overflow-y-scroll backdrop-blur-lg">
                                        <div className="p-6">
                                            <button className="absolute top-0 right-0 p-4" onClick={() => setIsOpen(false)}>
                                                <IoCloseOutline className='h-[2rem] w-[2rem] text-white' />
                                            </button>
                                            {/* <input placeholder="Type here..." /> */}
                                            <input
                                                type="text"
                                                placeholder="Search by name or email"
                                                className="mr-2 p-2 mx-2 w-[80%] rounded focus:border-none focus:outline-none"
                                                value={search}
                                                onChange={handleInputChange}
                                            />

                                        </div>
                                        <div>
                                            {loading ? (
                                                <div>Loading...</div>
                                            ) : (
                                                serachResult.map((user) => (
                                                    <UserListItem key={user._id} user={user} handleFunction={() => accessChat(user._id)} >


                                                    </UserListItem>

                                                ))
                                            )}

                                        </div>
                                        {/* <div className="p-4 bg-gray-100 border-t mt-auto">
                                            <button >
                                                Cancel
                                            </button>
                                            <button >Save</button>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default SideDrawer
