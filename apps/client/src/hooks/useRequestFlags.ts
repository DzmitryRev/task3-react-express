import { useState } from 'react';

function useRequestFlags() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  return {
    loading,
    error,
    setLoading,
    setError,
  };
}

export default useRequestFlags;
