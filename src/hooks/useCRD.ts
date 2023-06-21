import {useEffect, useRef, useState} from 'react';

import {parse} from 'yaml';

const crdCache: Record<string, Promise<any>> = {};
const useCRD = (url: string) => {
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
    setLoading(true);
    setRaw('');
    setCrd(null);
    setError(null);

    if (!crdCache[url]) {
      crdCache[url] = fetch(url);
    }
    crdCache[url]
      .then(res => res.text())
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

export default useCRD;
