# Hamra

A comprehensive RESTful API for a social media platform built with Node.js and Express. This API provides complete functionality for user management, posts, comments, likes, bookmarks, and file uploads.

## 🚀 Features

- **User Authentication & Authorization**
  - JWT-based authentication
  - User registration and login
  - Role-based access control (Admin/User)
  - Secure password hashing with bcrypt

- **User Management**
  - User profiles with profile pictures and bio
  - Follow/unfollow system
  - View followers and following lists
  - Profile updates

- **Post Management**
  - Create, read, update, and delete posts
  - Support for text content and file attachments (up to 10 files per post)
  - Post search and filtering
  - Pagination support
  - Post views counter

- **Social Interactions**
  - Like/unlike posts and comments
  - Comment on posts
  - Nested replies to comments
  - Bookmark posts for later

- **File Management**
  - Upload profile pictures
  - Upload files/images for posts
  - File download functionality

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5.1.0
- **Database**: MongoDB with Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **File Upload**: Multer
- **Password Hashing**: bcrypt
- **Environment Variables**: dotenv

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (local or cloud instance like MongoDB Atlas)
- npm or yarn

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nettib/social-media-api.git
   cd social-media-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory with the following variables:
   ```env
   PORT=5000
   DB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=7d
   ```

4. **Create necessary directories**
   ```bash
   mkdir -p uploads/images uploads/files profileUploads
   ```

5. **Start the server**
   ```bash
   # Development mode (with nodemon)
   npm run dev

   # Production mode
   npm start
   ```

The server will start on `http://localhost:5000` (or your specified PORT).

## 📚 API Endpoints

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | `/auth/sign-up` | Register a new user | No |
| POST | `/auth/sign-in` | Login user | No |

**Sign Up Request:**
```json
{
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "bio": "Optional bio text"
}
```
*Note: Profile picture can be uploaded as `profile_picture` in multipart/form-data*

**Sign In Request:**
```json
{
  "username": "johndoe",
  "password": "password123"
}
```

### Users

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/users` | Get all users (Admin only) | Yes (Admin) |
| GET | `/users/:userId` | Get specific user | Yes |
| GET | `/users/me/posts` | Get current user's posts | Yes |
| GET | `/users/:userId/followers` | Get user's followers | Yes |
| GET | `/users/:userId/following` | Get user's following | Yes |
| POST | `/users/:userId/following` | Follow a user | Yes |
| DELETE | `/users/:userId/following` | Unfollow a user | Yes |
| PUT | `/users/:userId` | Update user profile | Yes (Owner) |
| DELETE | `/users/:userId` | Delete user account | Yes (Owner) |

### Posts

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/posts` | Get all posts (with pagination, search, filter) | No |
| GET | `/posts/:postId` | Get specific post | No |
| POST | `/posts` | Create a new post | Yes |
| PUT | `/posts/:postId` | Update post | Yes (Owner) |
| DELETE | `/posts/:postId` | Delete post | Yes (Owner) |

**Query Parameters for GET `/posts`:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 4)
- `user`: Filter by user ID
- `search`: Search in post content
- `sort`: Sort order (default: "latest")

**Create Post Request:**
```json
{
  "content": "This is my post content"
}
```
*Note: Files can be uploaded as `files` array in multipart/form-data*

### Likes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/posts/:postId/likes` | Get post likes | No |
| POST | `/posts/:postId/likes` | Like a post | Yes |
| DELETE | `/posts/:postId/likes` | Unlike a post | Yes |

### Comments

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/posts/:postId/comments` | Get post comments | No |
| GET | `/posts/:postId/comments/:commentId` | Get specific comment | No |
| POST | `/posts/:postId/comments` | Comment on a post | Yes |
| PUT | `/posts/:postId/comments/:commentId` | Update comment | Yes (Owner) |
| DELETE | `/posts/:postId/comments/:commentId` | Delete comment | Yes (Owner) |
| POST | `/posts/:postId/comments/:commentId/likes` | Like a comment | Yes |
| DELETE | `/posts/:postId/comments/:commentId/likes` | Unlike a comment | Yes |

**Create Comment Request:**
```json
{
  "content": "This is a comment"
}
```

### Replies

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/posts/:postId/comments/:commentId/replies` | Get comment replies | No |
| GET | `/posts/:postId/comments/:commentId/replies/:replyId` | Get specific reply | No |
| POST | `/posts/:postId/comments/:commentId/replies` | Reply to a comment | Yes |
| PUT | `/posts/:postId/comments/:commentId/replies/:replyId` | Update reply | Yes (Owner) |
| DELETE | `/posts/:postId/comments/:commentId/replies/:replyId` | Delete reply | Yes (Owner) |
| POST | `/posts/:postId/comments/:commentId/replies/:replyId/likes` | Like a reply | Yes |
| DELETE | `/posts/:postId/comments/:commentId/replies/:replyId/likes` | Unlike a reply | Yes |

### Bookmarks

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/users/bookmarks` | Get user's bookmarks | Yes |
| POST | `/users/bookmarks/:postId` | Bookmark a post | Yes |
| DELETE | `/users/bookmarks/:postId` | Remove bookmark | Yes |

### Files

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/files/files/:fileId` | Download a file | No |

## 🔐 Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

The token is returned when you sign in or sign up.

## 📁 Project Structure

```
social-media-api/
├── src/
│   ├── app.js                 # Express app configuration
│   ├── config/
│   │   └── env.js            # Environment variables
│   ├── controllers/          # Request handlers
│   │   ├── auth.controller.js
│   │   ├── bookmark.controller.js
│   │   ├── comment.controller.js
│   │   ├── file.controller.js
│   │   ├── like.controller.js
│   │   ├── post.controller.js
│   │   ├── reply.controller.js
│   │   └── user.controller.js
│   ├── database/
│   │   └── mongodb.js        # MongoDB connection
│   ├── middlewares/          # Custom middlewares
│   │   ├── auth.middleware.js
│   │   ├── checkAccountOwnership.middleware.js
│   │   ├── checkCommentOwnership.middleware.js
│   │   ├── checkPostOwnership.middleware.js
│   │   ├── error.middleware.js
│   │   ├── fileUpload.middleware.js
│   │   └── profileUpload.middleware.js
│   ├── model/                # Mongoose models
│   │   ├── comment.model.js
│   │   ├── post.model.js
│   │   └── user.model.js
│   ├── routes/               # API routes
│   │   ├── auth.routes.js
│   │   ├── bookmark.routes.js
│   │   ├── comment.route.js
│   │   ├── file.routes.js
│   │   ├── index.js
│   │   ├── like.routes.js
│   │   ├── post.routes.js
│   │   ├── reply.routes.js
│   │   └── user.routes.js
│   ├── services/            # Business logic
│   │   ├── auth.service.js
│   │   ├── bookmark.service.js
│   │   ├── comment.service.js
│   │   ├── file.service.js
│   │   ├── like.service.js
│   │   ├── post.service.js
│   │   ├── reply.service.js
│   │   └── user.service.js
│   └── utils/               # Utility functions
│       ├── fileUtils.js
│       └── validation.js
├── uploads/                 # Uploaded files
│   ├── images/
│   └── files/
├── profileUploads/          # Profile pictures
├── server.js                # Server entry point
├── package.json
└── README.md
```

## 🧪 Example Usage

### Sign Up
```bash
curl -X POST http://localhost:5000/api/v1/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Sign In
```bash
curl -X POST http://localhost:5000/api/v1/auth/sign-in \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "password": "password123"
  }'
```

### Create Post (with authentication)
```bash
curl -X POST http://localhost:5000/api/v1/posts \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "This is my first post!"
  }'
```

### Get All Posts
```bash
curl http://localhost:5000/api/v1/posts?page=1&limit=10
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Netsanet Tibebu**

- GitHub: [@nettib](https://github.com/nettib)
- Repository: [social-media-api](https://github.com/nettib/social-media-api)

## 👥 Contributors

**Sifen Fisaha**
- GitHub: [@sifenfisaha](https://github.com/sifenfisaha)

## 🐛 Issues

If you encounter any issues or have suggestions, please open an issue on the [GitHub Issues page](https://github.com/nettib/social-media-api/issues).

## 📄 API Response Format

All API responses follow a consistent format:

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message"
}
```

---

⭐ If you find this project helpful, please consider giving it a star!
=======


