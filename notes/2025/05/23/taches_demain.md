# Tâches pour demain - 24 mai 2025

## 1. Configuration du Projet Frontend

### Installation des dépendances
```bash
npm install leaflet @types/leaflet    # Carte interactive
npm install @reduxjs/toolkit react-redux    # Gestion d'état
npm install react-router-dom    # Routing
npm install styled-components @types/styled-components    # Styling
npm install axios    # Appels API
```

### Structure des dossiers à créer
```
src/
├── components/
│   ├── map/           # Composants liés à la carte
│   ├── layout/        # Layout général
│   ├── common/        # Composants réutilisables
│   └── statistics/    # Composants pour les statistiques
├── features/         # Features Redux
├── services/        # Services API
├── hooks/           # Custom hooks
├── types/           # Types TypeScript
├── utils/           # Utilitaires
└── styles/          # Styles globaux
```

## 2. Implémentation de la Carte Interactive

### Configuration de Leaflet
- Intégrer les styles Leaflet
- Créer le composant Map de base
- Configurer les tuiles OpenStreetMap
- Ajouter les contrôles de zoom

### Fonctionnalités de la carte
- Implémenter le zoom sur les régions
- Ajouter la sélection de zones
- Configurer les marqueurs de villes
- Mettre en place les popups d'information

## 3. Mise en place du Data Engineering

### Création du projet Python
```bash
mkdir france-cities-data
cd france-cities-data
python -m venv venv
pip install fastapi uvicorn pandas requests beautifulsoup4
```

### Structure du projet data
```
france-cities-data/
├── src/
│   ├── scrapers/      # Scripts de scraping
│   ├── api/           # API FastAPI
│   ├── models/        # Modèles de données
│   └── utils/         # Utilitaires
├── data/            # Données scrapées
└── tests/           # Tests unitaires
```

## 4. Configuration de l'Environnement

### Variables d'environnement
- Créer les fichiers .env pour chaque environnement
- Configurer les URLs des APIs
- Définir les clés d'API nécessaires

### Configuration Docker
- Créer les Dockerfiles pour chaque projet
- Mettre en place docker-compose.yml
- Configurer les volumes pour la persistance

## 5. Documentation

### API
- Définir les endpoints nécessaires
- Documenter les formats de données
- Créer des exemples de réponses

### Architecture
- Schématiser l'architecture générale
- Décrire les flux de données
- Documenter les choix technologiques

## 6. Tests et Qualité

### Frontend
- Configurer Jest pour les tests
- Mettre en place ESLint et Prettier
- Ajouter les tests de base

### Backend
- Configurer pytest
- Ajouter les tests d'API
- Mettre en place la validation des données


