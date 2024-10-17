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
exports.getSingleEventData = exports.createQuiz = exports.getAllEventData = exports.createEvent = exports.updateEvent = exports.getClubEventData = exports.deleteEvent = void 0;
const database_config_1 = require("../config/database.config");
const const_1 = require("../config/const");
const logger_1 = __importDefault(require("../config/logger"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// Add other club-related controller functions here
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { eventId } = req.body;
    const clubId = Number(req.query.ClubID);
    try {
        const event = yield database_config_1.prisma.event.findUnique({
            where: { EventID: eventId },
        });
        if (!event) {
            logger_1.default.warn(`Event not found for EventID: ${eventId}`);
            return res.status(404).json({ error: const_1.MESSAGES.EVENT.EVENT_NOT_FOUND });
        }
        if (event.ClubID !== clubId) {
            logger_1.default.warn(`Unauthorized attempt to delete event: ${eventId} by ClubID: ${clubId}`);
            return res.status(403).json({ error: const_1.MESSAGES.EVENT.NOT_AUTHORIZED });
        }
        yield database_config_1.prisma.event.delete({
            where: { EventID: eventId },
        });
        logger_1.default.info(`Event deleted: ${eventId}`);
        res.status(204).end();
    }
    catch (error) {
        logger_1.default.error(`${const_1.MESSAGES.EVENT.ERROR_DELETING_EVENT}: ${error}`);
        res.status(500).json({ error: const_1.MESSAGES.EVENT.ERROR_DELETING_EVENT });
    }
});
exports.deleteEvent = deleteEvent;
const getClubEventData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clubId = Number(req.query.ClubID);
    try {
        const events = yield database_config_1.prisma.event.findMany({
            where: { ClubID: clubId },
        });
        logger_1.default.info(`Fetched events for ClubID: ${clubId}`);
        res.json(events);
    }
    catch (error) {
        logger_1.default.error(`${const_1.MESSAGES.EVENT.ERROR_FETCHING_EVENTS}: ${error}`);
        res.status(500).json({ error: const_1.MESSAGES.EVENT.ERROR_FETCHING_EVENTS });
    }
});
exports.getClubEventData = getClubEventData;
const updateEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { EventID, EventName, Description, StartDateTime, EndDateTime, Location, } = req.body;
    const clubId = Number(req.query.ClubID);
    try {
        const updatedEvent = yield database_config_1.prisma.event.update({
            where: { EventID },
            data: {
                EventName,
                Description,
                StartDateTime,
                EndDateTime,
                Location,
            },
        });
        logger_1.default.info(`Event updated: ${EventID} by ClubID: ${clubId}`);
        res.json(updatedEvent);
    }
    catch (error) {
        logger_1.default.error(`${const_1.MESSAGES.EVENT.ERROR_UPDATING_EVENT}: ${error}`);
        res.status(500).json({ error: const_1.MESSAGES.EVENT.ERROR_UPDATING_EVENT });
    }
});
exports.updateEvent = updateEvent;
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { EventName, Description, StartDateTime, EndDateTime, Location } = req.body;
    const clubId = Number(req.query.ClubID);
    try {
        const newEvent = yield database_config_1.prisma.event.create({
            data: {
                EventName,
                Description,
                StartDateTime,
                EndDateTime,
                Location,
                ClubID: clubId,
            },
        });
        logger_1.default.info(`New event created: ${newEvent.EventName} for ClubID: ${clubId}`);
        res.status(201).json(newEvent);
    }
    catch (error) {
        logger_1.default.error(`${const_1.MESSAGES.EVENT.ERROR_CREATING_EVENT}: ${error}`);
        res.status(500).json({
            error: const_1.MESSAGES.EVENT.ERROR_CREATING_EVENT,
            details: error,
        });
    }
});
exports.createEvent = createEvent;
const getAllEventData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clubs = yield database_config_1.prisma.event.findMany();
        logger_1.default.info("Fetched all event data.");
        res.json(clubs);
    }
    catch (error) {
        logger_1.default.error(`${const_1.MESSAGES.EVENT.ERROR_FETCHING_EVENTS}: ${error}`);
        res.status(500).json({ error: const_1.MESSAGES.EVENT.ERROR_FETCHING_EVENTS });
    }
});
exports.getAllEventData = getAllEventData;
const createQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, questions, secretCode } = req.body;
    const clubId = Number(req.query.ClubID);
    if (!secretCode || typeof secretCode !== "string") {
        logger_1.default.warn("Invalid secret code provided.");
        return res.status(400).json({ error: const_1.MESSAGES.QUIZ.INVALID_SECRET_CODE });
    }
    try {
        const hashedSecretCode = yield bcrypt_1.default.hash(secretCode, 10);
        const quiz = yield database_config_1.prisma.quiz.create({
            data: {
                title,
                secretCode: hashedSecretCode,
                clubId: clubId,
            },
        });
        yield Promise.all(questions.map((q) => database_config_1.prisma.question.create({
            data: {
                question: q.question,
                options: q.options,
                correctAnswer: q.correctAnswer,
                quizId: quiz.id,
            },
        })));
        logger_1.default.info(`Quiz created: ${title} for ClubID: ${clubId}`);
        res.status(201).json({ quizId: quiz.id });
    }
    catch (error) {
        logger_1.default.error(`${const_1.MESSAGES.QUIZ.ERROR_CREATING_QUIZ}: ${error}`);
        res.status(500).json({ error: const_1.MESSAGES.QUIZ.ERROR_CREATING_QUIZ });
    }
});
exports.createQuiz = createQuiz;
const getSingleEventData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventId = Number(req.query.EventID);
    try {
        const event = yield database_config_1.prisma.event.findUnique({
            where: { EventID: eventId },
        });
        if (!event) {
            logger_1.default.warn(`Event not found for EventID: ${eventId}`);
            return res.status(404).json({ error: const_1.MESSAGES.EVENT.EVENT_NOT_FOUND });
        }
        logger_1.default.info(`Fetched event data for EventID: ${eventId}`);
        res.json(event);
    }
    catch (error) {
        logger_1.default.error(`${const_1.MESSAGES.EVENT.ERROR_FETCHING_EVENT}: ${error}`);
        res.status(500).json({ error: const_1.MESSAGES.EVENT.ERROR_FETCHING_EVENT });
    }
});
exports.getSingleEventData = getSingleEventData;
