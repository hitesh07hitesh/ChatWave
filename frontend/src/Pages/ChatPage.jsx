import React, { useState } from 'react'
// import Toastify from 'toastify-js'
import { ChatState } from '../Context/ChatProvider'
import SideDrawer from '../components/miscellaneous/SideDrawer'
import MyChats from '../components/MyChats'
import ChatBox from '../components/ChatBox'
// import "toastify-js/src/toastify.css"

const ChatPage = () => {
    const [fetchAgain, setFetchAgain] = useState(false)
    const { user } = ChatState()

    // const toast = () => {
    // Toastify({
    //     text: `Login`,
    //     // className: "info",
    //     style: {
    //         // background: "linear-gradient(to right, #01000c1f, #ffffff99)",
    //         minWidth: '6rem',
    //         background: "#01000c1f",
    //         border: '1px solid white'
    //     }
    // }).showToast();
    // }

    return (
        <div className='h-full w-full'>
            {user && <SideDrawer />}
            <div className='flex justify-between w-full h-[91.5vh] md:p-[10px] gap-2'>
                {user && <MyChats fetchAgain={fetchAgain} />}
                {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}

            </div>

        </div>
    )
}

export default ChatPage
