import { Request, Response } from "express";
import { prisma } from "../config/database.config";
import logger from "../config/logger";
import multer from "multer";
import { bucket } from "../config/firestore-config";

export const CreateHiringSession = async (req: Request, res: Response) => {
  const { ClubID } = req.query;
  if (!ClubID || isNaN(parseInt(ClubID as string))) {
    return res.status(400).json({ error: "Invalid or missing ClubID" });
  }
  const { title, description, startDate, endDate } = req.body;
  console.log(req.body);
  // Create date strings in ISO-8601 format
  const startDateISO = `${startDate}`;
  const endDateISO = `${endDate}`;

  try {
    const club = await prisma.club.findUnique({
      where: {
        ClubID: parseInt(ClubID as string),
      },
    });

    if (!club) {
      return res.status(404).json({ error: "Club not found" });
    }
    // Create hiring session
    const hiringSession = await prisma.hiringSession.create({
      data: {
        Club: {
          connect: {
            ClubID: parseInt(ClubID as string),
          },
        },
        Title: title,
        Description: description,
        StartDate: startDateISO,
        EndDate: endDateISO,
      },
    });
    logger.info(`Hiring session created id: ${hiringSession.SessionID}`);
    res.status(201).json(hiringSession);
  } catch (error) {
    logger.error(`Error creating hiring session: ${error}`);
    res.status(500).json({ error: "Error creating hiring session" });
  }
};

export const GetHiringSessions = async (req: Request, res: Response) => {
  const { ClubID } = req.query;

  if (!ClubID || isNaN(parseInt(ClubID as string))) {
    return res.status(400).json({ error: "Invalid or missing ClubID" });
  }

  try {
    const hiringSessions = await prisma.hiringSession.findMany({
      where: {
        ClubID: parseInt(ClubID as string),
      },
      include: {
        Positions: true,
      },
    });

    if (hiringSessions.length === 0) {
      return res
        .status(404)
        .json({ message: "No hiring sessions found for this club." });
    }

    res.status(200).json(hiringSessions);
  } catch (error) {
    console.error(`Error fetching hiring sessions: ${error}`);
    res.status(500).json({ error: "Error fetching hiring sessions" });
  }
};

export const GetAllHiringSessions = async (req: Request, res: Response) => {
  try {
    const hiringSessions = await prisma.hiringSession.findMany({
      include: {
        Positions: true,
      },
    });

    if (hiringSessions.length === 0) {
      return res.status(404).json({ message: "No hiring sessions found." });
    }

    res.status(200).json(hiringSessions);
  } catch (error) {
    console.error(`Error fetching hiring sessions: ${error}`);
    res.status(500).json({ error: "Error fetching hiring sessions" });
  }
};

// deletes all the hiring positions applications table which relates with this session
export const DeleteHiringSession = async (req: Request, res: Response) => {
  try {
    const SessionID = req.query.SessionID;
    if (!SessionID || isNaN(parseInt(SessionID as string))) {
      return res.status(400).json({ error: "Invalid or missing SessionID" });
    }

    //check if the session is present
    const hiringSessionCheck = await prisma.hiringSession.findUnique({
      where: {
        SessionID: parseInt(SessionID as string),
      },
    });
    if (!hiringSessionCheck) {
      return res
        .status(404)
        .json({ error: "No Hiring session found for given id" });
    }

    //check if the session has any hiring positions
    // const hiringPositions = await prisma.hiringPosition.findMany({
    //   where: {
    //     SessionID: parseInt(SessionID as string),
    //   },
    // });
    // console.log("hiringPositions");
    // console.log(hiringPositions);
    // if (hiringPositions.length > 0) {
    //   return res.status(400).json({
    //     error: "Cannot delete hiring session as there are associated hiring positions",
    //   });
    // }

    //delete the session
    try {
      const hiringSession = await prisma.hiringSession.delete({
        where: {
          SessionID: parseInt(SessionID as string),
        },
      });
      res.status(200).json({ message: "Session deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error deleting hiring session" + error });
    }
  } catch (error) {
    console.log(error);
    logger.error(`Error deleting hiring session: ${error}`);
    res.status(500).json({ error: "Error deleting hiring session" + error });
  }
};

export const UpdateHiringSession = async (req: Request, res: Response) => {
  const { SessionID } = req.query;
  if (!SessionID || isNaN(parseInt(SessionID as string))) {
    return res.status(400).json({ error: "Invalid or missing SessionID" });
  }
  const { title, description, startDate, endDate } = req.body;
  // Create date strings in ISO-8601 format
  const startDateISO = `${startDate}T00:00:00Z`;
  const endDateISO = `${endDate}T00:00:00Z`;

  try {
    const hiringSession = await prisma.hiringSession.findUnique({
      where: {
        SessionID: parseInt(SessionID as string),
      },
    });

    if (!hiringSession) {
      return res.status(404).json({ error: "Hiring session not found" });
    }

    const updatedHiringSession = await prisma.hiringSession.update({
      where: {
        SessionID: parseInt(SessionID as string),
      },
      data: {
        Title: title,
        Description: description,
        StartDate: startDateISO,
        EndDate: endDateISO,
      },
    });
    logger.info(`Hiring session updated id: ${updatedHiringSession.SessionID}`);
    res.status(200).json(updatedHiringSession);
  } catch (error) {
    console.log(error);
    logger.error(`Error updating hiring session: ${error}`);
    res.status(500).json({ error: "Error updating hiring session" });
  }
};

export const AddHiringPosition = async (req: Request, res: Response) => {
  const { SessionID } = req.query;
  if (!SessionID || isNaN(parseInt(SessionID as string))) {
    return res.status(400).json({ error: "Invalid or missing SessionID" });
  }
  const { title, description, spots } = req.body;

  try {
    const hiringSession = await prisma.hiringSession.findUnique({
      where: {
        SessionID: parseInt(SessionID as string),
      },
    });

    if (!hiringSession) {
      return res.status(404).json({ error: "Hiring session not found" });
    }

    try {
      const hiringPosition = await prisma.hiringPosition.create({
        data: {
          HiringSession: {
            connect: {
              SessionID: parseInt(SessionID as string),
            },
          },
          Title: title,
          Description: description,
          Spots: spots,
        },
      });

      logger.info(`Hiring position created id: ${hiringPosition.PositionID}`);
      res.status(201).json(hiringPosition);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error creating hiring position" });
    }
  } catch (error) {
    logger.error(`Error creating hiring position: ${error}`);
    res.status(500).json({ error: "Error creating hiring position" });
  }
};

export const GetPositionsBySession = async (req: Request, res: Response) => {
  const { SessionID } = req.query;

  if (!SessionID || isNaN(parseInt(SessionID as string))) {
    return res.status(400).json({ error: "Invalid or missing SessionID" });
  }

  try {
    const positions = await prisma.hiringPosition.findMany({
      where: {
        HiringSession: {
          SessionID: parseInt(SessionID as string),
        },
      },
    });

    if (!positions.length) {
      return res
        .status(404)
        .json({ error: "No positions found for this session." });
    }

    res.status(200).json(positions);
  } catch (error) {
    console.error(`Error retrieving positions: ${error}`);
    res.status(500).json({ error: "Error retrieving positions" });
  }
};

export const DeleteHiringPosition = async (req: Request, res: Response) => {
  const { PositionID } = req.query;
  console.log(PositionID);
  if (!PositionID || isNaN(parseInt(PositionID as string))) {
    return res.status(400).json({ error: "Invalid or missing PositionID" });
  }
  try {
    const hiringPosition = await prisma.hiringPosition.delete({
      where: {
        PositionID: parseInt(PositionID as string),
      },
    });
    logger.info(`Hiring position deleted id: ${hiringPosition.PositionID}`);
    res.status(200).json({ message: "Position deleted successfully" });
  } catch (error) {
    console.log(error);
    logger.error(`Error deleting hiring position: ${error}`);
    res.status(500).json({ error: "Error deleting hiring position" });
  }
};

export const UpdateHiringPosition = async (req: Request, res: Response) => {
  const { PositionID } = req.query;
  if (!PositionID || isNaN(parseInt(PositionID as string))) {
    return res.status(400).json({ error: "Invalid or missing PositionID" });
  }
  const { title, description, spots } = req.body;

  try {
    const hiringPosition = await prisma.hiringPosition.findUnique({
      where: {
        PositionID: parseInt(PositionID as string),
      },
    });

    if (!hiringPosition) {
      return res.status(404).json({ error: "Hiring position not found" });
    }

    const updatedHiringPosition = await prisma.hiringPosition.update({
      where: {
        PositionID: parseInt(PositionID as string),
      },
      data: {
        Title: title,
        Description: description,
        Spots: spots,
      },
    });
    logger.info(
      `Hiring position updated id: ${updatedHiringPosition.PositionID}`
    );
    res.status(200).json(updatedHiringPosition);
  } catch (error) {
    console.log(error);
    logger.error(`Error updating hiring position: ${error}`);
    res.status(500).json({ error: "Error updating hiring position" });
  }
};

export const CreateApplicant = async (req: Request, res: Response) => {
  const { PositionID } = req.query;
  if (!PositionID || isNaN(parseInt(PositionID as string))) {
    return res.status(400).json({ error: "Invalid or missing PositionID" });
  }

  // Access non-file fields from req.body
  const { name, phone, yearOfStudy, department } = req.body;

  // Access the uploaded file
  if (!req.file) {
    return res.status(400).json({ error: "No resume file uploaded" });
  }

  const file = req.file;
  const fileName = `resumes/${Date.now()}_${file.originalname}`;
  const fileUpload = bucket.file(fileName);

  const blobStream = fileUpload.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  });

  blobStream.on("error", (error: any) => {
    console.error(error);
    return res.status(500).json({ error: "Error uploading resume" });
  });

  blobStream.on("finish", async () => {
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;

    await fileUpload.makePublic();

    try {
      if (!name || !phone || !yearOfStudy || !department) {
        console.log("Missing fields:", {
          name,
          phone,
          yearOfStudy,
          department,
        });
        return res.status(400).json({ error: "All fields are required" });
      }

      // Check if the hiring position exists
      const hiringPosition = await prisma.hiringPosition.findUnique({
        where: {
          PositionID: parseInt(PositionID as string),
        },
      });

      if (!hiringPosition) {
        return res.status(404).json({ error: "Hiring position not found" });
      }

      // Create the applicant
      const applicant = await prisma.applicant.create({
        data: {
          Name: name,
          YearOfStudy: parseInt(yearOfStudy),
          Department: department,
          PhoneNumber: phone,
          ResumeURL: publicUrl,
        },
      });

      if (!applicant) {
        return res.status(500).json({ error: "Error creating applicant" });
      }

      // Create the hiring application
      await prisma.hiringApplication.create({
        data: {
          Applicant: {
            connect: {
              ApplicantID: applicant.ApplicantID,
            },
          },
          Position: {
            connect: {
              PositionID: parseInt(PositionID as string),
            },
          },
        },
      });

      logger.info(`Applicant created id: ${applicant.ApplicantID}`);
      return res.status(201).json(applicant);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error creating applicant" });
    }
  });

  blobStream.end(file.buffer);
};

// export const CreateApplicant = async (req: Request, res: Response) => {
//   console.log("Request Body:", req.body);
//   console.log("Request File:", req.file);

//   if (!req.file) {
//     return res.status(400).json({ error: "No resume file uploaded yet" });
//   }

//   const { name, phone, yearOfStudy, department } = req.body;

//   if (!name || !phone || !yearOfStudy || !department) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   console.log("Request Body:", req.body);
//   console.log("Request File:", req.file);

//   res.status(200).json({ message: "File uploaded successfully" });
// };

export const getApplicantsByPositionID = async (
  req: Request,
  res: Response
) => {
  const { PositionID } = req.query;
  if (!PositionID || isNaN(parseInt(PositionID as string))) {
    return res.status(400).json({ error: "Invalid or missing PositionID" });
  }

  try {
    const applicants = await prisma.hiringApplication.findMany({
      where: {
        Position: {
          PositionID: parseInt(PositionID as string),
        },
      },
      include: {
        Applicant: true,
      },
    });
    if (!applicants.length) {
      return res
        .status(404)
        .json({ error: "No Applications found for this session." });
    }

    res.status(200).json(applicants);
  } catch (error) {
    console.error(`Error retrieving Applications: ${error}`);
    res.status(500).json({ error: "Error retrieving Applications" });
  }
};
