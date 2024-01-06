import { useState } from 'react';
import { IoAdd } from 'react-icons/io5';
import { IoCloseOutline } from "react-icons/io5";
import { BASE_URL } from '../../config';
import { ChatState } from '../../Context/ChatProvider';
import axios from 'axios';
import Toastify from 'toastify-js'
import UserListItem from '../userAvtar/UserListItem'

const GroupChatModal = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [groupChatName, setGroupChatName] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user, chats, setChats } = ChatState()

    const handleGroup = (userToAdd) => {
        if (selectedUsers.includes(userToAdd)) {

            Toastify({
                text: "USer already added",
                style: {
                    minWidth: '5rem',
                    background: "#01000c1f",
                    border: '1px solid white',
                    backdropFilter: 'blur(22px)'
                    // background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
            }).showToast();
            return;
        }

        setSelectedUsers([...selectedUsers, userToAdd]);
    };

    const handleDelete = (delUser) => {
        setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
    };
    const handleSubmit = async () => {
        if (!groupChatName || !selectedUsers) {

            Toastify({
                text: "Please fill all the feilds",
                style: {
                    minWidth: '5rem',
                    background: "#01000c1f",
                    border: '1px solid white',
                    backdropFilter: 'blur(22px)'
                    // background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
            }).showToast();
            return;
        }

        try {

            const response = await axios.post(
                `${BASE_URL}/chat/group`,
                {
                    name: groupChatName,
                    users: JSON.stringify(selectedUsers.map((u) => u._id)),
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );


            // const response = await axios.post(`${BASE_URL}/chat/group`,
            //     {
            //         {name: groupChatName,
            //         users: JSON.stringify(selectedUsers.map((u))=> u._id)}
            //         headers: {
            //             Authorization: `Bearer ${user.token}`,

            //     }
            // } 


            // const { data } = await axios.post(
            //     `http://127.0.0.1:5000/api/chat/group`,
            //     {
            //         name: groupChatName,
            //         users: JSON.stringify(selectedUsers.map((u) => u._id)),
            //     },
            //     config
            // );


            console.log(response)
            // setChats([data, ...chats]);
            setIsOpen(false)
            Toastify({
                text: "New Group Chat Created!",
                className: "info",
                style: {
                    minWidth: '5rem',
                    background: "#01000c1f",
                    border: '1px solid white',
                    backdropFilter: 'blur(22px)'
                    // background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
            }).showToast();
        } catch (error) {
            Toastify({
                text: error.response.data,
                className: "info",
                style: {
                    minWidth: '5rem',
                    background: "#01000c1f",
                    border: '1px solid white',
                    backdropFilter: 'blur(22px)'
                }
            }).showToast();
        }
    };


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


    return (
        <>
            <span onClick={() => { setIsOpen(!isOpen) }}>
                <button className="flex px-2 py-1 rounded bg-[#0000004d]" fontSize={{ base: '17px', md: '10px', lg: '17px' }} >
                    <IoAdd className='h-[1.5rem] w-[1.5rem]' />
                    New Group Chat
                </button>
            </span>
            {isOpen &&

                <div className="fixed inset-0 z-50 flex items-center justify-center">

                    <div className="absolute inset-0   backdrop-blur-lg text-white fontbold">

                    </div>
                    <div className="relative bg-[#0000004d] p-4 max-w-lg rounded">
                        <button
                            onClick={() => { setIsOpen(false) }}
                            className=" absolute top-0 right-0  p-2 rounded text-white"
                        >
                            <IoCloseOutline className='h-[2rem] w-[2rem]' />
                        </button>
                        <div className='flex flex-col px-8'>
                            <h1 className="text-3xl font-semibold mb-4 text-center text-white">
                                Create Group Chat
                            </h1>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-white">
                                    Chat Name
                                </label>
                                <input
                                    type="text"
                                    className="mt-1 p-2 w-full border focus:outline-none rounded text-black"
                                    placeholder="Chat Name"
                                    onChange={(e) => setGroupChatName(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-white">
                                    Add Users eg: John, Piyush, Jane
                                </label>
                                <input
                                    type="text"
                                    className="mt-1 p-2 w-full border focus:outline-none rounded text-black"
                                    placeholder="Add Users"
                                    value={search}
                                    onChange={handleInputChange}
                                // onChange={(e) => handleSearch(e.target.value)}
                                />
                            </div>
                            <div className='overflow-y-scroll max-h-[10rem]'>
                                {loading ? (
                                    <div>Loading...</div>
                                ) : (
                                    searchResult.map((user) => (
                                        <UserListItem key={user._id} user={user}
                                            handleFunction={() => handleGroup(user)}>
                                        </UserListItem>
                                    ))
                                )}
                            </div>
                            <div className="mb-4 w-full flex flex-wrap">
                                {selectedUsers.map((u) => (
                                    <div
                                        key={u._id}
                                        className="bg-blue-500 text-white p-2 m-1 rounded cursor-pointer"
                                        onClick={() => handleDelete(u)}
                                    >
                                        {u.username}
                                    </div>
                                ))}
                            </div>
                            {/* {loading ? (
                                <div>Loading...</div>
                            ) : (
                                searchResult?.slice(0, 4).map((user) => (
                                    <div
                                        key={user._id}
                                        className="bg-gray-200 p-2 m-1 rounded cursor-pointer"
                                    // onClick={() => handleGroup(user)}
                                    >
                                        {user.username}
                                    </div>
                                ))
                            )} */}
                            <div className="mt-6 text-center">
                                <button
                                    className="bg-blue-500 text-white py-2 px-4 rounded"
                                    onClick={handleSubmit}
                                >
                                    Create Chat
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default GroupChatModal;
