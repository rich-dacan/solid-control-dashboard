import { createContext, useContext, useEffect, useState } from "react";
import api from "../../dataBase/db";
export const ProvidersListContext = createContext([]);
export const ProvidersListProvider = ({ children }) => {
  const [providersList, setProvidersList] = useState([]);
  useEffect(() => {
    api.get("/providers").then((res) => setProvidersList(res.data));
  }, []);
  return (
    <ProvidersListContext.Provider value={{ providersList, setProvidersList }}>
      {children}
    </ProvidersListContext.Provider>
  );
};
export const useProvidersList = () => useContext(ProvidersListContext);
