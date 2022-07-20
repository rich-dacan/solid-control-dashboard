import { Avatar, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import FormLogin from "../../components/login-components/FormLogin";
import DEStoq from "../../assets/image/DEStoq.png";
import ImageLogin from "../../components/login-components/ImageLogin";

const LoginPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Flex
        w="100vw"
        h="100vh"
        justify="center"
        align="center"
        direction={["column", "column", "column", "column", "row-reverse"]}
      >
        <Avatar
          w={["170px", "170px", "170px", "170px", "200px"]}
          h={["160px", "160px", "160px", "160px", "200px"]}
          position="unset"
          top="100px"
          src={DEStoq}
          alt="logo da empresa"
          display={[
            "inline-block",
            "inline-block",
            "inline-block",
            "inline-block",
            "none",
          ]}
        />
        <FormLogin />

        <ImageLogin />
      </Flex>
    </motion.div>
  );
};
export default LoginPage;
