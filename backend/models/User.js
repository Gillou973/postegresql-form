import pool from '../config/database.js';

class User {
  // Créer un nouvel utilisateur
  static async create(userData) {
    const { nom, prenom, adresse, email, telephone } = userData;
    
    const query = `
      INSERT INTO users (nom, prenom, adresse, email, telephone, date_creation)
      VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
      RETURNING *
    `;
    
    const values = [nom, prenom, adresse, email, telephone];
    
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Récupérer tous les utilisateurs
  static async findAll() {
    const query = `
      SELECT * FROM users 
      ORDER BY date_creation DESC
    `;
    
    try {
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  // Récupérer un utilisateur par ID
  static async findById(id) {
    const query = 'SELECT * FROM users WHERE id = $1';
    
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Vérifier si un email existe déjà
  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    
    try {
      const result = await pool.query(query, [email]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Mettre à jour un utilisateur
  static async update(id, userData) {
    const { nom, prenom, adresse, email, telephone } = userData;
    
    const query = `
      UPDATE users 
      SET nom = $1, prenom = $2, adresse = $3, email = $4, telephone = $5
      WHERE id = $6
      RETURNING *
    `;
    
    const values = [nom, prenom, adresse, email, telephone, id];
    
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Supprimer un utilisateur
  static async delete(id) {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
    
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

export default User;