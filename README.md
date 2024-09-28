<div align="center">
  <br />
  
  <a href="https://hvisual.vercel.app/#ChatWave" target="_blank">
    <img src="https://raw.githubusercontent.com/hiteshDhankhar01/Portfolio/main/src/assets/projects/ChatWave_02.png" alt="Project Banner" style="height: 200px; width: auto;">
  </a>
  <br />
  
  <h1>Chatwave</h1>
  <h3>A Real-Time Chat Application</h3>
  <p>Effortless communication through instant messaging with real-time image sharing</p>
</div>

---

# Chatwave - Real-Time Messaging Application

## Introduction

**Chatwave** is a cutting-edge real-time chat platform built to enhance user-to-user communication. This web application allows users to create accounts, chat with friends, and seamlessly share images using Cloudinary. Whether in private conversations or group chats, **Chatwave** ensures a smooth messaging experience with live message updates, making it an ideal solution for real-time communication.

## Key Features

- **Real-Time Messaging**: Instant communication between users powered by WebSocket and Socket.io.
- **Image Uploads**: Upload and share images during conversations, backed by Cloudinary integration.
- **Group Chats**: Create or join group chats with full message history accessible to all participants.
- **Secure Authentication**: Robust authentication using JWT and bcrypt.js for safe login and account protection.
- **Responsive Design**: Optimized for various devices, providing a flawless experience on mobile, tablet, and desktop.
- **Real-Time Notifications**: Receive instant feedback via toast notifications powered by React Toastify.

##  Technologies Used

- **React.js**: A powerful JavaScript library for building dynamic and interactive user interfaces.
- **Node.js & Express.js**: The backend is built with a robust framework for server-side operations and API handling.
- **Socket.io**: Enables real-time, bi-directional communication for a seamless chat experience.
- **MongoDB**: A NoSQL database used to store chat history and user data.
- **Cloudinary**: Cloud-based image storage and management for hassle-free media uploads.
- **JWT & bcrypt.js**: Secure authentication methods to protect user credentials.

##  Installation

To run **Chatwave** locally, follow these steps:

### 1. **Clone the repository**:

```bash
git clone https://github.com/yourusername/chatwave.git
cd chatwave
```

### 2. **Install dependencies**:

#### Frontend:
```bash
cd frontend
npm install
```

#### Backend:
```bash
cd ../backend
npm install
```

### 3. **Set up environment variables**:

Create a `.env` file in both the `frontend` and `backend` directories with the following variables:

- **Backend `.env`**:
    ```bash
    PORT=3000
    MONGO_URL=mongodb://localhost:27017/chatwave
    JWT_SECRET_KEY=your-jwt-secret 
    ```

- **Frontend `.env`**:
    ```bash
    VITE_CLOUD_NAME=your-cloudinary-cloud-name
    VITE_UPLOAD_PRESENT=your-upload-present
    ```

### 4. **Run the servers**:

#### Backend:
```bash
cd backend
npm run dev
```

#### Frontend:
```bash
cd ../frontend
npm run dev
```

### 5. **Access the Application**:

Open your browser and navigate to [http://localhost:5173](http://localhost:5173) to view the app.

---
