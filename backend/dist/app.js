"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const env_config_1 = require("./config/env.config");
const index_1 = require("./routes/index");
const database_config_1 = require("./config/database.config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Apply CORS middleware
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
(0, index_1.setupRoutes)(app);
const PORT = env_config_1.config.PORT || 4000;
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, database_config_1.testDatabaseConnection)();
            app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
            });
        }
        catch (error) {
            console.error("Failed to start server:", error);
            process.exit(1);
        }
    });
}
startServer();
// Graceful shutdown
process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Shutting down gracefully");
    yield (0, database_config_1.closeDatabaseConnection)();
    process.exit(0);
}));
// export default app;
// module.exports = app;
module.exports = (req, res) => {
    app(req, res);
};
