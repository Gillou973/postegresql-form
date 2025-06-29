// Middleware de gestion d'erreurs globales
export const errorHandler = (err, req, res, next) => {
  console.error('❌ Erreur:', err);

  // Erreur de validation PostgreSQL (contrainte unique)
  if (err.code === '23505') {
    return res.status(409).json({
      success: false,
      message: 'Cette adresse email est déjà utilisée',
      error: 'DUPLICATE_EMAIL'
    });
  }

  // Erreur de connexion à la base de données
  if (err.code === 'ECONNREFUSED') {
    return res.status(503).json({
      success: false,
      message: 'Service de base de données indisponible',
      error: 'DATABASE_CONNECTION_ERROR'
    });
  }

  // Erreur générique
  res.status(500).json({
    success: false,
    message: 'Erreur interne du serveur',
    error: process.env.NODE_ENV === 'development' ? err.message : 'INTERNAL_SERVER_ERROR'
  });
};

// Middleware pour les routes non trouvées
export const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.path} non trouvée`,
    error: 'ROUTE_NOT_FOUND'
  });
};