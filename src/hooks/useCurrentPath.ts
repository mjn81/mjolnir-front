import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useCurrentPath = () => {
  const location = useLocation();
  const [currentPath, setCurrentPath] =
    useState<string>(location.pathname);
  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);
  return currentPath;
};
