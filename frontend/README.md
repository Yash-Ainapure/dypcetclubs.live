# dypcetclubs.live

> dypcetclubs.live is a platform for managing college clubs, events, and announcements effectively.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Overview

dypcetclubs.live is a web application designed for managing activities related to college clubs. It allows club leaders to register their clubs, manage events, make announcements, and engage with club members effectively.

## Features

- **Club Registration and Management**: Club leaders can register their clubs and manage club details.
- **Event Management**: Clubs can create, edit, and delete events, including event images and tags.
- **Announcement System**: Clubs can post announcements with rich text formatting.
- **Member Management**: Manage club members and their roles.
- **Responsive Design**: Optimized for desktop and mobile devices.

## Demo

You can view a live demo of the application at -- Coming soooon.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Yash-Ainapure/dypcetclubs.live.git
   ```

   ```bash
    cd dypcetclubs.live

    cd backend
   ```

   ```bash
    npm install
   ```

   ```bash
    npm start
   ```

   **_open a new terminal_**

   ```bash
    cd frontend
   ```

   ```bash
    npm install
   ```

   ```bash
    npm run dev
   ```

   ### Open your browser and visit http://localhost:3000 to view the application locally.

   **_please dont forget to add a .env file in the backend folder with the following content for database connecion url, also
   don't forget to migrate prisma schema to database using following command_**

   ```bash
    npx prisma migrate dev --name init
   ```

   ```bash
    npx prisma generate
   ```

   **_We use turso SQlite database connection with PRISMA ORM for backend_**

   ```bash
   TURSO_AUTH_TOKEN="YOUR_TURSO_AUTH_TOKEN"
   TURSO_DATABASE_URL="YOUR_TURSO_DATABASE_URL"

   ```

  **Technologies Used**

  Frontend: React, Tailwind CSS, Typescript

  Backend: Node.js, Express

  Database: SQlite Turso Database

  ## License

  This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
