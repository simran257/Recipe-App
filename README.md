# 🍽️ Recipe Sharing Platform

A full-stack **Recipe Sharing Platform** built using **HTML, CSS, JavaScript, Node.js, Express.js, and MongoDB**.This project provides a complete recipe management system where users can **add, view, search, update, and delete recipes** through a simple and user-friendly interface.

## 🚀 Features

- 📝 Add new recipes
- 👀 View all recipes
- 🔍 Search recipes by title, ingredients, or instructions
- ✏️ Edit / Update recipes
- ❌ Delete recipes
- 🌐 RESTful API integration
- 📦 MongoDB database storage
- 🔄 Frontend and backend integration
- 🧪 API testing using Postman
  
## 🛠️ Tech Stack

### Frontend
- HTML
- CSS
- JavaScript
- Fetch API

### Backend
- Node.js
- Express.js
- REST API

### Database
- MongoDB
- MongoDB Native Driver

### Tools
- Postman
- MongoDB Compass
- VS Code

## 📂 Project Structure

RecipeApp
│
└── recipe-backend
    │
    ├── Frontend
    │   ├── index.html
    │   ├── style.css
    │   └── script.js
    │
    ├── myapp
    │   └── app.js
    │
    ├── package.json
    └── package-lock.json

## 🔍 Search Feature

The application includes a search functionality that allows users to quickly find recipes.

Users can search based on:

* Recipe title
* Ingredients
* Cooking instructions

The search is performed dynamically on the frontend using JavaScript without requiring a separate API request.

---

## 🗄️ Database

The project uses **MongoDB** to store recipe data.

### Database:

```text
recipeDB
```

### Collection:

```text
recipes
```

Each recipe contains:

```text
{
    title,
    ingredients,
    instructions
}
```

---

## 🧪 API Testing

The REST APIs were tested using **Postman**.

The following operations were tested successfully:

* GET recipes
* POST a new recipe
* PUT/update a recipe
* DELETE a recipe

## ⚙️ How to Run the Project

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL

### 2. Open the project

```bash
cd RecipeApp/recipe-backend

### 3. Install dependencies

npm install

### 4. Start the server

```bash
npm run dev

The server will run on:

http://localhost:3000

### 5. Open the frontend

Open:

Frontend/index.html in your browser.

## 🔄 Project Flow

User
  ↓
HTML + CSS + JavaScript
  ↓
Fetch API
  ↓
Node.js + Express.js
  ↓
REST API
  ↓
MongoDB
  ↓
Recipe Data

## 🎯 Future Improvements

* 👤 User authentication and login
* ❤️ Favorite recipes
* ⭐ Recipe ratings and reviews
* 🖼️ Recipe image upload
* 🏷️ Recipe categories
* 🔐 User-specific recipes

## 👩‍💻 Author

**Simran**
Built as a full-stack web development project using modern web technologies.
