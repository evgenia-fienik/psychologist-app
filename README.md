# Psychologists.Services

A web application for a company offering professional psychologist services. Users can browse psychologists, filter them by various criteria, save favorites, and book appointments.

## 🔗 Links

- 🌐 [Live Demo](https://psychologist-app-tau.vercel.app/)
- 🎨 [Figma Mockup](https://www.figma.com/file/I5vjNb0NsJOpQRnRpMloSY/Psychologists.Services)
- 📁 [GitHub Repository](https://github.com/evgenia-fienik/psychologist-app)

## 📋 About the Project

The application consists of 3 pages:

- **Home** — landing page with a company slogan and a call-to-action button
- **Psychologists** — a list of psychologists with filtering and pagination
- **Favorites** — a private page for authorized users with saved psychologists

## ⚙️ Features

- 🔐 Authentication — registration, login, logout via Firebase Auth
- 📋 Psychologist cards with detailed info and client reviews
- ❤️ Add/remove psychologists to favorites (saved in Firebase per user)
- 🔍 Filter by alphabet, price, and popularity
- 📄 Pagination — load 3 cards at a time via "Load more"
- 📅 Appointment booking form with validation
- 🎨 3 color themes (green, blue, orange)
- 📱 Fully responsive — from 320px to 1440px

## 🛠️ Technologies

| Technology | Purpose |
|---|---|
| React | UI library |
| Vite | Build tool |
| React Router DOM | Routing |
| Firebase Auth | Authentication |
| Firebase Realtime Database | Data storage |
| React Hook Form | Form management |
| Yup | Form validation |
| React Icons | Icons |
| CSS Modules | Styling |

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/evgenia-fienik/psychologist-app

# Install dependencies
npm install

# Start development server
npm run dev
