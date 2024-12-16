-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Games" (
    "id_game" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "releaseDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editorId" INTEGER NOT NULL,
    "genreId" INTEGER NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Games_editorId_fkey" FOREIGN KEY ("editorId") REFERENCES "Editors" ("id_editor") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Games_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre" ("id_genre") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Games" ("desc", "editorId", "featured", "genreId", "id_game", "releaseDate", "title") SELECT "desc", "editorId", "featured", "genreId", "id_game", "releaseDate", "title" FROM "Games";
DROP TABLE "Games";
ALTER TABLE "new_Games" RENAME TO "Games";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
