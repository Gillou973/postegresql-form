import pool from '../config/database.js';

const createUsersTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      nom VARCHAR(100) NOT NULL,
      prenom VARCHAR(100) NOT NULL,
      adresse TEXT NOT NULL,
      email VARCHAR(150) NOT NULL UNIQUE,
      telephone VARCHAR(20) NOT NULL,
      date_creation TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const createIndexQuery = `
    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    CREATE INDEX IF NOT EXISTS idx_users_date_creation ON users(date_creation);
  `;

  try {
    console.log('🔄 Création de la table users...');
    await pool.query(createTableQuery);
    console.log('✅ Table users créée avec succès');

    console.log('🔄 Création des index...');
    await pool.query(createIndexQuery);
    console.log('✅ Index créés avec succès');

    // Insérer des données de test
    const insertTestData = `
      INSERT INTO users (nom, prenom, adresse, email, telephone)
      VALUES
        ('Dupont', 'Jean', '12 rue des Fleurs, 75000 Paris', 'jean.dupont@email.com', '01 02 03 04 05'),
        ('Martin', 'Claire', '45 avenue des Champs, 69000 Lyon', 'claire.martin@email.com', '02 03 04 05 06'),
        ('Nguyen', 'Minh', '78 boulevard du Midi, 13000 Marseille', 'minh.nguyen@email.com', '03 04 05 06 07')
      ON CONFLICT (email) DO NOTHING;
    `;

    await pool.query(insertTestData);
    console.log('✅ Données de test insérées');

  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation:', error);
  } finally {
    await pool.end();
  }
};

createUsersTable();