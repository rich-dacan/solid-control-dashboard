import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

import api from "../../../../dataBase/db";
import { useStockList } from "../../../../Providers/Stock";

export const CardCompras = ({ order, getOrdersList, setOrdersList, token }) => {
  const { id, providerData, quantity, status, supplyData, totalValue } = order;
  const [selectValue, setSelectValue] = useState("");
  const { stockList, getListStock } = useStockList();

  return (
    <Flex
      key={id}
      id={id}
      width={"100%"}
      height={"fit-content"}
      borderRadius={"10px"}
      margin={"10px 0"}
      padding={"10px"}
      border="1px solid grey"
      backgroundColor={"#dfdfdf"}
      justifyContent={"space-between"}
      alignItems={"flex-start"}
      flexWrap={["wrap", "wrap", "wrap", "wrap", "wrap"]}
      color={"#000"}
      _hover={{
        boxShadow: "0 0 10px #424242",
        cursor: "pointer",
      }}
    >
      <Flex
        width={"100%"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Text
          fontWeight={"bold"}
          fontSize={"22px"}
          backgroundColor={"#fff"}
          borderRadius={"20px"}
          padding={"5px 10px 0px 10px"}
          boxShadow={"0 0 5px #202020"}
        >
          OC: #{id}
        </Text>
        <Flex alignItems={"center"}>
          <Text
            marginRight={"20px"}
            fontSize={"20px"}
            fontWeight="bold"
            flexWrap={["wrap", "wrap", "wrap", "nowrap"]}
          >
            Status:
          </Text>
          <Box
            width={["30px", "30px", "30px", "45px"]}
            height={"25px"}
            borderRadius={"50%"}
            marginRight={"20px"}
            backgroundColor={
              status === "Emitido"
                ? "#d9ff05"
                : status === "Faturado"
                ? "#88a7fc"
                : "#2fc962"
            }
            boxShadow={"inset 0 -5px 10px #666666"}
          />
          <Select
            disabled={status === "Finalizado"}
            placeholder="status"
            _placeholder={{ color: "#716C6C" }}
            backgroundColor={"#fff"}
            defaultValue={status}
            onChange={(e) => {
              api
                .patch(
                  `/orders/${id}`,
                  { ...order, status: e.target.value },
                  {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                  }
                )
                .then((rep) => {
                  getOrdersList();
                });

              if (e.target.value === "Finalizado") {
                console.log(stockList);
                console.log(supplyData);
                console.log(order);

                if (
                  stockList.some(
                    (ele) => ele.supplyData.name === supplyData.name
                  )
                ) {
                  const itemInStock = stockList.filter(
                    (ele) => ele.supplyData.name === supplyData.name
                  );

                  console.log(itemInStock);
                  console.log(itemInStock[0].id);

                  api
                    .patch(
                      `/stock/${itemInStock[0].id}`,
                      {
                        ...itemInStock[0],
                        quantity: +itemInStock[0].quantity + +order.quantity,
                      },
                      {
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    )
                    .then((rep) => {
                      getOrdersList();
                    });
                } else {
                  api
                    .post(
                      "/stock",
                      {
                        ...order,
                        ownerId: 1,
                        userId: 1,
                      },
                      {
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    )
                    .then((res) => {
                      getListStock();
                    });
                }
              }

              setSelectValue(e.target.value);
            }}
          >
            <option value="Emitido">emitido</option>
            <option value="Faturado">faturado</option>
            <option value="Finalizado">finalizado</option>
          </Select>
        </Flex>
      </Flex>

      <Flex flexDirection={"column"} justifyContent={"center"} margin={"5px"}>
        <Text fontWeight={"bold"} fontSize={"20px"}>
          Fornecedor
        </Text>
        <Text fontWeight={"bold"} fontSize={"20px"}>
          {providerData.companyName}
        </Text>
        <Text fontWeight={"bold"}>CNPJ: {providerData.cnpj}</Text>
        <Text fontWeight={"bold"}>I.E.: {providerData.ie}</Text>
      </Flex>
      <Flex flexDirection={"column"} justifyContent={"center"} margin={"5px"}>
        <Text fontWeight={"bold"} fontSize={"20px"}>
          Insumo
        </Text>
        <Text fontWeight={"bold"}> {supplyData.name}</Text>
      </Flex>
      <Flex flexDirection={"column"} justifyContent={"center"} margin={"5px"}>
        <Text fontWeight={"bold"} fontSize={"20px"}>
          Qtd.
        </Text>

        <Input
          value={`${quantity} ${supplyData.measurementUnit}`}
          width={"100px"}
          // type="number"
          backgroundColor={"#fff"}
          disabled
        />
      </Flex>

      <Flex flexDirection={"column"} justifyContent={"center"} margin={"5px"}>
        <Text fontWeight={"bold"} fontSize={"20px"}>
          Total
        </Text>
        <InputGroup fontWeight={"bold"}>
          <InputLeftAddon children="R$" />
          <Input
            value={totalValue.toFixed(2)}
            width={"100px"}
            type="number"
            backgroundColor={"#fff"}
            disabled
          />
        </InputGroup>
      </Flex>

      <Flex flexDirection={"column"} justifyContent={"center"} margin={"5px"}>
        <Button colorScheme="red" disabled={status === "Finalizado"}>
          cancelar
        </Button>
      </Flex>
    </Flex>
  );
};
