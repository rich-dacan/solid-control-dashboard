import { Avatar, Flex, Text } from "@chakra-ui/react";
import DEStoq from "../../../assets/image/solid_control_dark-removebg-preview.png";

const ImageLogin = () => {
  return (
    <Flex
      w="100%"
      h="100%"
      flexDirection="column"
      justify="center"
      align="center"
      background="#101010"
      backgroundImage={
        "https://www.jeronimoburger.com.br/img/home/banner-sobre-desk.png"
      }
      bgRepeat="no-repeat"
      backgroundSize="100% 90%"
      display={["none", "none", "none", "none", "flex"]}
    >
      <Flex
        ml={"50px"}
        alignItems={"center"}
        justify={"center"}
        flexDirection={"column"}
      >
        <Avatar
          w="200px"
          h="200px"
          ml="-100px"
          mt="150px"
          position="unset"
          top="200px"
          src={DEStoq}
          alt="logo da empresa"
          borderRadius="10px"
          bg="transparent"
        />
        <Text
          mr={"80px"}
          mt={"50px"}
          color={"#ccc"}
          fontFamily={"rubik"}
          fontSize={"1.5rem"}
        >
          Descomplicando seu estoque!
        </Text>
      </Flex>
    </Flex>
  );
};
export default ImageLogin;
