import { useState } from 'react'
import { IoCloseOutline } from "react-icons/io5";


const ProfileModel = ({ user, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);
    return (
        <>
            {children ? (
                <span onClick={onOpen}>{children}</span>
            ) : (
                <button className="flex" onClick={onOpen}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>

                </button>


                // <button
                //     onClick={onOpen}
                //     className="flex items-center bg-blue-500 text-white py-2 px-4 rounded"
                // >
                //     Open Modal
                // </button>
            )}

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center   abg-[#0000004d]  backdrop-blur-lg">

                    {/* <div className="absolute inset-0 bg-black opacity-50 text-white fontbold">

                    </div> */}
                    <div className="relative bg-[#0000004d] text-white p-8 max-w-lg arounded">
                        <button
                            onClick={onClose}
                            className=" absolute top-0 right-0  p-2  rounded"
                        >
                            <IoCloseOutline  className='w-[2rem] h-[2rem]'/>
                        </button>
                        <div className='flex flex-col'>
                            <h2 className=" mb-4"><h1 className='text-2xl'>{user.name}</h1> (@{user.username})</h2>

                            <div className="m-auto">
                                <img
                                    className="rounded-full h-32 w-32 object-cover"
                                    src={user.pic}
                                    alt={user.name}
                                />
                            </div>
                            <div className="mt-4 text-2xl">
                                <p>Email: {user.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}

export default ProfileModel
