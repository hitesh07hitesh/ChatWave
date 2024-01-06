import { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider';
import ScrollableChat from './ScrollableChat';
import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModal'
import ProfileModel from './miscellaneous/ProfileModel';
import Lottie from 'react-lottie'
// npm i react-lottie
import animationData from '../animations/typing.json'
import axios from 'axios';
import { getSender, getSenderFull } from '../config/ChatLogics';
import { IoIosArrowRoundBack } from "react-icons/io";
import { BASE_URL } from '../config';
import Toastify from 'toastify-js'
import io from 'socket.io-client'
import { BsSend } from "react-icons/bs";
import { toast } from '../config/Toast';

const ENDPOINT = "http://127.0.0.1:3000"
let socket, selectedChatCompare

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [istyping, setIsTyping] = useState(false);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const { selectedChat, setSelectedChat, user, notification, setNotification } = ChatState()

    const fetchMessage = async () => {
        if (!selectedChat) return;
        try {
            const response = await axios.get(
                `${BASE_URL}/message/${selectedChat._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );

            // c
            setMessages(response.data);
            socket.emit('join chat', selectedChat._id)
            // setNewMessage("");
        } catch (error) {
            toast("Failed to fetch chats")
            // Toastify({
            //     text: "Failed to fetch chats",
            //     className: "info",
            //     style: {
            //         minWidth: '5rem',
            //         background: "#01000c1f",
            //         border: '1px solid white',
            //         backdropFilter: 'blur(22px)'
            //     }
            // }).showToast();
        }

    };



    const sendMessage = async (event) => {
        event.preventDefault();
        socket.emit('stop typing', selectedChat._id)

        try {
            const response = await axios.post(
                `${BASE_URL}/message`,
                {
                    content: newMessage,
                    chatId: selectedChat._id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );

            console.log(response.data);
            socket.emit("new message", response.data)
            setMessages((prevMessages) => [...prevMessages, response.data]);
            setNewMessage("");
            setFetchAgain(!fetchAgain);
        } catch (error) {
            Toastify({
                text: "Failed to fetch chats",
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





    // const typingHandler = (e) => {
    //     setNewMessage(e.target.value)

    //     if (!socketConnected) return

    //     if(!typing){
    //         setTyping(true)
    //         socket.emit("typing", selectedChat._id)


    //     }
    // }

    // const typingHandler = (e) => {
    //     setNewMessage(e.target.value);

    //     if (!socketConnected) return;

    //     if (!typing) {
    //         setTyping(true);
    //         socket.emit("typing", selectedChat._id);
    //     }
    //     let lastTypingTime = new Date().getTime();
    //     var timerLength = 3000;
    //     setTimeout(() => {
    //         var timeNow = new Date().getTime();
    //         var timeDiff = timeNow - lastTypingTime;
    //         if (timeDiff >= timerLength && typing) {
    //             socket.emit("stop typing", selectedChat._id);
    //             setTyping(false);
    //         }
    //     }, timerLength);
    // };

    //______________________________


    useEffect(() => {
        socket = io(ENDPOINT)
        socket.emit("setup", user);
        socket.on('connection', () => setSocketConnected(true))
        socket.on('typing', () => setIsTyping(true))
        socket.on('stop typing', () => setIsTyping(false))
    }, [])

    // console.log("asdasdasdasdasd" + notification)

    useEffect(() => {
        fetchMessage();

        selectedChatCompare = selectedChat
    }, [selectedChat]);


    useEffect(() => {
        socket.on("message recieved", (newMessageRecieved) => {
            if (
                !selectedChatCompare ||
                selectedChatCompare._id !== newMessageRecieved.chat._id
            ) {
                if (!notification.includes(newMessageRecieved)) {
                    setNotification([newMessageRecieved, ...notification]);
                    setFetchAgain(!fetchAgain);
                }
            } else {
                setMessages([...messages, newMessageRecieved]);
            }
        });
    });

    useEffect(() => {
        socket.on('typing', () => setIsTyping(true));
        socket.on('stop typing', () => setIsTyping(false));
    }, []);

    const sendTyping = () => {
        socket.emit('typing', selectedChat._id);
    };

    const stopTyping = () => {
        socket.emit('stop typing', selectedChat._id);
    };

    const typingHandler = (e) => {
        setNewMessage(e.target.value);
        if (e.target.value.trim() !== "") {
            sendTyping();
        } else {
            stopTyping();
        }
    };

    //______________________________


    return (
        <>
            {selectedChat && (
                <>
                    <div className="text-base md:text-xl md:pb-3 px-2 font-work-sans flex justify-between items-center w-full h-[10%]">
                        <button className="flex px-2 rounded bg-[#0000004d]" onClick={() => setSelectedChat("")}>
                            <IoIosArrowRoundBack className="h-[2rem] w-[2rem] text-white" />
                        </button>

                        {messages && (
                            <div
                                className="text-2xl md:text-3xl text-white cursor-pointer rounded-full font-worksans flex justify-between items-center capitalize px-2 bg-[#0000004d] abg-[#fcfcfc53] font-medium"
                            >
                                {!selectedChat.isGroupChat ? (
                                    <ProfileModel user={getSenderFull(user, selectedChat.users)}>
                                        <div className="flex justify-center items-center">
                                            {getSender(user, selectedChat.users)}
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                            </svg>
                                        </div>
                                    </ProfileModel>
                                ) : (
                                    <>
                                        {selectedChat.chatName.toUpperCase()}
                                        <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
                                    </>
                                )}
                            </div>
                        )}
                    </div>


                    <div className="flex flex-col justify-end p-3 bg-[#0000004d] w-full h-[90%] overflow-y-hidden ">
                        {loading ? (
                            // <Spinner
                            //     size="xl"
                            //     w={20}
                            //     h={20}
                            //     alignSelf="center"
                            //     margin="auto"
                            // />
                            <p className='text-3xl'>Loading</p>
                        ) : (
                            <div className="messages flex flex-col overflow-y-scroll w-full">
                                <ScrollableChat messages={messages} />
                            </div>
                        )}
                        <form className="mt-3 w-full" onSubmit={sendMessage} id="first-name">
                            {istyping ? (
                                <div className='w-full'>
                                    <div className='0'>
                                        <Lottie
                                            options={defaultOptions}
                                            width={50}
                                            style={{ marginBottom: 2, marginLeft: 0 }}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )}
                            <div className='w-full flex gap-2 border-[1px] bg-transparent'>
                                <input
                                    className="text-white bg-transparent px-4 py-2 rounded w-full focus:outline-none"
                                    type="text"
                                    placeholder="Enter a message.."
                                    value={newMessage}
                                    onChange={typingHandler}
                                />
                                <button className=' px-3 border-l-[1px]' type='submit' >
                                    < BsSend className='h-[1.3rem] w-[1.3rem] text-white ' />
                                </button>

                            </div>

                        </form>

                    </div>
                </>

            )}
        </>
    )
}

export default SingleChat
