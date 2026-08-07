<p align="center">
  <img src="assets/banner.png" alt="SumoChat AI Banner" width="100%">
</p>

<h1 align="center">🚀 SumoChat AI</h1>

<p align="center">
  <strong>Modern AI Chat Platform powered by Google Gemini</strong>
</p>

<p align="center">
  Full-Stack AI Chat Application built with React, Node.js, Express, MongoDB, JWT Authentication and Google Gemini API.
</p>

<p align="center">

<img src="https://img.shields.io/badge/Version-v1.0-blue?style=for-the-badge"/>

<img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react"/>

<img src="https://img.shields.io/badge/Node.js-22-339933?style=for-the-badge&logo=node.js"/>

<img src="https://img.shields.io/badge/Express-5-black?style=for-the-badge&logo=express"/>

<img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb"/>

<img src="https://img.shields.io/badge/Google-Gemini-4285F4?style=for-the-badge"/>

<img src="https://img.shields.io/badge/JWT-Authentication-red?style=for-the-badge"/>

<img src="https://img.shields.io/badge/TailwindCSS-4-38BDF8?style=for-the-badge&logo=tailwindcss"/>

</p>

---

## 📖 About

SumoChat AI is a modern AI-powered conversational platform inspired by Google Gemini. It provides secure authentication, intelligent conversations, persistent chat history, user profile management, avatar uploads, and a clean, responsive interface designed for a seamless AI chat experience.

<p align="center">

<img src="https://github-readme-stats.vercel.app/api?username=Sumit-Yadav2611&show_icons=true&theme=tokyonight"/>

</p>

<p align="center">

<img src="https://github-readme-streak-stats.herokuapp.com/?user=Sumit-Yadav2611&theme=tokyonight"/>

</p>




## 🏗️ System Architecture

```text
                           User
                             │
                             ▼
                    React Frontend (Vite)
                             │
                             ▼
                  React Context API
                             │
                             ▼
                    Axios HTTP Client
                             │
                             ▼
                Express.js REST API Server
                ┌────────────┴────────────┐
                │                         │
                ▼                         ▼
      JWT Authentication          Chat Controller
                │                         │
                ▼                         ▼
          User Controller         Google Gemini API
                │
                ▼
           MongoDB Atlas
                │
                ▼
        User Data • Chat History
```

## 📂 Project Structure

```text
SumoChat-AI
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── uploads
│   ├── app.js
│   └── server.js
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── routes
│   │   ├── services
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── assets
│   └── banner.png
│
└── README.md
```


## ⚙️ Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | React 19, Vite, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Authentication | JWT, bcrypt |
| AI | Google Gemini API |
| File Upload | Multer |
| State Management | React Context API |
| Notifications | React Hot Toast |
| HTTP Client | Axios |

## ✨ Features

- ✅ AI Chat (Gemini)
- ✅ User Authentication
- ✅ Guest Mode
- ✅ Chat History
- ✅ PDF Chat
- ✅ Image Upload
- ✅ Gemini Vision
- 🔄 Voice Input (Coming Soon)
- 🔄 AI Voice Response (Coming Soon)
- 🔄 Web Search (Coming Soon)

