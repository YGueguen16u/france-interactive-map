/**
 * File: src/types/geography.ts
 * 
 * This file contains TypeScript interfaces for geographic data used in the France Interactive Map.
 * It defines the structure of GeoJSON features and their properties specifically for French
 * administrative divisions (regions, departments, cities).
 * 
 * @module types/geography
 */

/**
 * Represents a GeoJSON feature for French administrative divisions
 * Contains both the geometric data and administrative properties
 * 
 * @interface GeoFeature
 * @property {string} type - Always 'Feature' as per GeoJSON spec
 * @property {object} properties - Administrative information about the region
 * @property {GeoJSON.Geometry} geometry - The geometric data of the region
 */
export interface GeoFeature {
  type: 'Feature';
  properties: {
    /** Official name of the administrative division */
    name: string;
    /** INSEE code for the administrative division */
    code: string;
    /** Population count (optional) */
    population?: number;
  };
  geometry: GeoJSON.Geometry;
}

/**
 * Collection of GeoJSON features
 * Used for grouping multiple administrative divisions
 * 
 * @interface GeoFeatureCollection
 * @property {string} type - Always 'FeatureCollection' as per GeoJSON spec
 * @property {GeoFeature[]} features - Array of geographic features
 */
export interface GeoFeatureCollection {
  type: 'FeatureCollection';
  features: GeoFeature[];
}
