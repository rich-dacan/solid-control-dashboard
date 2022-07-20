import DashboardPage from "../../components/dashboard-components/DashboardPage";
import PedidosPage from "../../components/dashboard-components/PedidosPage";
import FornecedoresPage from "../../components/dashboard-components/FornecedoresPage";
import InsumosPage from "../../components/dashboard-components/InsumosPage";
import ProdutosPage from "../../components/dashboard-components/ProdutosPage";
import EstoquePage from "../../components/dashboard-components/EstoquePage";
import FinanceiroPage from "../../components/dashboard-components/FinanceiroPage";
import DashboardHeader from "../../components/header-components";
import ComprasPage from "../../components/dashboard-components/ComprasPage";
import DevelopersPage from "../../components/dashboard-components/DevelopersPage";
import { useActivePage } from "../../Providers/DashboardPageController";
import { useNavigate } from "react-router-dom";
import { useJwt } from "react-jwt";
import { motion } from "framer-motion";
import { useToken } from "../../Providers/Token";
import EntregasPage from "../../components/dashboard-components/EntregasPage";

const Dashboard = () => {
  const { activeDashboardPage } = useActivePage();
  // const userLogin = JSON.parse(localStorage.getItem("@DEStoq:user")) || "";
  // const { token } = useToken();
  // const { decodedToken, isExpired } = useJwt(token);

  // const navigate = useNavigate();
  // const isAdmin = userLogin.userId;

  // if (isAdmin != "1") {
  //   return navigate("/");
  // }

  const handlePageRender = (value) => {
    switch (value) {
      case "Dashboard":
        return <DashboardPage />;

      case "Pedidos":
        return <PedidosPage />;

      case "Fornecedores":
        return <FornecedoresPage />;

      case "Insumos":
        return <InsumosPage />;

      case "Compras":
        return <ComprasPage />;

      case "Produtos":
        return <ProdutosPage />;

      case "Estoque":
        return <EstoquePage />;

      case "Financeiro":
        return <FinanceiroPage />;

      case "Entregas":
        return <EntregasPage />;

      case "Developers":
        return <DevelopersPage />;

      default:
        return <DashboardPage />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <DashboardHeader />
      {handlePageRender(activeDashboardPage)}
    </motion.div>
  );
};
export default Dashboard;
