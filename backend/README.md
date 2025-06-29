# Backend API - Formulaire PostgreSQL

Backend Express.js avec PostgreSQL pour l'application de formulaire React.

## 🏗️ Structure du Projet

```
backend/
├── config/
│   └── database.js          # Configuration PostgreSQL
├── middleware/
│   ├── validation.js        # Validation des données
│   └── errorHandler.js      # Gestion d'erreurs
├── models/
│   └── User.js             # Modèle utilisateur
├── routes/
│   └── users.js            # Routes API utilisateurs
├── scripts/
│   └── initDatabase.js     # Script d'initialisation DB
├── .env.example            # Variables d'environnement exemple
├── package.json            # Dépendances Node.js
├── server.js              # Serveur principal
└── README.md              # Documentation
```

## 🚀 Installation et Configuration

### 1. Installation des dépendances
```bash
cd backend
npm install
```

### 2. Configuration de la base de données
```bash
# Copier le fichier d'exemple
cp .env.example .env

# Éditer le fichier .env avec vos paramètres PostgreSQL
```

### 3. Variables d'environnement (.env)
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password_here
DB_NAME=postgresql_form_db
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### 4. Initialisation de la base de données
```bash
# Créer la base de données et les tables
node scripts/initDatabase.js
```

### 5. Démarrage du serveur
```bash
# Mode développement
npm run dev

# Mode production
npm start
```

## 📡 API Endpoints

### Base URL: `http://localhost:3000/api`

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/health` | Vérification de l'état du serveur |
| GET | `/api/users` | Récupérer tous les utilisateurs |
| GET | `/api/users/:id` | Récupérer un utilisateur par ID |
| POST | `/api/users` | Créer un nouvel utilisateur |
| PUT | `/api/users/:id` | Mettre à jour un utilisateur |
| DELETE | `/api/users/:id` | Supprimer un utilisateur |

### Exemple de requête POST /api/users
```json
{
  "nom": "Dupont",
  "prenom": "Jean",
  "adresse": "12 rue des Fleurs, 75000 Paris",
  "email": "jean.dupont@email.com",
  "telephone": "01 02 03 04 05"
}
```

### Exemple de réponse
```json
{
  "success": true,
  "message": "Utilisateur créé avec succès",
  "data": {
    "id": 1,
    "nom": "Dupont",
    "prenom": "Jean",
    "adresse": "12 rue des Fleurs, 75000 Paris",
    "email": "jean.dupont@email.com",
    "telephone": "01 02 03 04 05",
    "date_creation": "2024-01-15T10:30:00.000Z"
  }
}
```

## 🛡️ Sécurité

- **Helmet.js** : Protection contre les vulnérabilités communes
- **CORS** : Configuration stricte des origines autorisées
- **Rate Limiting** : Limitation à 100 requêtes par IP/15min
- **Validation** : Validation stricte des données d'entrée
- **Sanitization** : Nettoyage automatique des données

## 🗄️ Base de Données

### Table `users`
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  prenom VARCHAR(100) NOT NULL,
  adresse TEXT NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  telephone VARCHAR(20) NOT NULL,
  date_creation TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

## 🔧 Scripts Disponibles

- `npm start` : Démarrer le serveur en production
- `npm run dev` : Démarrer le serveur en mode développement
- `node scripts/initDatabase.js` : Initialiser la base de données

## 📝 Logs et Monitoring

Le serveur affiche automatiquement :
- Toutes les requêtes HTTP avec timestamp
- État de la connexion PostgreSQL
- Erreurs détaillées en mode développement

## 🚨 Gestion d'Erreurs

- Validation des données avec messages explicites
- Gestion des erreurs PostgreSQL (contraintes, connexion)
- Codes de statut HTTP appropriés
- Messages d'erreur localisés en français