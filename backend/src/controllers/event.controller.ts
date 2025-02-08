import { Request, Response } from "express";
import { prisma } from "../config/database.config";
import { MESSAGES } from "../config/const";
import logger from "../config/logger";
import bcrypt from "bcrypt";
import axios from "axios";
import { getAccessToken } from "../config/google-forms-accesstoken";
import { google } from 'googleapis';


// Add other club-related controller functions here
export const deleteEvent = async (req: Request, res: Response) => {
  const { eventId } = req.body;
  const clubId = Number(req.query.ClubID);

  try {
    const event = await prisma.event.findUnique({
      where: { EventID: eventId },
    });

    if (!event) {
      logger.warn(`Event not found for EventID: ${eventId}`);
      return res.status(404).json({ error: MESSAGES.EVENT.EVENT_NOT_FOUND });
    }

    if (event.ClubID !== clubId) {
      logger.warn(
        `Unauthorized attempt to delete event: ${eventId} by ClubID: ${clubId}`
      );
      return res.status(403).json({ error: MESSAGES.EVENT.NOT_AUTHORIZED });
    }

    await prisma.event.delete({
      where: { EventID: eventId },
    });

    logger.info(`Event deleted: ${eventId}`);
    res.status(204).end();
  } catch (error) {
    logger.error(`${MESSAGES.EVENT.ERROR_DELETING_EVENT}: ${error}`);
    res.status(500).json({ error: MESSAGES.EVENT.ERROR_DELETING_EVENT });
  }
};

export const getClubEventData = async (req: Request, res: Response) => {
  const clubId = Number(req.query.ClubID);
  try {
    const events = await prisma.event.findMany({
      where: { ClubID: clubId },
    });
    logger.info(`Fetched events for ClubID: ${clubId}`);
    res.json(events);
  } catch (error) {
    logger.error(`${MESSAGES.EVENT.ERROR_FETCHING_EVENTS}: ${error}`);
    res.status(500).json({ error: MESSAGES.EVENT.ERROR_FETCHING_EVENTS });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  const {
    EventID,
    EventName,
    Description,
    StartDateTime,
    EndDateTime,
    Location,
  } = req.body;
  const clubId = Number(req.query.ClubID);
  try {
    const updatedEvent = await prisma.event.update({
      where: { EventID },
      data: {
        EventName,
        Description,
        StartDateTime,
        EndDateTime,
        Location,
      },
    });
    logger.info(`Event updated: ${EventID} by ClubID: ${clubId}`);
    res.json(updatedEvent);
  } catch (error) {
    logger.error(`${MESSAGES.EVENT.ERROR_UPDATING_EVENT}: ${error}`);
    res.status(500).json({ error: MESSAGES.EVENT.ERROR_UPDATING_EVENT });
  }
};

export const createEvent = async (req: Request, res: Response) => {
  const { EventName, Description, StartDateTime, EndDateTime, Location } =
    req.body;
  const clubId = Number(req.query.ClubID);

  try {
    const newEvent = await prisma.event.create({
      data: {
        EventName,
        Description,
        StartDateTime,
        EndDateTime,
        Location,
        ClubID: clubId,
      },
    });
    logger.info(
      `New event created: ${newEvent.EventName} for ClubID: ${clubId}`
    );
    res.status(201).json(newEvent);
  } catch (error) {
    logger.error(`${MESSAGES.EVENT.ERROR_CREATING_EVENT}: ${error}`);
    res.status(500).json({
      error: MESSAGES.EVENT.ERROR_CREATING_EVENT,
      details: error,
    });
  }
};

export const getAllEventData = async (req: Request, res: Response) => {
  try {
    const clubs = await prisma.event.findMany();
    logger.info("Fetched all event data.");
    res.json(clubs);
  } catch (error) {
    logger.error(`${MESSAGES.EVENT.ERROR_FETCHING_EVENTS}: ${error}`);
    res.status(500).json({ error: MESSAGES.EVENT.ERROR_FETCHING_EVENTS });
  }
};

export const createQuiz = async (req: Request, res: Response) => {
  const { title, questions, secretCode } = req.body;
  const clubId = Number(req.query.ClubID);
  if (!secretCode || typeof secretCode !== "string") {
    logger.warn("Invalid secret code provided.");
    return res.status(400).json({ error: MESSAGES.QUIZ.INVALID_SECRET_CODE });
  }
  try {
    const hashedSecretCode = await bcrypt.hash(secretCode, 10);
    const quiz = await prisma.quiz.create({
      data: {
        title,
        secretCode: hashedSecretCode,
        clubId: clubId,
      },
    });
    await Promise.all(
      questions.map((q: any) =>
        prisma.question.create({
          data: {
            question: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer,
            quizId: quiz.id,
          },
        })
      )
    );
    logger.info(`Quiz created: ${title} for ClubID: ${clubId}`);
    res.status(201).json({ quizId: quiz.id });
  } catch (error) {
    logger.error(`${MESSAGES.QUIZ.ERROR_CREATING_QUIZ}: ${error}`);
    res.status(500).json({ error: MESSAGES.QUIZ.ERROR_CREATING_QUIZ });
  }
};

export const getSingleEventData = async (req: Request, res: Response) => {
  const eventId = Number(req.query.EventID);
  try {
    const event = await prisma.event.findUnique({
      where: { EventID: eventId },
    });
    if (!event) {
      logger.warn(`Event not found for EventID: ${eventId}`);
      return res.status(404).json({ error: MESSAGES.EVENT.EVENT_NOT_FOUND });
    }
    logger.info(`Fetched event data for EventID: ${eventId}`);
    res.json(event);
  } catch (error) {
    logger.error(`${MESSAGES.EVENT.ERROR_FETCHING_EVENT}: ${error}`);
    res.status(500).json({ error: MESSAGES.EVENT.ERROR_FETCHING_EVENT });
  }
};

export const createEventForm = async (req: Request, res: Response) => {
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
    const access_token = await getAccessToken();

    // Create the form with title
    const formResponse = await axios.post(
      "https://forms.googleapis.com/v1/forms",
      googleForm,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const formId = formResponse.data.formId;
    console.log(`Form created with ID: ${formId}`);

    // Step 2: Create requests for adding questions based on the fields
    const requests = fields.map((field: any) => ({
      createItem: {
        item: {
          title: field.question,
          questionItem: {
            question:
              field.type === "multipleChoice" ||
              field.type === "checkbox" ||
              field.type === "dropdown"
                ? {
                    choiceQuestion: {
                      type: mapQuestionType(field),
                      options: (field.options || []).map((option: any) => ({
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

    console.log(
      "Requests for adding questions:",
      JSON.stringify(requests, null, 2)
    );

    // Step 3: Add questions to the form using batchUpdate
    await axios.post(
      `https://forms.googleapis.com/v1/forms/${formId}:batchUpdate`,
      { requests },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    //save this forlurl in database
    await prisma.event
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
  } catch (error: any) {
    console.error("Error creating form", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to create Google Form or Sheet" });
  }
};

const mapQuestionType = (field: any) => {
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
      console.warn(
        `Dropdown type is not supported by the Google Forms API. Mapping to RADIO instead. Field: ${field.question}`
      );
      return "RADIO"; // Map dropdown to RADIO since DROPDOWN is not supported
    default:
      return "TEXT"; // Default to TEXT if the type doesn't match
  }
};


export const getFormResponses = async (req: Request, res: Response) => {
  const { formId } = req.params;
  
  try {
    const access_token = await getAccessToken();
    
    // Initialize the Forms API
    const forms = google.forms({
      version: 'v1',
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });
    
    // Get form responses
    const responseData = await forms.forms.responses.list({
      formId: formId
    });
    
    // Get form structure to map question IDs to questions
    const formStructure = await forms.forms.get({
      formId: formId
    });
    
    // Create a map of question IDs to their text
    const questionMap = new Map();
    formStructure.data.items?.forEach(item => {
      if (item.questionItem && item.title) {
        questionMap.set(item.questionItem.question?.questionId, item.title);
      }
    });
    
    // Process responses to a more readable format
    const processedResponses = responseData.data.responses?.map(response => {
      const answers: { [key: string]: any } = {};
      
      if (response.answers) {
        Object.entries(response.answers).forEach(([questionId, answer]) => {
          const questionText = questionMap.get(questionId) || questionId;
          answers[questionText] = answer.textAnswers?.answers?.[0]?.value || '';
        });
      }
      
      return {
        responseId: response.responseId,
        createTime: response.createTime,
        answers
      };
    }) || [];
    
    res.json({
      total: processedResponses.length,
      responses: processedResponses
    });
    
  } catch (error: any) {
    console.error('Error fetching form responses:', error.response?.data || error);
    res.status(500).json({ 
      error: 'Failed to fetch form responses',
      details: error.message 
    });
  }
};