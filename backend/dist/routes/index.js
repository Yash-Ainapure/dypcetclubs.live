"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupRoutes = void 0;
const club_routes_1 = __importDefault(require("./club.routes"));
const event_routes_1 = __importDefault(require("./event.routes"));
const quiz_routes_1 = __importDefault(require("./quiz.routes"));
// const hiring_routes_1 = __importDefault(require("./hiring.routes"));
const setupRoutes = (app) => {
    app.use("/api/clubs", club_routes_1.default);
    app.use("/api/events", event_routes_1.default);
    app.use("/api/quizzes", quiz_routes_1.default);
    // app.use("/api/hiring", hiring_routes_1.default);
};
exports.setupRoutes = setupRoutes;
