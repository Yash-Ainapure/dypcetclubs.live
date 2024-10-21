"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MESSAGES = void 0;
exports.MESSAGES = {
    CLUB: {
        CLUB_NAME_EMAIL_PASSWORD_REQUIRED: "ClubName, Email, and Password are required.",
        CLUB_DATA_NOT_FOUND: "Club data not found.",
        LOGIN_SUCCESSFUL: "Login successful.",
        LOGIN_ERROR: "Login error.",
        ERROR_DURING_LOGIN: "An error occurred during login.",
        INVALID_EMAIL_OR_PASSWORD: "Invalid email or password.",
        PASSWORD_MISMATCH: "Password mismatch.",
        ERROR_FETCHING_DATA: "An error occurred while fetching club data.",
        ERROR_CREATING_CLUB: "An error occurred while creating the club.",
        CLUB_ALREADY_EXISTS: "A club with this email already exists.",
    },
    EVENT: {
        EVENT_NOT_FOUND: "Event not found.",
        NOT_AUTHORIZED: "You are not authorized to delete this event.",
        ERROR_DELETING_EVENT: "An error occurred while deleting the event.",
        ERROR_FETCHING_EVENTS: "An error occurred while fetching events.",
        ERROR_UPDATING_EVENT: "An error occurred while updating the event.",
        ERROR_CREATING_EVENT: "An error occurred while creating the event.",
        FETCH_EVENTS_SUCCESS: "Events fetched successfully.",
        UPDATE_EVENT_SUCCESS: "Event updated successfully.",
        ERROR_FETCHING_EVENT: "An error occurred while fetching the single event.",
    },
    GENERIC: {
        INTERNAL_SERVER_ERROR: "Internal Server Error",
        INVALID_REQUEST: "Invalid request",
    },
    USER: {
        ERROR_CREATING_USER: "Failed to create user.",
    },
    QUIZ: {
        INVALID_SECRET_CODE: "Invalid secret code.",
        ERROR_CREATING_QUIZ: "Failed to create quiz.",
        ERROR_FETCHING_QUIZZES: "Failed to retrieve quizzes.",
        QUIZ_NOT_FOUND: "Quiz not found.",
        ERROR_FETCHING_QUIZ: "Failed to retrieve quiz.",
        ERROR_SUBMITTING_QUIZ_RESULT: "Failed to submit quiz result.",
        ACCESS_DENIED: "Access denied to this quiz.",
        ERROR_FETCHING_QUIZ_RESULTS: "Failed to retrieve quiz results.",
        ERROR_DELETING_QUIZ: "Failed to delete quiz.",
        QUIZ_DELETED: "Quiz deleted successfully.",
    },
};
