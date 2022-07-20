import { AddIcon } from "@chakra-ui/icons";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Tooltip,
  Badge,
  Flex,
  Heading,
  ListItem,
  Text,
  Stack,
} from "@chakra-ui/react";

export const StockList = ({ list, min }) => {
  const valueStock = list.totalValue;

  return (
    <>
      <ListItem
        border={"3px solid"}
        background="#ffff"
        borderColor={list.quantity <= min ? "red.500" : null}
        listStyleType="none"
        p="10px"
        m="10px"
        borderRadius={"10px"}
      >
        <Flex
          direction={["column", "column", "row"]}
          align={["center"]}
          justify="space-between"
        >
          <Tooltip label={list.supplyData.name}>
            <Heading
              maxW="18ch"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowarp"
              textAlign={["center", "", ""]}
              w={["100%", "330px", "3   00px"]}
              variant="dashboard"
            >
              {" "}
              {list.supplyData.name}
            </Heading>
          </Tooltip>

          <Text w={["", "", "220px"]} variant="bold">
            Fornecedor {list.providerData.companyName}
          </Text>
          <Flex direction="column" align={["center"]} justify="center">
            <Text variant="bold">categoria:</Text>
            <Badge alignSelf="center" variant="solid" colorScheme="purple">
              {list.supplyData.category}
            </Badge>
          </Flex>
          <Popover>
            <PopoverTrigger>
              <Stack spacing={10}>
                <Button m="10px" colorScheme={"green"}>
                  mostrar <AddIcon margin="10px" />
                </Button>
              </Stack>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader color="#101010">
                informações financeiras
              </PopoverHeader>
              <PopoverBody>
                <Flex direction="column" align={["center"]}>
                  <Text variant="bold">Quantidade:</Text>
                  <Flex>
                    <Badge
                      alignSelf="center"
                      variant="solid"
                      colorScheme="purple"
                    >
                      {" "}
                      {list.quantity}
                    </Badge>
                    <Badge
                      alignSelf="center"
                      variant="solid"
                      colorScheme="purple"
                      ml="5px"
                    >
                      {list.supplyData.measurementUnit}
                    </Badge>
                  </Flex>
                </Flex>
                <Flex direction="column" align={["center"]}>
                  <Text variant="bold">Valor da compra:</Text>
                  <Badge
                    alignSelf="center"
                    variant="solid"
                    colorScheme="purple"
                  >
                    {list.supplyData.purchasePrice.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                      minimumFractionDigits: 2,
                    })}
                  </Badge>
                </Flex>
                <Flex direction="column" align={["center"]}>
                  <Text variant="bold">Valor do estoque:</Text>
                  <Badge
                    alignSelf="center"
                    variant="solid"
                    colorScheme="purple"
                  >
                    {valueStock.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                      minimumFractionDigits: 2,
                    })}
                  </Badge>
                </Flex>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Flex>
      </ListItem>
    </>
  );
};
