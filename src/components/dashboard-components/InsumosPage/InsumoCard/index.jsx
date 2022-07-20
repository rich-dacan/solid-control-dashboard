import {
  Badge,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import api from "../../../../dataBase/db";

export const CardInsumo = ({ supply }) => {
  const { id, name, provider, purchasePrice, category, measurementUnit } =
    supply;

  const [providerData, setProviderData] = useState(null);

  useEffect(() => {
    api.get(`/providers/${+provider}?_embed=supplies`).then((res) => {
  
      
      setProviderData(res.data);
    });
  }, []);

  return (
    <Flex
      key={id}
      width={"100%"}
      height={"fit-content"}
      borderRadius={"10px"}
      margin={"10px 0"}
      padding={"10px"}
      boxShadow={"0 0 10px #424242"}
      backgroundColor={"#dfdfdf"}
      justifyContent={"space-between"}
      flexWrap={["wrap", "wrap", "wrap", "wrap", "nowrap"]}
      color={"#000"}
      _hover={{
        boxShadow: "0 0 15px #eee",
        cursor: "pointer",
      }}
    >
      <Flex
        flexDirection={"column"}
        justifyContent={"center"}
        margin={"5px"}
        width={"300px"}
      >
        <Text
          fontWeight={"bold"}
          fontSize={"22px"}
          width={"fit-content"}
          backgroundColor={"#fff"}
          borderRadius={"5px"}
          padding={"5px 10px 0px 10px"}
          boxShadow={"0 0 5px #202020"}
        >
          id: #{id}
        </Text>
        <Text fontWeight={"bold"}>Insumo: {name}</Text>
        <Text fontWeight={"bold"}>
          Fornecedor: {providerData && providerData.fantasyName}
        </Text>
        <Text fontWeight={"bold"}>
          CNPJ: {providerData && providerData.cnpj}
        </Text>
      </Flex>
      <Flex
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        margin={"5px"}
      >
        <Text fontWeight={"bold"}>categoria:</Text>
        <Badge colorScheme={"green"} maxW={"fit-content"}>
          {category}
        </Badge>
      </Flex>
      <Flex
        paddingTop={"22px"}
        flexDirection={"column"}
        justifyContent={"center"}
        margin={"5px"}
      >
        <Text fontWeight={"bold"}>Preço de compra:</Text>
        <InputGroup fontWeight={"bold"}>
          <InputLeftAddon children="R$" />
          <Input
            width={"100px"}
            type="number"
            backgroundColor={"#fff"}
            value={(+purchasePrice).toFixed(2)}
          />
        </InputGroup>
      </Flex>
      <Flex
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        margin={"5px"}
      >
        <Text fontWeight={"bold"}>unidade de medida:</Text>
        <Badge colorScheme={"green"} maxW={"fit-content"}>
          {measurementUnit}
        </Badge>
      </Flex>
      <Flex flexDirection={"column"} justifyContent={"center"} margin={"5px"}>
        <Button colorScheme="red">deletar</Button>
      </Flex>
    </Flex>
  );
};
