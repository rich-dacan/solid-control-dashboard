import { Avatar, Flex, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import FormLogin from "../../components/login-components/FormLogin";
import SolidLogo from "../../assets/image/newSolidControlLogo-removebg-preview.png";
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
        direction={["column", "column", "column", "row-reverse", "row-reverse"]}
      >
        <Image
          w={["290px", "290px", "290px", "290px", "200px"]}
          h={["270px", "270px", "270px", "270px", "270px"]}
          p="10px"
          position="unset"
          src={SolidLogo}
          alt="logo da empresa"
          borderRadius="50px"
          bg="#2B2D42"
          display={[
            "inline-block",
            "inline-block",
            "inline-block",
            "none",
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
