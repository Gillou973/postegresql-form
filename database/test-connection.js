import pg from 'pg';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config({ path: '../backend/.env' });

const { Pool } = pg;

// Configuration de la connexion
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'postgresql_form_db',
  ssl: false
});

async function testConnection() {
  console.log('🔄 Test de connexion à PostgreSQL...\n');
  
  try {
    // Test de connexion basique
    const client = await pool.connect();
    console.log('✅ Connexion établie avec succès !');
    
    // Test de version PostgreSQL
    const versionResult = await client.query('SELECT version()');
    console.log('📋 Version PostgreSQL:', versionResult.rows[0].version.split(' ')[0] + ' ' + versionResult.rows[0].version.split(' ')[1]);
    
    // Test de la base de données
    const dbResult = await client.query('SELECT current_database()');
    console.log('🗄️  Base de données actuelle:', dbResult.rows[0].current_database);
    
    // Vérifier si la table users existe
    const tableResult = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'users'
      );
    `);
    
    if (tableResult.rows[0].exists) {
      console.log('✅ Table "users" trouvée');
      
      // Compter les utilisateurs
      const countResult = await client.query('SELECT COUNT(*) FROM users');
      console.log('👥 Nombre d\'utilisateurs:', countResult.rows[0].count);
      
      // Afficher quelques utilisateurs
      const usersResult = await client.query('SELECT id, nom, prenom, email FROM users LIMIT 3');
      console.log('📝 Exemples d\'utilisateurs:');
      usersResult.rows.forEach(user => {
        console.log(`   - ${user.id}: ${user.prenom} ${user.nom} (${user.email})`);
      });
      
    } else {
      console.log('❌ Table "users" non trouvée');
      console.log('💡 Exécutez: node scripts/initDatabase.js');
    }
    
    client.release();
    console.log('\n🎉 Test terminé avec succès !');
    
  } catch (error) {
    console.error('❌ Erreur de connexion:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Solutions possibles:');
      console.log('   1. Vérifiez que PostgreSQL est démarré');
      console.log('   2. Vérifiez le port (5432 par défaut)');
      console.log('   3. Vérifiez l\'adresse host (localhost)');
    } else if (error.code === '28P01') {
      console.log('\n💡 Erreur d\'authentification:');
      console.log('   1. Vérifiez le nom d\'utilisateur');
      console.log('   2. Vérifiez le mot de passe');
      console.log('   3. Vérifiez le fichier .env');
    } else if (error.code === '3D000') {
      console.log('\n💡 Base de données inexistante:');
      console.log('   1. Créez la base: CREATE DATABASE postgresql_form_db;');
      console.log('   2. Vérifiez le nom dans .env');
    }
  } finally {
    await pool.end();
  }
}

// Exécuter le test
testConnection();