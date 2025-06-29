# Configuration Base de Données PostgreSQL

## 🗄️ Guide d'Installation PostgreSQL

### **Option 1 : Installation sur Windows**

1. **Télécharger PostgreSQL** :
   - Aller sur https://www.postgresql.org/download/windows/
   - Télécharger la version 15 ou 16
   - Installer avec les paramètres par défaut

2. **Configuration initiale** :
   - Port : `5432` (par défaut)
   - Utilisateur : `postgres`
   - Mot de passe : `[choisir un mot de passe fort]`

### **Option 2 : Installation sur macOS**

```bash
# Avec Homebrew
brew install postgresql@15
brew services start postgresql@15

# Créer un utilisateur
createuser -s postgres
```

### **Option 3 : Installation sur Linux (Ubuntu/Debian)**

```bash
# Installation
sudo apt update
sudo apt install postgresql postgresql-contrib

# Démarrer le service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Configuration utilisateur
sudo -u postgres createuser --interactive
```

### **Option 4 : Docker (Recommandé pour le développement)**

```bash
# Créer et démarrer un conteneur PostgreSQL
docker run --name postgres-form \
  -e POSTGRES_DB=postgresql_form_db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=monmotdepasse \
  -p 5432:5432 \
  -d postgres:15

# Vérifier que le conteneur fonctionne
docker ps
```

## 🚀 **Étapes de Configuration**

### **Étape 1 : Créer la Base de Données**

**Via psql (ligne de commande) :**
```bash
# Se connecter à PostgreSQL
psql -U postgres -h localhost

# Créer la base de données
CREATE DATABASE postgresql_form_db
  WITH ENCODING 'UTF8'
  LC_COLLATE = 'fr_FR.UTF-8'
  LC_CTYPE = 'fr_FR.UTF-8'
  TEMPLATE template0;

# Se connecter à la nouvelle base
\c postgresql_form_db
```

**Via pgAdmin (Interface graphique) :**
1. Ouvrir pgAdmin
2. Clic droit sur "Databases" → "Create" → "Database"
3. Nom : `postgresql_form_db`
4. Encoding : `UTF8`

### **Étape 2 : Exécuter le Script de Configuration**

```bash
# Depuis le répertoire du projet
psql -U postgres -h localhost -d postgresql_form_db -f database/setup.sql
```

### **Étape 3 : Vérifier l'Installation**

```sql
-- Se connecter à la base
\c postgresql_form_db

-- Vérifier la table
\dt

-- Voir les données
SELECT * FROM users;

-- Vérifier les contraintes
\d users
```

## 🔧 **Configuration du Backend**

Créer le fichier `backend/.env` :

```env
# Base de données
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=monmotdepasse
DB_NAME=postgresql_form_db

# Serveur
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

## 📊 **Structure de la Table Users**

| Colonne | Type | Contraintes | Description |
|---------|------|-------------|-------------|
| `id` | SERIAL | PRIMARY KEY | Identifiant unique auto-incrémenté |
| `nom` | VARCHAR(100) | NOT NULL, MIN 2 chars | Nom de famille |
| `prenom` | VARCHAR(100) | NOT NULL, MIN 2 chars | Prénom |
| `adresse` | TEXT | NOT NULL, MIN 10 chars | Adresse complète |
| `email` | VARCHAR(150) | UNIQUE, FORMAT EMAIL | Adresse e-mail |
| `telephone` | VARCHAR(20) | FORMAT FR | Numéro français (01 23 45 67 89) |
| `date_creation` | TIMESTAMP | DEFAULT NOW() | Date de création automatique |

## 🔍 **Requêtes Utiles**

```sql
-- Compter les utilisateurs
SELECT COUNT(*) FROM users;

-- Utilisateurs récents
SELECT * FROM users 
WHERE date_creation >= NOW() - INTERVAL '7 days'
ORDER BY date_creation DESC;

-- Rechercher par email
SELECT * FROM users WHERE email LIKE '%@gmail.com';

-- Statistiques par domaine email
SELECT 
  SUBSTRING(email FROM '@(.*)$') as domaine,
  COUNT(*) as nombre
FROM users 
GROUP BY domaine 
ORDER BY nombre DESC;
```

## 🚨 **Résolution de Problèmes**

**Erreur de connexion :**
```bash
# Vérifier que PostgreSQL fonctionne
sudo systemctl status postgresql  # Linux
brew services list | grep postgres  # macOS

# Tester la connexion
psql -U postgres -h localhost -c "SELECT version();"
```

**Erreur d'authentification :**
```bash
# Réinitialiser le mot de passe
sudo -u postgres psql
ALTER USER postgres PASSWORD 'nouveaumotdepasse';
```

**Port déjà utilisé :**
```bash
# Voir qui utilise le port 5432
sudo lsof -i :5432  # Linux/macOS
netstat -ano | findstr :5432  # Windows
```

## 📈 **Optimisations Recommandées**

```sql
-- Analyser les performances
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@example.com';

-- Statistiques de la table
ANALYZE users;

-- Voir la taille de la table
SELECT 
  schemaname,
  tablename,
  attname,
  n_distinct,
  correlation
FROM pg_stats 
WHERE tablename = 'users';
```