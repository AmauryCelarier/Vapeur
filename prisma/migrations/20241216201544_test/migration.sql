-- CreateTable
CREATE TABLE "Genre" (
    "id_genre" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "genre" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Editors" (
    "id_editor" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Games" (
    "id_game" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "releaseDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editorId" INTEGER NOT NULL,
    "genreId" INTEGER NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Games_editorId_fkey" FOREIGN KEY ("editorId") REFERENCES "Editors" ("id_editor") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Games_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre" ("id_genre") ON DELETE RESTRICT ON UPDATE CASCADE
);
