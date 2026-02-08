# NNEXO Store - Deployment Status

## ✅ Completed Deployments

### 1. Frontend (Vercel) - **LIVE**
- **URL**: https://nnexo-store.vercel.app
- **Status**: Deployed and Building (applying backend URL)
- **Environment Variables**: 
  - `NEXT_PUBLIC_API_URL`: `https://nnexo-store.onrender.com/api/v1`

### 2. Backend (Render) - **DEPLOYING**
- **URL**: https://nnexo-store.onrender.com
- **Status**: Currently building
- **Environment Variables**:
  - ✅ `PORT`: 10000
  - ✅ `JWT_SECRET`: nnexo_jwt_secret_2024_production_key
  - ✅ `JWT_EXPIRE`: 15m
  - ✅ `JWT_REFRESH_SECRET`: nnexo_refresh_secret_2024_production_key
  - ✅ `JWT_REFRESH_EXPIRE`: 30d
  - ⚠️ `MONGODB_URI`: **NEEDS UPDATE** (currently placeholder)

### 3. GitHub Repository - **LIVE**
- **URL**: https://github.com/satish-varma/nnexo-store
- **Status**: All code pushed successfully

---

## 🚨 CRITICAL NEXT STEP: MongoDB Atlas Setup

Your backend is deployed but **WILL NOT WORK** until you:
1. Set up MongoDB Atlas
2. Update the `MONGODB_URI` environment variable on Render

### Step-by-Step MongoDB Atlas Setup:

#### **Option 1: Quick Setup (5 minutes)**

1. **Go to MongoDB Atlas**: https://www.mongodb.com/cloud/atlas/register
2. **Sign up** with Google (use satishvarma.py@gmail.com for consistency)
3. **Choose Free Tier** (M0 Sandbox - Perfect for testing)
4. **Cluster Configuration**:
   - Provider: AWS
   - Region: Select one close to you (e.g., Mumbai ap-south-1 or Singapore)
   - Cluster Name: `nnexo-cluster`
5. **Create Cluster** (takes 1-3 minutes)
6. **Create Database User**:
   - Click "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Username: `nnexo_admin`
   - Password: Generate a secure password (SAVE THIS!)
   - Database User Privileges: Atlas admin
   - Add User
7. **Configure Network Access**:
   - Click "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"
8. **Get Connection String**:
   - Go to "Database" (left sidebar)
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Driver: Node.js, Version: 5.5 or later
   - Copy the connection string (looks like this):
     ```
     mongodb+srv://nnexo_admin:<password>@nnexo-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - Replace `<password>` with your actual password
   - Add database name: `/nnexo` before the `?`:
     ```
     mongodb+srv://nnexo_admin:YOUR_PASSWORD@nnexo-cluster.xxxxx.mongodb.net/nnexo?retryWrites=true&w=majority
     ```

#### **Option 2: Use Existing MongoDB**
If you already have a MongoDB Atlas account or local MongoDB instance, just get the connection string.

---

## 📝 After Getting MongoDB URI:

### Update Render Environment Variable:

1. Go to: https://dashboard.render.com/
2. Click on **nnexo-store** service
3. Go to **Environment** tab
4. Find `MONGODB_URI` variable
5. Click **Edit**
6. Replace `mongodb://placeholder-will-update-later` with your actual MongoDB Atlas connection string
7. Click **Save**
8. The service will automatically redeploy

### Seed the Database (IMPORTANT):

Once the backend is live with MongoDB connected, seed the database with initial data:

1. Open your terminal
2. Navigate to the project: `cd /Users/satishvarma/nnexo`
3. Update your local `.env` with the same MongoDB URI
4. Run the seeder:
   ```bash
   node src/seeder.js
   ```
   
This will create:
- Admin user (email: admin@nnexo.com, password: admin123)
- Sample products

---

## 🎯 Testing Your Deployment:

### Test Backend:
Visit: https://nnexo-store.onrender.com/api/v1/health
- Should return: `{"message": "Welcome to NNEXO API"}`

### Test Frontend:
Visit: https://nnexo-store.vercel.app
- Should display the NNEXO store homepage
- Products won't load until MongoDB is connected

---

## ⏱️ Expected Timeline:

- **Now**: Backend is building on Render (~5 min)
- **Next**: Setup MongoDB Atlas (~5 min)
- **Then**: Update Render env var (~2 min redeploy)
- **Finally**: Seed database (~1 min)
- **Total**: ~15 minutes to full deployment

---

## 📞 Need Help?

If you encounter any issues:
1. Check Render logs: Dashboard → nnexo-store → Logs
2. Check Vercel logs: Dashboard → Deployments → Click deployment → View Function Logs
3. Verify MongoDB connection string format
4. Ensure IP whitelist includes 0.0.0.0/0 on MongoDB Atlas

---

## 🎉 Once Complete:

Your full-stack NNEXO Store will be:
- ✅ Live on the internet
- ✅ Connected to MongoDB database
- ✅ Frontend communicating with backend
- ✅ Ready for testing and demo!
