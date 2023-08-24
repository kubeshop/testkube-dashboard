import {useEffect, useRef, useState} from 'react';

import {parse} from 'yaml';

const crdCache: Record<string, Promise<any>> = {};
export const useCRD = (url = '') => {
  const prevUrl = useRef('');
  const [loading, setLoading] = useState(true);
  const [raw, setRaw] = useState('');
  const [crd, setCrd] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (prevUrl.current === url) {
      return;
    }
    prevUrl.current = url;
    setRaw('');
    setCrd(null);
    setError(null);
    if (url === '') {
      setLoading(false);
      return;
    }
    setLoading(true);

    if (!crdCache[url]) {
      crdCache[url] = fetch(url).then(res => res.text());
    }
    crdCache[url]
      .then(text => {
        if (url !== prevUrl.current) {
          return;
        }
        setRaw(text);
        setCrd(parse(text));
        setLoading(false);
      })
      .catch(err => {
        if (url !== prevUrl.current) {
          return;
        }
        delete crdCache[url];
        setError(err);
        setLoading(false);
      });
  }, [url]);

  return {loading, crd, raw};
};
