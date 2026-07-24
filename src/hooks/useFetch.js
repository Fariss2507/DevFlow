import { useState, useEffect, useCallback } from 'react';
import api from '@/services/api';

/**
 * useFetch — generic data fetching hook backed by the Axios api client.
 *
 * @param {string} url - API endpoint path (e.g. '/projects')
 * @returns {{ data, loading, error, refetch }}
 */
export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(url);
      setData(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
