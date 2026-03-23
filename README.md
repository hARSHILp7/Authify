# Authify 🔐

> A clean, minimal authentication web app that greets users with a personalized message upon login or sign up.

---

## 📌 Overview

**Authify** is a lightweight, frontend-focused authentication web application that provides a seamless login and sign-up experience. Once a user successfully authenticates — whether logging in or creating a new account — they are greeted with a personalized welcome message displayed on a protected dashboard page.

The app is designed with simplicity and user experience at its core, making authentication feel smooth, friendly, and secure.

---

## ✨ Features

### 🔑 Authentication
- **Login Page** — Allows existing users to sign in with their email and password.
- **Sign Up Page** — Enables new users to register with their name, email, and password.
- **Form Validation** — Inline error messages for empty fields, invalid email formats, and mismatched passwords.
- **Password Visibility Toggle** — Show/hide password input for better usability.

### 🎉 Welcome Message
- Displays a **personalized greeting** (e.g., *"Welcome back, Alex!"* or *"Welcome to Authify, Sarah!"*) immediately after a successful login or sign up.
- Different message tone for **returning users** vs **new users**.
- Message auto-dismisses or remains until the user navigates away.

### 🧭 Navigation & Routing
- Redirect to the **Dashboard** upon successful authentication.
- Redirect back to the **Login page** if an unauthenticated user tries to access a protected route.
- Link between Login and Sign Up pages for easy navigation.

### 🛡️ Session Management
- User session stored in `localStorage` or `sessionStorage` to persist login state across page refreshes.
- **Logout** functionality to clear the session and redirect to the login page.

### 📱 Responsive Design
- Fully responsive layout that works on **mobile, tablet, and desktop** screen sizes.
- Clean, modern UI with accessible form elements.

---

## 🗂️ Pages

| Page | Route | Description |
|---|---|---|
| Login | `/login` | Sign in with email & password |
| Sign Up | `/signup` | Register a new account |
| Dashboard | `/dashboard` | Protected page with welcome message |

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, JavaScript (or React) |
| Styling | CSS Variables, Flexbox, Grid |
| State | localStorage / sessionStorage |
| Routing | React Router (if React) or vanilla JS |
| Auth | Mock/local auth (no backend required) |

> **Note:** Authify uses a **mock authentication system** for demo purposes. No real backend or database is required. User credentials are validated against data stored in `localStorage`.

---

## 📁 Project Structure

```
authify/
├── index.html              # Entry point
├── login.html              # Login page
├── signup.html             # Sign Up page
├── dashboard.html          # Protected dashboard with welcome message
├── css/
│   └── styles.css          # Global styles
├── js/
│   ├── auth.js             # Authentication logic (login, signup, logout)
│   ├── session.js          # Session management (read/write localStorage)
│   └── message.js          # Welcome message display logic
└── README.md               # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No installations or dependencies required for the vanilla JS version.

### Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/authify.git
   cd authify
   ```

2. **Open in browser:**
   ```bash
   open index.html
   # or simply double-click index.html in your file explorer
   ```

3. **Sign up** with any name, email, and password to create an account.

4. **Log in** with those credentials to see your personalized welcome message.

---

## 🔄 User Flow

```
[ Landing / Login Page ]
        |
        |---> [ Sign Up Page ] ---> [ Dashboard: "Welcome to Authify, {Name}! 🎉" ]
        |
        |---> [ Login Page ] -----> [ Dashboard: "Welcome back, {Name}! 👋" ]
                                            |
                                    [ Logout Button ]
                                            |
                                    [ Back to Login ]
```

---

## 🎨 UI Highlights

- Minimalist card-based form layout centered on screen.
- Smooth fade-in animation on the welcome message.
- Clear error and success states with color-coded feedback.
- Subtle hover effects and focus states on all interactive elements.

---

## 🔒 Security Notes

> Authify is a **frontend demo project** and does not implement real security. For production use, consider:

- Using a backend with hashed passwords (e.g., bcrypt).
- Implementing JWT or OAuth-based authentication.
- Never storing plain-text passwords in localStorage.
- Adding HTTPS, CSRF protection, and rate limiting.

---

## 🛣️ Roadmap

- [ ] Add "Forgot Password" flow
- [ ] Add Google / GitHub OAuth login buttons
- [ ] Connect to a real backend (Node.js + Express or Firebase)
- [ ] Add email verification on sign up
- [ ] Animate welcome message with confetti on first sign up

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙌 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

*Built with ❤️ — Authify keeps it simple, secure, and friendly.*