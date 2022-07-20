import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightAddon,
  InputRightElement,
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
import { motion } from "framer-motion";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useActivePage } from "../../../Providers/DashboardPageController";
import { CardCompras } from "./ComprasCard";
import { useEffect, useState } from "react";
import api from "../../../services/api";
import { useToken } from "../../../Providers/Token";
import { useContext } from "react";
import { DashFilterContext } from "../../../Providers/DashboardFilter";

export const ComprasPage = () => {
  const { activeDashboardPage, setActiveDashboardPage, handleIcons, options } =
    useActivePage();
  const [providersAndSuppliesList, setProvidersAndSuppliesList] = useState([]);
  const [ordersList, setOrdersList] = useState([]);
  const { inputSearch } = useContext(DashFilterContext);

  const filteredOrdersList = ordersList.filter(
    (item) =>
      item.status.toLowerCase().includes(inputSearch.toLowerCase()) ||
      item.providerData.companyName
        .toLowerCase()
        .includes(inputSearch.toLowerCase()) ||
      item.providerData.fantasyName
        .toLowerCase()
        .includes(inputSearch.toLowerCase()) ||
      item.supplyData.category
        .toLowerCase()
        .includes(inputSearch.toLowerCase()) ||
      item.supplyData.name.toLowerCase().includes(inputSearch.toLowerCase())
  );

  const { token } = useToken();

  const getOrdersList = () => {
    api
      .get("/orders?_sort=id&_order=desc")
      .then((res) => setOrdersList(res.data))
      .catch((err) => err);
  };

  useEffect(() => {
    getOrdersList();
  }, []);

  useEffect(() => {
    api.get("/providers?_embed=supplies").then((res) => {
      setProvidersAndSuppliesList(res.data);
    });
  }, []);

  const [supplyByProvider, setSupplyByProvider] = useState(null);
  const [selectedSupply, setSelectedSupply] = useState(null);
  const [selectedSupplyPrice, setSelectedSupplyPrice] = useState(0);
  const [selectedSupplyUnt, setSelectedSupplyUnt] = useState("Un.");
  const [orderQty, setOrderQty] = useState(0);
  const [orderTotalValue, setOrderTotalValue] = useState(0);

  const formSchema = yup.object().shape({
    supplyId: yup
      .number()
      .typeError("preço obrigatório")
      .nullable(true)
      .required("preço obrigatório"),
    providerId: yup
      .number()
      .typeError("preço obrigatório")
      .nullable(true)
      .required("preço obrigatório"),

    quantity: yup
      .number()
      .typeError("quantidade obrigatória")
      .positive("proibido valor negativo")
      .nullable(true)
      .required("quantidade obrigatória"),
  });

  useEffect(() => {
    setOrderTotalValue(orderQty * selectedSupplyPrice);
  }, [orderQty, selectedSupplyPrice]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const inputFornecedor = document.querySelector(".inputFornecedor");

  const onSubmitFunction = (data) => {
    const providerFilter = providersAndSuppliesList.filter(
      (ele) => ele.id === data.providerId
    );
    const dataOC = {
      ...data,
      ownerId: 1,
      userId: 1,
      purchasePrice: selectedSupplyPrice,
      totalValue: orderTotalValue,
      supplyData: selectedSupply[0],
      providerData: providerFilter[0],
      status: "Emitido",
    };
    data = "";
    inputFornecedor.value = "";
    handleInputs();

    api
      .post(`/orders`, dataOC, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((ele) => getOrdersList());

    getOrdersList();
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "menuOptions",
    defaultValue: activeDashboardPage,
    onChange: setActiveDashboardPage,
  });

  const handleInputs = () => {
    setSelectedSupply(null);
    setSelectedSupplyPrice(0);
    setSelectedSupplyUnt("Un");
    setOrderQty(0);
    setOrderTotalValue(0);
  };

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
          //   borderWidth="1px"
          borderRadius="md"
          fontWeight="bold"
          fontSize="26px"
          color="white"
          alignItems="center"
          //   boxShadow="md"
          _checked={{
            bg: "#E39774",
            color: "#FFF",
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
    //FULL CONTAINER
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
          backgroundColor={"#2B2D42"}
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
                    fontSize={"26px"}
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
                    Ordens de compra
                  </Tab>
                  <Tab
                    color="#101010"
                    fontWeight={"bold"}
                    fontSize={"26px"}
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
                    Adicionar ordem de compra
                  </Tab>
                </TabList>
                <TabPanels
                  sx={{
                    minWidth: "100%",
                    height: "100%",
                    // maxHeight: "calc(100% - 75px)",
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
                    // backgroundColor={"#feffce"}
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
                    {filteredOrdersList?.map((ele) => (
                      <CardCompras
                        order={ele}
                        getOrdersList={getOrdersList}
                        setOrdersList={setOrdersList}
                        token={token}
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
                        height={"100%"}
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
                        <Heading fontSize={"30px"}>
                          {" "}
                          Criar ordem de compra
                        </Heading>
                        <Select
                          className="inputFornecedor"
                          placeholder="Fornecedores"
                          _placeholder={{ color: "#716C6C" }}
                          borderColor={errors.provider && "#ff0000"}
                          border={errors.provider && "2px"}
                          {...register("providerId")}
                          onChange={(e) => {
                            handleInputs();
                            setSelectedSupply(null);

                            const provider = providersAndSuppliesList.filter(
                              (provider) => provider.id == e.currentTarget.value
                            );

                            provider[0] &&
                              setSupplyByProvider(provider[0].supplies);
                          }}
                        >
                          {providersAndSuppliesList?.map((ele) => (
                            <option value={ele.id}>{ele.fantasyName}</option>
                          ))}
                        </Select>
                        {errors.provider && (
                          <Text color={"#ff0000"} width={"95%"}>
                            {errors.provider.message}
                          </Text>
                        )}
                        <Select
                          placeholder="Insumo"
                          _placeholder={{ color: "#716C6C" }}
                          borderColor={errors.supply && "#ff0000"}
                          border={errors.supply && "2px"}
                          {...register("supplyId")}
                          onChange={(e) => {
                            handleInputs();

                            const selected = supplyByProvider.filter(
                              (ele) => ele.id == e.target.value
                            );

                            setSelectedSupply(selected);
                            setSelectedSupplyPrice(selected[0].purchasePrice);
                            setSelectedSupplyUnt(selected[0].measurementUnit);
                          }}
                          value={
                            (selectedSupply &&
                              selectedSupply[0] &&
                              selectedSupply[0].id &&
                              selectedSupply[0].id) ||
                            ""
                          }
                        >
                          {supplyByProvider?.map((e) => (
                            <option value={+e.id}>{e.name}</option>
                          ))}
                        </Select>
                        {errors.supply && (
                          <Text color={"#ff0000"} width={"95%"}>
                            {errors.supply.message}
                          </Text>
                        )}

                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            color="gray.300"
                            fontSize="1.2em"
                            children="R$"
                          />
                          <Input
                            readOnly
                            placeholder="preço"
                            _placeholder={{ color: "#716C6C" }}
                            type={"number"}
                            borderColor={errors.purchasePrice && "#ff0000"}
                            border={errors.purchasePrice && "2px"}
                            {...register("purchasePrice")}
                            value={selectedSupplyPrice.toFixed(2)}
                          />
                          <InputRightAddon children={selectedSupplyUnt} />
                          <Input
                            placeholder="Qtd."
                            _placeholder={{ color: "#716C6C" }}
                            type={"number"}
                            borderColor={errors.quantity && "#ff0000"}
                            border={errors.quantity && "2px"}
                            {...register("quantity")}
                            onChange={(e) => {
                              setOrderQty(e.target.value);

                              // setOrderTotalValue(orderQty * selectedSupplyPrice);
                            }}
                            value={orderQty}
                          />
                          <InputRightAddon children="Qtd." />
                        </InputGroup>
                        {errors.purchasePrice && (
                          <Text color={"#ff0000"} width={"95%"}>
                            {errors.purchasePrice.message}
                          </Text>
                        )}
                        {errors.quantity && (
                          <Text color={"#ff0000"} width={"95%"}>
                            {errors.quantity.message}
                          </Text>
                        )}
                        <InputGroup>
                          <InputLeftAddon children="Valor da ordem" />
                          <InputLeftElement
                            pointerEvents="none"
                            color="gray.300"
                            fontSize="1.2em"
                            left={"150px"}
                            children="R$"
                          />
                          <Input
                            disabled
                            type={"number"}
                            borderColor={errors.totalValue && "#ff0000"}
                            border={errors.totalValue && "2px"}
                            value={orderTotalValue.toFixed(2)}
                            {...register("totalValue")}
                          />
                        </InputGroup>
                        {errors.totalValue && (
                          <Text color={"#ff0000"} width={"95%"}>
                            {errors.totalValue.message}
                          </Text>
                        )}
                        <Button
                          minHeight={"40px"}
                          colorScheme="blue"
                          onClick={handleSubmit(onSubmitFunction)}
                        >
                          cadastrar ordem de compra
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
    </motion.div>
  );
};

export default ComprasPage;
