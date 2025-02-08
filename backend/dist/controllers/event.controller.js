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
exports.getFormResponses = exports.createEventForm = exports.getSingleEventData = exports.createQuiz = exports.getAllEventData = exports.createEvent = exports.updateEvent = exports.getClubEventData = exports.deleteEvent = void 0;
const database_config_1 = require("../config/database.config");
const const_1 = require("../config/const");
const logger_1 = __importDefault(require("../config/logger"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const axios_1 = __importDefault(require("axios"));
const google_forms_accesstoken_1 = require("../config/google-forms-accesstoken");
const googleapis_1 = require("googleapis");
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
const createEventForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, fields, eventID } = req.body;
    console.log("Creating form with title:", title, "and fields:", fields);
    try {
        // Step 1: Create the Google Form with just the title
        const googleForm = {
            info: {
                title: title,
            },
        };
        // Fetch the access token from your stored method
        const access_token = yield (0, google_forms_accesstoken_1.getAccessToken)();
        // Create the form with title
        const formResponse = yield axios_1.default.post("https://forms.googleapis.com/v1/forms", googleForm, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type": "application/json",
            },
        });
        const formId = formResponse.data.formId;
        console.log(`Form created with ID: ${formId}`);
        // Step 2: Create requests for adding questions based on the fields
        const requests = fields.map((field) => ({
            createItem: {
                item: {
                    title: field.question,
                    questionItem: {
                        question: field.type === "multipleChoice" ||
                            field.type === "checkbox" ||
                            field.type === "dropdown"
                            ? {
                                choiceQuestion: {
                                    type: mapQuestionType(field),
                                    options: (field.options || []).map((option) => ({
                                        value: option,
                                    })),
                                },
                            }
                            : {
                                textQuestion: {
                                    paragraph: field.type === "paragraph", // Use paragraph for long answers
                                },
                            },
                    },
                },
                location: {
                    index: 0, // Append all items at the end of the form
                },
            },
        }));
        console.log("Requests for adding questions:", JSON.stringify(requests, null, 2));
        // Step 3: Add questions to the form using batchUpdate
        yield axios_1.default.post(`https://forms.googleapis.com/v1/forms/${formId}:batchUpdate`, { requests }, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type": "application/json",
            },
        });
        //save this forlurl in database
        yield database_config_1.prisma.event
            .update({
            where: { EventID: eventID },
            data: {
                Link: `https://docs.google.com/forms/d/${formId}/viewform`,
            },
        })
            .catch((error) => {
            console.error(`Error updating event with form link: ${error}`);
            res
                .status(500)
                .json({ error: "Failed to update event with form link" });
        });
        // Step 6: Send the form URL back in the response
        const formUrl = `https://docs.google.com/forms/d/${formId}/viewform`;
        res.json({
            formId,
            formUrl,
            message: "Google Form created successfully",
        });
    }
    catch (error) {
        console.error("Error creating form", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
        res.status(500).json({ error: "Failed to create Google Form or Sheet" });
    }
});
exports.createEventForm = createEventForm;
const mapQuestionType = (field) => {
    switch (field.type) {
        case "shortAnswer":
            return "TEXT"; // Text type for short answer
        case "paragraph":
            return "PARAGRAPH"; // Text type for paragraph
        case "multipleChoice":
            return "RADIO"; // Use uppercase RADIO for Google Forms
        case "checkbox":
            return "CHECKBOX"; // Use CHECKBOX for multiple selections
        case "dropdown":
            console.warn(`Dropdown type is not supported by the Google Forms API. Mapping to RADIO instead. Field: ${field.question}`);
            return "RADIO"; // Map dropdown to RADIO since DROPDOWN is not supported
        default:
            return "TEXT"; // Default to TEXT if the type doesn't match
    }
};
const getFormResponses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { formId } = req.params;
    try {
        const access_token = yield (0, google_forms_accesstoken_1.getAccessToken)();
        // Initialize the Forms API
        const forms = googleapis_1.google.forms({
            version: 'v1',
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
        // Get form responses
        const responseData = yield forms.forms.responses.list({
            formId: formId
        });
        // Get form structure to map question IDs to questions
        const formStructure = yield forms.forms.get({
            formId: formId
        });
        // Create a map of question IDs to their text
        const questionMap = new Map();
        (_a = formStructure.data.items) === null || _a === void 0 ? void 0 : _a.forEach(item => {
            var _a;
            if (item.questionItem && item.title) {
                questionMap.set((_a = item.questionItem.question) === null || _a === void 0 ? void 0 : _a.questionId, item.title);
            }
        });
        // Process responses to a more readable format
        const processedResponses = ((_b = responseData.data.responses) === null || _b === void 0 ? void 0 : _b.map(response => {
            const answers = {};
            if (response.answers) {
                Object.entries(response.answers).forEach(([questionId, answer]) => {
                    var _a, _b, _c;
                    const questionText = questionMap.get(questionId) || questionId;
                    answers[questionText] = ((_c = (_b = (_a = answer.textAnswers) === null || _a === void 0 ? void 0 : _a.answers) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.value) || '';
                });
            }
            return {
                responseId: response.responseId,
                createTime: response.createTime,
                answers
            };
        })) || [];
        res.json({
            total: processedResponses.length,
            responses: processedResponses
        });
    }
    catch (error) {
        console.error('Error fetching form responses:', ((_c = error.response) === null || _c === void 0 ? void 0 : _c.data) || error);
        res.status(500).json({
            error: 'Failed to fetch form responses',
            details: error.message
        });
    }
});
exports.getFormResponses = getFormResponses;
