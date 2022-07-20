import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Select,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

import api from "../../../../services/api";
import { useStockList } from "../../../../Providers/Stock";
import { AddIcon } from "@chakra-ui/icons";

export const CardPedidos = ({
  ticket,
  getTicketsList,
  setTicketList,
  token,
}) => {
  const { id, clientInfo, ticketProducts, status } = ticket;
  const [selectValue, setSelectValue] = useState("");

  const { stockList, getListStock } = useStockList();

  const reduceStock = (id, quantity) => {
    console.log(id);
    api
      .get(`/stock/${id}`)
      .then(
        (res) => {
          console.log(res.data);
          api.patch(`/stock/${res.data.id}`, {
            ...res.data,
            quantity: +res.data.quantity - quantity,
          });
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => getListStock());
  };

  return (
    <Flex
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
          fontSize={["18px", "18px", "18px", "18px", "22px"]}
          backgroundColor={"#fff"}
          borderRadius={"20px"}
          padding={"5px 10px 0px 10px"}
          boxShadow={"0 0 5px #202020"}
        >
          Pedido: #{id}
        </Text>
        <Flex
          alignItems={"center"}
          ml={["10px"]}
          flexWrap={["wrap", "wrap", "wrap", "wrap", "nowrap"]}
        >
          <Text
            marginRight={"20px"}
            fontSize={["18px", "18px", "18px", "18px", "20px"]}
            fontWeight="bold"
          >
            Status:
          </Text>
          <Box
            width={["25px", "25px", "25px", "45px", "45px"]}
            height={["20px", "20px", "20px", "25px", "25px"]}
            borderRadius={"50%"}
            marginRight={"20px"}
            backgroundColor={
              status === "Realizado"
                ? "#d9ff05"
                : status === "Aceito"
                ? "#2147b1"
                : status === "Em preparo"
                ? "#d89966"
                : status === "Pronto entrega"
                ? "#bd2ff5"
                : "#2fc962"
            }
            boxShadow={"inset 0 -5px 10px #666666"}
          />
          <Select
            disabled={status === "Pedido concluido"}
            placeholder="status"
            _placeholder={{ color: "#716C6C" }}
            backgroundColor={"#fff"}
            defaultValue={status}
            onChange={(e) => {
              api
                .patch(
                  `/tickets/${id}`,
                  { ...ticket, status: e.target.value },
                  {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                  }
                )
                .then((rep) => {
                  getTicketsList();
                });

              if (e.target.value === "Pedido concluido") {
                console.log(stockList);
                console.log(ticketProducts);

                const names = [];

                ticketProducts.forEach((ele) =>
                  names.push(ele.ingredients.name)
                );
                console.log(names);
                console.log(ticketProducts);

                ticketProducts.forEach((product, index) => {
                  product.ingredients.forEach((ingredients) => {
                    const itemData = stockList.filter(
                      (ele) => ele.supplyData.name === ingredients.name
                    );
                    console.log(product);
                    console.log(ingredients);
                    console.log(itemData);
                    const totalToReduce =
                      ingredients.qty * ticketProducts[index].quantity;
                    reduceStock(itemData[0].id, totalToReduce);
                    getListStock();
                  });
                });
              }
              setSelectValue(e.target.value);
            }}
          >
            <option value="Realizado">realizado</option>
            <option value="Aceito">aceito</option>
            <option value="Em preparo">em preparo</option>
            <option value="Pronto entrega">para entrega</option>
            <option value="Pedido concluido">pedido concluído</option>
          </Select>
        </Flex>
      </Flex>
      <Flex width={"100%"} justifyContent={"space-between"} flexWrap={"wrap"}>
        <Flex
          flexDirection={"column"}
          justifyContent={"center"}
          margin={"5px"}
          width={"300px"}
        >
          <Text
            fontWeight={"bold"}
            fontSize={["18px", "18px", "18px", "20px", "20px"]}
          >
            Cliente #{clientInfo.id}
          </Text>
          <Text
            fontWeight={"bold"}
            fontSize={["18px", "18px", "18px", "20px", "20px"]}
          >
            Nome: {clientInfo.name}
          </Text>
          <Text fontWeight={"bold"}>
            Endereço: {clientInfo.addressInfo && clientInfo.addressInfo.address}
            , {clientInfo.addressInfo && clientInfo.addressInfo.number}
          </Text>
          <Text fontWeight={"bold"}>
            {clientInfo.addressInfo && clientInfo.addressInfo.city},{" "}
            {clientInfo.addressInfo && clientInfo.addressInfo.state}{" "}
          </Text>
          <Text fontWeight={"bold"}>
            CEP: {clientInfo.addressInfo && clientInfo.addressInfo.cep}{" "}
          </Text>
        </Flex>

        <Flex flexDirection={"column"} justifyContent={"center"} margin={"5px"}>
          <Popover>
            <PopoverTrigger>
              <Button>
                <AddIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Pedido</PopoverHeader>
              <PopoverBody>
                {ticket.ticketProducts.map((el) => (
                  <Text>
                    {el.quantity} un. - {el.name} - Total: R${" "}
                    {(el.price * el.quantity).toFixed(2)}
                  </Text>
                ))}
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Flex>

        <Flex
          flexDirection={"column"}
          justifyContent={"center"}
          margin={"5px"}
          marginBottom={"30px"}
        >
          <Text fontWeight={"bold"} fontSize={"20px"}>
            Total
          </Text>
          <InputGroup fontWeight={"bold"}>
            <InputLeftAddon children="R$" />
            <Input
              value={ticket.ticketProducts
                .reduce((acc, el) => acc + el.price * el.quantity, 0)
                .toFixed(2)}
              width={"100px"}
              type="number"
              backgroundColor={"#fff"}
              disabled
            />
          </InputGroup>
        </Flex>

        <Flex flexDirection={"column"} justifyContent={"center"} margin={"5px"}>
          <Button colorScheme="red" disabled={status === "Pedido concluido"}>
            cancelar
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
