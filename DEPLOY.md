# Deployment Guide for NNEXO Store

This guide explains how to deploy the NNEXO frontend and backend.

## Prerequisites

1.  **Frontend**: Deployed on [Vercel](https://vercel.com).
2.  **Backend**: Deployed on [Render](https://render.com) or [Railway](https://railway.app).
3.  **Database**: **Migrate to MongoDB Atlas** (Highly Recommended) or use a VPS with persistent storage.
    *   *Note*: The current local JSON database (`data/users.json`, etc.) will NOT persist on serverless platforms like Vercel or Render's free tier. Data will be wiped on every restart.

---

## 1. Frontend Deployment (Vercel)

1.  Push your code to GitHub/GitLab.
2.  Import the `nnexo/web` directory as a new project in Vercel.
3.  Set the **Root Directory** to `web`.
4.  Add the following **Environment Variable**:
    *   `NEXT_PUBLIC_API_URL`: The URL of your deployed backend (e.g., `https://nnexo-backend.onrender.com/api/v1`).
5.  Click **Deploy**.

## 2. Backend Deployment (Render)

1.  Create a new **Web Service** on Render connected to your repo.
2.  Set the **Root Directory** to `.` (the root of the repository).
3.  **Build Command**: `npm install`
4.  **Start Command**: `node src/server.js`
5.  Add **Environment Variables**:
    *   `PORT`: `10000` (Render default)
    *   `JWT_SECRET`: Generate a strong random string.
    *   `MONGODB_URI`: Connection string from MongoDB Atlas.
6.  **Important**: You must update the backend code to use MongoDB instead of the local JSON files for production.

## 3. Switching to MongoDB (Required for Persistence)

To make the app production-ready, update `src/controllers/*.js` to use Mongoose models instead of `LocalDB`.

Example `src/models/Product.js`:
```javascript
const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    // ...
});
module.exports = mongoose.model('Product', ProductSchema);
```

Then update controllers to use `Product.find()`, `Product.create()`, etc.

## 4. Quick Start (Local Production Build)

To run the optimized production build locally:

**Frontend**:
```bash
cd web
npm run build
npm start
```
(Runs on localhost:3000)

**Backend**:
```bash
cd src
NODE_ENV=production node server.js
```
(Runs on localhost:5001)
