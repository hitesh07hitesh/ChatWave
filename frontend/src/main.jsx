import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import { AuthContextProvider } from './Context/authContext.jsx'
import ChatProvider from './Context/ChatProvider.jsx'
import { BrowserRouter } from 'react-router-dom'
// import { ToastContainer } from 'react-toastify'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChatProvider>
          <App />
      </ChatProvider>
    </BrowserRouter>
  </React.StrictMode>,
)



// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
// import { AuthContextProvider } from './Context/authContext.jsx'
// import { ToastContainer } from 'react-toastify'


// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <AuthContextProvider>
//       <ToastContainer>
//         <App
//           theme='dark' position='top-right' autoClose={1000} pauseOnHover={false} />
//       </ToastContainer>
//     </AuthContextProvider>
//   </React.StrictMode>,
// )
