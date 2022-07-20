import {
  Box,
  Flex,
  Heading,
  Text,
  useRadio,
  useRadioGroup,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useActivePage } from "../../../Providers/DashboardPageController";
import AOS from "aos";
import "aos/dist/aos.css";
import Example from "../../lottie/lottie";
AOS.init();

export const DashboardPage = () => {
  const { activeDashboardPage, setActiveDashboardPage, handleIcons, options } =
    useActivePage();
  const userLogin = JSON.parse(localStorage.getItem("@SolidControl:admin")) || "";

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
              backgroundColor={"#aeaeae4e"}
              boxShadow={"0 0 15px #464646"}
              width={["100%", "100%", "100%", "100%", "90%"]}
              height={["100%", "100%", "100%", "100%", "90%"]}
              marginTop={["20px", "20px", "20px", "20px", "0px"]}
              borderTopRadius={"15px"}
              borderBottomRadius={["0px", "0px", "0px", "0px", "15px"]}
              color={"white"}
            >
              <Flex w="100%" direction={"column"} align="center">
                <Heading mt="40px" variant={"primary"}>
                  Bem vindo, {userLogin.email}!
                </Heading>
                <Flex mt="10px" w="100%" justify={"center"}>
                  <Text
                    p="10px"
                    borderRadius="10px"
                    border="1px solid black"
                    variant="primary"
                    boxShadow="0 0 10px gray"
                    _hover={{ boxShadow: "0 0 10px #101010" }}
                  >
                    Tudo aqui foi feito para você fazer sua gestão de forma
                    simples e descomplicada.
                  </Text>
                </Flex>
                <Box ml="40px" w="38%" maxW="600px">
                  <Example />
                </Box>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </motion.div>
  );
};

export default DashboardPage;
