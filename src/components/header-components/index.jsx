import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Tooltip,
  useDisclosure,
  useRadio,
  useRadioGroup,
  useToast,
  VStack,
  WrapItem,
} from "@chakra-ui/react";
import DEStoq from "../../assets/image/solid_control_dark-removebg-preview.png";
import React, { useContext } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { BsBoxArrowInRight, BsHouse } from "react-icons/bs";
import { useActivePage } from "../../Providers/DashboardPageController";
import { GoSearch } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { DashFilterContext } from "../../Providers/DashboardFilter";

const DashboardHeader = () => {

  const btnRef = React.useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { inputSearch, setInputSearch } = useContext(DashFilterContext);
  const { activeDashboardPage, setActiveDashboardPage, handleIcons, options } =
  useActivePage();
  
  const navigate = useNavigate();

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "menuOptions",
    defaultValue: activeDashboardPage,
    onChange: setActiveDashboardPage,
  });

  const group = getRootProps();

  const toast = useToast();

  const handleLogOut = () => {
    localStorage.clear();
    toast({
      description: "Sessão encerrada!",
      status: "success",
      duration: 1500,
      isClosable: true,
      position: "top",
    });
    navigate("/");
  };

  function RadioCard(props) {
    const { getInputProps, getCheckboxProps } = useRadio(props);

    const input = getInputProps();
    const checkbox = getCheckboxProps();

    return (
      <Box as="label">
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
    <>
      <Flex
        w="100%"
        h="80px"
        backgroundColor={"#2B2D42"}
        alignItems="center"
        justifyContent="center"
        boxShadow={"0 0 5px black"}
      >
        <Flex
          w="95%"
          h="100%"
          alignItems="center"
          justifyContent="space-between"
        >
          <Button
            width="45px"
            h="47px"
            ref={btnRef}
            colorScheme="teal"
            onClick={onOpen}
            backgroundColor={"#2B2D42"}
            display={["flex", "flex", "flex", "flex", "none"]}
          >
            <HamburgerIcon w="45px" h="47px" />
          </Button>
          <Image
            src={DEStoq}
            width={["80px", "80px", "80px", "80px", "80px"]}
            h={["80px", "80px", "80px", "80px", "80px"]}
            alt="DEStoq logo"
          />
          <InputGroup
            size="md"
            width={"90%"}
            maxW={"400px"}
            margin={["0px", "0px", "0px", "0px", "20px 0 0 0"]}
            display={["none", "none", "none", "flex", "flex"]}
          >
            <Input
              pr="4.5rem"
              type={"text"}
              placeholder="digite sua pesquisa"
              _placeholder={{ color: "#716C6C" }}
              backgroundColor={"white"}
              fontWeight={"bold"}
              boxShadow={"0 0 5px grey"}
              _focus={{
                boxShadow: "0 0 10px grey",
              }}
              value={inputSearch}
              onChange={(e) => setInputSearch(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
              >
                <GoSearch />
              </Button>
            </InputRightElement>
          </InputGroup>
          <Flex w={["35%", "35%", "20%", "13%"]} justify="space-around">
            <Button
              backgroundColor={"#2B2D42"}
              display={"inline-block"}
              _hover={{
                backgroundColor: "#E39774",
              }}
            >
              <WrapItem>
              <Tooltip label='Marketplace' fontSize='md' placement='bottom' hasArrow arrowSize={15}>
                <BsHouse fontSize={35} color="white" />
              </Tooltip>
              </WrapItem>
            </Button>
            <Button
              backgroundColor={"#2B2D42"}
              display={"inline-block"}
              _hover={{
                backgroundColor: "#E39774",
              }}
              onClick={() => handleLogOut()}
            >
              <BsBoxArrowInRight fontSize={35} color="white" />
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent backgroundColor={"#2B2D42"}>
          <DrawerCloseButton color="white" />
          <DrawerHeader color="white" fontWeight="bold" fontSize="26px">
            MENU
          </DrawerHeader>

          <DrawerBody>
            <VStack {...group} alignItems="flex-start">
              {options.map((value) => {
                const radio = getRadioProps({ value });
                return (
                  <RadioCard key={value} {...radio}>
                    {handleIcons(value)} {value}
                  </RadioCard>
                );
              })}
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant="primary"
              width={"100%"}
              fontWeight={"bold"}
              fontSize={"22px"}
              backgroundColor={"#2B2D42"}
              color={"#FFF"}
              display={["flex", "flex", "flex", "flex", "none"]}
            >
              Logout <BsBoxArrowInRight />
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DashboardHeader;
