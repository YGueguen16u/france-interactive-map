# Convention de Nommage des Repositories API

## Structure Générale
```
france-interactive-map-services/
├── france-interactive-map/         # Frontend (repo actuel)
├── france-interactive-map-api/     # API Gateway
└── france-interactive-map-data/    # API de données
```

## Détails des Repositories

### 1. API Gateway
- **Nom du Repository**: `france-interactive-map-api`
- **Raison du nom**:
  - Préfixe 'france-interactive-map' pour lier au projet principal
  - Suffixe 'api' car c'est le point d'entrée principal des APIs
  - Simple et direct pour identifier le gateway
- **URL Git**: `github.com/YGueguen16u/france-interactive-map-api`

### 2. API de Données
- **Nom du Repository**: `france-interactive-map-data`
- **Raison du nom**:
  - Préfixe 'france-interactive-map' pour la cohérence
  - Suffixe 'data' car gère toutes les données (géo, stats, POI)
  - Regroupe les services de données initialement séparés
- **URL Git**: `github.com/YGueguen16u/france-interactive-map-data`

## Justification de la Structure
1. **Cohérence**
   - Tous les repos commencent par 'france-interactive-map'
   - Facilite l'identification des projets liés

2. **Simplicité**
   - Noms courts mais descriptifs
   - Évite la multiplication des repositories

3. **Maintenabilité**
   - Structure claire pour les nouveaux développeurs
   - Facilite la gestion des permissions GitHub
   - Simplifie le déploiement
