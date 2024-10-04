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
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
exports.testDatabaseConnection = testDatabaseConnection;
exports.closeDatabaseConnection = closeDatabaseConnection;
const client_1 = require("@prisma/client");
const adapter_libsql_1 = require("@prisma/adapter-libsql");
const client_2 = require("@libsql/client");
const env_config_1 = require("./env.config");
const libsql = (0, client_2.createClient)({
    url: `${env_config_1.config.TURSO_DATABASE_URL}`,
    authToken: `${env_config_1.config.TURSO_AUTH_TOKEN}`,
});
const adapter = new adapter_libsql_1.PrismaLibSQL(libsql);
exports.prisma = new client_1.PrismaClient({ adapter });
// Function to test the database connection
function testDatabaseConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield exports.prisma.$connect();
            console.log("Successfully connected to the database");
        }
        catch (error) {
            console.error("Failed to connect to the database:", error);
            throw error;
        }
    });
}
// Function to close the database connection
function closeDatabaseConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        yield exports.prisma.$disconnect();
        console.log("Database connection closed");
    });
}
