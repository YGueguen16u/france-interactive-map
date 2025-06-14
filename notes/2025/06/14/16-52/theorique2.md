# Bonnes Pratiques de Connexion Frontend-Backend

## 1. Architecture de Services

https://geo.api.gouv.fr/decoupage-administratif/communes
https://geo.api.gouv.fr/decoupage-administratif/communes
https://geo.api.gouv.fr/decoupage-administratif/communes
s
### Frontend (React/Vite - port 5173)
- Créer un dossier dédié `src/services/` pour centraliser la logique API
- Définir des constantes d'environnement dans des fichiers `.env`
```
# .env.development
VITE_API_URL=http://localhost:8000/api/v1

# .env.production
VITE_API_URL=https://api.example.com/v1
```

### Backend (FastAPI - port 8000)
- Configuration CORS explicite pour sécuriser les requêtes
- Versionnement des APIs (/api/v1/...)
- Documentation OpenAPI accessible (/docs)

## 2. Méthodes de Communication

### 1. Service Layer (Recommandé)
```typescript
// src/services/api.ts
const API_URL = import.meta.env.VITE_API_URL;

export const RegionsService = {
  getAll: () => fetch(`${API_URL}/regions`).then(r => r.json()),
  getById: (id: string) => fetch(`${API_URL}/regions/${id}`).then(r => r.json())
};
```

### 2. Custom Hook (Pour la réutilisabilité)
```typescript
// src/hooks/useRegions.ts
import { useState, useEffect } from 'react';
import { RegionsService } from '../services/api';

export const useRegions = () => {
  const [regions, setRegions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    RegionsService.getAll()
      .then(data => setRegions(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { regions, loading, error };
};
```

## 3. Gestion des Erreurs

- Implémenter des intercepteurs de requêtes
- Gérer les timeouts et retries
- Feedback utilisateur (loading states, error messages)

## 4. Sécurité

### CORS
- Backend : Configuration précise des origines autorisées
- Éviter `allow_origins=["*"]` en production

### Environnements
- Variables d'environnement différentes par environnement
- Ne jamais exposer de secrets côté frontend

## 5. Performance

### Mise en Cache
- Mise en cache des réponses côté frontend
- Cache-Control headers côté backend

### Optimisation
- Compression des réponses
- Pagination des données volumineuses
- Lazy loading des composants

## 6. Développement

### Mode Développement
1. Lancer le backend : `uvicorn app.main:app --reload`
2. Lancer le frontend : `npm run dev`
3. Vérifier la connexion via les devtools (Network tab)

### Tests
- Tests d'intégration frontend-backend
- Mocks pour le développement isolé
- Tests de contrat avec les APIs

## 7. Monitoring

- Logging côté frontend et backend
- Traces des requêtes pour le debugging
- Métriques de performance
