import { Avatar, Flex, Text } from "@chakra-ui/react";
import LogoLogin from "../../../assets/image/newSolidControlLogo-removebg-preview.png";

const ImageLogin = () => {
  return (
    <Flex
      w="100%"
      h="100%"
      flexDirection="column"
      justify="center"
      align="center"
      background="#2B2D42"
      backgroundImage={
        "https://www.jeronimoburger.com.br/img/home/banner-sobre-desk.png"
      }
      bgRepeat="no-repeat"
      backgroundSize="100% 90%"
      display={["none", "none", "none", "flex", "flex"]}
    >
      <Flex
        ml={"50px"}
        alignItems={"center"}
        justify={"center"}
        flexDirection={"column"}
      >
        <Avatar
          w={["none", "none", "none", "350px", "500px"]}
          h={["none", "none", "none", "350px", "500px"]}
          position="unset"
          top="200px"
          src={LogoLogin}
          alt="logo__solid__control"
          borderRadius="10px"
          bg="transparent"
        />
        <Text
          mt={"50px"}
          color={"#ccc"}
          fontFamily={"Ubuntu"}
          fontSize={"1.5rem"}
        >
          Gerenciamento Sólido, 
        </Text>
        <Text
          color={"#ccc"}
          fontFamily={"Ubuntu"}
          fontSize={"1.5rem"}
        >
          Controle em suas mãos! 
        </Text>
      </Flex>
    </Flex>
  );
};

export default ImageLogin;
