import { createContext, useContext, useEffect, useState } from "react";
import api from "../../services/api";

export const StockContext = createContext([]);

export const StockProvider = ({ children }) => {
  const [stockList, setStockList] = useState([]);

  useEffect(() => {
    getListStock();
  }, []);

  const getListStock = () => {
    api
      .get("/stock")
      .then((res) => setStockList(res.data))
      .catch((err) => err);
  };

  return (
    <StockContext.Provider value={{ stockList, getListStock }}>
      {children}
    </StockContext.Provider>
  );
};
export const useStockList = () => useContext(StockContext);
