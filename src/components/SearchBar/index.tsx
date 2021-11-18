import React, {useCallback, useRef} from 'react';
import Template from './SearchBar.template';
export type SearchBarProps = {
  search: (str: string) => any;
};

const SearchBar: React.FC<SearchBarProps> = ({search}) => {
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const debounce = useCallback(
    str => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => search(str), 500);
    },
    [search],
  );
  return <Template onChange={debounce} />;
};

export default SearchBar;
