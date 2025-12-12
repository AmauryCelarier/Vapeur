# Vapeur - Gestionnaire de jeux vidéo

## 🎮 Description du Projet

Vapeur est une application web moderne conçue pour gérer une collection de jeux vidéo. Elle offre des fonctionnalités CRUD (Création, Lecture, Mise à jour, Suppression) pour organiser votre ludothèque.

### Fonctionnalités Clés
* Gestion des **jeux** (création, modification, suppression).
* Gestion des **genres** et des **éditeurs**.
* Affichage des jeux mis en avant sur la page d'accueil.

### Technologies Utilisées
Ce projet est bâti sur une stack robuste :
* **Backend :** [Express.js](https://expressjs.com/)
* **ORM/Base de données :** [Prisma](https://www.prisma.io/) (utilisé pour PostgreSQL en production)
* **Templates :** [Handlebars](https://handlebarsjs.com/)
* **Orchestration :** [Docker Compose](https://docs.docker.com/compose/) (pour la mise en production/développement avancé)

---

## 🚀 Installation (Recommandée : Docker Compose)

L'installation recommandée utilise Docker Compose pour lancer l'application Node.js (`app`) et la base de données PostgreSQL (`db`) en tant que services conteneurisés et isolés. 

### Prérequis
Pour la méthode Docker, vous devez seulement avoir installé :
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) (inclut Docker et Docker Compose)

### Étapes de Démarrage

1.  **Cloner le projet** :
    ```bash
    git clone [VOTRE LIEN REPO ICI]
    cd Vapeur
    ```

2.  **Configuration des Secrets** :
    Créez un fichier nommé `db_password.txt` à la racine du projet et insérez le mot de passe de votre base de données à l'intérieur (par exemple, `test1234`). Ce mot de passe est utilisé par le service `db` et le service `app` via les Docker Secrets.

    ```bash
    echo "test1234" > db_password.txt
    ```

3.  **Lancer les Services** :
    Lancez et reconstruisez les conteneurs (si vous avez modifié le `Dockerfile`) :
    ```bash
    docker compose up --build
    ```
    *Le service `app` attendra que le service `db` soit prêt (`healthcheck`) avant d'exécuter automatiquement `npx prisma migrate deploy` pour appliquer les migrations, puis de démarrer le serveur.*

4.  **Accéder à l'application** :
    Le serveur sera accessible à l'adresse : **http://localhost:3042**

---

## 💻 Installation (Méthode de Développement Locale)

Si vous souhaitez développer localement sans Docker, utilisez cette méthode :

### Prérequis
* [Node.js](https://nodejs.org/en) (version 20+)
* [Prisma](https://www.prisma.io/)
* **SQLite** (pour le développement local) ou **PostgreSQL** (si vous modifiez le `.env` et la `DATABASE_URL`).

### Étapes d'Installation Locale

1.  Cloner le projet.
2.  Installer les dépendances : `npm install`
3.  Créez un fichier `.env` à la racine du projet avec la configuration SQLite par défaut :
    ```env
    DATABASE_URL="file:./dev.db"
    ```
4.  Initialiser la base de données (création du fichier `dev.db` et application du schéma) :
    ```bash
    npx prisma migrate dev --name init
    ```
5.  Démarrer le serveur : `npm run start`

Le serveur sera accessible à l'adresse `http://localhost:3042`.

---

## 👤 Auteurs

Projet réalisé par Jordan DUPUY et Amaury CELARIER.