import React from "react";
import {
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

export const CardTable = () => {
  return (
    <>
      <Flex
        w={"100%"}
        height={"100%"}
        justifyContent={"space-around"}
        flexWrap={"wrap"}
      >
        <TableContainer>
          <Table
            borderRadius={"10px"}
            border={"solid 1px #ccc"}
            variant={"striped"}
            size="lg"
            colorScheme={"facebook"}
          >
            <Thead>
              <Tr>
                <Th bg={"#14213d"} color={"#ccc"}>
                  Tipo
                </Th>
                <Th bg={"#14213d"} color={"#ccc"}>
                  Prazo
                </Th>
                <Th bg={"#14213d"} color={"#ccc"} isNumeric>
                  Valor
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td color={"#111"}>Vendas</Td>
                <Td color={"#111"}>Mensal</Td>
                <Td color={"#111"} isNumeric>
                  R$ 33.320,00
                </Td>
              </Tr>
              <Tr>
                <Td color={"#101010"}>Compras</Td>
                <Td color={"#101010"}>Mensal</Td>
                <Td color={"#101010"} isNumeric>
                  R$ -12.210,50
                </Td>
              </Tr>
              <Tr>
                <Td color={"#111"}>Gastos</Td>
                <Td color={"#111"}>Mensal</Td>
                <Td color={"#111"} isNumeric>
                  R$ -5.250,00
                </Td>
              </Tr>
              <Tr>
                <Td color={"#101010"}>À pagar</Td>
                <Td color={"#101010"}>Semanal</Td>
                <Td color={"#101010"} isNumeric>
                  R$ -2.350,00
                </Td>
              </Tr>
              <Tr>
                <Td fontWeight={"800"} color={"#101010"}>
                  Saldo
                </Td>
                <Td color={"#101010"}>-</Td>
                <Td fontWeight={"800"} color={"#101010"} isNumeric>
                  R$ 13.509,50
                </Td>
              </Tr>
            </Tbody>
            <Thead>
              <Tr>
                <Th bg={"#14213d"} color={"#ccc"}>
                  Estoque
                </Th>
                <Th bg={"#14213d"} color={"#ccc"}>
                  Quantidade
                </Th>
                <Th bg={"#14213d"} color={"#ccc"} isNumeric>
                  Valor
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td color={"#111"}>Cervejas</Td>
                <Td color={"#111"}>20 cx</Td>
                <Td color={"#111"} isNumeric>
                  R$ 2.500,00
                </Td>
              </Tr>
              <Tr>
                <Td color={"#101010"}>Refrigerantes</Td>
                <Td color={"#101010"}>180 Latas</Td>
                <Td color={"#101010"} isNumeric>
                  R$ 810,50
                </Td>
              </Tr>
              <Tr>
                <Td color={"#111"}>Laticínios</Td>
                <Td color={"#111"}>22 cx</Td>
                <Td color={"#111"} isNumeric>
                  R$ 3.120,00
                </Td>
              </Tr>
              <Tr>
                <Td color={"#101010"}>Panificadora</Td>
                <Td color={"#101010"}>250cx</Td>
                <Td color={"#101010"} isNumeric>
                  R$ 1.125,00
                </Td>
              </Tr>
              <Tr>
                <Td fontWeight={"800"} color={"#101010"}>
                  Total
                </Td>
                <Td color={"#101010"}>-</Td>
                <Td fontWeight={"800"} color={"#101010"} isNumeric>
                  R$ 7.555,00
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </>
  );
};
