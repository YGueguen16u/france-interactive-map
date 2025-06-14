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
