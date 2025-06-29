import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

import usersRoutes from './routes/users.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

// Configuration des variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de sécurité
app.use(helmet());

// Configuration CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Limitation du taux de requêtes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite à 100 requêtes par IP par fenêtre
  message: {
    success: false,
    message: 'Trop de requêtes, veuillez réessayer plus tard',
    error: 'RATE_LIMIT_EXCEEDED'
  }
});
app.use(limiter);

// Middleware pour parser le JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Route de santé
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API PostgreSQL Form Backend - Service en ligne',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Routes API
app.use('/api/users', usersRoutes);

// Middleware de gestion d'erreurs
app.use(notFoundHandler);
app.use(errorHandler);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log('🚀 Serveur démarré avec succès');
  console.log(`📡 API disponible sur: http://localhost:${PORT}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  console.log(`👥 Users API: http://localhost:${PORT}/api/users`);
  console.log(`🌍 Environnement: ${process.env.NODE_ENV || 'development'}`);
});

// Gestion propre de l'arrêt du serveur
process.on('SIGTERM', () => {
  console.log('🛑 Arrêt du serveur...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 Arrêt du serveur...');
  process.exit(0);
});