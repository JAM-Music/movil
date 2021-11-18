import {useCallback, useMemo, useState} from 'react';
import {search} from '_src/services/songs';
import {SearchRes} from '_src/utils/types/Songs';
const initalState: SearchRes = {
  songs: [],
  artists: [],
  albums: [],
};

function isResultEmpty(res: SearchRes) {
  return !res.songs.length && !res.albums.length && !res.artists.length;
}

export function useSearch() {
  const [results, setResults] = useState<SearchRes>({...initalState});
  const [loading, setLoading] = useState(false);
  const [strSearch, setStr] = useState('');
  const noFound = useMemo(
    () => !loading && isResultEmpty(results) && !!strSearch,
    [results, loading, strSearch],
  );
  const noSearch = useMemo(() => !loading && !strSearch, [loading, strSearch]);

  const searchSongs = useCallback(
    str => {
      setStr(str);
      if (!str) {
        setResults({...initalState});
        return;
      }
      setLoading(true);
      search(str)
        .then(({data}) => setResults(data))
        .catch(e => console.warn(e))
        .finally(() => setLoading(false));
    },
    [setResults],
  );

  return {
    results,
    search: searchSongs,
    str: strSearch,
    loading,
    noFound,
    noSearch,
  };
}
