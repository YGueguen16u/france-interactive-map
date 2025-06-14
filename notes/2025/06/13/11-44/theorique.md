# Architecture Microservices pour la Carte Interactive de France

## Contexte
Décision de migration vers une architecture microservices pour améliorer la scalabilité, la maintenance et permettre une meilleure séparation des responsabilités.

## Points Clés
- Séparation du frontend et des services backend
- Chaque service aura son propre repository
- Ce repository devient exclusivement frontend

## Architecture Proposée

### 1. Frontend (Ce Repository)
- Nom: `france-interactive-map`
- Responsabilités:
  - Interface utilisateur React
  - Gestion de la carte interactive
  - Consommation des APIs des différents services
  - Gestion de l'état global
  - Routing et navigation

### 2. Services Backend (Nouveaux Repositories)
1. **Service Données Géographiques**
   - Nom: `france-geo-service`
   - Responsabilités:
     - Gestion des données géographiques
     - Coordonnées des régions/départements
     - Limites administratives

2. **Service Statistiques**
   - Nom: `france-stats-service`
   - Responsabilités:
     - Données démographiques
     - Statistiques économiques
     - Indicateurs sociaux

3. **Service Points d'Intérêt**
   - Nom: `france-poi-service`
   - Responsabilités:
     - Gestion des points d'intérêt
     - Catégorisation des lieux
     - Informations touristiques

## Communication Inter-Services
- REST APIs pour la communication
- Utilisation de contrats d'API clairs (OpenAPI/Swagger)
- Gestion des CORS pour la sécurité
- Authentification centralisée si nécessaire

## Avantages de cette Architecture
1. Meilleure séparation des responsabilités
2. Déploiement indépendant des services
3. Scalabilité fine-grained
4. Facilité de maintenance
5. Possibilité d'avoir des équipes dédiées par service
