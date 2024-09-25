import { useState, useEffect } from 'react';
import { BASE_URL } from '../config';
import axios from "axios";
// import { Message } from 'stream-chat-react';
import uploadImageToCloudinary from '../utils/cloudinary';
// import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

const SignUp = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [loginPage, setloginPage] = useState(false);
    const [gradientDegree, setGradientDegree] = useState(90);
    const [gradient, setGradient] = useState(25);
    const [increasing, setIncreasing] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewURL, setPreviewURL] = useState("");
    const [formData, setformData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        gender: "",
        pic: previewURL,
    })


    const navigate = useNavigate()


    useEffect(() => {
        const intervalId = setInterval(() => {
            setGradient(prevGradient => {
                const newGradient = increasing ? prevGradient + 1 : prevGradient - 1;

                // console.log(newGradient);

                if (newGradient === 85) {
                    setIncreasing(false);
                } else if (newGradient === 15) {
                    setIncreasing(true);
                }

                return newGradient;
            });
        }, 50);

        return () => clearInterval(intervalId);
    }, [increasing]);

    useEffect(() => {
        const interval = setInterval(() => {
            setGradientDegree((prevDegree) => (prevDegree + 2) % 360);
        }, 50);

        return () => clearInterval(interval);
    }, []);

    const toggleSignIn = () => {
        setloginPage(!loginPage);
    };

    const handelFileInputChange = async (e) => {
        const file = e.target.files[0]
        const data = await uploadImageToCloudinary(file)
        setPreviewURL(data.url)
        setSelectedFile(data.url)
        setformData({ ...formData, pic: data.url })
        e.preventDefault()
    }

    const SubmitData = async (e) => {
        e.preventDefault()

        // const a = loginPage ? 'login' : 'register';

        // console.log("a  " + a);
        // console.log(formData)

        try {
            axios
                .post(`${BASE_URL}/auth/${loginPage ? 'login' : 'register'}`, formData)
                .then((responce) => {
                    // console.log(res);
                    console.log(responce.data);
                    localStorage.setItem("userInfo", JSON.stringify(responce.data))
                    navigate('/')
                    Toastify({
                        text: `${loginPage ? 'login' : 'register'} succesfull`,
                        className: "info",
                        style: {
                            minWidth: '5rem',
                            background: "#01000c1f",
                            border: '1px solid white',
                            backdropFilter: 'blur(22px)'

                            // background: "linear-gradient(to right, #00b09b, #96c93d)",
                        }
                    }).showToast();
                });
        } catch (error) {
            console.log(error)
        }


        // try {
        //     const responce = await fetch(`${BASE_URL}/${loginPage ? 'login' : 'register'}`, {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify(formData)
        //     })
        //     // console.log(responce)
        //     const { message, user, token } = await responce.json()

        //     if (!responce) {
        //         throw new Error(message)
        //     }
        //     dispatch({
        //         type:"LOGIN_SUCCESS",
        //         payload: {
        //             user: user,
        //             token: token,
        //         }
        //     })

        //     // toast.success(message)

        //     console.log(message)

        // } catch (error) {
        //     console.log(error)
        // }

    }


    const handelInputChange = (e) => {
        const { name, value } = e.target
        // setformData({ ...formData, [name]: value })

        if (name === 'username') {
            setformData({ ...formData, username: value });
        } else {
            setformData({ ...formData, [name]: value });
        }
        // setformData({ ...formData, [name]: value })

    }
    const gradientStyle = {
        background: `linear-gradient(${gradientDegree}deg, rgba(131, 58, 180, 1) 0%, rgba(253, 29, 29, 1) ${gradient}%, rgba(252, 176, 69, 1) 100%)`,
    };



    // const gradientStyle = {
    //     background: `linear-gradient(${gradientDegree}deg, rgba(131, 58, 180, 1) 0%, rgba(253, 29, 29, 1) 50%, rgba(252, 176, 69, 1) 100%)`,
    // };



    //______________________________________________________

    return (
        <div className='signUpForm w-full h-[100vh] mx-auto flex items-center justify-center' style={gradientStyle} >
            <div className="absolute inset-0 bg-black opacity-25 text-white fontbold">

            </div>
            <div className="mx-auto w-[30rem] formBackground z-50 ">
                <h2 className=" mb-6 text-center text-white">
                    {loginPage ? 'Login' : 'Registration'}
                </h2>
                <form onSubmit={SubmitData}>
                    {loginPage ? (
                        <div>
                            <div className="relative z-0 w-full my-5 group ">
                                <input value={formData.email} onChange={handelInputChange} type="email" name="email" className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-white dark:border-gray-200 focus:outline-none focus:ring-0  peer" placeholder=" " required />
                                <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-white  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                            </div>
                            <div className="relative z-0 w-full my-5 group ">
                                <input value={formData.password} onChange={handelInputChange} name="password" type={isChecked ? 'text' : 'password'} className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-200 focus:outline-none focus:ring-0  peer" placeholder=" " required />
                                <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-white  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                                <label className="inline-flex items-center cursor-pointer absolute text-lg text-white duration-300 transform -translate-y-6 scale-75 bottom-[-20px] right-0 -z-100 origin-[0] ">
                                    <input
                                        type="checkbox"
                                        className="hidden"
                                        checked={isChecked}
                                        onChange={() => (setIsChecked(!isChecked))}
                                    />
                                    <div className={`bg-transparent text-white py-2 rounded `}>
                                        {isChecked ? 'Hide' : 'Show'}
                                    </div>
                                </label>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="relative z-0 w-full my-5 group ">
                                <input value={formData.name} onChange={handelInputChange} type="text" name="name" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-200 focus:outline-none focus:ring-0  peer" placeholder=" " required />
                                <label className="peer-focus:font-medium absolute text-sm text-white  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                            </div>
                            <div value={formData.username} onChange={handelInputChange} className="relative z-0 w-full my-5 group ">
                                <input type="text" name="username" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-200 focus:outline-none focus:ring-0  peer" placeholder=" " required />
                                <label className="peer-focus:font-medium absolute text-sm text-white  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
                            </div>
                            <div className="relative z-0 w-full my-5 group ">
                                <input value={formData.email} onChange={handelInputChange} type="email" name="email" className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-white dark:border-gray-200 focus:outline-none focus:ring-0  peer" placeholder=" " required />
                                <label className="peer-focus:font-medium absolute text-sm text-white  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                            </div>

                            <div className="relative z-0 w-full my-5 group ">
                                <input value={formData.password} onChange={handelInputChange} name="password" type={isChecked ? 'text' : 'password'} className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-200 focus:outline-none focus:ring-0  peer" placeholder=" " required />
                                <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-white  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                                <label className="inline-flex items-center cursor-pointer absolute text-lg text-white duration-300 transform -translate-y-6 scale-75 bottom-[-20px] right-0 -z-100 origin-[0] ">
                                    <input
                                        type="checkbox"
                                        className="hidden"
                                        checked={isChecked}
                                        onChange={() => (setIsChecked(!isChecked))}
                                    />
                                    <div className={`bg-transparent text-white py-2 rounded `}>
                                        {isChecked ? 'Hide' : 'Show'}
                                    </div>
                                </label>
                            </div>
                            <fieldset>
                                <label className="mb-2 text-white" htmlFor="gender">Gender</label>
                                <legend className="sr-only">Gender</legend>

                                <div className="flex gap-2">
                                    <div className="flex items-center mb-4">
                                        <label
                                            className="block ml-2 text-sm font-medium text-white"
                                        >
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="Male"
                                                checked={formData.gender === 'Male'}
                                                onChange={handelInputChange}
                                                className="w-4 h-4 border-gray-300  focus:ring-blue-300 "
                                            />

                                            {` `}Male
                                        </label>
                                    </div>
                                    <div className="flex items-center mb-4">
                                        <label
                                            className="block ml-2 text-sm font-medium text-white"
                                        >
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="Female"
                                                checked={formData.gender === 'Female'}
                                                onChange={handelInputChange}
                                                className="w-4 h-4 border-gray-300  focus:ring-blue-300 "
                                            />

                                            {` `}Female
                                        </label>
                                    </div>
                                    <div className="flex items-center mb-4">
                                        <label
                                            className="block ml-2 text-sm font-medium text-white"
                                        >
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="Others"
                                                checked={formData.gender === 'Others'}
                                                onChange={handelInputChange}
                                                className="w-4 h-4 border-gray-300  focus:ring-blue-300 "
                                            />

                                            {` `}Other
                                        </label>
                                    </div>


                                </div>
                            </fieldset>
                            <div className="relative overflow-hidden inline-block flex-col">
                                <label className='mb-1 text-white' htmlFor="pic">Profile picture</label>
                                <div className='flex gap-2'>
                                    {selectedFile && (<img className='my-auto  h-[2.5rem] w-[2.5rem] rounded-[2.5rem] object-cover' src={selectedFile} alt="Img" />)}

                                    <button className="w-fit border-2 border-gray-300 text-white bg-[#01000c1f]  hover:bg-[#0200244a] px-8 py-2 rounded-lg text-lg font-bold">Upload a file</button>
                                    <input type="file" name="pic" accept='.jpg, .png' onChange={handelFileInputChange} className="text-[100px] absolute left-0 top-0 opacity-0" />
                                </div>

                            </div>
                        </div>

                    )}

                    <div className="w-full flex justify-between mt-4">
                        <p className="text-gray-200">
                            {loginPage ? "Don't have an account? " : 'Already have an account? '}
                            <a href="#" className="text-blue-800  border-blue-800 hover:underline" onClick={toggleSignIn}>
                                {loginPage ? 'Sign Up' : 'Login'}
                            </a>
                        </p>

                        <button
                            type="submit"
                            className="border-2 border-gray-200 text-white hover:bg-[#0200244a] bg-[#01000c1f] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                        >
                            {loginPage ? 'Login' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;


