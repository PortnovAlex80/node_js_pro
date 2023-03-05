/*
  Warnings:

  - You are about to drop the column `roleId` on the `UserModel` table. All the data in the column will be lost.
  - Added the required column `role` to the `UserModel` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserModel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL
);
INSERT INTO "new_UserModel" ("email", "firstName", "id", "lastName", "login", "password") SELECT "email", "firstName", "id", "lastName", "login", "password" FROM "UserModel";
DROP TABLE "UserModel";
ALTER TABLE "new_UserModel" RENAME TO "UserModel";
CREATE UNIQUE INDEX "UserModel_login_key" ON "UserModel"("login");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
