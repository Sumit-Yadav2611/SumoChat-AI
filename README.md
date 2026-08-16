# 🤖 SumoChat AI

<p align="center">
  <img src="./assets/banner.png" alt="SumoChat AI Banner" width="100%">
</p>

<p align="center">

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb)
![Google Gemini](https://img.shields.io/badge/Google-Gemini-blue?logo=google)
![Cloudflare](https://img.shields.io/badge/Cloudflare-Workers%20AI-orange?logo=cloudflare)
![FLUX](https://img.shields.io/badge/FLUX-Image%20Generation-purple)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38BDF8?logo=tailwindcss)

</p>

<p align="center">
  A modern AI-powered conversational assistant inspired by Google Gemini and ChatGPT.
</p>

<p align="center">
  SumoChat AI combines conversational AI, persistent chat history, PDF understanding,
  Gemini Vision, AI image generation, authentication, guest mode, and a modern responsive interface.
</p>

---

# ✨ Features

## 💬 AI Chat

- Google Gemini Integration
- Fast AI Responses
- Animated Typing Effect
- Markdown Support
- Code Block Rendering
- Tables and Lists Support
- Conversation-based chat experience

---

## 👤 Authentication

- User Registration
- Secure Login
- JWT Authentication
- Protected Routes
- Guest Mode
- Free Guest Message Limit
- User-specific conversations
- Persistent authentication

---

## 📚 Chat Management

- Create New Chats
- Rename Chats
- Delete Chats
- Search Chats
- Persistent Chat History
- Latest chats appear at the top
- Separate chat history for every user
- Conversations restored after logout/login
- Chat messages stored in MongoDB

---

## 👥 Guest Mode

Users can try SumoChat AI without creating an account.

### Guest Features

- Chat without login
- Free guest message limit
- Guest conversations stored separately
- Guest chats do not mix with authenticated user history
- Login required after the free guest limit

---

## 📄 PDF Chat

Upload a PDF and ask questions about its content.

### Example prompts

- Summarize this document
- Explain page 5
- What is the conclusion?
- Find important points
- Explain this topic in simple language

SumoChat AI can use the uploaded document as context when answering questions.

---

## 🖼️ Gemini Vision

Upload an image and ask questions about it.

### Example prompts

- What is in this image?
- Describe this picture
- Read all text
- Explain this graph
- Solve this math problem
- Explain the diagram

Powered by Google Gemini Vision capabilities.

---

# 🎨 AI Image Generation

SumoChat AI can generate images directly inside conversations.

The application detects image-generation requests such as:

- Create an image of a futuristic cyberpunk city
- Generate a picture of a horse
- Create an Independence Day celebration poster
- Draw a futuristic car
- Make an image of a mountain landscape

Normal questions continue to use the conversational AI system.

### 🖼️ Image Features

- 🎨 AI image generation
- ⚡ Cloudflare Workers AI
- 🖌️ FLUX image generation
- 🖼️ Generated image preview
- 🔍 Full-screen image viewer
- ⬇️ Download generated images
- 📋 Copy image-generation prompt
- ✨ SumoChat AI image branding
- 📱 Responsive image display
- 💾 Generated images saved to MongoDB
- 🔄 Generated images remain available after refresh
- 🔐 Protected image-generation endpoint
- 👤 Images associated with the user's conversation

### Example

```text
User:
Create an image of a futuristic cyberpunk city at night

        ↓

Image request detection

        ↓

Cloudflare Workers AI + FLUX

        ↓

Generated image

        ↓

MongoDB persistence

        ↓

Image displayed in conversation
```

---

# 👤 User Profile

- Profile Page
- User Information
- Avatar Upload
- Profile Picture Update
- Account Status

---

# 🎨 Modern UI

- Modern dark theme
- Responsive design
- Sidebar navigation
- Navbar
- User profile interface
- Toast notifications
- Loading animations
- Animated AI responses
- Modern chat message cards
- Responsive image cards
- Full-screen image viewer

---

# 🏗️ Tech Stack

## Frontend

- React 19
- Tailwind CSS
- React Router
- Axios
- React Hot Toast
- React Markdown
- Remark GFM
- React Syntax Highlighter
- React Icons

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Multer
- CORS
- dotenv

## AI

- Google Gemini API
- Gemini Vision
- Cloudflare Workers AI
- FLUX Image Generation

---

# 🏛️ Architecture

```text
                         ┌─────────────────────┐
                         │     SumoChat AI     │
                         │      Frontend       │
                         │   React + Tailwind  │
                         └──────────┬──────────┘
                                    │
                                    │ Axios / REST API
                                    ▼
                         ┌─────────────────────┐
                         │      Express.js     │
                         │       Backend       │
                         └──────────┬──────────┘
                                    │
                 ┌──────────────────┼──────────────────┐
                 │                  │                  │
                 ▼                  ▼                  ▼
        ┌────────────────┐ ┌────────────────┐ ┌────────────────────┐
        │    MongoDB     │ │ Google Gemini  │ │ Cloudflare Workers │
        │ Chat History   │ │ AI + Vision    │ │ AI + FLUX          │
        └────────────────┘ └────────────────┘ └────────────────────┘
```

---

# 📂 Project Structure

```text
SumoChat-AI/
│
├── backend/
│   │
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── memory/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── uploads/
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── .env
│
├── .gitignore
├── README.md
└── LICENSE
```

---

# 🚀 Current Features

| Feature | Status |
|---|:---:|
| AI Chat | ✅ |
| Google Gemini Integration | ✅ |
| Authentication | ✅ |
| JWT Authentication | ✅ |
| Protected Routes | ✅ |
| Guest Mode | ✅ |
| Guest Free Message Limit | ✅ |
| Chat History | ✅ |
| Separate User Chats | ✅ |
| New Chat | ✅ |
| Rename Chat | ✅ |
| Delete Chat | ✅ |
| Search Chats | ✅ |
| PDF Chat | ✅ |
| Gemini Vision | ✅ |
| Image Upload | ✅ |
| Avatar Upload | ✅ |
| User Profile | ✅ |
| AI Image Generation | ✅ |
| Cloudflare Workers AI | ✅ |
| FLUX Image Generation | ✅ |
| Image Preview | ✅ |
| Image Viewer | ✅ |
| Image Download | ✅ |
| Copy Image Prompt | ✅ |
| Image Persistence | ✅ |
| Responsive UI | ✅ |
| Markdown Rendering | ✅ |
| Code Syntax Highlighting | ✅ |

---

# 🚀 Upcoming Features

- 🎤 Voice Chat
- 🔊 AI Voice Responses
- 🌐 Web Search Mode
- 🧠 Advanced Memory Mode
- 📷 Camera Capture
- 📄 Multiple PDF Support
- 🖼️ Multiple Image Support
- 🌙 Additional Themes
- 📤 Export Chat
- ⭐ Favorite Chats
- 📌 Pin Conversations
- 📊 Usage Dashboard
- 🔔 Notifications
- 💳 Premium / Subscription System

---

# ⚙️ Installation

## 1. Clone the repository

```bash
git clone https://github.com/Sumit-Yadav2611/SumoChat-AI.git
```

```bash
cd SumoChat-AI
```

---

# 🔧 Backend Setup

Open a terminal:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_secure_jwt_secret

GEMINI_API_KEY=your_gemini_api_key

CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id

CLOUDFLARE_API_TOKEN=your_cloudflare_api_token

FRONTEND_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

---

# 🎨 Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create:

```text
frontend/.env
```

Add:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

---

# 🔐 Environment Variables

## Backend

Create:

```text
backend/.env
```

```env
PORT=5000

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_secure_jwt_secret

GEMINI_API_KEY=your_gemini_api_key

CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id

CLOUDFLARE_API_TOKEN=your_cloudflare_api_token

FRONTEND_URL=http://localhost:5173
```

## Frontend

Create:

```text
frontend/.env
```

```env
VITE_API_URL=http://localhost:5000
```

---

# 🔒 Security

**Never commit real API keys or secrets to GitHub.**

Your `.gitignore` should contain:

```gitignore
node_modules/
.env
.env.*
!.env.example

dist/
build/

.vite/

*.log

backend/uploads/*
!backend/uploads/.gitkeep

.DS_Store
Thumbs.db
```

### Never expose:

```text
GEMINI_API_KEY
JWT_SECRET
MONGO_URI
CLOUDFLARE_API_TOKEN
```

Use environment variables in both development and production.

---

# 🌐 Production Deployment

SumoChat AI consists of two applications:

```text
Frontend
   ↓
React / Vite

Backend
   ↓
Node.js / Express
```

They can be deployed separately.

## Production architecture

```text
                    Internet
                       │
                       ▼
              ┌─────────────────┐
              │   Frontend      │
              │ React + Vite    │
              └────────┬────────┘
                       │
                       │ HTTPS API
                       ▼
              ┌─────────────────┐
              │    Backend      │
              │ Node + Express  │
              └───────┬─────────┘
                      │
          ┌───────────┼────────────┐
          ▼           ▼            ▼
      MongoDB      Gemini     Cloudflare
                                Workers AI
```

### Production environment variables

Backend:

```env
PORT=5000

MONGO_URI=your_production_mongodb_uri

JWT_SECRET=your_production_jwt_secret

GEMINI_API_KEY=your_gemini_api_key

CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id

CLOUDFLARE_API_TOKEN=your_cloudflare_api_token

FRONTEND_URL=https://your-frontend-domain.com
```

Frontend:

```env
VITE_API_URL=https://your-backend-domain.com
```

---


# 🖼️ Screenshots

Screenshots will be added soon.

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Make your changes
4. Commit your changes

```bash
git commit -m "Add new feature"
```

5. Push the branch

```bash
git push origin feature/new-feature
```

6. Create a Pull Request

---

# 👨‍💻 Developer

**Sumit Yadav**

B.Tech Computer Science & Engineering

National Institute of Technology Patna

---

# ⭐ Show Your Support

If you like SumoChat AI:

⭐ Star this repository

🐛 Report issues

💡 Suggest new features

🤝 Contribute to the project

---

# 📄 License

This project is intended for educational and portfolio purposes.

---

<p align="center">

### 🤖 Built with React, Node.js, MongoDB, Google Gemini & Cloudflare Workers AI

**SumoChat AI**

</p>