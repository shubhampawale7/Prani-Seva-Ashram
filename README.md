# Prani Seva Ashram 🐾

A full-stack web application for managing animal rescue operations, donations, and adoptions.

## Features

### Public Features

- Browse adoptable dogs
- View rescue gallery
- Make donations
- Submit adoption inquiries
- Contact form
- Interactive chatbot

### Admin Features

- Manage donations
- Track rescues
- Handle adoption inquiries
- Upload gallery images
- Manage dog profiles
- Reply to inquiries

## API Endpoints

### Authentication

```http
POST /api/auth/login
POST /api/auth/logout
```

### Donations

```http
POST /api/donate
GET /api/donate/trends
```

### Adoption

```http
GET /api/dogs
POST /api/dogs
GET /api/dogs/:id
```

### Inquiries

```http
POST /api/enquiries
GET /api/admin/adoption-inquiries
```

### Gallery

```http
GET /api/gallery
POST /api/gallery/upload
DELETE /api/gallery/:id
```

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Framer Motion
- Axios
- Tailwind CSS
- Sonner (Toast notifications)

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- Nodemailer
- JWT Authentication

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/prani-seva-ashram.git
```

2. Install dependencies:

```bash
# Frontend
cd frontend
npm install

# Backend
cd backend
npm install
```

3. Set up environment variables:

Frontend (.env):

```env
VITE_API_URL=http://localhost:5000
```

Backend (.env):

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=your_email
ADMIN_EMAIL_PASS=your_email_password
```

4. Start development servers:

```bash
# Frontend
cd frontend
npm run dev

# Backend
cd backend
npm run dev
```

## API Documentation

### Adoption Inquiry

#### Request

```http
POST /api/enquiries
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "reason": "Looking for a companion",
  "dog": {
    "id": "dog_id",
    "name": "Max",
    "breed": "Labrador",
    "image": "dog.jpg"
  }
}
```

#### Response

```json
{
  "message": "Enquiry submitted and confirmation email sent!"
}
```

### Gallery Upload

#### Request

```http
POST /api/gallery/upload
Content-Type: multipart/form-data

{
  "image": [binary_file]
}
```

#### Response

```json
{
  "message": "Image uploaded successfully",
  "imageUrl": "/gallery/image.jpg"
}
```

## Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   └── App.jsx
│   └── package.json
│
└── backend/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middleware/
    ├── config/
    └── server.js
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
