### TheFoody

## Table of Contents

- [About](#about)
- [Features](#features)
- [Project Structure](#project-structure)
- [Technical Stack](#technical-stack)
- [Getting Started](#getting_started)

## About <a name = "about"></a>

A modern Next.js web application that allows users to discover restaurants, search by cuisine, log in, and book tables for their preferred date and time.

## Features <a name = "features"></a>

🔐 ** User Authentication ** 

Secure login & signup
Authenticated bookings

🔎 ** Restaurant Discovery **

Browse restaurants
Search by restaurant name
Filter by cuisine

📅 ** Table Booking **

Select preferred date & time
Book available tables
View booking confirmation

📱 ** Responsive UI **

Optimized for desktop and mobile devices

## 📂 Project Structure <a name = "project-structure"></a>

.
├── app/                # App Router pages
├── components/         # Reusable UI components
├── lib/                # Utilities and helpers
├── services/           # API and business logic
├── styles/             # Global styles
├── public/             # Static assets
└── README.md

## Technical stack <a name = "technical-stack"></a>

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)

![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

![Playwright](https://img.shields.io/badge/Playwright-45ba4b?logo=playwright&logoColor=white)

![PNPM](https://img.shields.io/badge/PNPM-F69220.svg?style=for-the-badge&logo=pnpm&logoColor=white)

## Getting Started

** 1️⃣ Clone the repository **

```bash
git clone https://github.com/mkhchyan/thefoody.git
cd thefoody
```

** 2️⃣ Install dependencies **

```bash
pnpm install
```

** 3️⃣ Set up environment variables **

Create a `.env.local` file in the root directory:

NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL=your_database_url
AUTH_SECRET=your_auth_secret 

** 4️⃣ Run the development server **

```bash
pnpm dev
```
Open 👉 [http://localhost:3000](http://localhost:3000) with your browser to see the result.
