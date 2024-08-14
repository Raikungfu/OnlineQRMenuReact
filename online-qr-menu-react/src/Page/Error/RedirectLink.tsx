import { useEffect } from 'react';

const RedirectToExternal = () => {
  useEffect(() => {
    window.location.href = 'https://onlineqrmenuapp20240813144713.azurewebsites.net';
  }, []);

  return null;
};

export default RedirectToExternal;