import {useFocusEffect} from '@react-navigation/core';
import {useCallback, useMemo, useState} from 'react';
import {getRecents} from '_src/services/songs';
import {Song} from '_src/utils/types/Songs';

export function useRecents() {
  const [recents, setRecents] = useState<Array<Song> | undefined>();
  const noRecents = useMemo(() => recents && !recents.length, [recents]);

  useFocusEffect(
    useCallback(() => {
      getRecents().then(res => setRecents(res.data));
    }, []),
  );

  return {
    recents: recents || [],
    noRecents,
  };
}
