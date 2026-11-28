```markdown
# Notes App (CRUD)

A full-stack CRUD (Create, Read, Update, Delete) web application built with Node.js, Express.js, MongoDB, and vanilla HTML/CSS/JavaScript. Users can create, view, edit, and delete notes in real time with persistent database storage.

## Features

- **Create Notes:** Add new notes with a title and detailed content.
- **View Notes:** Dynamically fetches and displays all saved notes sorted by most recent.
- **Edit Notes:** Update existing note titles and content seamlessly.
- **Delete Notes:** Remove notes permanently from the database.
- **Responsive Dark UI:** Clean, modern interface styled with CSS Grid and Flexbox.

## Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (Fetch API)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose ODM

## Project Structure

```text
notes-app/
├── models/
│   └── Note.js          # Mongoose schema for notes
├── public/
│   ├── index.html       # Main UI structure
│   ├── style.css        # Application styling
│   └── app.js           # Client-side CRUD logic
├── .gitignore           # Ignored files (node_modules, .env)
├── package.json         # Project dependencies and scripts
└── server.js            # Express server and REST API routes

```

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/notes` | Retrieve all notes |
| `POST` | `/api/notes` | Create a new note |
| `PUT` | `/api/notes/:id` | Update an existing note by ID |
| `DELETE` | `/api/notes/:id` | Delete a note by ID |

## Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) installed on your machine
* [MongoDB](https://www.mongodb.com/) running locally (`mongodb://127.0.0.1:27017`) or a MongoDB Atlas connection string

### Installation & Setup

1. **Clone the repository:**
```bash
git clone [https://github.com/Heenakousar26/notes-app.git](https://github.com/Heenakousar26/notes-app.git)
cd notes-app

```


2. **Install dependencies:**
```bash
npm install

```


3. **Configure MongoDB (Optional):**
By default, the app connects to `mongodb://127.0.0.1:27017/notes_db`. To use a custom URI, create a `.env` file in the root directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string

```


4. **Start the server:**
```bash
node server.js

```


5. **Open in browser:**
Navigate to `http://localhost:5000`

```

```
