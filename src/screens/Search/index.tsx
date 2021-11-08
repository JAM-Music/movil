import React from 'react';
import Content from '_src/components/Content';
import SearchBar from '_src/components/SearchBar';
// import style from './Search.style';

export type SearchProps = {};

const Search: React.FC<SearchProps> = () => {
  return (
    <Content>
      <SearchBar />
    </Content>
  );
};

export default Search;
