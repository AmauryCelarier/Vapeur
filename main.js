//npm run start
//Sur le port 3042

const express = require("express");
const path = require('path');
const { PrismaClient } = require("@prisma/client");
const app = express();
const PORT = 3042;
const hbs = require("hbs");

const prisma = new PrismaClient();

app.use(express.static(path.join(__dirname, 'public',)));

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

hbs.registerPartials(path.join(__dirname, "views", "partials"));

// Test 

const genres = [
    "Action",
    "Aventure",
    "RPG",
    "Simulation",
    "Sport",
    "MMORPG"
];

async function initializeGenres() {
    for (const genre of genres) {
        try {
            const existingGenre = await prisma.genre.findUnique({
                where: { genre }  // Vérifie si le genre existe déjà
            });

            if (!existingGenre) {
                await prisma.genre.create({
                    data: { genre }
                });
                
            } else {
            }
        } catch (error) {
            console.error("Erreur lors de l'initialisation des genres :", error);
        }
    }
}

initializeGenres().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error("Erreur lors de l'initialisation des genres :", error);
});

// 1. Afficher la liste des jeux mis en avant sur la page d'accueil

app.get("/", async (req, res) => {
    try {
        const featuredGames = await prisma.games.findMany({
            where: { featured: true },
            include: { genre: true, editor: true },
            orderBy: { title: "asc" },
        });
        res.render("index", { games: featuredGames });
    } catch (error) {
        console.error("Erreur lors de la récupération des jeux en vedette :", error);
        res.status(500).send("Erreur interne du serveur");
    }
});

// 2. Afficher la liste de tous les jeux

app.get("/games", async (req, res) => {
    try {
        const games = await prisma.games.findMany({
            include: { 
                genre: true, 
                editor: true   
            },
            orderBy: { title: "asc" }, 
        });
        res.render("games/games", { games });
    } catch (error) {
        console.error("Erreur lors de la récupération des jeux :", error);
        res.status(500).send("Erreur interne du serveur");
    }
});

// 3. Création d'un jeu

app.get("/games/create", async (req, res) => {
    try {
        
        const genres = await prisma.genre.findMany({ orderBy: { genre: "asc" } });
        const editors = await prisma.editors.findMany({ orderBy: { name: "asc" } });

        res.render("games/create_game", { genres, editors });
    } catch (error) {
        console.error("Erreur lors de la récupération des genres et éditeurs :", error);
        res.status(500).send("Erreur interne du serveur");
    }
});


app.post("/games/create", async (req, res) => {
    const { title, desc, releaseDate, genreId, editorId, featured } = req.body;

    try {
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
    } catch (error) {
        console.error("Erreur lors de la création du jeu :", error);
        res.status(500).send("Erreur interne du serveur");
    }
});

// 4. Afficher le détail d'un jeu

app.get("/games/:id", async (req, res) => {
    const game = await prisma.games.findUnique({
        where: { id_game: parseInt(req.params.id) },
        include: { genre: true, editor: true },
    });
    res.render("games/game_detail", { game });
});

// 5. Modification d'un jeu

app.get("/games/:id/edit", async (req, res) => {
    const game = await prisma.games.findUnique({
        where: { id_game: parseInt(req.params.id) },
    });
    const genres = await prisma.genre.findMany({ orderBy: { genre: "asc" } });
    const editors = await prisma.editors.findMany({ orderBy: { name: "asc" } });
    res.render("games/edit_game", { game, genres, editors });
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
    res.redirect("games/games");
});

// 7. Possibilité d'afficher le jeu sur la page d'accueil (mise en avant)

app.post("/games/:id/feature", async (req, res) => {
    const gameId = parseInt(req.params.id);

    try {
        await prisma.games.update({
            where: { id_game: gameId },
            data: { featured: true },
        });
        res.redirect("/"); // Redirection vers la page d'accueil
    } catch (error) {
        console.error("Erreur lors de la mise en avant :", error);
        res.status(500).send("Erreur interne du serveur");
    }
});

// 8. Afficher la liste des genres


app.get("/genres", async (req, res) => {
    const genres = await prisma.genre.findMany({
        orderBy: { genre: "asc" },
    });
    res.render("genres/genres", { genres });
});

// 9. Afficher la liste des jeux d'un genre

app.get("/genres/:id", async (req, res) => {
    const genreId = parseInt(req.params.id);

    const games = await prisma.games.findMany({
        where: { genreId },
        include: { genre: true, editor: true },
        orderBy: { title: "asc" },
    });

    res.render("genres/games_by_genre", { games });
});

// 10. Création d'un éditeur

app.get("/editors/create", (req, res) => {
    res.render("editors/create_editor");
});

app.post("/editors/create", async (req, res) => {
    const { name } = req.body;

    try {
        await prisma.editors.create({
            data: { name },
        });
        res.redirect("/editors");
    } catch (error) {
        console.error("Erreur lors de la création de l'éditeur :", error);
        res.status(500).send("Erreur interne du serveur");
    }
});

// 11. Afficher la liste des éditeurs

app.get("/editors", async (req, res) => {
    const editors = await prisma.editors.findMany({
        orderBy: { name: "asc" },
    });
    res.render("editors/editors", { editors });
});

// 12. Afficher la liste des jeux d'un éditeur

app.get("/editors/:id", async (req, res) => {
    const editorId = parseInt(req.params.id);

    const games = await prisma.games.findMany({
        where: { editorId },
        include: { genre: true, editor: true },
        orderBy: { title: "asc" },
    });

    res.render("editors/games_by_editor", { games });
});

// 13. Modification d'un éditeur

app.get("/editors/:id/edit", async (req, res) => {
    const editor = await prisma.editors.findUnique({
        where: { id_editor: parseInt(req.params.id) },
    });

    res.render("editors/edit_editor", { editor });
});

app.post("/editors/:id/edit", async (req, res) => {
    const editorId = parseInt(req.params.id);
    const { name } = req.body;

    try {
        await prisma.editors.update({
            where: { id_editor: editorId },
            data: { name },
        });
        res.redirect("/editors");
    } catch (error) {
        console.error("Erreur lors de la modification de l'éditeur :", error);
        res.status(500).send("Erreur interne du serveur");
    }
});

// 14. Suppression d'un éditeur

app.get("/editors/:id/delete", async (req, res) => {
    const editorId = parseInt(req.params.id);

    try {
        await prisma.editors.delete({
            where: { id_editor: editorId },
        });
        res.redirect("/editors");
    } catch (error) {
        console.error("Erreur lors de la suppression de l'éditeur :", error);
        res.status(500).send("Erreur interne du serveur");
    }
});