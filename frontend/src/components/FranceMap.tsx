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
import { useRegions } from '../hooks/useRegions';

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
  /** Load regions data using custom hook */
  const { regions, loading, error } = useRegions();

  /**
   * Initializes the Leaflet map and loads geographic data
   * This effect runs once when the component mounts
   */
  // Initialize map
  useEffect(() => {
    // Fetch regions data from API
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

        // Map instance is ready for data
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

  // Add regions data when available
  useEffect(() => {
    if (mapRef.current && regions && !loading && !error) {
      console.log('Adding regions to map...');
      L.geoJSON(regions, {
        style: BOUNDARY_STYLES.region,
        onEachFeature: (feature, layer) => {
          // Add popup with region information
          if (feature.properties) {
            layer.bindPopup(`
              <h3>${feature.properties.name}</h3>
              <p>Code: ${feature.properties.code}</p>
              ${feature.properties.population 
                ? `<p>Population: ${feature.properties.population.toLocaleString()}</p>` 
                : ''}
            `);
          }
          // Add hover effect
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
      console.log('Regions layer added to map');
    }
  }, [regions, loading, error]);

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

  return (
    <div 
      id="map" 
      style={{
        height: '100vh',
        width: '100%',
        position: 'relative'
      }}
      aria-label="Interactive map of France"
    >
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
    </div>
  );
};
