

# 🎓 **dypcetclubs.live**

A comprehensive platform for **managing college clubs, events, and announcements** effectively.



## 🚀 **Table of Contents**

- [Overview](#overview)
- [Key Features](#key-features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)



## 🌟 **Overview**

**dypcetclubs.live** is a robust web application designed to **simplify** the management of college clubs. It provides a user-friendly interface for club leaders to:

- Register their clubs.
- Organize and manage events.
- Make important announcements.
- Engage efficiently with club members.



## ✨ **Key Features**

- **📋 Club Registration & Management**: Register and manage club details seamlessly.
- **📅 Event Organization**: Create, edit, and delete events, complete with images and tags.
- **📢 Announcement System**: Post rich-text announcements for your club members.
- **👥 Member Management**: Easily manage members and assign roles.
- **💻 Mobile & Desktop Friendly**: Fully responsive design.


## ⚙️ **Installation**

Follow these steps to set up the project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Yash-Ainapure/dypcetclubs.live.git
   cd dypcetclubs.live
   ```

2. **Set up the backend:**
   ```bash
   cd backend
   npm install
   npm start
   ```

3. **Set up the frontend (in a new terminal):**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Create a `.env` file** in the backend folder:
   ```
   TURSO_AUTH_TOKEN="YOUR_TURSO_AUTH_TOKEN"
   TURSO_DATABASE_URL="YOUR_TURSO_DATABASE_URL"
   ```

5. **Migrate Prisma schema:**
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

6. **Run the application**:
   - Open your browser and visit `http://localhost:3000`.

> **Note**: You'll need a Turso account to obtain the authentication token and database URL. Sign up at [Turso.tech](https://turso.tech/).



## 🧑‍💻 **Usage**

[Include specific instructions on how to use the application features and workflows.]



## 🛠️ **Technologies Used**

- **Frontend**: React, Tailwind CSS, TypeScript
- **Backend**: Node.js, Express
- **Database**: SQLite (Turso Database)
- **ORM**: Prisma



## 🤝 **Contributing**

We welcome contributions to **dypcetclubs.live**!

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push the branch: `git push origin feature/your-feature-name`.
5. Submit a pull request.

> For major changes, open an issue first to discuss your ideas.

## Our Valuable Contributors ❤️✨

We are grateful to all the contributors who have helped improve this project. Your contributions are what make this project better!

<!-- readme: contributors -start -->
<table>
	<tbody>
		<tr>
            <td align="center">
                <a href="https://github.com/Yash-Ainapure">
                    <img src="https://avatars.githubusercontent.com/u/136250383?v=4" width="100;" alt="Yash-Ainapure"/>
                    <br />
                    <sub><b>yash ainapure</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/yashksaini-coder">
                    <img src="https://avatars.githubusercontent.com/u/115717039?v=4" width="100;" alt="yashksaini-coder"/>
                    <br />
                    <sub><b>Yash Kumar Saini</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/rishyym0927">
                    <img src="https://avatars.githubusercontent.com/u/136720020?v=4" width="100;" alt="rishyym0927"/>
                    <br />
                    <sub><b>RISHIRAJ MUKHERJEE</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/prateek2102">
                    <img src="https://avatars.githubusercontent.com/u/130992856?v=4" width="100;" alt="prateek2102"/>
                    <br />
                    <sub><b>Prateek </b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/jainaryan04">
                    <img src="https://avatars.githubusercontent.com/u/138214350?v=4" width="100;" alt="jainaryan04"/>
                    <br />
                    <sub><b>Aryan Ramesh Jain</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/Sourabh782">
                    <img src="https://avatars.githubusercontent.com/u/103349890?v=4" width="100;" alt="Sourabh782"/>
                    <br />
                    <sub><b>Sourabh Singh Rawat</b></sub>
                </a>
            </td>
		</tr>
		<tr>
            <td align="center">
                <a href="https://github.com/ZayedShahcode">
                    <img src="https://avatars.githubusercontent.com/u/115407231?v=4" width="100;" alt="ZayedShahcode"/>
                    <br />
                    <sub><b>Zayed</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/im-amanjai">
                    <img src="https://avatars.githubusercontent.com/u/145966547?v=4" width="100;" alt="im-amanjai"/>
                    <br />
                    <sub><b>im-amanjai</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/radheypatil6630">
                    <img src="https://avatars.githubusercontent.com/u/85211195?v=4" width="100;" alt="radheypatil6630"/>
                    <br />
                    <sub><b>Radhey patil</b></sub>
                </a>
            </td>
		</tr>
	<tbody>
</table>
<!-- readme: contributors -end -->

## 📄 **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

### Made with ❤️ by the dypcetclubs.live team!

