import {
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  useRadio,
  useRadioGroup,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { GoSearch } from "react-icons/go";
import { useActivePage } from "../../../Providers/DashboardPageController";
import { useUser } from "../../../Providers/Users";
import AOS from "aos";
import "aos/dist/aos.css";
import Example from "../../lottie/lottie";
import { MapPage } from "./MapsComponent";
import { useEffect, useState } from "react";
import api from "../../../services/api";
AOS.init();

export const EntregasPage = () => {
  const { activeDashboardPage, setActiveDashboardPage, handleIcons, options } =
    useActivePage();
  const [ticketsList, setTicketsList] = useState([]);

  useEffect(() => {
    api.get("/tickets").then((res) => {
      setTicketsList(res.data);
    });
  }, []);

  const { userLogin } = useUser();

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
            <MapPage ticketsList={ticketsList} />
          </Flex>
        </Flex>
      </Flex>
    </motion.div>
  );
};

export default EntregasPage;
