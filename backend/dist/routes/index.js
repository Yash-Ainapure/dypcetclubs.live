"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupRoutes = void 0;
const club_routes_1 = __importDefault(require("./club.routes"));
const event_routes_1 = __importDefault(require("./event.routes"));
const quiz_routes_1 = __importDefault(require("./quiz.routes"));
const setupRoutes = (app) => {
    app.use("/api/clubs", club_routes_1.default);
    app.use("/api/events", event_routes_1.default);
    app.use("/api/quizzes", quiz_routes_1.default);
    // app.use("/api/tables", table);
};
exports.setupRoutes = setupRoutes;
// TODO: Review the entire project for potential security concerns and data leaks to unauthorized users.
// 1. Ensure all routes are protected with authentication and authorization middleware.
// 2. Check if sensitive data like passwords are being hashed before storing in the database.
