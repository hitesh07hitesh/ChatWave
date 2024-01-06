// import React from 'react'
// import { ChatState } from '../../Context/ChatProvider.jsx'

const UserListItem = ({ user, handleFunction }) => {

    // const userImage = () => {
    //     let firstletter = user.name[0]

    // }
    const firstLetter = user.name.charAt(0).toUpperCase();
    // const capitalizeFirstLetter = (str) => {
    //     return str.charAt(0).toUpperCase() + str.slice(1);
    // };
    // const { user } = ChatState()
    return (
        <div
            onClick={handleFunction}
            className="cursor-pointer bg-[#0000004d] hover:bg-[transparent] hover:text-white w-full flex items-center text-white px-3 py-2 mb-[2px] "
        >
            {/* <img
                className="mr-2 w-10 h-10 object-cover rounded-full cursor-pointer p-auto border-[2px] border-green-300"
                src={user.image}
                // alt={user.name}
                // alt={capitalizeFirstLetter(user.name)}
                alt={firstLetter}
            /> */}

            {user.pic ?
                <img
                    className="mr-2 w-10 h-10 object-cover rounded-full cursor-pointer p-auto border-[2px] border-white"
                    src={user.pic}
                    alt={"6456"}
                /> :
                <p className="mr-2 w-10 h-10 object-cover rounded-full cursor-pointer p-auto border-[2px] border-green-300  flex justify-center items-center atext-[2rem] text-3xl font-bold">
                    {firstLetter}
                </p>}
            <div>
                <p className="font-semibold">{user.name} <span>(@{user.username})</span></p>
                <p className="text-xs">
                    <b>Email:</b> {user.email}
                </p>
            </div>
        </div>
    )
}

export default UserListItem
