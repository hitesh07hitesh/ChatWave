import React from 'react'
import { BsSend } from "react-icons/bs";

const ChannelHeader = () => (
    <div className='w-[fulgl]  bg-[#0000004d] py-2'>
        <div className='flex gap-2  px-2 py-1 justify-between'>
            <img className='h-[2.5rem] w-[2.5rem] rounded-[2.5rem] object-contain object-cover' src="https:/className=/i.pinimg.com/originals/83/72/e9/8372e957fc617e9e956f116afd3e599b.jpg" alt="men" />
            <h3><span className='font-medium'>Rohit </span><span>{`(rohit@345)`}</span></h3>
        </div>
    </div>
)

const ChannelChat = () => (
    <div className='w-full h-full bg-[FFFFFF]    plumPurple py-2 '>

        <div className="w-full flex flex-col gap-2 px-2 py-1">
            <p className="self-start chatMessage border  max-w-[45%]  chatMessageOther">
                you fgdfgfh djjgdfjgdfffffff ffff fff fff ffff ffff ffff fffff fff ff fff ffff f ffff ff ff fff f f fgjkshdf gfd guidufig
            </p>
            <p className="self-end chatMessage border  max-w-[45%]  chatMessageMe">
                me   you fgdfgfh djjgdfjgdfffffff ffff fff fff ffff ffff ffff fffff fff ff fff ffff f ffff ff ff fff f f fgjkshdf gfd guidufig
            </p>
            <p className="self-start chatMessage border  max-w-[45%]  chatMessageOther">
                you fgdfgfh djjgdfjgdfffffff ffff fff fff ffff 
            </p>
            <p className="self-end chatMessage border  max-w-[45%]  chatMessageMe">
                me  
            </p>
        </div>

        {/* <div className=" w-full flex gap-2 px-2 py-1 flex-col">
            <p className="self-start chatMessage border-[1px] chatMessageOther max-w-[45%]">
                you fgdfgfh djjgdfjgdfffffff ffff fff fff ffff ffff ffff fffff fff ff fff ffff f ffff ff ff fff   f  f  fgjkshdf gfd guidufig
            </p>
            <p className=' self-end chatMessage border-[1px] chatMessageMe max-w-[45%]"'>
                me   you fgdfgfh djjgdfjgdfffffff ffff fff fff ffff ffff ffff fffff fff ff fff ffff f ffff ff ff fff   f  f  fgjkshdf gfd guidufig
            </p>
        </div> */}

    </div>
)

const ChannelFooter = () => (

    <div className=' bottom-0 w-full py-2 bg-[#0000004d]'>
        <div className='flex gap-2 px-2 py-1 borfder-2'>
            <input
                className='flex-1 borhder-[1px] rounded-[2px] px-2 py-1 bg-white focus:outline-none  h-full'
                type='text'
                placeholder='write a message...'
            />
            <button className=' h-full my-auto rounded-[2px] bg-white py-1 h-full px-2'>
                <BsSend className='h-[1.4rem] w-[1.4rem]' />
            </button>
        </div>
    </div>

)

const ChannelContainer = () => {
    return (
        <div className=' w-[800px] flex flex-col gap-[2px] bg-transparent overflow-hidden'>
            <ChannelHeader />
            <ChannelChat />
            <ChannelFooter />
        </div>
    )
}

export default ChannelContainer
