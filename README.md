# UP-Blog

A simple and modular Node.js blogging platform.

## 🔧 Requirements

- **Node.js** v20.18.3
- **MongoDB** database

## 📁 Folder Structure

```
.
├── exports         # Reusable modules for export
├── helpers         # Utility functions and helpers
├── models          # Mongoose models (schema definitions)
├── public          # Static assets (images, CSS, JS)
├── routes          # Application route handlers
├── services        # Business logic and services
├── translations    # Language translations (i18n)
├── validations     # Request validation logic
├── views           # Template views (e.g., Handlebars, EJS, etc.)
```

## 📦 Installation

```bash
npm install
```

## 🚀 Start the Application

```bash
npm start
```

The server will start on the port defined in the `.env` file.

## ⚙️ Example `.env` File

```
PORT=3000
USE_DB=event-management

# Max file upload size
LIMIT_BODY_PARSER=50mb

# MongoDB connection string
DATABASE_CONNECTION_STRING=mongodb+srv://<username>:<password>@<cluster-url>/event-management?retryWrites=true&w=majority

# Email configuration
EMAIL_USER=your-email
EMAIL_APP_PASSWORD=your-app-password-here

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Node environment
NODE_ENV=development
```

> **Note**: Replace the placeholder `<username>`, `<password>`, and `<cluster-url>` with your actual MongoDB credentials.

## ✅ How to Install and Run UP-Blog

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/up-blog.git
cd up-blog
```

### 2. Install Node.js

Make sure you are using **Node.js v20.18.3**.

```bash
nvm install 20.18.3
nvm use 20.18.3
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Set Up Environment Variables

Create a `.env` file in the root directory and add the example variables above.

### 5. Start the Server

```bash
npm start
```

Visit: `http://localhost:3000`

---

### 📝 Notes

- Ensure MongoDB is accessible using your connection string.
- The project supports multiple languages via the `translations` folder.
- File upload limit is set to 50MB.