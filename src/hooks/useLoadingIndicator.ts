import {useState} from 'react';

export const useLoadingIndicator = (timeoutInterval = 1000) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, timeoutInterval);
  };

  return {isLoading, handleLoading};
};
