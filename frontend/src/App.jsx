import './App.css'
import { useContext, useState, useEffect } from 'react'
import SignIn from './Pages/SignUp'
import ChatPage from './Pages/ChatPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  ChannelListContainer  from './components/ChannelListContainer';
import  ChannelContainer  from './components/ChannelContainer';
import  ChannelBox  from './components/ChatBox';
import ChatPages from './components/ChatPages';

function App() {

  const [gradientDegree, setGradientDegree] = useState(90);
  const [gradient, setGradient] = useState(25);
  const [increasing, setIncreasing] = useState(true);

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


  const gradientStyle = {
    background: `linear-gradient(${gradientDegree}deg, rgba(131, 58, 180, 1) 0%, rgba(253, 29, 29, 1) ${gradient}%, rgba(252, 176, 69, 1) 100%)`,
  };




  return (

    <div className='flex h-[100%]' style={gradientStyle}>
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/signUp" element={<SignIn />} />
        <Route path="/zxcv" element={<ChannelListContainer />} />
        <Route path="/zxcvzxcv" element={<ChannelContainer />} />
        <Route path="/zx" element={<ChatPages />} />
      </Routes>
    </div>
  )
}

export default App






{/* {user !== null && user !== undefined ? (
        <div className='container flex'>
          <ChannelListContainer />
          <ChannelContainer />
        </div>
      ) : (
        <SignIn />
      )} */}



{/* <SignIn />
      <ChannelListContainer />
      <ChannelContainer /> */}

