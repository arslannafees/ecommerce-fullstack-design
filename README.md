<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=3,11,30&height=220&section=header&text=E-Commerce&fontSize=64&fontColor=ffffff&animation=twinkling&fontAlignY=38&desc=React%20Vite%20Storefront%20with%20Firebase%20Auth%20%2B%20Express%20API&descSize=18&descAlignY=62&descColor=ffffff" width="100%" />

<p>
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Firebase-Auth%20%2B%20Firestore-FFCA28?style=flat-square&logo=firebase&logoColor=111827" alt="Firebase" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/JavaScript-ESM-F7DF1E?style=flat-square&logo=javascript&logoColor=111827" alt="JavaScript" />
</p>

<p>
  A modern e-commerce storefront with product browsing, search, cart persistence, Firebase authentication, and a small Express + Realtime Database API for product management.
</p>

<p>
  <a href="#getting-started">Getting Started</a> ·
  <a href="#features">Features</a> ·
  <a href="#screenshots">Screenshots</a> ·
  <a href="#api">API</a> ·
  <a href="#project-structure">Structure</a>
</p>

</div>

---

## Overview

This repository contains a storefront-style e-commerce app built with a Vite + React client and an Express server. The UI focuses on product discovery and shopping flow, while Firebase powers authentication and the product catalog used by the admin panel.

The app includes:

- A responsive homepage with featured products and promotional sections.
- A product listing page with filters, search, and grid/list switching.
- A detailed product page with related items and add-to-cart actions.
- A cart experience with quantity controls, saved-for-later items, and persistent local storage.
- Login, signup, and admin routes protected by Firebase auth state.
- A backend API for CRUD operations on products stored in Firebase Realtime Database.

---

## Features

### Storefront

- Homepage with featured products loaded from the API.
- Product listing with search, brand filters, feature toggles, and view modes.
- Product details page with gallery thumbnails, ratings, recommendations, and related products.
- Clean, marketing-style layout inspired by a modern marketplace UI.

### Cart and Checkout UI

- Add products to cart from the details page.
- Increase, decrease, and remove items from the cart.
- Persist cart data in localStorage.
- Save items for later and move them back into the shopping flow.
- Coupon box, subtotal, tax, discount, and summary cards.

### Authentication and Admin

- Firebase email/password signup and login.
- Auth context shared across the app.
- Protected admin route for authenticated admin users only.
- User roles stored in Firestore under the `users` collection.

### Backend and Data

- Express API for product CRUD.
- Firebase Realtime Database storage for products.
- Health endpoint for quick service checks.
- CORS-enabled local development setup.

---

## Tech Stack

### Frontend

- React 19
- Vite
- React Router DOM
- Axios
- Firebase Auth
- Firestore

### Backend

- Node.js
- Express
- Firebase Admin SDK
- Firebase Realtime Database

### State and UI Behavior

- React Context for auth and cart state
- localStorage for cart persistence
- Protected route handling for admin access

---

## Project Structure

```text
E-Commerce/
├── client/
│   ├── src/
│   │   ├── api/              # Axios API helpers
│   │   ├── components/       # Header, Footer, product cards, protected route
│   │   ├── context/          # Auth and cart providers
│   │   ├── data/             # Mock storefront data
│   │   ├── pages/            # Home, listing, details, cart, login, signup, admin
│   │   ├── firebase.js       # Firebase client config
│   │   ├── App.jsx           # Routes and layout shell
│   │   └── main.jsx          # App entry point
│   └── package.json
├── server/
│   ├── firebase.js           # Firebase Admin initialization
│   ├── index.js              # Express API server
│   ├── seedDatabase.js       # Optional seed script
│   └── package.json
├── public/
│   └── Images/               # README screenshots and static images
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm
- A Firebase project with Auth, Firestore, and Realtime Database enabled

### Installation

1. Clone the repository.

   ```bash
   git clone https://github.com/arslannafees/e-commerce.git
   cd E-Commerce
   ```

2. Install the client dependencies.

   ```bash
   cd client
   npm install
   ```

3. Install the server dependencies.

   ```bash
   cd ../server
   npm install
   ```

### Run the App

Open two terminals:

1. Start the client.

   ```bash
   cd client
   npm run dev
   ```

2. Start the server.

   ```bash
   cd server
   npm start
   ```

By default the client runs on Vite's local development port and the API runs on `http://localhost:5000`.

---

## Configuration

### Client Firebase Setup

The client uses `client/src/firebase.js` for Firebase configuration.

Before running the app, replace the sample Firebase keys with your own Firebase project details:

- `apiKey`
- `authDomain`
- `databaseURL`
- `projectId`
- `storageBucket`
- `messagingSenderId`
- `appId`

### Server Firebase Admin Setup

The server uses `server/serviceAccountKey.json` for Firebase Admin credentials.

Make sure the file exists and contains a valid service account from your Firebase project. The server reads it from `server/firebase.js`.

### API Base URL

The client currently points to:

```text
http://localhost:5000/api
```

If you deploy the server elsewhere, update `client/src/api/products.js` accordingly.

---

## Available Scripts

### Client

From the `client/` folder:

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and build the production bundle |
| `npm run preview` | Preview the production build locally |

### Server

From the `server/` folder:

| Command | Description |
| --- | --- |
| `npm start` | Start the Express API server |
| `npm test` | Placeholder script from the default package setup |

---

## API

The Express server exposes a lightweight REST API for products.

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/products` | Create a product |
| `GET` | `/api/products` | List all products |
| `GET` | `/api/products/:id` | Fetch a single product |
| `PUT` | `/api/products/:id` | Update a product |
| `DELETE` | `/api/products/:id` | Delete a product |
| `GET` | `/api/health` | Health check |

### Data Flow

1. The React client loads products through Axios.
2. The Express server reads and writes the product data in Firebase Realtime Database.
3. Firebase Authentication handles signup/login for the admin-protected UI.
4. Cart state is stored locally in the browser so the shopping session survives refreshes.

---

## Key Pages

- `/` - Home page with featured products and promotional sections.
- `/products` - Product catalog and filters.
- `/products/:id` - Product detail page.
- `/cart` - Cart and checkout summary.
- `/login` - Firebase login screen.
- `/signup` - Firebase registration screen.
- `/admin` - Protected admin product management page.

---

## Data Collections

### Firestore

- `users` - Stores user email and role after signup.

### Realtime Database

- `products` - Product records used by the admin panel and storefront.

---

## Authentication Flow

1. A user signs up or logs in with Firebase Auth.
2. The client listens to auth state changes through `AuthContext`.
3. User roles are read from Firestore.
4. The `ProtectedRoute` component blocks unauthenticated users and non-admin users from `/admin`.

---

## Troubleshooting

### Common Issues

**API requests fail**

- Confirm the Express server is running on port `5000`.
- Check that `client/src/api/products.js` points to the correct API base URL.

**Login or signup fails**

- Verify the Firebase config in `client/src/firebase.js`.
- Make sure email/password sign-in is enabled in your Firebase project.

**Admin page redirects to home**

- Ensure the current user has a Firestore document in `users` with `role: 'admin'`.

**Products do not load**

- Check that `server/serviceAccountKey.json` is valid.
- Confirm the Realtime Database URL matches your Firebase project.

**Build or install issues**

```bash
cd client
rm -rf node_modules package-lock.json
npm install
```

On Windows PowerShell, use:

```powershell
Remove-Item node_modules -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item package-lock.json -Force -ErrorAction SilentlyContinue
npm install
```

---

## Contributing

This project is currently personal/private, but you can still use the structure as a reference for your own storefront or adapt it for a larger commerce app.

If you plan to extend it, a good next step is to add:

- Search debouncing and better filtering.
- Real checkout and payment integration.
- Server-side admin authentication.
- Product categories and inventory tracking.
- Deployment configuration for client and server.

---

## Contact

**Arslan Nafees**

- GitHub: [arslannafees](https://github.com/arslannafees)
- Email: arslannafees807@gmail.com
- Phone: +92 334 111 3047

---

## License

PROPRIETARY & CONFIDENTIAL LICENSE

This software and associated documentation files are proprietary and confidential. Unauthorized copying, distribution, modification, or use of this software, via any medium, is strictly prohibited without express written permission from the copyright holder.

```text
Copyright (c) 2026 Arslan Nafees
All rights reserved.
```

---

<p align="center">
  Built with React, Vite, Firebase, and Express.
</p>
# ecommerce-fullstack-design
