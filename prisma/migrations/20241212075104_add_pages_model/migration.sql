-- CreateTable
CREATE TABLE "Pages" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "public" BOOLEAN NOT NULL DEFAULT false
);
