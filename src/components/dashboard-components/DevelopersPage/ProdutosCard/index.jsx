import { AddIcon, StarIcon } from "@chakra-ui/icons";
// import { StarIcon } from "@chakra-ui/icons";
// import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import api from "../../../../dataBase/db";
import { useToken } from "../../../../Providers/Token";

export const CardProdutos = ({ product, setProductsList, getProductsList }) => {
  const { id, name, image, category, description, price, rating, ingredients } =
    product;

  const { token } = useToken();

  const removeProduct = (id) => {
    api
      .delete(`products/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        getProductsList();
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Flex
        key={id}
        id={id}
        width={"100%"}
        maxWidth={"335px"}
        height={"fit-content"}
        borderRadius={"10px"}
        margin={"10px 10px"}
        padding={"10px"}
        boxShadow={"0 0 10px #424242"}
        backgroundColor={"#dfdfdf"}
        justifyContent={"space-between"}
        alignItems={"flex-start"}
        flexWrap={["wrap", "wrap", "wrap", "wrap", "wrap"]}
        color={"#000"}
        _hover={{
          boxShadow: "0 0 15px #eeeeee",
          cursor: "pointer",
        }}
      >
        <Flex
          width={"100%"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Text>
            Categoria:
            <span>{category}</span>
          </Text>
          <Popover>
            <Flex w="100%" justify="flex-end">
              <PopoverTrigger>
                <Button bg="transparent">
                  descrição <AddIcon ml="10px" cursor="pointer" />
                </Button>
              </PopoverTrigger>
            </Flex>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader fontWeight={"bold"}>Descrição:</PopoverHeader>
              <PopoverBody>{description}</PopoverBody>
            </PopoverContent>
          </Popover>
          <Text width={"100%"} fontWeight={"bold"}>
            Preço: R$
            <span fontWeight={"400"}>{price.toFixed(2)}</span>
          </Text>
          <Text
            fontWeight={"bold"}
            fontSize={"22px"}
            backgroundColor={"#fff"}
            borderRadius={"20px"}
            padding={"5px 10px 0px 10px"}
            boxShadow={"0 0 5px #202020"}
          >
            id: #{id}
          </Text>
          <Button
            colorScheme={"red"}
            size={"sm"}
            onClick={() => removeProduct(id)}
          >
            remover
          </Button>
        </Flex>
        <Flex alignItems={"center"}>
          <Text margin={"10px 0 10px 10px"} fontSize={"20px"} fontWeight="bold">
            {name}
          </Text>
        </Flex>
        <Flex width={"100%"} justifyContent={"center"}>
          <Image
            width={"300px"}
            height={"300px"}
            src={image}
            alt={name}
            boxShadow={"0 0 10px #000"}
          />
        </Flex>
        <Flex width={"100%"} flexWrap={"wrap"}>
          <Flex pr="15px" justify="flex-end" width={"100%"} margin={"10px 0"}>
            {Array(5)
              .fill("")
              .map((_, i) => (
                <StarIcon key={i} color={i < rating ? "#DE9E36" : "gray.300"} />
              ))}
          </Flex>
          <Text
            width={"100%"}
            fontWeight={"bold"}
            sx={{
              span: {
                marginLeft: "10px",
                fontWeight: "400",
              },
            }}
          >
            Categoria:
            <span>{category}</span>
          </Text>
          <Text width={"100%"} fontWeight={"bold"}>
            Descrição:
            <Text fontWeight={"400"}>{description}</Text>
          </Text>
          <Text width={"100%"} fontWeight={"bold"}>
            Preço: R$
            <span fontWeight={"400"}>{price.toFixed(2)}</span>
          </Text>
        </Flex>
      </Flex>
    </motion.div>
  );
};
