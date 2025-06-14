/**
 * API service for handling all backend communication
 */

// Import the GeoFeatureCollection type from the geography module
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
      // Fetch regions data from API
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
