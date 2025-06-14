# Réalisations du 14 juin 2025 18:51 - Mise en Place de la Connexion API Frontend-Backend

## 1. Configuration de l'Environnement

### Fichier `.env.development`
```bash
# /frontend/.env.development
VITE_API_URL=http://localhost:8000/api/v1
```

## 2. Service Layer API

### Fichier `/frontend/src/services/api.ts`
```typescript
/**
 * API service for handling all backend communication
 */

import type { GeoFeatureCollection } from '../types/geography';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Service for handling regions-related API calls
 */
export const RegionsService = {
  /**
   * Fetches all regions with their GeoJSON data
   * @returns Promise with GeoJSON collection of regions
   */
  getAll: async (): Promise<GeoFeatureCollection> => {
    try {
      const response = await fetch(`${API_URL}/regions`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching regions:', error);
      throw error;
    }
  }
};
```

## 3. Custom Hook pour la Gestion des Données

### Fichier `/frontend/src/hooks/useRegions.ts`
```typescript
/**
 * Custom hook for fetching and managing regions data
 */

import { useState, useEffect } from 'react';
import type { GeoFeatureCollection } from '../types/geography';
import { RegionsService } from '../services/api';

export const useRegions = () => {
  const [regions, setRegions] = useState<GeoFeatureCollection | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const data = await RegionsService.getAll();
        setRegions(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch regions'));
      } finally {
        setLoading(false);
      }
    };

    fetchRegions();
  }, []);

  return { regions, loading, error };
};
```

## 4. Composant FranceMap avec Gestion d'État

### Fichier `/frontend/src/components/FranceMap.tsx`
Les modifications principales incluent :

1. **Imports et Hook**
```typescript
import { useRegions } from '../hooks/useRegions';
const { regions, loading, error } = useRegions();
```

2. **Gestion des États**
```typescript
// Gestion des erreurs
if (error) {
  return (
    <div style={{ 
      padding: '20px',
      color: '#721c24',
      backgroundColor: '#f8d7da',
      border: '1px solid #f5c6cb',
      borderRadius: '4px'
    }}>
      Error loading map data: {error.message}
    </div>
  );
}

// Affichage du chargement
{loading && (
  <div style={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    zIndex: 1000
  }}>
    Loading map data...
  </div>
)}
```

3. **Affichage des Données**
```typescript
useEffect(() => {
  if (mapRef.current && regions && !loading && !error) {
    L.geoJSON(regions, {
      style: BOUNDARY_STYLES.region,
      onEachFeature: (feature, layer) => {
        // Popups d'information
        if (feature.properties) {
          layer.bindPopup(`
            <h3>${feature.properties.name}</h3>
            <p>Code: ${feature.properties.code}</p>
            ${feature.properties.population 
              ? `<p>Population: ${feature.properties.population.toLocaleString()}</p>` 
              : ''}
          `);
        }
        // Effets de survol
        layer.on({
          mouseover: (e) => {
            const l = e.target;
            l.setStyle({
              fillOpacity: 0.3
            });
          },
          mouseout: (e) => {
            const l = e.target;
            l.setStyle({
              fillOpacity: BOUNDARY_STYLES.region.fillOpacity
            });
          }
        });
      }
    }).addTo(mapRef.current);
  }
}, [regions, loading, error]);
```

## 5. Points d'Attention

1. **Backend FastAPI**
   - S'assurer que le CORS est bien configuré
   - Le backend doit tourner sur le port 8000
   - L'API doit être accessible via `/api/v1/regions`

2. **Frontend React**
   - Le frontend tourne sur le port 5173 (Vite)
   - Les variables d'environnement doivent être préfixées par `VITE_`
   - La gestion d'état est faite via des hooks personnalisés

3. **Démarrage**
```bash
# Backend
cd backend && uvicorn app.main:app --reload

# Frontend (dans un autre terminal)
cd frontend && npm run dev
```
