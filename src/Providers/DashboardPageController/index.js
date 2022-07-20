import { createContext, useContext, useState } from "react";
import { AiFillBank, AiOutlineDropbox } from "react-icons/ai";
import { MdDeliveryDining, MdDeveloperMode } from "react-icons/md";
import {
  FaBoxes,
  FaFileInvoiceDollar,
  FaHamburger,
  FaOpencart,
} from "react-icons/fa";
import { GiFactory } from "react-icons/gi";
import { MdDashboard } from "react-icons/md";

export const dashboardPageControllerContext = createContext();

export const DashboardPageControllerProvider = ({ children }) => {
  const [activeDashboardPage, setActiveDashboardPage] = useState("Dashboard");

  const handleIcons = (value) => {
    switch (value) {
      case "Dashboard":
        return <MdDashboard />;
      case "Pedidos":
        return <FaFileInvoiceDollar />;

      case "Fornecedores":
        return <GiFactory />;

      case "Insumos":
        return <AiOutlineDropbox />;

      case "Compras":
        return <FaOpencart />;

      case "Produtos":
        return <FaHamburger />;

      case "Estoque":
        return <FaBoxes />;

      case "Financeiro":
        return <AiFillBank />;

      case "Developers":
        return <MdDeveloperMode />;

      case "Entregas":
        return <MdDeliveryDining />;

      default:
        break;
    }
  };

  const options = [
    "Dashboard",
    "Pedidos",
    "Fornecedores",
    "Insumos",
    "Compras",
    "Produtos",
    "Estoque",
    "Financeiro",
    "Entregas",
    "Developers",
  ];

  return (
    <dashboardPageControllerContext.Provider
      value={{
        activeDashboardPage,
        setActiveDashboardPage,
        handleIcons,
        options,
      }}
    >
      {children}
    </dashboardPageControllerContext.Provider>
  );
};

export const useActivePage = () => useContext(dashboardPageControllerContext);
