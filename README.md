<h1 align="center">MERN Stack Note Taking App 📝 </h1>

ThinkBoard is a full-stack note-taking web app built using the MERN stack. 
It allows users to create, update, and delete personal notes efficiently with instant sync. 
Includes rate-limiting via Upstash Redis for security and performance. 
Built with a clean, responsive UI using React and Tailwind CSS.




Highlights:

- 🧱 Full-Stack App Built with the MERN Stack (MongoDB, Express, React, Node)
- ✨ Created, Updated, and Deleted Notes with Title & Description
- 🛠️ Build and Test a Fully Functional REST API
- ⚙️ Rate Limiting with Upstash Redis — a Real-World Concept Explained Simply
- 🚀 Completely Responsive UI
- 🌐 Explored HTTP Methods, Status Codes & SQL vs NoSQL


---

## 🧪 .env Setup

### Backend (`/backend`)

```
MONGO_URI=<your_mongo_uri>

UPSTASH_REDIS_REST_URL=<your_redis_rest_url>
UPSTASH_REDIS_REST_TOKEN=<your_redis_rest_token>

NODE_ENV=development
```

## 🔧 Run the Backend

```
cd backend
npm install
npm run dev
```

## 💻 Run the Frontend

```
cd frontend
npm install
npm run dev
```
