import { createContext, useContext, useState } from "react";

export const SearchHomeContext = createContext([]);

export const SearchHomeProvider = ({ children }) => {
  const [inputSearch, setInputSearch] = useState("");

  
  const addInputSearch = (data) => {
   return setInputSearch(data);
  };

  return (
    <SearchHomeContext.Provider value={{ inputSearch, addInputSearch }}>
      {children}
    </SearchHomeContext.Provider>
  );
};
export const useInputHome = () => useContext(SearchHomeContext);
