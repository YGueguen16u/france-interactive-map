/**
 * File: frontend/src/components/FranceMap.tsx
 * 
 * Main component for displaying the interactive map of France.
 * This component handles the initialization of the Leaflet map and
 * the loading of administrative boundaries (regions, departments, cities).
 * 
 * @module components/FranceMap
 */

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { GeoFeatureCollection } from '../types/geography';

/**
 * Default map settings for France metropolitan area
 */
const MAP_CONFIG = {
  /** Center coordinates of metropolitan France */
  center: [46.227638, 2.213749] as [number, number],
  /** Initial zoom level to show all of France */
  defaultZoom: 6,
  /** Tile layer URL for OpenStreetMap */
  tileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  /** Attribution required by OpenStreetMap */
  attribution: '© OpenStreetMap contributors'
};

/**
 * Style configuration for administrative boundaries
 */
const BOUNDARY_STYLES = {
  region: {
    color: '#2c3e50',      // Couleur plus foncée pour les bordures
    weight: 1.5,           // Ligne plus fine
    opacity: 0.8,          // Bordure légèrement transparente
    fillColor: '#3498db',  // Couleur de remplissage différente
    fillOpacity: 0.15,     // Remplissage très léger
    smoothFactor: 1.5      // Lissage des polygones
  }
};

/**
 * FranceMap Component
 * Renders an interactive map of France with administrative boundaries
 * 
 * @component
 * @returns {JSX.Element} A div containing the Leaflet map
 */
export const FranceMap = () => {
  /** Reference to the Leaflet map instance */
  const mapRef = useRef<L.Map | null>(null);

  /**
   * Initializes the Leaflet map and loads geographic data
   * This effect runs once when the component mounts
   */
  useEffect(() => {
    console.log('FranceMap component mounted');
    // Initialize map if not already done
    if (!mapRef.current) {
      console.log('Creating new map instance');
      try {
        // Create map instance
        mapRef.current = L.map('map').setView(MAP_CONFIG.center, MAP_CONFIG.defaultZoom);
        console.log('Map instance created');
        
        // Add OpenStreetMap tile layer
        L.tileLayer(MAP_CONFIG.tileUrl, {
          attribution: MAP_CONFIG.attribution
        }).addTo(mapRef.current);
        console.log('Tile layer added');

        // Load and display region boundaries
        console.log('Fetching GeoJSON data...');
        fetch('/data/france-regions.geojson')
          .then(response => {
            console.log('GeoJSON response received');
            return response.json();
          })
          .then((data: GeoFeatureCollection) => {
            console.log('GeoJSON data parsed:', data);
            L.geoJSON(data, {
              style: BOUNDARY_STYLES.region
            }).addTo(mapRef.current!);
            console.log('GeoJSON layer added to map');
          })
          .catch(error => {
            console.error('Failed to load region boundaries:', error);
          });
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    }

    // Cleanup function to remove map when component unmounts
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div 
      id="map" 
      style={{ height: '100vh', width: '100%' }} 
      aria-label="Interactive map of France"
    />
  );
};
