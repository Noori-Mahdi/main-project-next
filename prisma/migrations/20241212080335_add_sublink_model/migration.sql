-- CreateTable
CREATE TABLE "ChildLink" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "URL" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "pageId" INTEGER NOT NULL,
    CONSTRAINT "ChildLink_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Pages" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pages" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "URL" TEXT NOT NULL DEFAULT '/',
    "public" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Pages" ("icon", "id", "label", "public") SELECT "icon", "id", "label", "public" FROM "Pages";
DROP TABLE "Pages";
ALTER TABLE "new_Pages" RENAME TO "Pages";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
