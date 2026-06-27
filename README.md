# GurujiforPooja - Separated Architecture

This project has been restructured into separate frontend, backend, and database layers using MongoDB.

## Project Structure

```
Main-web/
├── frontend/          # Next.js frontend application
│   ├── app/          # Next.js app directory
│   ├── components/   # React components
│   ├── lib/          # Utilities and API client
│   └── public/       # Static assets
├── backend/          # Express.js backend API
│   ├── config/       # Database configuration
│   ├── models/       # Mongoose models
│   ├── routes/       # API routes
│   └── server.js     # Express server entry point
└── README.md         # This file
```

## Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account (free tier) or local MongoDB instance
- npm or pnpm

## Setup Instructions

### 1. Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB connection string:
```
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/your_database
PORT=5000
```

5. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### 2. Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the frontend directory:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your backend URL (default is already set):
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

5. Start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## MongoDB Setup

### Using MongoDB Atlas (Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (free tier)
4. Create a database user with read/write permissions
5. Whitelist your IP address (or use 0.0.0.0/0 for development)
6. Get your connection string from the Atlas dashboard
7. Update the `MONGODB_URI` in `backend/.env`

### Using Local MongoDB

1. Install MongoDB locally following the [official documentation](https://www.mongodb.com/docs/manual/installation/)
2. Start MongoDB service
3. Update `MONGODB_URI` in `backend/.env`:
```
MONGODB_URI=mongodb://localhost:27017/gurujiforpooja
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user
- `POST /api/auth/login` - Login user

### Bookings
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/:id` - Get booking by ID
- `GET /api/bookings/user/:userId` - Get bookings by user ID
- `POST /api/bookings` - Create new booking
- `PATCH /api/bookings/:id/status` - Update booking status
- `DELETE /api/bookings/:id` - Delete booking

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID
- `GET /api/services/slug/:slug` - Get service by slug
- `GET /api/services/category/:category` - Get services by category
- `POST /api/services` - Create new service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

### Decorations
- `GET /api/decorations` - Get all decorations
- `GET /api/decorations/:id` - Get decoration by ID
- `GET /api/decorations/service/:serviceId` - Get decorations by service ID
- `POST /api/decorations` - Create new decoration
- `PUT /api/decorations/:id` - Update decoration
- `DELETE /api/decorations/:id` - Delete decoration

### Hero Images
- `GET /api/hero` - Get hero images
- `POST /api/hero` - Save hero images

### Admin
- `POST /api/admin/login` - Admin login

## Development

### Running Both Services

Open two terminal windows:

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

### Building for Production

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm start
```

## Database Models

### User
- name (String)
- email (String, unique)
- phone (String)
- password (String, hashed)
- timestamps

### Booking
- user_id (ObjectId, ref: User)
- name, email, phone, alternate_phone
- service_type, service_slug, service_name
- package_type, package_price
- decorations, deco_prices, muhurta
- preferred_date, preferred_time
- address, city, notes
- status (enum: pending, confirmed, completed, cancelled)
- timestamps

### Service
- slug (String, unique)
- category
- title_en, title_mr, title_hi
- description_en, description_mr, description_hi
- short_en, short_mr, short_hi
- image, duration
- basic_price, basic_includes_en/mr/hi
- standard_price, standard_includes_en/mr/hi
- premium_price, premium_includes_en/mr/hi
- sahitya_en, sahitya_mr, sahitya_hi
- muhurta
- timestamps

### Decoration
- service_id (ObjectId, ref: Service)
- name_en, name_mr, name_hi
- description_en, description_mr, description_hi
- price, photos
- timestamps

### HeroImage
- desktop_image
- mobile_image
- timestamps

## Troubleshooting

### Backend won't connect to MongoDB
- Check your MongoDB connection string in `.env`
- Ensure your IP is whitelisted in MongoDB Atlas
- Verify MongoDB user has correct permissions

### Frontend can't reach backend
- Ensure backend is running on port 5000
- Check `NEXT_PUBLIC_API_URL` in frontend `.env.local`
- Check CORS settings in backend server.js

### Build errors
- Run `npm install` in both frontend and backend directories
- Clear node_modules and reinstall if needed

## Migration Notes

This project was migrated from:
- **Database:** SQLite (better-sqlite3) → MongoDB (Mongoose)
- **Architecture:** Monolithic Next.js → Separated Frontend (Next.js) + Backend (Express.js)
- **API:** Next.js API routes → Express.js REST API

The frontend now acts as a proxy to the backend API, maintaining the same API contract for existing components.
