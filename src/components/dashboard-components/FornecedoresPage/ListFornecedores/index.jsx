import { AddIcon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  ListItem,
  Text,
  UnorderedList,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useContext } from "react";
import { useProvidersList } from "../../../../Providers/ProvidersList";
import { TokenContext } from "../../../../Providers/Token";
import api from "../../../../services/api";

export const ListProviders = ({ list }) => {
  const { companyName, cnpj, address } = list;
  const { token } = useContext(TokenContext);
  const { setProvidersList } = useProvidersList();
  const toast = useToast();

  const getApi = () => {
    api.get("/providers").then((res) => setProvidersList(res.data));
  };
  const deleteProvider = (id) => {
    api
      .delete(`/providers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        getApi();
        toast({
          description: "Cadastrado com sucesso!",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((err) => {
        toast({
          description: "Ops! Algo deu errado",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
      });
  };
  return (
    <>
      {list && (
        <ListItem
          p="10px"
          listStyleType={"none"}
          w="100%"
          boxShadow="white-lg"
          m="10px"
          rounded={"lg"}
          bg="#ffffff"
        >
          <Flex
            align={"center"}
            direction={["column", "column", "row"]}
            justify={["center", "center", "space-between"]}
            w="100%"
          >
            <Heading
              w={["", "", "230px"]}
              alignSelf="center"
              variant="dashboard"
            >
              {companyName}
            </Heading>
            <Text variant="primary">CNPJ {cnpj}</Text>

            <Popover>
              <PopoverTrigger>
                <Button
                  bg="transparent"
                  color="#101010"
                  _hover={{ background: "#F4BF39" }}
                  _focus={{ border: "none" }}
                  rightIcon={<AddIcon ml="10px" cursor="pointer" />}
                >
                  Endereço{" "}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader color="black">Endereço</PopoverHeader>
                <PopoverBody>
                  <UnorderedList m="0" listStyleType={"none"}>
                    <ListItem>
                      <Text variant="primary">CEP {address.cep}</Text>
                      <Text variant="primary">Rua {address.street}</Text>
                      <Text variant="primary">Número {address.number}</Text>
                      {address.complement.length > 0 && (
                        <Text variant="primary">
                          Complemento {address.complement}
                        </Text>
                      )}
                      <Text variant="primary">Cidade {address.city}</Text>
                      <Text variant="primary">Estado {address.state}</Text>
                    </ListItem>
                  </UnorderedList>
                </PopoverBody>
              </PopoverContent>
            </Popover>
            <Button colorScheme="red" onClick={() => deleteProvider(list.id)}>
              delete
            </Button>
          </Flex>
        </ListItem>
      )}
    </>
  );
};
