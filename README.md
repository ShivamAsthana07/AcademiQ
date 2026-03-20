# 🎓 AcademiQ — Intelligent Academic Assistant

AcademiQ is a full-stack AI-powered academic chatbot built as a Final Year Project. It allows students and researchers to ask questions about their studies, research, and coursework and get instant, accurate answers powered by Llama 3.3 via Groq.

---

## 🌐 Live Demo

- **Frontend:** https://your-app.vercel.app
- **Backend:** https://your-app.onrender.com

---

## ✨ Features

- 🤖 **AI-Powered Q&A** — Powered by Llama 3.3 70B via Groq for fast, accurate academic answers
- 🔐 **Google OAuth** — Secure sign-in with Google account
- 💾 **Chat History** — All conversations saved to MongoDB per user
- 🌙 **Dark / Light Mode** — Elegant theme toggle
- 📱 **Responsive Design** — Works on desktop and mobile
- ⚡ **Lightning Fast** — Groq's high-speed inference for near-instant responses
- 🗂️ **Multiple Chats** — Create, switch, and delete conversations
- 🏠 **Landing Page** — Beautiful home screen with feature overview

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Vite | Build tool |
| Tailwind CSS | Styling |
| React Router DOM | Client-side routing |
| Axios | HTTP requests |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express | Web framework |
| MongoDB + Mongoose | Database |
| Passport.js | Authentication |
| Google OAuth 2.0 | Social login |
| JWT | Session tokens |
| Groq SDK | AI inference |

---

## 📁 Project Structure
```
academic-chat-bot/
├── client/                     # React frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx        # Landing page
│   │   │   └── Login.jsx       # Login page
│   │   ├── context/
│   │   │   └── AuthContext.jsx # Auth state management
│   │   ├── App.jsx             # Main chat interface
│   │   └── main.jsx            # App entry point
│   ├── index.html
│   └── vite.config.js
│
├── server/                     # Node.js backend
│   ├── models/
│   │   ├── User.js             # User schema
│   │   └── Chat.js             # Chat & message schema
│   ├── routes/
│   │   ├── auth.js             # Google OAuth routes
│   │   └── chat.js             # Chat CRUD + AI routes
│   ├── middleware/
│   │   └── protect.js          # JWT auth middleware
│   └── index.js                # Express server entry
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v22+
- MongoDB installed locally
- Groq API key — [console.groq.com](https://console.groq.com)
- Google OAuth credentials — [console.cloud.google.com](https://console.cloud.google.com)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/academiq.git
cd academiq
```

### 2. Setup the backend
```bash
cd server
npm install
```

Create `server/.env`:
```env
GROQ_API_KEY=your-groq-api-key
PORT=3001
MONGO_URI=mongodb://localhost:27017/academiq
SESSION_SECRET=your-session-secret
JWT_SECRET=your-jwt-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
CLIENT_URL=http://localhost:5173
```

Start the backend:
```bash
node index.js
```

### 3. Setup the frontend
```bash
cd client
npm install
```

Create `client/.env`:
```env
VITE_API_URL=http://localhost:3001
```

Start the frontend:
```bash
npm run dev
```

### 4. Open the app

Visit [http://localhost:5173](http://localhost:5173)

---

## 🔑 Environment Variables

### Backend (`server/.env`)

| Variable | Description |
|---|---|
| `GROQ_API_KEY` | Groq API key for Llama 3.3 |
| `PORT` | Backend server port (3001) |
| `MONGO_URI` | MongoDB connection string |
| `SESSION_SECRET` | Express session secret |
| `JWT_SECRET` | JWT signing secret |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `CLIENT_URL` | Frontend URL for CORS |

### Frontend (`client/.env`)

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API base URL |

---

## 🌍 Deployment

### Backend → Render

1. Create a new **Web Service** on [render.com](https://render.com)
2. Set root directory to `server`
3. Build command: `npm install`
4. Start command: `node index.js`
5. Add all environment variables from `server/.env`

### Frontend → Vercel

1. Import your repo on [vercel.com](https://vercel.com)
2. Set root directory to `client`
3. Framework preset: `Vite`
4. Add environment variable: `VITE_API_URL=https://your-backend.onrender.com`

### Database → MongoDB Atlas

1. Create a free M0 cluster on [mongodb.com/atlas](https://mongodb.com/atlas)
2. Whitelist all IPs (`0.0.0.0/0`)
3. Copy connection string to `MONGO_URI` in Render

---

## 🔮 Future Improvements

- [ ] Markdown rendering for AI responses
- [ ] File/PDF upload for document analysis
- [ ] Export chat history as PDF
- [ ] Subject-based chat filtering
- [ ] Mobile app with React Native
- [ ] Rate limiting per user
- [ ] Admin dashboard

---

## 👨‍💻 Author

**Shivam**
Final Year Project — 2024–25

---

## 📄 License

This project is for academic purposes only.
