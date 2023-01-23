import { useState } from 'react';

export default function useError() {
  // Can add another flags like loading
  const [error, setError] = useState('');

  return { error, setError };
}
