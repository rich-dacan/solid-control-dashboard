import { Avatar, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import FormLogin from "../../components/login-components/FormLogin";
import SolidLogo from "../../assets/image/solid_control_light-removebg-preview.png";
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
          w={["270px", "270px", "270px", "270px", "200px"]}
          h={["250px", "250px", "250px", "260px", "250px"]}
          position="unset"
          top="100px"
          src={SolidLogo}
          alt="logo da empresa"
          borderRadius="10px"
          bg="transparent"
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
