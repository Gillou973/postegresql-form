import { body, validationResult } from 'express-validator';

// Règles de validation pour la création d'un utilisateur
export const validateUser = [
  body('nom')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Le nom doit contenir entre 2 et 100 caractères')
    .matches(/^[a-zA-ZÀ-ÿ\s-']+$/)
    .withMessage('Le nom ne peut contenir que des lettres, espaces, tirets et apostrophes'),

  body('prenom')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Le prénom doit contenir entre 2 et 100 caractères')
    .matches(/^[a-zA-ZÀ-ÿ\s-']+$/)
    .withMessage('Le prénom ne peut contenir que des lettres, espaces, tirets et apostrophes'),

  body('adresse')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('L\'adresse doit contenir entre 10 et 500 caractères'),

  body('email')
    .trim()
    .isEmail()
    .withMessage('Format d\'email invalide')
    .normalizeEmail()
    .isLength({ max: 150 })
    .withMessage('L\'email ne peut pas dépasser 150 caractères'),

  body('telephone')
    .trim()
    .matches(/^(0[1-9])(\s?\d{2}){4}$/)
    .withMessage('Format de téléphone invalide (ex: 01 23 45 67 89)')
];

// Middleware pour vérifier les erreurs de validation
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Erreurs de validation',
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg,
        value: error.value
      }))
    });
  }
  
  next();
};