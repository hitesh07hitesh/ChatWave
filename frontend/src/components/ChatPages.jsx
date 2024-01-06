import React from 'react'
import Toastify from 'toastify-js'
// import "toastify-js/src/toastify.css"
import { toast } from "../config/Toast"

const ChatPages = () => {

    // useEffect(() => {
    //     Toastify({
    //         text: `hi`,
    //         className: "info",
    //         style: {
    //             background: "linear-gradient(to right, #01000c1f, #96c93d)",
    //             // background: "#01000c1f",
    //         }
    //     }).showToast();
    // }, [])

    const asdf = () => {
        toast("hi")
    }

    return (
        <div className='h-[100vh]'>
            but
            ChatPage
            <button className='border-2' onClick={asdf}>Click</button>
        </div>
    )
}

export default ChatPages
