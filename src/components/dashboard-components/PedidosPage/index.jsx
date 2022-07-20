import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  Select,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useRadio,
  useRadioGroup,
  VStack,
} from "@chakra-ui/react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";

import { useActivePage } from "../../../Providers/DashboardPageController";

import api from "../../../services/api";
import { CardPedidos } from "./TicketCard";
import { DashFilterContext } from "../../../Providers/DashboardFilter";

export const PedidosPage = () => {
  const { activeDashboardPage, setActiveDashboardPage, handleIcons, options } =
    useActivePage();

  const userToken = JSON.parse(localStorage.getItem("@DEStoq:token")) || "";

  const [clientsList, setClientsList] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [ticketItem, setTicketItem] = useState(null);
  const [ticketItensList, setTicketItensList] = useState([]);
  const [ticketTotalPrice, setTicketTotalPrice] = useState(0);
  const [minQty, setMinQty] = useState(false);

  const [showError, setShowError] = useState(false);

  const [inputClient, setInputClient] = useState("");
  const [ticketItemId, setTicketItemId] = useState("");
  const [ticketItemQuantity, setTicketItemQuantity] = useState("");

  const [ticketsList, setTicketList] = useState([]);

  const { inputSearch } = useContext(DashFilterContext);
  const filteredTicketsList = ticketsList.filter(
    (item) =>
      item.status.toLowerCase().includes(inputSearch.toLowerCase()) ||
      item.id.toString().toLowerCase().includes(inputSearch.toLowerCase())
  );

  const [stockList, setStockList] = useState([]);

  const getStockList = () => {
    api.get(`/stock`).then((resp) => setStockList(resp.data));
  };

  const getProductsList = () => {
    api
      .get("/products")
      .then((res) => setProductsList(res.data))
      .catch((err) => err);
  };
  const getClientsList = () => {
    api
      .get("/users")
      .then((res) => {
        setClientsList(res.data.filter((client) => client.id !== 1));
      })
      .catch((err) => err);
  };

  const getTicketsList = () => {
    api
      .get("/tickets?_sort=id&_order=desc")
      .then((res) => setTicketList(res.data))
      .catch((err) => err);
  };

  useEffect(() => {
    getProductsList();
    getClientsList();
    getTicketsList();
    getStockList();
  }, []);

  useEffect(() => {
    setTicketTotalPrice(
      ticketItensList.reduce((acc, prod) => acc + prod.quantity * prod.price, 0)
    );
  }, [ticketItensList]);

  const handleInputsFields = () => {
    setInputClient("");
    setTicketTotalPrice(0);
    setTicketItensList([]);
  };

  const formSchema = yup.object().shape({
    client: yup.string().required("cliente obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmitFunction = (data) => {
    if (ticketItensList.length === 0) {
      setShowError(true);
    } else {
      const clientData = clientsList.filter((ele) => ele.id == data.client);
      const ticketData = {
        clientInfo: { ...clientData[0] },
        ownerId: 1,
        userId: 1,
        ticketProducts: [...ticketItensList],
        status: "Realizado",
      };
      api
        .post(`/tickets`, ticketData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then(() => getTicketsList());

      handleInputsFields();
    }
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "menuOptions",
    defaultValue: activeDashboardPage,
    onChange: setActiveDashboardPage,
  });

  const group = getRootProps();

  function RadioCard(props) {
    const { getInputProps, getCheckboxProps } = useRadio(props);

    const input = getInputProps();
    const checkbox = getCheckboxProps();

    return (
      <Box as="label" width={"100%"}>
        <input {...input} />
        <Flex
          {...checkbox}
          cursor="pointer"
          borderRadius="md"
          fontWeight="bold"
          fontSize={["18px", "18px", "18px", "26px", "26px"]}
          color="white"
          alignItems="center"
          _checked={{
            bg: "#F4BF39",
            color: "#434343",
            fontWeight: "bold",
          }}
          _focus={{
            boxShadow: "outline",
          }}
          px={5}
          py={3}
          sx={{
            svg: {
              marginRight: "10px",
            },
          }}
        >
          {props.children}
        </Flex>
      </Box>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Flex className="fullPage" width="100%" minHeight="calc(100vh - 80px)">
        <VStack
          {...group}
          alignItems="flex-start"
          backgroundColor={"#434343"}
          display={["none", "none", "none", "none", "flex"]}
        >
          {options.map((value) => {
            const radio = getRadioProps({ value });
            return (
              <RadioCard key={value} {...radio}>
                {handleIcons(value)} {value}
              </RadioCard>
            );
          })}
        </VStack>
        <Flex
          className="contentContainer"
          width="100%"
          minHeight="100%"
          flexDir="column"
          alignItems={"center"}
          backgroundImage={
            "https://www.jeronimoburger.com.br/img/home/banner-sobre-desk.png"
          }
          bgRepeat="no-repeat"
          backgroundSize="100% 100%"
        >
          <Flex
            width={"100%"}
            height={"100%"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Flex
              width={"100%"}
              height={"100%"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Flex
                backgroundColor={"#aeaeae4e"}
                boxShadow={"0 0 15px #464646"}
                width={["100%", "100%", "100%", "100%", "90%"]}
                height={["100%", "100%", "100%", "100%", "90%"]}
                marginTop={["20px", "20px", "20px", "20px", "0px"]}
                borderTopRadius={"15px"}
                borderBottomRadius={["0px", "0px", "0px", "0px", "15px"]}
                color={"white"}
              >
                <Tabs
                  isFitted
                  variant="enclosed"
                  w={"100%"}
                  borderRadius={"20px"}
                >
                  <TabList mb="1em">
                    <Tab
                      color="#101010"
                      fontWeight={"bold"}
                      fontSize={["18px", "18px", "18px", "18px", "26px"]}
                      _selected={{
                        color: "#FFFF",
                        borderBottomColor: "#14213d",
                        background: "#14213d",
                        borderBottomWidth: "2px",
                      }}
                      _focus={{
                        color: "#FFFF",

                        borderTopLeftRadius: "18px",
                        borderTopRightRadius: "18px",
                        border: "2px solid #14213d",
                      }}
                    >
                      Pedidos
                    </Tab>
                    <Tab
                      color="#101010"
                      fontWeight={"bold"}
                      fontSize={["18px", "18px", "18px", "18px", "26px"]}
                      _selected={{
                        color: "#FFFF",
                        borderBottomColor: "#14213d",
                        background: "#14213d",
                        borderBottomWidth: "2px",
                      }}
                      _focus={{
                        color: "#FFFF",

                        borderTopLeftRadius: "18px",
                        borderTopRightRadius: "18px",
                        border: "2px solid #14213d",
                      }}
                    >
                      Adicionar Novo Pedido
                    </Tab>
                  </TabList>
                  <TabPanels
                    sx={{
                      minWidth: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    maxHeight={[
                      "calc(100% - 150px)",
                      "calc(100% - 110px)",
                      "calc(100% - 110px)",
                      "calc(100% - 110px)",
                      "calc(100% - 80px)",
                    ]}
                  >
                    <TabPanel
                      width={"90%"}
                      height={"100%"}
                      maxH={"80vh"}
                      display={"flex"}
                      flexDir={"column"}
                      alignItens={"center"}
                      overflowY={"auto"}
                      sx={{
                        "&::-webkit-scrollbar": {
                          width: "5px",
                          height: "50px",
                        },
                        "&::-webkit-scrollbar-track": {
                          background: "#7a7a7a",
                          marginTop: "25px",
                          marginBottom: "25px",
                          borderRadius: "5px",
                          boxShadow: "inset 0 0 3px black",
                        },
                        "&::-webkit-scrollbar-thumb": {
                          background: "#505050",
                          boxShadow: "inset 0 0 5px #e7e7e7dd",
                          borderRadius: "5px",
                        },
                        "&::-webkit-scrollbar-thumb:hover": {
                          background: "#555",
                        },
                      }}
                    >
                      {filteredTicketsList?.map((ele) => (
                        <CardPedidos
                          key={ele.id}
                          ticket={ele}
                          getTicketsList={getTicketsList}
                          setTicketList={setTicketList}
                          token={userToken}
                        />
                      ))}
                    </TabPanel>
                    <TabPanel
                      width={"100%"}
                      height={"100%"}
                      maxH={"100%"}
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      sx={{}}
                    >
                      <Flex
                        w={"100%"}
                        maxWidth={"700px"}
                        height={"100%"}
                        justifyContent={"center"}
                      >
                        <Stack
                          spacing={3}
                          width="400px"
                          maxWidth={"90%"}
                          height={["120%", "120%", "120%", "120%", "100%"]}
                          display="flex"
                          flexDir={"column"}
                          alignItems="center"
                          justifyContent={"center"}
                          padding={"0 30px"}
                          backgroundColor={"#fff"}
                          borderRadius={"10px"}
                          boxShadow="0 0 10px grey"
                          color={"black"}
                        >
                          <Heading
                            fontSize={["22px", "22px", "22px", "30px", "30px"]}
                          >
                            {" "}
                            Adicionar Pedido
                          </Heading>
                          <Select
                            placeholder="Cliente"
                            _placeholder={{ color: "#716C6C" }}
                            {...register("client")}
                            value={inputClient}
                            onChange={(e) => {
                              setInputClient(e.target.value);
                            }}
                          >
                            {clientsList?.map((client) => (
                              <option value={client.id}>{client.name} </option>
                            ))}
                          </Select>
                          {errors.client && (
                            <Text color={"#ff0000"} width={"95%"}>
                              {errors.client.message}
                            </Text>
                          )}
                          <Flex
                            width={"100%"}
                            direction={"column"}
                            backgroundColor={"#f7f7f7"}
                            boxShadow={"inset 0 0 5px #dbdbdb"}
                            padding={"10px"}
                            borderRadius={"5px"}
                          >
                            <Select
                              placeholder="produtos"
                              _placeholder={{ color: "#716C6C" }}
                              margin={"5px 0"}
                              backgroundColor={"#ffffff"}
                              value={ticketItemId}
                              onChange={(e) => {
                                setTicketItemId(e.target.value);
                              }}
                            >
                              {productsList?.map((product) => (
                                <option value={product.id}>
                                  {product.name} - R${product.price.toFixed(2)}
                                </option>
                              ))}
                            </Select>
                            <InputGroup
                              margin={"5px 0"}
                              backgroundColor={"#ffffff"}
                            >
                              <InputLeftAddon children={"Qtd."} />
                              <Input
                                type={"number"}
                                backgroundColor={"#ffffff"}
                                value={ticketItemQuantity}
                                onChange={(e) => {
                                  setTicketItemQuantity(e.target.value);
                                }}
                              />
                            </InputGroup>
                            <Button
                              margin={"5px 0"}
                              colorScheme="blue"
                              onClick={() => {
                                if ( ticketItemQuantity <= 0 ) {
                                  setMinQty(true);
                                } else {
                                  setMinQty(false)
                                  api
                                    .get(`products/${ticketItemId}`)
                                    .then((resp) => {
                                      setTicketItensList([
                                        ...ticketItensList,
                                        {
                                          ...resp.data,
                                          quantity: +ticketItemQuantity,
                                        },
                                      ]);
                                    });
                                  setTicketItem("");
                                  setTicketItemId("");
                                  setTicketItemQuantity("");
                                  setShowError(false);
                                }
                              }}
                            >
                              Adicionar
                            </Button>
                            {ticketItensList?.map((ele, index) => (
                              <Text
                                value={ele.id}
                                display={"flex"}
                                fontWeight={"bold"}
                                alignItems={"center"}
                              >
                                {index + 1}. {ele.name} - {ele.quantity} un.
                                Total: R$
                                {(+ele.quantity * +ele.price).toFixed(2)}
                                <Button
                                  value={ele.id}
                                  size={"small"}
                                  marginLeft={"10px"}
                                  backgroundColor={"red"}
                                  width={"15px"}
                                  height={"15px"}
                                  onClick={(e) => {
                                  setTicketItensList(ticketItensList.filter((elem) => elem.id !== e.target.value) 
                                    
                                  )}}
                                >
                                  x
                                </Button>
                              </Text>
                            ))}
                          </Flex>
                          {showError && (
                            <Text color={"#ff0000"} width={"95%"}>
                              Adicione ao menos um produto!
                            </Text>
                          )}
                          {minQty && (
                            <Text color={"#ff0000"} width={"95%"}>
                              Quantidade mínima de 1!
                            </Text>
                          )}
                          <InputGroup>
                            <InputLeftAddon children="Valor da Ordem" />
                            <InputLeftElement
                              pointerEvents="none"
                              color="gray.300"
                              fontSize="1.2em"
                              left={"150px"}
                              children="$"
                            />
                            <Input
                              disabled
                              type={"number"}
                              value={ticketTotalPrice.toFixed(2)}
                            />
                          </InputGroup>

                          <Button
                            minHeight={"40px"}
                            colorScheme="blue"
                            onClick={handleSubmit(onSubmitFunction)}
                          >
                            Cadastrar Ordem de Compra
                          </Button>
                        </Stack>
                      </Flex>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </motion.div>
  );
};
export default PedidosPage;