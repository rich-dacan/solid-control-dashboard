import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  UnorderedList,
  useRadio,
  useRadioGroup,
  VStack,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { GoSearch } from "react-icons/go";
import { motion } from "framer-motion";
import { DashFilterContext } from "../../../Providers/DashboardFilter";

import { useActivePage } from "../../../Providers/DashboardPageController";
import { useProvidersList } from "../../../Providers/ProvidersList";
import { FormProviders } from "./FormFornecedor";
import { ListProviders } from "./ListFornecedores";

export const FornecedoresPage = () => {
  const { activeDashboardPage, setActiveDashboardPage, handleIcons, options } =
    useActivePage();

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "menuOptions",
    defaultValue: activeDashboardPage,
    onChange: setActiveDashboardPage,
  });
  const { providersList } = useProvidersList();
  const group = getRootProps();

  const { inputSearch } = useContext(DashFilterContext);

  const filteredProvidersList = providersList.filter((item) =>
    item.companyName.toLowerCase().includes(inputSearch.toLowerCase())
  );

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
                colorScheme={"white"}
                color="black"
                w="100%"
                borderColor="black"
              >
                <TabList>
                  <Tab
                    _selected={{
                      color: "#FFFF",
                      background: "#14213d",
                      borderBottomColor: "#14213d",
                      borderBottomWidth: "2px",
                    }}
                    _focus={{
                      color: "#FFFF",
                      borderColor: "",
                      borderTopLeftRadius: "18px",
                      borderTopRightRadius: "18px",
                      border: "2px solid #14213d",
                    }}
                    w="100%"
                  >
                    <Heading
                      variant={"dashboard"}
                      fontSize={["20", "20", "20", "24"]}
                      color="##F4BF39"
                    >
                      Listar Fornecedores
                    </Heading>
                  </Tab>
                  <Tab
                    _selected={{
                      borderBottomColor: "#14213d",
                      background: "#14213d",
                      borderBottomWidth: "2px",
                    }}
                    _focus={{
                      color: "#FFFF",
                      borderColor: "#14213d",
                      borderTopLeftRadius: "18px",
                      borderTopRightRadius: "18px",
                      border: "2px",
                    }}
                    w="100%"
                  >
                    <Heading
                      variant={"dashboard"}
                      fontSize={["20", "20", "20", "24"]}
                      color="##F4BF39"
                    >
                      Cadastrar Fornecedor
                    </Heading>
                  </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <UnorderedList m="10">
                      {filteredProvidersList?.map((list) => (
                        <ListProviders key={list.id} list={list} />
                      ))}
                    </UnorderedList>
                  </TabPanel>
                  <TabPanel display={"flex"} justifyContent="center">
                    <Flex
                      bg="#ffff"
                      justify="center"
                      align="center"
                      maxWidth="340px"
                      borderRadius={"20px"}
                    >
                      <FormProviders />
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
export default FornecedoresPage;
