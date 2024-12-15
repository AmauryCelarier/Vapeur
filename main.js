//npm run start
//Sur le port 3042

const express = require("express");
const path = require('path');
const app = express();
const PORT = 3042;
const hbs = require("hbs");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
    res.render("index.hbs"); 
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

// 1. Afficher la liste des jeux mis en avant sur la page d'accueil

app.get("/", async (req, res) => {
    const featuredGames = await prisma.games.findMany({
        where: { featured: true },
        include: { genre: true, editor: true },
        orderBy: { title: "asc" },
    });
    res.render("index", { games: featuredGames });
});

// 2. Afficher la liste de tous les jeux

app.get("/games", (req, res) => {
    res.render("games.hbs");
});

app.get("/games", async (req, res) => {
    const games = await prisma.games.findMany({
        include: { genre: true, editor: true },
        orderBy: { title: "asc" },
    });
    res.render("games", { games });
});

// 3. Création d'un jeu

app.get("/games/create", (req, res) => {
    res.render("create_game.hbs");
});

app.get("/games/create", async (req, res) => {
    const genres = await prisma.genre.findMany({ orderBy: { genre: "asc" } });
    const editors = await prisma.editors.findMany({ orderBy: { name: "asc" } });
    res.render("create_game", { genres, editors });
});

app.post("/games/create", async (req, res) => {
    const { title, desc, releaseDate, genreId, editorId, featured } = req.body;
    await prisma.games.create({
        data: {
            title,
            desc,
            releaseDate: new Date(releaseDate),
            genreId: parseInt(genreId),
            editorId: parseInt(editorId),
            featured: featured === "on",
        },
    });
    res.redirect("/games");
});

// 4. Afficher le détail d'un jeu

app.get("/games/:id", (req, res) => {
    res.render("game_detail.hbs");
});

app.get("/games/:id", async (req, res) => {
    const game = await prisma.games.findUnique({
        where: { id_game: parseInt(req.params.id) },
        include: { genre: true, editor: true },
    });
    res.render("game_detail", { game });
});

// 5. Modification d'un jeu

app.get("/games/:id/edit", async (req, res) => {
    const game = await prisma.games.findUnique({
        where: { id_game: parseInt(req.params.id) },
    });
    const genres = await prisma.genre.findMany({ orderBy: { genre: "asc" } });
    const editors = await prisma.editors.findMany({ orderBy: { name: "asc" } });
    res.render("edit_game", { game, genres, editors });
});

app.post("/games/:id/edit", async (req, res) => {
    const { title, desc, releaseDate, genreId, editorId, featured } = req.body;
    await prisma.games.update({
        where: { id_game: parseInt(req.params.id) },
        data: {
            title,
            desc,
            releaseDate: new Date(releaseDate),
            genreId: parseInt(genreId),
            editorId: parseInt(editorId),
            featured: featured === "on",
        },
    });
    res.redirect(`/games/${req.params.id}`);
});

// 6. Suppression d'un jeu

app.get("/games/:id/delete", async (req, res) => {
    await prisma.games.delete({
        where: { id_game: parseInt(req.params.id) },
    });
    res.redirect("/games");
});