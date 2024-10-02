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
exports.getAllEventData = exports.createEvent = exports.updateEvent = exports.getClubEventData = exports.deleteEvent = void 0;
const database_config_1 = require("../config/database.config");
const const_1 = require("../config/const");
// Add other club-related controller functions here
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { eventId } = req.body;
    const clubId = Number(req.query.ClubID);
    try {
        const event = yield database_config_1.prisma.event.findUnique({
            where: { EventID: eventId },
        });
        if (!event) {
            return res.status(404).json({ error: const_1.MESSAGES.EVENT.EVENT_NOT_FOUND });
        }
        if (event.ClubID !== clubId) {
            return res.status(403).json({ error: const_1.MESSAGES.EVENT.NOT_AUTHORIZED });
        }
        yield database_config_1.prisma.event.delete({
            where: { EventID: eventId },
        });
        res.status(204).end();
    }
    catch (error) {
        console.error(const_1.MESSAGES.EVENT.ERROR_DELETING_EVENT, error);
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
        res.json(events);
    }
    catch (error) {
        console.error(const_1.MESSAGES.EVENT.ERROR_FETCHING_EVENTS, error);
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
        res.json(updatedEvent);
    }
    catch (error) {
        console.error(const_1.MESSAGES.EVENT.ERROR_UPDATING_EVENT, error);
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
        res.status(201).json(newEvent);
    }
    catch (error) {
        console.error(const_1.MESSAGES.EVENT.ERROR_CREATING_EVENT, error);
        res.status(500).json({
            error: const_1.MESSAGES.EVENT.ERROR_CREATING_EVENT,
            details: error,
        });
    }
});
exports.createEvent = createEvent;
const getAllEventData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clubs = yield database_config_1.prisma.event.findMany(); // Fetch all clubs from the database
        res.json(clubs);
    }
    catch (error) {
        console.error(const_1.MESSAGES.EVENT.ERROR_FETCHING_EVENTS, error);
        res.status(500).json({ error: const_1.MESSAGES.EVENT.ERROR_FETCHING_EVENTS });
    }
});
exports.getAllEventData = getAllEventData;
