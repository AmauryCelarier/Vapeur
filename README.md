Vapeur - Gestionnaire de jeux vidéo

    Description du projet : 
Vapeur est une application web permettant de gérer une collection de jeux vidéo. Cette application propose des fonctionnalités telles que :

La gestion des jeux (création, modification, suppression).
La gestion des genres et des éditeurs de jeux.
L'affichage des jeux mis en avant sur la page d'accueil.

Ce projet a été réalisé avec Express.js, Prisma, et Handlebars


    Prérequis :
Pour exécuter ce projet, vous devez avoir installé :

Node.js
Prisma
SQLite


    Installation :

1. Cloner le projet

2. Installer les dépendances : npm install

3. Créez un fichier .env à la racine du projet avec cette ligne : DATABASE_URL="file:./dev.db"

4. Initialiser la base de données : npx prisma migrate dev --name init

5. Démarrer le serveur : npm run start

Le serveur sera accessible à l'adresse http://localhost:3042.


    Structure du projet :

VAPEUR/
├── prisma/                # Configuration Prisma (schéma, migrations)
├── public/                # Fichiers statiques (CSS, images)
├── views/                 # Templates Handlebars
│   ├── games/             # Vues pour les jeux
│   ├── editors/           # Vues pour les éditeurs
│   ├── genres/            # Vues pour les genres
│   ├── partials/          # Templates partiels (header, footer)
│   └── index.hbs          # Page d'accueil
├── .env                   # Configuration de la base de données
├── main.js                # Fichier principal Express.js
├── package.json           # Fichier de configuration npm
└── README.md              # Documentation

 
 Auteurs :
Projet réalisé par Jordan DUPUY et Amaury CELARIER.

