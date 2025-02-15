/*
  Warnings:

  - You are about to drop the `FriendRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `News` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserFriends` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `icon` on the `ChildLink` table. All the data in the column will be lost.
  - You are about to drop the column `icon` on the `Pages` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "_UserFriends_B_index";

-- DropIndex
DROP INDEX "_UserFriends_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "FriendRequest";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "News";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Post";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_UserFriends";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "price" DECIMAL NOT NULL,
    "discount" REAL DEFAULT 0.0,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "rating" REAL NOT NULL DEFAULT 0.0,
    "views" INTEGER NOT NULL DEFAULT 0,
    "sold" INTEGER NOT NULL DEFAULT 0,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'AVAILABLE',
    "categoryId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "rating" REAL NOT NULL DEFAULT 0.0,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ChildLink" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "URL" TEXT NOT NULL,
    "pageId" INTEGER NOT NULL,
    CONSTRAINT "ChildLink_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Pages" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ChildLink" ("URL", "id", "label", "pageId") SELECT "URL", "id", "label", "pageId" FROM "ChildLink";
DROP TABLE "ChildLink";
ALTER TABLE "new_ChildLink" RENAME TO "ChildLink";
CREATE TABLE "new_Pages" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "URL" TEXT NOT NULL DEFAULT '/home',
    "public" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Pages" ("URL", "id", "label", "public") SELECT "URL", "id", "label", "public" FROM "Pages";
DROP TABLE "Pages";
ALTER TABLE "new_Pages" RENAME TO "Pages";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");
