## Project Structure 📂
```
dypcetclubs.live
│
├── .gitHub
│   └── workflows
│       ├── add-contributors.yml
│       ├── ci.yml
│       └── main.yml
│
├── .husky
│   └── pre-push
│
├── backend
│   ├── .env_sample
│   ├── .gitignore
│   ├── certs
│   │   └── isrgrootx1.pem
│   ├── dist
│   │   ├── app.js
│   │   ├── config
│   │   ├── const.js
│   │   ├── database.config.js
│   │   ├── env.config.js
│   │   ├── controllers
│   │   │   ├── club.controller.js
│   │   │   ├── event.controller.js
│   │   │   ├── quiz.controller.js
│   │   │   └── userController.js
│   │   ├── middlewares
│   │   │   └── rateLimiter.js
│   │   ├── models
│   │   │   └── index.js
│   │   ├── routes
│   │   │   ├── club.routes.js
│   │   │   ├── event.routes.js
│   │   │   ├── index.js
│   │   │   └── quiz.routes.js
│   │   ├── services
│   │   │   ├── cloudnary.js
│   │   │   ├── clubService.js
│   │   │   ├── eventService.js
│   │   │   ├── quizService.js
│   │   │   └── userService.js
│   │   └── utils
│   │       └── passwordUtils.js
│   ├── nodemon.json
│   ├── package-lock.json
│   ├── package.json
│   ├── prisma
│   │   ├── dev.db
│   │   ├── dev.db-journal
│   │   ├── migrations
│   │   │   ├── 20240825104902_demo
│   │   │   │   └── migration.sql
│   │   │   ├── 20240825110048_add_new_model
│   │   │   │   └── migration.sql
│   │   │   ├── 20240825110104_removed_model
│   │   │   │   └── migration.sql
│   │   │   ├── 20240909113143_initialize
│   │   │   │   └── migration.sql
│   │   │   ├── 20240910025820_added
│   │   │   │   └── migration.sql
│   │   │   ├── 20240910095757_added
│   │   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   │   └── schema.prisma
│   ├── src
│   │   ├── app.ts
│   │   ├── config
│   │   ├── const.ts
│   │   ├── database.config.ts
│   │   ├── env.config.ts
│   │   ├── logger.ts
│   │   ├── controllers
│   │   │   ├── club.controller.ts
│   │   │   ├── event.controller.ts
│   │   │   ├── hiring.controller.ts
│   │   │   ├── quiz.controller.ts
│   │   │   └── userController.ts
│   │   ├── middlewares
│   │   │   └── rateLimiter.ts
│   │   ├── models
│   │   │   └── index.ts
│   │   ├── routes
│   │   │   ├── club.routes.ts
│   │   │   ├── event.routes.ts
│   │   │   ├── hiring.routes.ts
│   │   │   ├── index.ts
│   │   │   └── quiz.routes.ts
│   │   ├── services
│   │   │   ├── cloudnary.ts
│   │   │   ├── clubService.ts
│   │   │   ├── eventService.ts
│   │   │   ├── quizService.ts
│   │   │   └── userService.ts
│   │   └── utils
│   │       └── passwordUtils.ts
│   ├── tsconfig.json
│   └── vercel.json           
│
├── frontend
│   ├── .eslintrc.cjs
│   ├── .gitignore
│   ├── components.json
│   ├── dev-dist
│   │   ├── registerSW.js
│   │   ├── sw.js
│   │   ├── sw.js.map
│   │   ├── workbox-56da8dea.js
│   │   ├── workbox-bab94477.js
│   │   ├── workbox-c9deea91.js
│   │   └── workbox-c9deea91.js.map
│   ├── index.html
│   ├── LICENSE
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── public
│   │   └── icons
│   │       ├── cat-error-page.png
│   │       ├── icon-128x128.png
│   │       ├── icon-144x144.png
│   │       ├── icon-152x152.png
│   │       ├── icon-192x192.png
│   │       ├── icon-384x384.png
│   │       ├── icon-512x512.png
│   │       ├── icon-72x72.png
│   │       └── icon-96x96.png
│   ├── src
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── appComponents
│   │   │   ├── About.tsx
│   │   │   ├── AddClubMembers.tsx
│   │   │   ├── AddHiringSession.tsx
│   │   │   ├── AdminResults.tsx
│   │   │   ├── apx.js
│   │   │   ├── axiosInstance.tsx
│   │   │   ├── ClubAdmin.tsx
│   │   │   ├── ClubCard.tsx
│   │   │   ├── ClubDetails.tsx
│   │   │   ├── ClubLogin.tsx
│   │   │   ├── ClubRegistration.tsx
│   │   │   ├── Clubs.tsx
│   │   │   ├── ClubsPage.tsx
│   │   │   ├── Error.tsx
│   │   │   ├── EventCard.tsx
│   │   │   ├── EventCreation.tsx
│   │   │   ├── Events.tsx
│   │   │   ├── EventsPage.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Herosection.tsx
│   │   │   ├── HiringPage.tsx
│   │   │   ├── HiringSessionClubCard.tsx
│   │   │   ├── HiringSessions.tsx
│   │   │   ├── Home.tsx
│   │   │   ├── MembersList.tsx
│   │   │   ├── Meteor.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Popup.tsx
│   │   │   ├── PrivacyPolicy.tsx
│   │   │   ├── PWADebug.tsx
│   │   │   ├── PWAPrompt.tsx
│   │   │   ├── QuizCreation.tsx
│   │   │   ├── QuizPage.tsx
│   │   │   ├── Settings.jsx
│   │   │   ├── Terms.tsx
│   │   │   ├── ViewEvent.tsx
│   │   │   └── ViewSession.tsx
│   │   ├── assets
│   │       ├── burger-menu.svg
│   │       ├── cat-error-page.png
│   │       ├── cross-icon.svg
│   │       ├── dypLogo.png
│   │       ├── email_icon.png
│   │       ├── password_icon.png
│   │       └── user_icon
```
