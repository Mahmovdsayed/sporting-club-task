## 🏋️‍♂️ Sporting Club Task

A modern web dashboard built with **Next.js**, **TypeScript**, and **MongoDB**, designed to manage **club members**, **sports**, and **subscriptions** with ease.

---

**Test Credentials**: You can use the following account to test the application without signing up, or create your own account:
**Email**: `test@test.com`
**Password**: `Test@123`

---

### 🚀 Features

- 👥 **Member Management** — Add, view, and organize members efficiently.
- 🏀 **Sports Management** — Create and manage sports categories.
- 🎫 **Subscription System** — Subscribe members to multiple sports with validation.
- 🧠 **Smart Validation** — Built with `Zod` and `React Hook Form` for robust forms.
- 💾 **MongoDB Integration** — Persistent storage for members, sports, and subscriptions.
- 🔐 **Authentication** — Secure user access using JWT cookies.
- 🌓 **Dark/Light Theme** — Toggle theme directly from the dashboard.
- ⚡ **Optimized Performance** — SSR-ready with Next.js App Router.

---

### 🛠️ Tech Stack

| Category         | Technology                              |
| ---------------- | --------------------------------------- |
| Frontend         | Next.js (App Router), React, TypeScript |
| Backend          | Node.js, Next.js API Routes             |
| Database         | MongoDB, Mongoose                       |
| UI Library       | Shadcn/UI, Tailwind CSS                 |
| Validation       | Zod, React Hook Form                    |
| State Management | React Query                             |
| Authentication   | JWT with HttpOnly cookies               |
| Deployment       | Vercel                                  |

---

### 🧩 Folder Structure

```
src/
├── app/                     # Next.js routes and pages
├── components/              # UI components (Cards, Tables, etc.)
├── models/                  # Mongoose models (Members, Sports, Subscriptions)
├── validations/             # Zod schemas for validation
├── hooks/                   # Custom hooks (useFormHandler, etc.)
├── lib/                     # Database connection, utilities
├── helpers/                 # Auth, JSON response helpers
└── types/                   # TypeScript type definitions
```

---

### 🧱 API Endpoints Overview

| Endpoint                       | Method | Description                      |
| ------------------------------ | ------ | -------------------------------- |
| `/api/signin`                  | POST   | User login                       |
| `/api/signup`                  | POST   | User registration                |
| `/api/dashboard/members`       | CRUD   | Add, update, delete, get members |
| `/api/dashboard/sports`        | CRUD   | Add, update, delete, get sports  |
| `/api/dashboard/subscriptions` | CRUD   | Add, delete, get subscriptions   |
| `/api/dashboard/user`          | GET    | Fetch logged-in user info        |

---

### 🖼️ Open Graph & SEO

Metadata is configured in `app/layout.tsx` using Next.js **Metadata API**, including Open Graph and Twitter cards.
The main OG image: `/opengraph-image.png`.

---

### 🧑‍💻 Author

**Mahmoud Sayed**
Full-Stack Developer
📧 [mahmoudsayed3576@gmail.com](mailto:mahmoudsayed3576@gmail.com)
🌐 [My Website](https://www.mahmoud.life/)

---

### 📜 License

This project is licensed under the **MIT License** — you’re free to use, modify, and distribute it.
