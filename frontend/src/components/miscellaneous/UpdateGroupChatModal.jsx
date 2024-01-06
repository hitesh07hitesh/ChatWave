import React, { useState } from 'react';
import axios from 'axios';
import { ChatState } from '../../Context/ChatProvider';
import UserListItem from '../userAvtar/UserListItem';
import Toastify from 'toastify-js'
import { BASE_URL } from '../../config';

const UpdateGroupChatModal = ({ fetchMessages, fetchAgain, setFetchAgain }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [groupChatName, setGroupChatName] = useState('');
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameloading, setRenameLoading] = useState(false);

    // const selectedChat = {
    //     chatName: 'Sample Chat',
    //     users: [], // Assuming it's an array of users
    //     groupAdmin: {}, // Assuming it's an object representing the group admin
    // };

    const { selectedChat, setSelectedChat, user } = ChatState(); // Assuming it's an object representing the current user

    // const handleSearch = async (query) => {
    //     setSearch(query);
    //     if (!query) {
    //         return;
    //     }

    //     try {
    //         setLoading(true);





    //         const config = {
    //             headers: {
    //                 Authorization: `Bearer ${user.token}`,
    //             },
    //         };
    //         const { data } = await axios.get(`http://127.0.0.1:5000/api/user?search=${search}`, config);
    //         console.log(data);
    //         setLoading(false);
    //         setSearchResult(data);
    //     } catch (error) {
    //         console.error(error);
    //         setLoading(false);
    //     }
    // };

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

    const handleRename = async () => {
        if (!groupChatName) return;

        try {
            setRenameLoading(true);
            const response = await axios.put(
                `${BASE_URL}/chat/rename`,
                {
                    chatId: selectedChat._id,
                    chatName: groupChatName,
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );
            if (response) {
                Toastify({
                    text: "Rename successfull",
                    style: {
                        minWidth: '5rem',
                        background: "#01000c1f",
                        border: '1px solid white',
                        backdropFilter: 'blur(22px)'
                        // background: "linear-gradient(to right, #00b09b, #96c93d)",
                    }
                }).showToast();
            }

            setSelectedChat(response.data);
            setFetchAgain(!fetchAgain);

            console.log(response);
            setFetchAgain(!fetchAgain);
            setRenameLoading(false);
        } catch (error) {
            console.error(error);
            setRenameLoading(false);
            Toastify({
                text: error.responce,
                style: {
                    minWidth: '5rem',
                    background: "#01000c1f",
                    border: '1px solid white',
                    backdropFilter: 'blur(22px)'
                    // background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
            }).showToast();
        }
        setGroupChatName('');
    };

    const handleAddUser = async (user1) => {
        if (selectedChat.users.find((u) => u._id === user1._id)) {
            console.error('User Already in group!');
            return;
        }

        if (selectedChat.groupAdmin._id !== user._id) {
            console.error('Only admins can add someone!');
            return;
        }

        try {
            setLoading(true);


            // const config = {
            //     headers: {
            //         Authorization: `Bearer ${user.token}`,
            //     },
            // };
            // const { data } = await axios.put(
            //     `http://127.0.0.1:5000/api/chat/groupadd`,
            //     {
            //         chatId: selectedChat._id,
            //         userId: user1._id,
            //     },
            //     config
            // );

            const response = await axios.put(
                `${BASE_URL}/chat/rename`,
                {
                    chatId: selectedChat._id,
                    chatName: groupChatName,
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );
            console.log(response)
            if (response) {
                Toastify({
                    text: "User Added",
                    style: {
                        minWidth: '5rem',
                        background: "#01000c1f",
                        border: '1px solid white',
                        backdropFilter: 'blur(22px)'
                        // background: "linear-gradient(to right, #00b09b, #96c93d)",
                    }
                }).showToast();
            }

            setFetchAgain(!fetchAgain);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
        setGroupChatName('');
    };

    const handleRemove = async (user1) => {
        if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
            console.error('Only admins can remove someone!');
            return;
        }

        try {
            setLoading(true);

            const response = await axios.put(
                `${BASE_URL}/chat/remove`,
                {
                    chatId: selectedChat._id,
                    userId: user1._id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );

            if (response) {
                Toastify({
                    text: "remove successfull",
                    style: {
                        minWidth: '5rem',
                        background: "#01000c1f",
                        border: '1px solid white',
                        backdropFilter: 'blur(22px)'
                        // background: "linear-gradient(to right, #00b09b, #96c93d)",
                    }
                }).showToast();
            }


            // const config = {
            //     headers: {
            //         Authorization: `Bearer ${user.token}`,
            //     },
            // };
            // await axios.put(
            //     `http://127.0.0.1:5000/api/chat/groupremove`,
            //     {
            //         chatId: selectedChat._id,
            //         userId: user1._id,
            //     },
            //     config
            // );

            user1._id === user._id ? setSelectedChat() : setFetchAgain(!fetchAgain);
            // fetchMessages();
            setLoading(false);
            console.log("ok")
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
        setGroupChatName('');
    };

    return (
        <>
            <button className="flex" onClick={() => setIsOpen(true)}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>

            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto abg-[#0000004d]  backdrop-blur-lg">
                    <div className="flex flex-col items-center justify-center min-h-screen">
                        {/* <div className="relative inset-0 bg-black opacity-50"></div> */}
                        <div className="relative text-[1rem] bg-[#0000004d] p-4 rounded w-full max-w-md text-white">
                            <h1 className=" font-bold mb-4 text-center ">{selectedChat.chatName}</h1>
                            <button className="absolute top-0 right-0 p-4" onClick={() => setIsOpen(false)}>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                            <div className="flex flex-col items-center">
                                <div className="w-full flex flex-wrap pb-3">
                                    {selectedChat.users.map((u) => (
                                        <div key={u._id} className="flex items-center mb-2 mr-2" onClick={handleRemove}>
                                            <img src={u.pic} alt={u.name} className="h-8 w-8 rounded-full object-cover font-bold flex justify-center items-center" />
                                            <span className="ml-2">{u.name}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex text-black w-full gap-1">
                                    <input
                                        type="text"
                                        placeholder="Chat Name "
                                        className=" aborder border-gray-300 rounded w-full text-black focus:outline-none px-2"
                                        value={groupChatName}
                                        onChange={(e) => setGroupChatName(e.target.value)}
                                    />
                                    <button
                                        className="bg-blue-500 text-white  px-4 rounded"
                                        onClick={handleRename}
                                    >
                                        Update
                                    </button>
                                </div>
                                <div className='w-full'>
                                    <input
                                        type="text"
                                        placeholder="Add User to group "
                                        className="w-full mt-1  border border-gray-300 rounded text-black focus:outline-none px-2"
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className='w-full'>
                                    <div className='overflow-y-scroll max-h-[10rem]'>
                                        {loading ? (
                                            <div>Loading...</div>
                                        ) : (
                                            searchResult.map((user) => (
                                                <UserListItem key={user._id} user={user}
                                                    handleFunction={() => handleAddUser(user)}>
                                                </UserListItem>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <button onClick={() => handleRemove(user)} className="bg-red-500 text-white py-2 px-4 rounded">
                                    Leave Group
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default UpdateGroupChatModal;




// import React, { useState } from 'react'

// const UpdateGroupChatModal = () => {
//     const [groupChatName, setGroupChatName] = useState();
//     const [search, setSearch] = useState("");
//     const [searchResult, setSearchResult] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [renameloading, setRenameLoading] = useState(false);

//     return (
//         <>

//             <button className="flex" onClick={onOpen}>
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
//                 </svg>
//             </button>

//             {isOpen && (
//                 <div className="fixed inset-0 overflow-y-auto">
//                     <div className="flex items-center justify-center min-h-screen">
//                         <div className="fixed inset-0 bg-black opacity-50"></div>
//                         <div className="bg-white p-4 rounded w-full max-w-md">
//                             <h1 className="text-3xl font-bold mb-4 text-center">{selectedChat.chatName}</h1>
//                             <button className="absolute top-0 right-0 p-4" onClick={onClose}>
//                                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
//                                 </svg>
//                             </button>
//                             <div className="flex flex-col items-center">
//                                 <div className="w-full flex flex-wrap pb-3">
//                                     {selectedChat.users.map((u) => (
//                                         <div key={u._id} className="flex items-center mb-2">
//                                             {/* Render User Badge */}
//                                         </div>
//                                     ))}
//                                 </div>
//                                 <div className="flex">
//                                     <input
//                                         type="text"
//                                         placeholder="Chat Name"
//                                         className="mr-2 p-2 border border-gray-300 rounded"
//                                         value={groupChatName}
//                                         onChange={(e) => setGroupChatName(e.target.value)}
//                                     />
//                                     <button
//                                         className="bg-blue-500 text-white py-2 px-4 rounded"
//                                         onClick={handleRename}
//                                         disabled={renameloading}
//                                     >
//                                         Update
//                                     </button>
//                                 </div>
//                                 <input
//                                     type="text"
//                                     placeholder="Add User to group"
//                                     className="mt-1 p-2 border border-gray-300 rounded"
//                                     onChange={(e) => handleSearch(e.target.value)}
//                                 />
//                                 {loading ? (
//                                     <div>Loading...</div>
//                                 ) : (
//                                     searchResult?.map((user) => (
//                                         <div key={user._id} onClick={() => handleAddUser(user)}>
//                                             {/* Render User List Item */}
//                                         </div>
//                                     ))
//                                 )}
//                             </div>
//                             <div className="mt-4">
//                                 <button onClick={() => handleRemove(user)} className="bg-red-500 text-white py-2 px-4 rounded">
//                                     Leave Group
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     )
// }

// export default UpdateGroupChatModal
