import React from 'react'
import { IoMenu } from "react-icons/io5";
import { CiMenuBurger } from "react-icons/ci";
import { IoIosMenu } from "react-icons/io";
import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';


// function searchz() {


//     return (
//         <div>hi</div>
//     )
// }


const hi = (event) => {
    // Your logic goes here
    console.log("Input changed:", event.target.value);
};



const Sidebar = () => (
    <div className='bordfer-2 p-2 bordfer-green-800 w-full h-[100vlh] flex bg-transparent gap-[5px] aling-center top-[5px] text-white' >
        <nav className="menu--left text-white" role="navigation">
            <div className="menuToggle text-white">
                <input type="checkbox" className='text-white' />
                <span></span>
                <span></span>
                <span></span>
                <ul className="menuItem bg-[#0000004d] backdrop-blur-[5px] text-white">
                    <li><a className='border-b-[1px]' href="/">Home</a></li>
                    <li><a className='border-b-[1px]' href="/account">Account</a></li>
                    <li><a className='border-b-[1px]' href="/about">About</a></li>
                    <li><a className='border-b-[1px]' href="/info">Info</a></li>

                </ul>
            </div>
        </nav>

        <div className='w-full'>
            <div>
                <input onChange={hi} className='w-full border-[1px] rounded-[2rem] px-2 py-1 text-black bg-[#ffffff99] focus:outline-none focus:border-[1px] ' type="text" placeholder='search' />
            </div>
        </div>

    </div>
)

const Channel = () => (
    <div className='flex flex-col gap-[2px]'>
        <div className='flex gap-2 hover:bg-[#0000004d] active:bg-green-300 px-2 py-1'>
            <img className='h-[2.5rem] w-[2.5rem] rounded-[2.5rem] object-contain object-cover' src="https://i.pinimg.com/originals/83/72/e9/8372e957fc617e9e956f116afd3e599b.jpg" alt="men" />
            <h3><span className='font-medium'>Rohit </span><span>{`(rohit@345)`}</span></h3>
        </div>
        <div className='flex gap-2 hover:bg-[#0000004d] px-2 py-1'>
            <img className='h-[2.5rem] w-[2.5rem] rounded-[2.5rem] object-contain object-cover' src="https://i.pinimg.com/originals/83/72/e9/8372e957fc617e9e956f116afd3e599b.jpg" alt="men" />
            <h3><span className='font-medium'>Rohit </span><span>{`(rohit@345)`}</span></h3>
        </div>
        <div className='flex gap-2 hover:bg-[#0000004d] px-2 py-1'>
            <img className='h-[2.5rem] w-[2.5rem] rounded-[2.5rem] object-contain object-cover' src="https://i.pinimg.com/originals/83/72/e9/8372e957fc617e9e956f116afd3e599b.jpg" alt="men" />
            <h3><span className='font-medium'>Rohit </span><span>{`(rohit@345)`}</span></h3>
        </div>
    </div>
)


const ChannelListContainer = () => {

    return (
        <div className='flex flex-col border-r-2 border-[#F1F1F1] w-[372px] h-[100vh] flex abg-white  gap-[5px] aling-center top-[5px]  bg-transparent'>
            <Sidebar />
            <Channel />

        </div>
    )
}

export default ChannelListContainer