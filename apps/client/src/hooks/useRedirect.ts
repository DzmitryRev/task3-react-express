import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function useRedirect(condition: boolean, navigateTo: string) {
  const navigate = useNavigate();

  useEffect(() => {
    if (condition) {
      navigate(navigateTo);
    }
  }, [condition]);
}

export default useRedirect;
