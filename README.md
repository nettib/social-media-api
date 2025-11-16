Samra
🚀 Overview

Samra is a modern, feature-rich social media REST API built with Node.js, Express, and MongoDB.
It provides everything needed to build social platforms such as posting content, interacting with others, managing user profiles, and securely handling authentication.

This API is designed to be scalable, easy to use, and developer-friendly.

✨ Key Features
📝 Post Management

Create, read, update, and delete posts

Attach images or media files

Pagination, filtering & sorting for post lists

🗣️ Comments & Replies

Comment on posts

Reply to comments

Like comments & replies

👍 Likes

Like/unlike posts

Like/unlike comments

🔖 Bookmarks

Bookmark posts for later

Remove bookmarks

View all bookmarked posts

👤 User Profiles

Create and update user profiles

Upload profile pictures

View user details and activity

Secure access control to update only your profile

🔒 Authentication & Authorization

JWT-based authentication

Secure login and registration

Role-based access control (admin, user)

📂 File Uploads

Upload post images (multer)

Upload profile pictures

📈 Advanced Query Features

Pagination (page, limit)

Sorting (sort=createdAt, sort=-likes)

Filtering (?author=123, ?tags=music)

🛠️ Tech Stack

Language: JavaScript

Framework: Express.js

Database: MongoDB (Mongoose)

Authentication: JWT

File Uploads: Multer

Utilities: bcrypt, dotenv, nodemon

📦 Installation
Prerequisites
Node.js (v14 or later)
MongoDB
Quick Start
# Clone the repository
git clone https://github.com/nettib/social-media-api.git

# Navigate to the project directory
cd social-media-api

# Install dependencies
npm install

# Create a .env file with the following content
PORT=5000
DB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1h

# Start the server
npm run dev


📁 Project Structure
social-media-api/
├── .env
├── .gitignore
├── app.js
├── package.json
├── package-lock.json
├── server.js
├── src/
│   ├── app.js
│   ├── config/
│   │   └── env.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── bookmark.controller.js
│   │   ├── comment.controller.js
│   │   ├── file.controller.js
│   │   ├── like.controller.js
│   │   ├── post.controller.js
│   │   ├── reply.controller.js
│   │   └── user.controller.js
│   ├── database/
│   │   └── mongodb.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── checkAccountOwnership.middleware.js
│   │   ├── checkCommentOwnership.middleware.js
│   │   ├── checkPostOwnership.middleware.js
│   │   ├── error.middleware.js
│   │   ├── fileUpload.middleware.js
│   │   └── profileUpload.middleware.js
│   ├── model/
│   │   ├── comment.model.js
│   │   ├── post.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── bookmark.routes.js
│   │   ├── comment.route.js
│   │   ├── file.routes.js
│   │   ├── like.routes.js
│   │   ├── post.routes.js
│   │   ├── reply.routes.js
│   │   └── user.routes.js
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── bookmark.service.js
│   │   ├── comment.service.js
│   │   ├── file.service.js
│   │   ├── like.service.js
│   │   ├── post.service.js
│   │   ├── reply.service.js
│   │   └── user.service.js
│   └── utils/
│       ├── fileUtils.js
│       └── validation.js
└── uploads/
    └── profileUploads/
🔧 Configuration
Environment Variables: Create a .env file in the root directory with the following content:
PORT=5000
DB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1h
🤝 Contributing
How to Contribute: Fork the repository and create a pull request.
Development Setup: Follow the installation instructions in the Quick Start section.
Code Style Guidelines: Follow the Airbnb JavaScript Style Guide.
Pull Request Process: Ensure your code is well-tested and follows the project's coding standards.
📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

👥 Authors & Contributors
Maintainer: Netsanet Tibebu
Contributors: Sifen Fisaha
🐛 Issues & Support
Report Issues: Create a new issue on the GitHub Issues page.
