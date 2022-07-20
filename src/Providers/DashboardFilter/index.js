import { createContext, useContext, useState } from "react";

export const DashFilterContext = createContext([]);

export const DashFilterProvider = ({ children }) => {
  const [inputSearch, setInputSearch] = useState("");

  return (
    <DashFilterContext.Provider
      value={{inputSearch, setInputSearch}}
    >
      {children}
    </DashFilterContext.Provider>
  );
};
