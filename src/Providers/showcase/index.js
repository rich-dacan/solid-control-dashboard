import { createContext, useState, useEffect } from "react";
import api from "../../services/api";

export const ShowcaseContext = createContext([]);

export const ShowcaseProvider = ({ children }) => {
  const [listProducts, setListProducts] = useState([]);
 
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    api.get(`/products`).then((resp) => {
      setListProducts(resp.data);
    });
  };

  return (
    <ShowcaseContext.Provider value={{ listProducts,getProducts }}>
      {children}
    </ShowcaseContext.Provider>
  );
};
