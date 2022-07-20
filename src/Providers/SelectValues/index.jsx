import { createContext, useContext } from "react";

export const selectValuesContext = createContext();

export const SelectValuesProvider = ({ children }) => {
  const unidadesDeMedidaOptions = ["Un", "g"];

  const categoriasOptions = [
    "Hortaliças",
    "Bebidas",
    "Lacticínios",
    "Carnes",
    "Panificadora",
    "Perecíveis",
    "Lanches",
  ];

  return (
    <selectValuesContext.Provider
      value={{ unidadesDeMedidaOptions, categoriasOptions }}
    >
      {children}
    </selectValuesContext.Provider>
  );
};

export const useSelectValues = () => useContext(selectValuesContext);
