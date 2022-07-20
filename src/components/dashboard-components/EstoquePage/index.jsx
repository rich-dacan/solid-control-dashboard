import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  UnorderedList,
  useRadio,
  useRadioGroup,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useContext, useState, useEffect } from "react";
import { useActivePage } from "../../../Providers/DashboardPageController";
import { useStockList } from "../../../Providers/Stock";
import { StockList } from "./StockList";
import { DashFilterContext } from "../../../Providers/DashboardFilter";

export const EstoquePage = () => {
  const [minValue, setMinValue] = useState(
    JSON.parse(localStorage.getItem("@DEStoq:minStock")) || { min: 0 }
  );
  const { activeDashboardPage, setActiveDashboardPage, handleIcons, options } =
    useActivePage();
  const { stockList, getListStock } = useStockList();
  const { inputSearch } = useContext(DashFilterContext);

  const filteredStockList = stockList.filter(
    (item) =>
      item.supplyData.name.toLowerCase().includes(inputSearch.toLowerCase()) ||
      item.supplyData.category
        .toLowerCase()
        .includes(inputSearch.toLowerCase()) ||
      item.providerData.companyName
        .toLowerCase()
        .includes(inputSearch.toLowerCase()) ||
      item.providerData.fantasyName
        .toLowerCase()
        .includes(inputSearch.toLowerCase())
  );
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "menuOptions",
    defaultValue: activeDashboardPage,
    onChange: setActiveDashboardPage,
  });

  useEffect(() => {
    getListStock();
  }, []);

  const group = getRootProps();
  const formSchema = yup.object().shape({
    min: yup
      .number("deve ser um número")
      .nullable(true)
      .typeError("campo obrigatório")
      .required("campo obrigatório")
      .positive("deve ser um número positivo"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });
  const handleSubmitForm = (data) => {
    localStorage.setItem("@DEStoq:minStock", JSON.stringify(data)) ||
      setMinValue(data);
  };

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
          fontSize="26px"
          color="white"
          alignItems="center"
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
              height={["100%", "100%", "100%", "100%", "95%"]}
              marginTop={["20px", "20px", "20px", "20px", "0px"]}
              borderTopRadius={"15px"}
              borderBottomRadius={["0px", "0px", "0px", "0px", "15px"]}
              color={"white"}
            >
              <Tabs w="100%">
                <TabList>
                  <Tab
                    color="#101010"
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
                    w="100%"
                  >
                    <Heading variant={"dashboard"} color="##F4BF39">
                      Estoque mínimo
                    </Heading>
                  </Tab>
                  <Tab
                    color="#101010"
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
                    w="100%"
                  >
                    <Heading variant={"dashboard"} color="##F4BF39">
                      Estoque
                    </Heading>
                  </Tab>
                </TabList>
                <TabPanels>
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
                    <UnorderedList m="0">
                      {filteredStockList?.map((stockItem) => (
                        <StockList key={stockItem.id} list={stockItem} />
                      ))}
                    </UnorderedList>
                  </TabPanel>
                  <TabPanel>
                    <Flex
                      mr="10px"
                      mb="15px"
                      direction="column"
                      justify={"center"}
                      align="flex-end"
                    >
                      <Flex justify={"flex-start"}>
                        <FormLabel color="#101010">
                          Definir estoque mínimo
                        </FormLabel>
                        {errors.min && (
                          <Text color="red.500">{errors.min.message}</Text>
                        )}
                      </Flex>

                      <form onSubmit={handleSubmit(handleSubmitForm)}>
                        <FormControl>
                          <Input
                            borderColor={" #101010"}
                            color="#101010"
                            type="number"
                            maxW="120px"
                            placeholder="qtd. mínima"
                            _placeholder={{ color: "#716C6C" }}
                            errorBorderColor={errors.min && "red.300"}
                            {...register("min")}
                          />
                          <Button type="submit" ml="10px" colorScheme={"green"}>
                            alterar
                          </Button>
                        </FormControl>
                      </form>
                    </Flex>

                    <UnorderedList
                      width={"100%"}
                      height={"90%"}
                      maxH={"70vh"}
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
                      m="0"
                    >
                      {stockList?.map((stockItem) => (
                        <StockList
                          key={stockItem.id}
                          list={stockItem}
                          min={minValue.min}
                        />
                      ))}
                    </UnorderedList>
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

export default EstoquePage;
