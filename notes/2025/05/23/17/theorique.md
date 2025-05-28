# Points Techniques - 23 mai 2025

## Structure de Projet
- Organisation des dossiers en arborescence temporelle pour la documentation
- Utilisation de Markdown pour la documentation
- Gestion de versions avec Git
- Séparation en deux projets : frontend et data engineering

## Stack Frontend (Carte Interactive)

### Technologies principales
- Leaflet.js pour la carte interactive
  - Gestion du zoom et des interactions
  - Support des polygones et cercles pour la sélection
  - Clustering de marqueurs
  - Cartes choroplèthes pour les statistiques
- Plugins Leaflet nécessaires :
  - Leaflet.draw pour le dessin de zones
  - Leaflet.markercluster pour le clustering
  - Leaflet.heat pour les cartes de chaleur

## Stack Data Engineering

### Sources de données
- API INSEE (données démographiques)
- API Géo (api.gouv.fr)
- Base SIRENE
- data.gouv.fr

### Technologies principales
- Python comme langage principal
  - pandas pour le traitement des données
  - requests/httpx pour les appels API
  - BeautifulSoup4/Scrapy pour le scraping
  - FastAPI pour l'API
- PostgreSQL + PostGIS pour le stockage
- Airflow/Dagster pour l'orchestration
- Redis pour le cache

## À venir
- Mise en place d'une carte interactive de la France
- Système de fusion de villes
- Analyse de statistiques
- Déploiement cloud avec gestion des environnements (local/production)
