# Intégration de l'API geo.gouv.fr

## API à Utiliser
https://geo.api.gouv.fr/decoupage-administratif/communes

## Points Clés de l'API

### 1. Endpoints Disponibles
- `/communes` : Liste des communes
- `/departements` : Liste des départements
- `/regions` : Liste des régions

### 2. Paramètres Utiles
- `fields` : Sélection des champs (nom, code, population, etc.)
- `format` : Format de sortie (json, geojson)
- `geometry` : Inclusion des géométries

### 3. Exemples d'Appels

```bash
# Communes d'un département
https://geo.api.gouv.fr/departements/35/communes

# Communes avec géométrie
https://geo.api.gouv.fr/communes?geometry=contour

# Filtrage par code postal
https://geo.api.gouv.fr/communes?codePostal=35000
```

## Tâches à Réaliser

### 1. Backend (FastAPI)
- [ ] Créer un service de proxy pour l'API geo.gouv.fr
- [ ] Mettre en cache les réponses (données statiques)
- [ ] Implémenter les endpoints :
  ```
  /api/v1/communes
  /api/v1/departements
  /api/v1/regions
  ```

### 2. Frontend (React/TypeScript)
- [ ] Créer les types pour les données :
  ```typescript
  interface Commune {
    nom: string;
    code: string;
    codeDepartement: string;
    population: number;
    geometry?: GeoJSON.Geometry;
  }
  ```
- [ ] Étendre le service API :
  ```typescript
  export const GeoService = {
    getCommunes: () => ...,
    getDepartements: () => ...,
    getRegions: () => ...
  }
  ```
- [ ] Ajouter les hooks :
  ```typescript
  useCommunes()
  useDepartement(code: string)
  useRegion(code: string)
  ```

### 3. Interface Utilisateur
- [ ] Ajouter des contrôles de filtrage
- [ ] Implémenter la recherche par nom/code
- [ ] Ajouter des niveaux de zoom adaptés
- [ ] Créer des popups d'information détaillées

### 4. Performance
- [ ] Mise en cache côté client
- [ ] Chargement progressif des données
- [ ] Optimisation des requêtes

### 5. Documentation
- [ ] Documenter les nouveaux endpoints
- [ ] Ajouter des exemples d'utilisation
- [ ] Mettre à jour le README

## Notes Importantes

1. **Limites de l'API**
   - Vérifier les quotas
   - Gérer la mise en cache
   - Prévoir les cas d'erreur

2. **Données**
   - Grandes quantités de données GeoJSON
   - Besoin de pagination/chunking
   - Optimisation du stockage

3. **UI/UX**
   - Temps de chargement à gérer
   - Feedback utilisateur
   - États intermédiaires

## Ressources
- Documentation API : https://geo.api.gouv.fr/docs
- Exemples : https://geo.api.gouv.fr/decoupage-administratif
- GitHub : https://github.com/etalab/geo.api.gouv.fr
