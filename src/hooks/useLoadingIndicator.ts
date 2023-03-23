import {useState} from 'react';

const useLoadingIndicator = (timeoutInterval = 1000) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, timeoutInterval);
  };

  return {isLoading, handleLoading};
};

export default useLoadingIndicator;
