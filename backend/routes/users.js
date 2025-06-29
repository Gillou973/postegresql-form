import express from 'express';
import User from '../models/User.js';
import { validateUser, handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

// GET /api/users - Récupérer tous les utilisateurs
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    
    res.json({
      success: true,
      message: 'Utilisateurs récupérés avec succès',
      data: users,
      count: users.length
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/users/:id - Récupérer un utilisateur par ID
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé',
        error: 'USER_NOT_FOUND'
      });
    }
    
    res.json({
      success: true,
      message: 'Utilisateur récupéré avec succès',
      data: user
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/users - Créer un nouvel utilisateur
router.post('/', validateUser, handleValidationErrors, async (req, res, next) => {
  try {
    const { nom, prenom, adresse, email, telephone } = req.body;
    
    // Vérifier si l'email existe déjà
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Cette adresse email est déjà utilisée',
        error: 'DUPLICATE_EMAIL'
      });
    }
    
    // Créer l'utilisateur
    const newUser = await User.create({
      nom,
      prenom,
      adresse,
      email,
      telephone
    });
    
    res.status(201).json({
      success: true,
      message: 'Utilisateur créé avec succès',
      data: newUser
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/users/:id - Mettre à jour un utilisateur
router.put('/:id', validateUser, handleValidationErrors, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nom, prenom, adresse, email, telephone } = req.body;
    
    // Vérifier si l'utilisateur existe
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé',
        error: 'USER_NOT_FOUND'
      });
    }
    
    // Vérifier si l'email est déjà utilisé par un autre utilisateur
    const emailUser = await User.findByEmail(email);
    if (emailUser && emailUser.id !== parseInt(id)) {
      return res.status(409).json({
        success: false,
        message: 'Cette adresse email est déjà utilisée',
        error: 'DUPLICATE_EMAIL'
      });
    }
    
    // Mettre à jour l'utilisateur
    const updatedUser = await User.update(id, {
      nom,
      prenom,
      adresse,
      email,
      telephone
    });
    
    res.json({
      success: true,
      message: 'Utilisateur mis à jour avec succès',
      data: updatedUser
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/users/:id - Supprimer un utilisateur
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const deletedUser = await User.delete(id);
    
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé',
        error: 'USER_NOT_FOUND'
      });
    }
    
    res.json({
      success: true,
      message: 'Utilisateur supprimé avec succès',
      data: deletedUser
    });
  } catch (error) {
    next(error);
  }
});

export default router;