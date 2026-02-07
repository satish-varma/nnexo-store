# How to Get a Free MongoDB Connection String (MongoDB Atlas)

Follow these steps to set up a free cloud database for your NNEXO store.

## 1. Sign Up & Create Cluster
1.  Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).
2.  Sign up (Google/GitHub login is fastest).
3.  **Deploy a Database**:
    *   Choose **M0 Free** (Shared) tier.
    *   **Provider**: AWS (usually best).
    *   **Region**: Choose the one closest to you (e.g., `Mumbai (ap-south-1)`).
    *   **Name**: `Cluster0` (default is fine).
    *   Click **Create Deployment**.

## 2. Security Setup (Crucial!)
1.  **Create a Database User**:
    *   **Username**: `admin` (or your choice).
    *   **Password**: Generate a secure password and **COPY IT** immediately. You will need it.
    *   Click **Create Database User**.
2.  **Network Access (IP Whitelist)**:
    *   Go to **Network Access** in the left sidebar.
    *   Click **Add IP Address**.
    *   Select **Allow Access from Anywhere** (0.0.0.0/0).
    *   *Note: This ensures your Render backend can connect dynamically.*
    *   Click **Confirm**.

## 3. Get Connection String
1.  Go to **Database** in the left sidebar.
2.  Click **Connect** on your cluster card.
3.  Select **Drivers** (Node.js).
4.  You will see a string like:
    `mongodb+srv://admin:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
5.  **Copy this string**.

## 4. Finalize
1.  Replace `<password>` in the string with the password you created in Step 2.
2.  Paste this full string into your local `.env` file:
    ```env
    MONGODB_URI=mongodb+srv://admin:YOUR_PASSWORD@cluster0.abcde.mongodb.net/nnexo?retryWrites=true&w=majority
    ```
    *(Note: added `/nnexo` before `?` to specify database name)*

## 5. Next Steps
Once you have the string:
1.  Update `.env` locally.
2.  Run `node src/seeder.js` to populate the database.
3.  Add this `MONGODB_URI` to your Render Environment Variables.
