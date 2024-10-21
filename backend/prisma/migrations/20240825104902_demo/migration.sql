-- CreateTable
CREATE TABLE "Club" (
    "ClubID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ClubName" TEXT NOT NULL,
    "Description" TEXT,
    "FoundedDate" TEXT,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "LogoURL" TEXT
);

-- CreateTable
CREATE TABLE "ClubMember" (
    "MemberID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ClubID" INTEGER NOT NULL,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "Email" TEXT,
    "Role" TEXT,
    "JoinDate" TEXT,
    "ProfileImageURL" TEXT,
    CONSTRAINT "ClubMember_ClubID_fkey" FOREIGN KEY ("ClubID") REFERENCES "Club" ("ClubID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Event" (
    "EventID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ClubID" INTEGER NOT NULL,
    "EventName" TEXT NOT NULL,
    "Description" TEXT,
    "StartDateTime" TEXT,
    "EndDateTime" TEXT,
    "Location" TEXT,
    CONSTRAINT "Event_ClubID_fkey" FOREIGN KEY ("ClubID") REFERENCES "Club" ("ClubID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EventImage" (
    "ImageID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "EventID" INTEGER NOT NULL,
    "ImageURL" TEXT NOT NULL,
    "Caption" TEXT,
    CONSTRAINT "EventImage_EventID_fkey" FOREIGN KEY ("EventID") REFERENCES "Event" ("EventID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Announcement" (
    "AnnouncementID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ClubID" INTEGER NOT NULL,
    "Title" TEXT NOT NULL,
    "Content" TEXT,
    "PostDate" TEXT,
    CONSTRAINT "Announcement_ClubID_fkey" FOREIGN KEY ("ClubID") REFERENCES "Club" ("ClubID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ClubImage" (
    "ImageID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ClubID" INTEGER NOT NULL,
    "ImageURL" TEXT NOT NULL,
    "Caption" TEXT,
    CONSTRAINT "ClubImage_ClubID_fkey" FOREIGN KEY ("ClubID") REFERENCES "Club" ("ClubID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tag" (
    "TagID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "TagName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "EventTag" (
    "EventID" INTEGER NOT NULL,
    "TagID" INTEGER NOT NULL,

    PRIMARY KEY ("EventID", "TagID"),
    CONSTRAINT "EventTag_TagID_fkey" FOREIGN KEY ("TagID") REFERENCES "Tag" ("TagID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "EventTag_EventID_fkey" FOREIGN KEY ("EventID") REFERENCES "Event" ("EventID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AnnouncementTag" (
    "AnnouncementID" INTEGER NOT NULL,
    "TagID" INTEGER NOT NULL,

    PRIMARY KEY ("AnnouncementID", "TagID"),
    CONSTRAINT "AnnouncementTag_TagID_fkey" FOREIGN KEY ("TagID") REFERENCES "Tag" ("TagID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AnnouncementTag_AnnouncementID_fkey" FOREIGN KEY ("AnnouncementID") REFERENCES "Announcement" ("AnnouncementID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Club_Email_key" ON "Club"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_TagName_key" ON "Tag"("TagName");
