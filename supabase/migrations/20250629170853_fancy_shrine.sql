/*
  # Configuration complète de la base de données PostgreSQL
  # Pour le projet de formulaire React

  1. Création de la base de données
  2. Création de la table users
  3. Ajout d'index pour les performances
  4. Insertion de données de test
*/

-- 1. Création de la base de données (à exécuter en tant que superuser)
-- CREATE DATABASE postgresql_form_db
--   WITH ENCODING 'UTF8'
--   LC_COLLATE = 'fr_FR.UTF-8'
--   LC_CTYPE = 'fr_FR.UTF-8'
--   TEMPLATE template0;

-- 2. Se connecter à la base postgresql_form_db puis exécuter le reste

-- Création de la table users
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(100) NOT NULL CHECK (LENGTH(TRIM(nom)) >= 2),
  prenom VARCHAR(100) NOT NULL CHECK (LENGTH(TRIM(prenom)) >= 2),
  adresse TEXT NOT NULL CHECK (LENGTH(TRIM(adresse)) >= 10),
  email VARCHAR(150) NOT NULL UNIQUE CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  telephone VARCHAR(20) NOT NULL CHECK (telephone ~ '^(0[1-9])(\s?\d{2}){4}$'),
  date_creation TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 3. Création des index pour optimiser les performances
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_date_creation ON users(date_creation DESC);
CREATE INDEX IF NOT EXISTS idx_users_nom_prenom ON users(nom, prenom);

-- 4. Insertion de données de test
INSERT INTO users (nom, prenom, adresse, email, telephone) VALUES
  ('Dupont', 'Jean', '12 rue des Fleurs, 75001 Paris', 'jean.dupont@email.com', '01 02 03 04 05'),
  ('Martin', 'Claire', '45 avenue des Champs-Élysées, 69000 Lyon', 'claire.martin@email.com', '02 03 04 05 06'),
  ('Nguyen', 'Minh', '78 boulevard du Midi, 13000 Marseille', 'minh.nguyen@email.com', '03 04 05 06 07'),
  ('Moreau', 'Luc', '5 rue Victor Hugo, 31000 Toulouse', 'luc.moreau@email.com', '04 05 06 07 08'),
  ('Legrand', 'Sophie', '22 place Bellecour, 69002 Lyon', 'sophie.legrand@email.com', '05 06 07 08 09')
ON CONFLICT (email) DO NOTHING;

-- 5. Vérification des données
SELECT 
  COUNT(*) as total_users,
  MIN(date_creation) as premiere_creation,
  MAX(date_creation) as derniere_creation
FROM users;

-- 6. Affichage des utilisateurs créés
SELECT id, nom, prenom, email, date_creation 
FROM users 
ORDER BY date_creation DESC;