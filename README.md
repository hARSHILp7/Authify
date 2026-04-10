# Authify 🔐

> A full-stack authentication web app built with React, Tailwind CSS, and Node.js that greets users with a personalized message upon login or sign up.

---

## 📌 Overview

**Authify** is a full-stack authentication web application that provides a seamless login and sign-up experience. Once a user successfully authenticates — whether logging in or creating a new account — they are greeted with a personalized welcome message displayed on a protected dashboard page.

The frontend is built with **React 18 + Vite** and styled using **Tailwind CSS v3**, while the backend is powered by **Node.js + Express** with **JWT-based authentication**. The app is structured as a **monorepo**, keeping both frontend and backend in a single repository.

---

## ✨ Features

### 🔑 Authentication
- **Login Page** — Allows existing users to sign in with their email and password.
- **Sign Up Page** — Enables new users to register with their name, email, and password.
- **JWT Authentication** — Secure token-based auth issued by the backend on login/signup.
- **Protected Routes** — Dashboard is accessible only to authenticated users via route guards.
- **Form Validation** — Inline error messages for empty fields, invalid email formats, and mismatched passwords.
- **Password Visibility Toggle** — Show/hide password input with Font Awesome eye icon.

### 🎉 Welcome Message
- Displays a **personalized greeting** (e.g., *"Welcome back, Alex!"* or *"Welcome to Authify, Sarah!"*) immediately after successful login or sign up.
- Different message tone for **returning users** vs **new users**.
- Smooth **fade-in animation** from the top left corner on appear.
- **Auto-dismisses** after 5 seconds or can be manually dismissed.

### 🧭 Navigation & Routing
- **React Router v6** for client-side routing.
- Redirect to the **Dashboard** upon successful authentication.
- Redirect back to the **Login page** if an unauthenticated user tries to access a protected route.
- Link between Login and Sign Up pages for easy navigation.

### 🛡️ Session Management
- JWT stored in `localStorage` to persist login state across page refreshes.
- **Logout** functionality to clear the token and redirect to the login page.
- Token sent as a `Bearer` header on all protected API requests via Axios interceptors.
- Expired or invalid token automatically logs user out globally.

### ✅ Form Validation
- Empty field errors for all inputs.
- Email format validation using regex.
- Password minimum 6 characters validation.
- Password mismatch validation on Sign Up.
- Name minimum 2 characters validation on Sign Up.
- Error messages show below each input field in real time.
- Border turns red when a field has an error.
- Errors clear immediately when user starts typing.

### 📱 Responsive Design
- Fully responsive layout built with **Tailwind CSS utility classes**.
- Works across mobile, tablet, and desktop screen sizes.

---

## 🗂️ Pages

| Page      | Route        | Description                            |
|-----------|--------------|----------------------------------------|
| Login     | `/login`     | Sign in with email & password          |
| Sign Up   | `/signup`    | Register a new account                 |
| Dashboard | `/dashboard` | Protected page with welcome message    |

---

## 🧱 Tech Stack

| Layer              | Technology                   |
|--------------------|------------------------------|
| Frontend           | React 18                     |
| Build Tool         | Vite                         |
| Styling            | Tailwind CSS v3              |
| Routing            | React Router v6              |
| HTTP Client        | Axios                        |
| Icons              | Font Awesome                 |
| State Management   | React Context API + useState |
| Backend            | Node.js + Express.js         |
| Authentication     | JSON Web Tokens (JWT)        |
| Password Hashing   | bcrypt                       |
| Database           | MongoDB + Mongoose           |
| Environment Config | dotenv                       |
| Dev Tools          | Nodemon, Vite, ESLint        |

---

## 📁 Project Structure

```
authify/
│
├── client/                              # ⚛️ React frontend (Vite)
│   ├── public/
│   │   └── favicon.ico
│   ├── src/
│   │   ├── assets/                      # Images, icons, static files
│   │   ├── components/
│   │   │   ├── ProtectedRoute.jsx       # Route guard for authenticated pages
│   │   │   └── WelcomeMessage.jsx       # Personalized greeting component
│   │   ├── context/
│   │   │   └── AuthContext.jsx          # Global auth state (JWT, user info)
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx            # Login form page
│   │   │   ├── SignUpPage.jsx           # Sign up form page
│   │   │   └── DashboardPage.jsx        # Protected dashboard with welcome message
│   │   ├── services/
│   │   │   └── authService.js           # Axios API calls (login, signup, logout)
│   │   ├── App.jsx                      # Root component with React Router routes
│   │   ├── main.jsx                     # React entry point
│   │   └── index.css                    # Tailwind CSS directives + CSS variables
│   ├── .env                             # VITE_API_URL (not committed)
│   ├── tailwind.config.js               # Tailwind CSS configuration
│   ├── postcss.config.js                # PostCSS configuration
│   ├── vite.config.js                   # Vite configuration (custom port)
│   └── package.json                     # Frontend dependencies
│
├── server/                              # 🟢 Node.js + Express backend
│   ├── config/
│   │   └── db.js                        # MongoDB connection setup
│   ├── controllers/
│   │   └── authController.js            # Login, signup, get-user logic
│   ├── middleware/
│   │   └── authMiddleware.js            # JWT verification middleware
│   ├── models/
│   │   └── User.js                      # Mongoose User schema
│   ├── routes/
│   │   └── authRoutes.js                # POST /api/auth/login, /signup, GET /me
│   ├── .env                             # PORT, MONGO_URI, JWT_SECRET (not committed)
│   ├── package.json                     # Backend dependencies
│   └── server.js                        # Express app entry point
│
├── .gitignore                           # Ignores node_modules, .env files
└── README.md                            # Project documentation
```

---

## 🔐 Environment Variables

### Backend — `server/.env`

Create a `.env` file inside the `server/` folder:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/authify
JWT_SECRET=your_super_secret_key_change_this
```

| Variable     | Description                          | Example                                  |
|--------------|--------------------------------------|------------------------------------------|
| `PORT`       | Port the backend runs on             | `5000`                                   |
| `MONGO_URI`  | MongoDB connection string            | `mongodb://localhost:27017/authify`      |
| `JWT_SECRET` | Secret key for signing JWT tokens    | `f8k2mP9xQr4nL7vT1wA6sD3hJ5uY0cE`      |

Generate a secure `JWT_SECRET` using Node.js:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Frontend — `client/.env`

Create a `.env` file inside the `client/` folder:

```env
VITE_API_URL=http://localhost:5000
```

| Variable        | Description              | Example                    |
|-----------------|--------------------------|----------------------------|
| `VITE_API_URL`  | Backend API base URL     | `http://localhost:5000`    |

> ⚠️ Never commit `.env` files to GitHub. They are listed in `.gitignore`.

---

## ⚛️ React Setup (Step-by-Step)

### Prerequisites

Make sure the following are installed:

- **Node.js** v18 or higher — [Download here](https://nodejs.org)
- **npm** v9+ (comes with Node.js)

Verify:
```bash
node -v
npm -v
```

### Step 1 — Create the Monorepo Root
```bash
mkdir authify
cd authify
```

### Step 2 — Scaffold React App with Vite
```bash
npm create vite@latest client -- --template react
cd client
```

### Step 3 — Install Frontend Dependencies
```bash
npm install
npm install react-router-dom axios
npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/react-fontawesome
npm install @fortawesome/free-brands-svg-icons
```

### Step 4 — Install and Configure Tailwind CSS v3
```bash
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

Update `tailwind.config.js`:
```js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary:      "var(--color-primary)",
        secondary:    "var(--color-secondary)",
        accent:       "var(--color-accent)",
        background:   "var(--color-background)",
        surface:      "var(--color-surface)",
        text:         "var(--color-text)",
        "text-muted": "var(--color-text-muted)",
        error:        "var(--color-error)",
        success:      "var(--color-success)",
      },
    },
  },
  plugins: [],
}
```

Replace `src/index.css` with:
```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --color-primary:    #f97316;
    --color-secondary:  #fb923c;
    --color-accent:     #06b6d4;
    --color-background: #1a1a1a;
    --color-surface:    #262626;
    --color-text:       #ffffff;
    --color-text-muted: #6b7280;
    --color-error:      #ef4444;
    --color-success:    #22c55e;
  }

  body {
    font-family: "Poppins", sans-serif;
  }

  * {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  *::-webkit-scrollbar {
    display: none;
  }
}
```

### Step 5 — Create Frontend `.env`
```env
VITE_API_URL=http://localhost:5000
```

### Step 6 — Run the Dev Server
```bash
npm run dev
```

Frontend runs at **http://localhost:3000** ✅

---

## 🟢 Node.js Backend Setup (Step-by-Step)

### Step 1 — Create the Server Folder
```bash
cd ..
mkdir server
cd server
```

### Step 2 — Initialize and Install Dependencies
```bash
npm init -y
npm install express cors dotenv mongoose jsonwebtoken bcrypt
npm install -D nodemon
```

### Step 3 — Update `package.json`
```json
{
  "name": "server",
  "version": "1.0.0",
  "main": "server.js",
  "type": "module",
  "scripts": {
    "start": "node server.js",
    "dev":   "nodemon server.js"
  }
}
```

### Step 4 — Create `server/.env`
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/authify
JWT_SECRET=your_super_secret_key_change_this
```

### Step 5 — Start MongoDB

```bash
# Windows (run as Administrator)
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Step 6 — Run the Backend Server
```bash
npm run dev
```

You should see:
```
✅ Server running on http://localhost:5000
✅ MongoDB connected: localhost
```

---

## 🔌 API Endpoints

| Method | Endpoint           | Description              | Auth Required |
|--------|--------------------|--------------------------|---------------|
| POST   | `/api/auth/signup` | Register a new user      | ❌            |
| POST   | `/api/auth/login`  | Login and receive JWT    | ❌            |
| GET    | `/api/auth/me`     | Get current user info    | ✅ Bearer JWT |

---

## 🔄 User Flow

```
[ / ] ──redirect──> [ /login ]
                        │
          ┌─────────────┴──────────────┐
          ▼                            ▼
    [ /login ]                   [ /signup ]
   POST /api/auth/login      POST /api/auth/signup
          │                            │
          └──────────┬─────────────────┘
                     ▼
             JWT stored in localStorage
                     │
                     ▼
             [ /dashboard ]
     "Welcome back, {Name}! 👋"       (login)
     "Welcome to Authify, {Name}! 🎉" (signup)
                     │
              [ Logout Button ]
                     │
             Clear localStorage
                     │
             Redirect to /login
```

---

## 📋 GitHub Issues

### ✅ Frontend Issues

| Issue | Title | Status |
|-------|-------|--------|
| #1 | Create `AuthContext.jsx` — Global JWT and user state management | ✅ Done |
| #2 | Create `ProtectedRoute.jsx` — Block unauthenticated users from dashboard | ✅ Done |
| #3 | Create `WelcomeMessage.jsx` — Personalized greeting after login/signup | ✅ Done |
| #4 | Create `DashboardPage.jsx` — Protected page with welcome message | ✅ Done |
| #5 | Create `authService.js` — Axios API calls with JWT token interceptor | ✅ Done |
| #6 | Add form validation — Empty fields, invalid email, password mismatch | ✅ Done |
| #7 | Connect login/signup forms to backend API | ✅ Done |
| #8 | Add logout functionality | ✅ Done |

### 🟢 Backend Issues

| Issue | Title | Status |
|-------|-------|--------|
| #9  | Setup `server.js` — Express app entry point | ✅ Done |
| #10 | Setup `config/db.js` — MongoDB connection | ✅ Done |
| #11 | Setup `.env` — PORT, MONGO_URI, JWT_SECRET | ✅ Done |
| #12 | Create `models/User.js` — Mongoose User schema | ⬜ Pending |
| #13 | Create `controllers/authController.js` — Login and signup logic | ⬜ Pending |
| #14 | Create `middleware/authMiddleware.js` — JWT verification | ⬜ Pending |
| #15 | Create `routes/authRoutes.js` — API route definitions | ⬜ Pending |
| #16 | Implement password hashing with bcrypt | ⬜ Pending |
| #17 | Implement JWT token generation and verification | ⬜ Pending |

---

## 🎨 UI Highlights

- Dark theme with orange accent colors throughout.
- Minimalist card-based form layout centered on screen.
- Floating labels that transition to top on focus and stay up when text is entered.
- Focus border color changes per input field.
- Icon color changes on input focus using Tailwind `group-focus-within`.
- Password masking with `tracking-widest` and Font Awesome eye icon toggle.
- Welcome message pops in from the top left corner with smooth fade animation.
- Auto-dismissing welcome message after 5 seconds.
- Error messages displayed below each invalid input field.
- Border turns red on validation errors.

---

## 🔒 Security Notes

- Passwords are hashed using **bcrypt** before storing in the database.
- Authentication tokens are **JWT** signed with a secret stored in `.env`.
- Tokens are verified on every protected API route via middleware.
- Axios interceptor handles expired tokens globally — auto logout on 401.
- **Never commit your `.env` files** — they are listed in `.gitignore`.
- For production, use HTTPS and short JWT expiry with refresh token rotation.

---

## 🛣️ Roadmap

- [ ] Add "Forgot Password" + email reset flow
- [ ] Add Google / GitHub OAuth login (Passport.js)
- [ ] Add email verification on sign up (Nodemailer)
- [ ] Add refresh token rotation
- [ ] Animate welcome message with confetti on first sign up
- [ ] Deploy frontend to Vercel, backend to Railway or Render

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙌 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

*Built with ❤️ using React, Tailwind CSS, and Node.js — Authify keeps it simple, secure, and friendly.*