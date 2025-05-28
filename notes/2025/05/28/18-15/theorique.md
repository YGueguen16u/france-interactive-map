# Points Théoriques - 28 mai 2025 (18:15)

## Explication détaillée des fichiers créés

### 1. App.tsx - Composant principal
```typescript
// Importe le composant FranceMap depuis son fichier
import { FranceMap } from './components/FranceMap';

// Définit le composant App, c'est le point d'entrée de l'application
function App() {
  // Retourne le JSX (comme du HTML mais en React)
  return (
    // Crée un conteneur div avec une classe CSS
    <div className="app-container">
      {/* Insère notre composant de carte */}
      <FranceMap />
    </div>
  );
}

// Rend le composant disponible pour d'autres fichiers
export default App;
```

### 2. FranceMap.tsx - Composant de la carte
```typescript
// Importe les hooks React nécessaires
import { useEffect, useRef } from 'react';
// Importe la bibliothèque Leaflet et ses styles
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
// Importe nos types personnalisés
import type { GeoFeatureCollection } from '../types/geography';

// Configuration de la carte (variables constantes)
const MAP_CONFIG = {
  // Coordonnées du centre de la France [latitude, longitude]
  center: [46.227638, 2.213749] as [number, number],
  // Niveau de zoom initial (6 montre toute la France)
  defaultZoom: 6,
  // URL du fond de carte OpenStreetMap
  tileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  // Crédit obligatoire pour OpenStreetMap
  attribution: '© OpenStreetMap contributors'
};

// Styles pour les frontières administratives
const BOUNDARY_STYLES = {
  region: {
    color: '#3388ff',      // Couleur bleue
    weight: 2,             // Épaisseur de la ligne
    fillOpacity: 0.1       // Transparence du remplissage
  }
};

// Définition du composant FranceMap
export const FranceMap = () => {
  // useRef garde une référence stable à la carte entre les rendus
  // null est la valeur initiale
  const mapRef = useRef<L.Map | null>(null);

  // useEffect exécute du code après le rendu du composant
  useEffect(() => {
    // Vérifie si la carte n'est pas déjà créée
    if (!mapRef.current) {
      // Crée une nouvelle carte Leaflet
      mapRef.current = L.map('map').setView(MAP_CONFIG.center, MAP_CONFIG.defaultZoom);
      
      // Ajoute le fond de carte OpenStreetMap
      L.tileLayer(MAP_CONFIG.tileUrl, {
        attribution: MAP_CONFIG.attribution
      }).addTo(mapRef.current);

      // Charge les données GeoJSON des régions
      fetch('/data/france-regions.geojson')
        .then(response => response.json())  // Convertit la réponse en JSON
        .then((data: GeoFeatureCollection) => {
          // Crée une couche GeoJSON avec nos styles
          L.geoJSON(data, {
            style: BOUNDARY_STYLES.region
          }).addTo(mapRef.current!);  // '!' dit à TypeScript que mapRef.current existe
        })
        .catch(error => {
          console.error('Failed to load region boundaries:', error);
        });
    }

    // Fonction de nettoyage exécutée quand le composant est démonté
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();  // Supprime la carte
        mapRef.current = null;    // Réinitialise la référence
      }
    };
  }, []); // [] signifie que useEffect ne s'exécute qu'une fois au montage

  // Retourne le conteneur de la carte
  return (
    <div 
      id="map" 
      style={{ height: '100vh', width: '100%' }}  // Carte en plein écran
      aria-label="Interactive map of France"     // Pour l'accessibilité
    />
  );
};
```

### 3. geography.ts - Types TypeScript
```typescript
// Définit la structure d'une entité géographique (région, département...)
export interface GeoFeature {
  // Le type est toujours 'Feature' selon la spec GeoJSON
  type: 'Feature';
  
  // Propriétés non-géographiques de l'entité
  properties: {
    name: string;      // Nom (ex: "Bretagne")
    code: string;      // Code INSEE
    population?: number; // Population (optionnel)
  };
  
  // Données géométriques (forme de la région)
  geometry: GeoJSON.Geometry;
}

// Collection d'entités géographiques
export interface GeoFeatureCollection {
  // Le type est toujours 'FeatureCollection'
  type: 'FeatureCollection';
  
  // Liste des entités géographiques
  features: GeoFeature[];
}
```

## Concepts React importants utilisés

### 1. Hooks React
- **useRef** : Garde une référence stable entre les rendus
- **useEffect** : Exécute des effets de bord (création/nettoyage de la carte)

### 2. JSX
- Syntaxe qui mélange HTML et JavaScript
- Les attributs HTML deviennent camelCase (className au lieu de class)
- Les styles sont des objets JavaScript

### 3. Composants
- Fonctions qui retournent du JSX
- Peuvent être imbriqués (FranceMap dans App)
- Isolent la logique et l'interface

### 4. TypeScript
- Ajoute des types au JavaScript
- Aide à éviter les erreurs
- Améliore l'autocomplétion

## Points d'attention pour les débutants
1. React re-rend les composants souvent, d'où l'importance de useRef
2. useEffect gère le cycle de vie (création/nettoyage)
3. Les styles en React sont en camelCase et sont des objets
4. L'attribut class devient className en JSX
