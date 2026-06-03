# Haett Partner Portal

A full-stack web application for managing partner applications and discount codes. The portal consists of a Node.js/Express backend API and a React frontend application built with Vite.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Database Setup & Seeding](#database-setup--seeding)
- [Starting the Services](#starting-the-services)
- [API Documentation](#api-documentation)
- [Available Scripts](#available-scripts)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js**: Version 18.0.0 or higher ([Download](https://nodejs.org/))
- **npm**: Comes with Node.js (or use yarn/pnpm as alternative)
- **MongoDB**: A running MongoDB instance (local or cloud-based like MongoDB Atlas)
- **Git**: For version control

### Verify Installation

```bash
node --version    # Should be v18.0.0 or higher
npm --version     # Should be v9.0.0 or higher
```

## Project Structure

```
Haett-partner-portal/
├── backend/                 # Node.js/Express API
│   ├── config/             # Configuration files (database, JWT, environment)
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Express middleware
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   ├── utils/              # Utility functions
│   ├── validators/         # Input validation schemas
│   ├── seed/               # Database seeding scripts
│   ├── app.js              # Express app configuration
│   ├── server.js           # Server entry point
│   └── package.json        # Backend dependencies
│
└── frontend/               # React/Vite application
    ├── public/             # Static assets
    ├── src/
    │   ├── components/     # Reusable UI components
    │   ├── pages/          # Page components
    │   ├── hooks/          # Custom React hooks
    │   ├── services/       # API client services
    │   ├── context/        # React context for state management
    │   ├── layouts/        # Layout components
    │   ├── routes/         # Route definitions
    │   ├── utils/          # Utility functions
    │   ├── App.jsx         # Main App component
    │   └── main.jsx        # Entry point
    ├── vite.config.js      # Vite configuration
    ├── tailwind.config.js  # Tailwind CSS configuration
    └── package.json        # Frontend dependencies
```

## Installation

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd Haett-partner-portal
```

### Step 2: Install Backend Dependencies

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

### Step 3: Install Frontend Dependencies

Navigate to the frontend directory and install dependencies:

```bash
cd ../frontend
npm install
```

## Environment Setup

### Backend Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGO_URI=mongodb://localhost:27017/haett-partner-portal

# JWT Configuration
JWT_SECRET=your-secret-key-here-min-32-characters-long
JWT_EXPIRES_IN=7d

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:3000
```

#### Environment Variables Explanation:

- **PORT**: Port on which the backend server will run (default: 5000)
- **NODE_ENV**: Environment mode - `development` or `production`
- **MONGO_URI**: MongoDB connection string
  - Local: `mongodb://localhost:27017/haett-partner-portal`
  - MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/haett-partner-portal?retryWrites=true&w=majority`
- **JWT_SECRET**: Secret key for JWT token signing (use a strong, random string)
- **JWT_EXPIRES_IN**: JWT token expiration time
- **CLIENT_URL**: Frontend URL for CORS configuration

#### How to Set Up MongoDB

**Option 1: Local MongoDB**

```bash
# Windows (if MongoDB is installed as a service)
# Service should start automatically

# macOS (with Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**Option 2: MongoDB Atlas (Cloud)**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a cluster
4. Get your connection string
5. Use it as `MONGO_URI` in your `.env` file

### Frontend Environment Setup

The frontend doesn't require a `.env` file, but it communicates with the backend via the API service. The backend URL can be configured in `frontend/src/services/api.js` if needed.

## Database Setup & Seeding

### Step 1: Verify MongoDB Connection

Ensure your MongoDB instance is running and your `MONGO_URI` is correct in the backend `.env` file.

```bash
# Verify MongoDB is running
# For local MongoDB, check if the service is active
# For MongoDB Atlas, verify your connection string is correct
```

### Step 2: Run Database Seed

Navigate to the backend directory and run the seed script to populate the database with initial data:

```bash
cd backend
npm run seed
```

**What the seed script does:**

- Creates default admin user
- Creates sample partner users
- Creates sample applications
- Creates sample discount codes
- Initializes database collections

**Default Seeded Users:**

| Role    | Email               | Password   |
| ------- | ------------------- | ---------- |
| Admin   | admin@haett.com     | Admin123   |
| Partner | partner@example.com | Partner123 |

⚠️ **Important**: Change these default passwords in production!

### Step 3: Verify Seeding

After running the seed script, you should see confirmation messages in the console. The database should now have:

- Users collection with admin and partner accounts
- Applications collection with sample data
- DiscountCodes collection with sample codes

## Starting the Services

### Prerequisites Check

Before starting, ensure:

- ✅ Node.js and npm are installed
- ✅ MongoDB is running
- ✅ Backend `.env` file is created with required variables
- ✅ Database is seeded with `npm run seed`

### Starting the Backend Service

Open a terminal in the `backend/` directory:

```bash
# Development mode (with auto-reload)
npm run dev

# Or production mode (one-time start)
npm start
```

**Expected output:**

```
Server running on port 5000
Connected to MongoDB
```

The backend API will be available at `http://localhost:5000`

### Starting the Frontend Service

Open a new terminal in the `frontend/` directory:

```bash
# Development mode (with hot module replacement)
npm run dev
```

**Expected output:**

```
  VITE v6.x.x  ready in XXX ms

  ➜  Local:   http://localhost:3000/
  ➜  press h to show help
```

The frontend application will be available at `http://localhost:3000`

### Running Both Services Together

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

Both services should now be running:

- Backend API: `http://localhost:5000`
- Frontend App: `http://localhost:3000`

## Available Scripts

### Backend Scripts

```bash
# Start server in production mode
npm start

# Start server in development mode with auto-reload
npm run dev

# Seed the database with initial data
npm run seed
```

### Frontend Scripts

```bash
# Start development server with hot module replacement
npm run dev

# Build for production
npm build

# Preview production build locally
npm run preview
```

## API Documentation

### Base URL

```
http://localhost:5000/api
```

### Authentication Routes (`/auth`)

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user

### Partner Routes (`/partner`)

- `GET /partner/dashboard` - Get partner dashboard data
- `GET /partner/applications` - List partner applications
- `POST /partner/applications` - Create new application
- `GET /partner/discount-codes` - Get partner discount codes

### Admin Routes (`/admin`)

- `GET /admin/dashboard` - Get admin dashboard
- `GET /admin/applications` - List all applications
- `PATCH /admin/applications/:id/approve` - Approve application
- `PATCH /admin/applications/:id/reject` - Reject application
- `POST /admin/discount-codes` - Create discount code

### Application Routes (`/application`)

- `GET /application/:id` - Get application details
- `PUT /application/:id` - Update application
- `DELETE /application/:id` - Delete application

## Troubleshooting

### MongoDB Connection Issues

**Error: `MONGO_URI is required in .env`**

- Solution: Ensure `.env` file exists in the backend directory with a valid `MONGO_URI`

**Error: `connect ECONNREFUSED`**

- Solution: Ensure MongoDB is running. For local MongoDB, start it with:

  ```bash
  # Windows
  net start MongoDB

  # macOS
  brew services start mongodb-community

  # Linux
  sudo systemctl start mongod
  ```

### Port Already in Use

**Error: `Port 5000 is already in use`**

- Solution: Change the PORT in `.env` or kill the process using that port:

  ```bash
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F

  # macOS/Linux
  lsof -i :5000
  kill -9 <PID>
  ```

### Frontend Cannot Connect to Backend

**Error: `Failed to fetch from http://localhost:5000`**

- Solution:
  1. Ensure backend is running on port 5000
  2. Verify `CLIENT_URL` in backend `.env` is set correctly
  3. Check CORS settings in backend

### CORS Issues

**Error: `Access to XMLHttpRequest blocked by CORS policy`**

- Solution: Verify that:
  1. Backend has CORS middleware configured
  2. `CLIENT_URL` in backend `.env` matches your frontend URL
  3. Frontend API calls use the correct backend URL

## Development Tips

### Hot Module Replacement (HMR)

Both frontend and backend support hot-reload in development:

- **Backend**: Changes are auto-detected with `npm run dev`
- **Frontend**: Changes are instantly reflected without page reload

### Database Inspection

To inspect your database directly:

**Using MongoDB Compass (GUI)**

- Download [MongoDB Compass](https://www.mongodb.com/products/compass)
- Connect using your `MONGO_URI`

**Using MongoDB Shell**

```bash
mongosh
use haett-partner-portal
db.users.find()
db.applications.find()
db.discountcodes.find()
```

## Support

For issues or questions:

1. Check the Troubleshooting section above
2. Review the `.env` configuration
3. Ensure all prerequisites are installed
4. Check MongoDB connection and status

## License

[Your License Here]

---

**Last Updated**: June 2026
