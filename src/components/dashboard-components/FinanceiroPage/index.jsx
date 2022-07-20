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
  useRadio,
  useRadioGroup,
  VStack,
} from "@chakra-ui/react";

import { motion } from "framer-motion";
import { GoSearch } from "react-icons/go";
import { useActivePage } from "../../../Providers/DashboardPageController";
import { CardChart } from "./Graficos";
import { CardTable } from "./Tabelas";

export const FinanceiroPage = () => {
  const { activeDashboardPage, setActiveDashboardPage, handleIcons, options } =
    useActivePage();

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
              height={["100%", "100%", "100%", "100%", "90%"]}
              marginTop={["20px", "20px", "20px", "20px", "0px"]}
              borderTopRadius={"15px"}
              borderBottomRadius={["0px", "0px", "0px", "0px", "15px"]}
              color={"white"}
              m={"20px"}
              justifyContent={"space-around"}
              flexWrap={"wrap"}
            >
              <Tabs
                isFitted
                variant="enclosed"
                w={"100%"}
                borderRadius={"20px"}
              >
                <TabList mb="1em">
                  <Tab
                    color={"#101010"}
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
                    Gráficos
                  </Tab>
                  <Tab
                    color={"#101010"}
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
                    Resumo
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
                    // height={"100%"}
                    maxH={"70vh"}
                    display={"flex"}
                    flexDir={"column"}
                    // justifyContent={"center"}
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
                    <CardChart />
                  </TabPanel>
                  <TabPanel
                    width={"90%"}
                    height={"80%"}
                    maxH={"80vh"}
                    display={"flex"}
                    flexDir={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
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
                    <CardTable />
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
export default FinanceiroPage;
