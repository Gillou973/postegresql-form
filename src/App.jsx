import React, { useState, useEffect } from 'react';
import { User, Mail, MapPin, Phone, Calendar, Database, CheckCircle, AlertCircle, Loader } from 'lucide-react';

function App() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    adresse: '',
    email: '',
    telephone: '',
    dateCreation: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Générer automatiquement la date et heure de création
  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toLocaleString('fr-FR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    setFormData(prev => ({ ...prev, dateCreation: formattedDate }));
  }, []);

  // Validation email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Formatage du numéro de téléphone français
  const formatPhoneNumber = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length <= 10) {
      return cleaned.replace(/(\d{2})(?=\d)/g, '$1 ');
    }
    return phone;
  };

  // Validation du numéro de téléphone français
  const validatePhone = (phone) => {
    const cleaned = phone.replace(/\s/g, '');
    return /^(0[1-9])(\d{8})$/.test(cleaned);
  };

  // Gestion des changements de champs
  const handleInputChange = (field, value) => {
    if (field === 'telephone') {
      value = formatPhoneNumber(value);
    }

    setFormData(prev => ({ ...prev, [field]: value }));

    // Effacer l'erreur quand l'utilisateur commence à taper
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Validation du formulaire
  const validateForm = () => {
    const newErrors = {};

    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est requis';
    } else if (formData.nom.trim().length < 2) {
      newErrors.nom = 'Le nom doit contenir au moins 2 caractères';
    }

    if (!formData.prenom.trim()) {
      newErrors.prenom = 'Le prénom est requis';
    } else if (formData.prenom.trim().length < 2) {
      newErrors.prenom = 'Le prénom doit contenir au moins 2 caractères';
    }

    if (!formData.adresse.trim()) {
      newErrors.adresse = 'L\'adresse est requise';
    } else if (formData.adresse.trim().length < 10) {
      newErrors.adresse = 'L\'adresse doit être plus détaillée';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    if (!formData.telephone.trim()) {
      newErrors.telephone = 'Le numéro de téléphone est requis';
    } else if (!validatePhone(formData.telephone)) {
      newErrors.telephone = 'Format de téléphone invalide (ex: 01 23 45 67 89)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Envoi des données vers l'API
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:3001/api/contacts', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Erreur serveur: ${response.status}`);
      }

      setIsSuccess(true);

      // Réinitialiser le formulaire après 3 secondes
      setTimeout(() => {
        setFormData({
          nom: '',
          prenom: '',
          adresse: '',
          email: '',
          telephone: '',
          dateCreation: new Date().toLocaleString('fr-FR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          })
        });
        setIsSuccess(false);
      }, 3000);

    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Database className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Test Base de Données PostgreSQL
          </h1>
          <p className="text-gray-600">
            Formulaire de saisie et validation des données utilisateur
          </p>
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nom et Prénom */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="nom" className="block text-sm font-semibold text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Nom
                </label>
                <input
                  id="nom"
                  type="text"
                  value={formData.nom}
                  onChange={(e) => handleInputChange('nom', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.nom ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Votre nom"
                />
                {errors.nom && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.nom}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="prenom" className="block text-sm font-semibold text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Prénom
                </label>
                <input
                  id="prenom"
                  type="text"
                  value={formData.prenom}
                  onChange={(e) => handleInputChange('prenom', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.prenom ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Votre prénom"
                />
                {errors.prenom && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.prenom}
                  </p>
                )}
              </div>
            </div>

            {/* Adresse */}
            <div>
              <label htmlFor="adresse" className="block text-sm font-semibold text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Adresse complète
              </label>
              <textarea
                id="adresse"
                value={formData.adresse}
                onChange={(e) => handleInputChange('adresse', e.target.value)}
                rows={3}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${
                  errors.adresse ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Numéro, rue, ville, code postal..."
              />
              {errors.adresse && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.adresse}
                </p>
              )}
            </div>

            {/* Email et Téléphone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Adresse e-mail
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="exemple@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="telephone" className="block text-sm font-semibold text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Numéro de téléphone
                </label>
                <input
                  id="telephone"
                  type="tel"
                  value={formData.telephone}
                  onChange={(e) => handleInputChange('telephone', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.telephone ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="01 23 45 67 89"
                />
                {errors.telephone && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.telephone}
                  </p>
                )}
              </div>
            </div>

            {/* Date de création (lecture seule) */}
            <div>
              <label htmlFor="dateCreation" className="block text-sm font-semibold text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Date et heure de création
              </label>
              <input
                id="dateCreation"
                type="text"
                value={formData.dateCreation}
                readOnly
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                placeholder="Généré automatiquement"
              />
              <p className="mt-1 text-sm text-gray-500">
                Cette valeur sera automatiquement enregistrée en base de données
              </p>
            </div>

            {/* Message de succès */}
            {isSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-green-800 font-medium">
                    Données enregistrées avec succès dans PostgreSQL !
                  </span>
                </div>
              </div>
            )}

            {/* Bouton de soumission */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Envoi en cours...</span>
                </>
              ) : (
                <>
                  <Database className="w-5 h-5" />
                  <span>Enregistrer en base PostgreSQL</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Informations de debug */}
        <div className="mt-8 bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Aperçu des données (Console de développement)
          </h3>
          <pre className="text-sm text-gray-600 bg-white p-4 rounded border overflow-x-auto">
{JSON.stringify(formData, null, 2)}
          </pre>
          <p className="text-sm text-gray-500 mt-2">
            Les données seront envoyées vers votre base PostgreSQL lors de la soumission.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;