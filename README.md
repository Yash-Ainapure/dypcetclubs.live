# dypcetclubs.live


A comprehensive platform for managing college clubs, events, and announcements effectively.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/Yash-Ainapure/dypcetclubs.live.svg)](https://github.com/Yash-Ainapure/dypcetclubs.live/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/Yash-Ainapure/dypcetclubs.live.svg)](https://github.com/Yash-Ainapure/dypcetclubs.live/issues)

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Overview

dypcetclubs.live is a robust web application designed to streamline the management of college club activities. It provides a user-friendly interface for club leaders to register their clubs, organize events, make announcements, and engage with club members efficiently.

## Key Features

- **Club Registration and Management**: Seamlessly register and manage club details
- **Event Organization**: Create, edit, and delete events with ease, including event images and tags
- **Announcement System**: Post announcements with rich text formatting capabilities
- **Member Management**: Efficiently manage club members and their roles
- **Responsive Design**: Optimized for both desktop and mobile devices

## Demo

Experience the live demo of dypcetclubs.live at [Coming Soon](#).

## Installation

Follow these steps to set up the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/Yash-Ainapure/dypcetclubs.live.git
   cd dypcetclubs.live
   ```

2. Set up the backend:
   ```bash
   cd backend
   npm install
   npm start
   ```

3. Set up the frontend (in a new terminal):
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. Create a `.env` file in the backend folder with the following content:
   ```
   TURSO_AUTH_TOKEN="YOUR_TURSO_AUTH_TOKEN"
   TURSO_DATABASE_URL="YOUR_TURSO_DATABASE_URL"
   ```

5. Migrate the Prisma schema to the database:
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

6. Open your browser and visit `http://localhost:3000` to view the application.

**Note**: Ensure you have a Turso account to obtain the necessary authentication token and database URL. Create an account at [https://turso.tech/](https://turso.tech/).

## Usage

[Add specific instructions on how to use the application, including any important workflows or features]

## Technologies Used

- **Frontend**: React, Tailwind CSS, TypeScript
- **Backend**: Node.js, Express
- **Database**: SQLite (Turso Database)
- **ORM**: Prisma

## Contributing

We welcome contributions to dypcetclubs.live! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ 

