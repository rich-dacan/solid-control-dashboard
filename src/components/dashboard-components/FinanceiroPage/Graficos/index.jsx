import {
  Box,
  Flex,
  Heading,
  Stack,
} from "@chakra-ui/react";
import { Bar, CartesianGrid, ComposedChart, Legend, Line, LineChart, Text, Tooltip, XAxis, YAxis } from "recharts";
import { motion } from "framer-motion";

export const CardChart = () => {

  const primeiroTrimestre = [
    {name: 'Jan', uv: 100, pv: 2400, amt: 2400},
    {name: 'Fev', uv: 200, pv: 2400, amt: 2400},
    {name: 'Mar', uv: 350, pv: 2400, amt: 2400},

  ];
  const faturamento  = [
    {name: 'Abr', uv: 180, pv: 2400, amt: 2400},
    {name: 'Mai', uv: 200, pv: 2400, amt: 2400},
    {name: 'Jun', uv: 350, pv: 2400, amt: 2400},

  ];
  const mensal = [
    {name: 'Sem 1', semana: 100, pv: 2400, amt: 2400},
    {name: 'Sem 2', semana: 200, pv: 2400, amt: 2400},
    {name: 'Sem 3', semana: 220, pv: 2400, amt: 2400},
    {name: 'Sem 4', semana: 350, pv: 2400, amt: 2400},

  ];
  const mensal2 = [
    {name: 'Sem 1', semana: 90, pv: 2400, amt: 2400},
    {name: 'Sem 2', semana: 150, pv: 2400, amt: 2400},
    {name: 'Sem 3', semana: 80, pv: 2400, amt: 2400},
    {name: 'Sem 4', semana: 350, pv: 2400, amt: 2400},

  ];
  const data = [
    {
      name: 'Janeiro',
      mês: 590,
      pv: 800,
      amt: 1400,
    },
    {
      name: 'Fevereiro',
      mês: 868,
      pv: 967,
      amt: 1506,
    },
    {
      name: 'Março',
      mês: 1397,
      pv: 1098,
      amt: 989,
    },
    {
      name: 'Abril',
      mês: 1480,
      pv: 1200,
      amt: 1228,
    },
    {
      name: 'Maio',
      mês: 1520,
      pv: 1108,
      amt: 1100,
    },
    {
      name: 'Junho',
      mês: 1400,
      pv: 680,
      amt: 1700,
    },
  ];

  return (
    <>
      <Flex
        w={"100%"}
        height={"100%"}
        justifyContent={"space-around"}
        flexWrap={"wrap"}
      >
        <Stack
          spacing={3}
          width="100%"
          maxWidth={"95%"}
          height={"100%"}
          display="flex"
          flexDir={"row"}
          alignItems="center"
          flexWrap={"wrap"}
          padding={"0 30px"}
          borderRadius={"10px"}
        >
          <Heading mt={"30px"} color={"#434343"} textAlign={"center"} width={"100%"}> Resultado Mensal </Heading>
          <Flex width={"100%"} justify={"space-around"} flexWrap={"wrap"}>
            <ComposedChart
              width={350}
              height={350}
              data={mensal}
              margin={{
                top: 30,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid stroke="#434343" />
              <XAxis stroke="#434343" dataKey="name" scale="band" />
              <YAxis stroke="#434343" />
              <Tooltip/>
              <Legend/>
              <Bar dataKey="semana" barSize={20} fill="#14213d" />
              <Line type="monotone" dataKey="semana" stroke="#b81919" />
            </ComposedChart> 
            <ComposedChart
              width={350}
              height={350}
              data={mensal2}
              margin={{
                top: 30,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid stroke="#434343" />
              <XAxis stroke="#434343" dataKey="name" scale="band" />
              <YAxis stroke="#434343" />
              <Tooltip/>
              <Legend/>
              <Bar dataKey="semana" barSize={20} fill="#14213d" />
              <Line type="monotone" dataKey="semana" stroke="#b81919" />
            </ComposedChart> 
          </Flex>
          <Heading color={"#434343"} textAlign={"center"} width={"100%"}> Resultado Trimestral </Heading>
          <Flex width={"100%"} justify={"space-around"} flexWrap={"wrap"}>
            <ComposedChart
              width={350}
              height={350}
              data={primeiroTrimestre}
              margin={{
                top: 30,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid stroke="#434343" />
              <XAxis stroke="#434343" dataKey="name" scale="band" />
              <YAxis stroke="#434343" />
              <Tooltip/>
              <Legend/>
              <Bar dataKey="uv" barSize={20} fill="#14213d" />
              <Line type="monotone" dataKey="uv" stroke="#b81919" />
            </ComposedChart> 
            <ComposedChart
              width={350}
              height={350}
              data={faturamento}
              margin={{
                top: 30,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid stroke="#434343" />
              <XAxis stroke="#434343" dataKey="name" scale="band" />
              <YAxis stroke="#434343" />
              <Tooltip/>
              <Legend/>
              <Bar dataKey="uv" barSize={20} fill="#14213d" />
              <Line type="monotone" dataKey="uv" stroke="#b81919" />
            </ComposedChart>                        
          </Flex>
          <Heading color={"#434343"} textAlign={"center"} width={"100%"}> Resultado Anual </Heading>
          <Flex width={"100%"} justify={"space-around"} flexWrap={"wrap"}>
            <ComposedChart
              width={350}
              height={350}
              data={data}
              margin={{
                top: 30,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid stroke="#434343" />
              <XAxis stroke="#434343" dataKey="name" scale="band" />
              <YAxis stroke="#434343" />
              <Tooltip/>
              <Legend/>
              <Bar dataKey="mês" barSize={20} fill="#14213d" />
              <Line type="monotone" dataKey="mês" stroke="#b81919" />
            </ComposedChart> 
            <ComposedChart
              width={350}
              height={350}
              data={data}
              margin={{
                top: 30,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid stroke="#434343" />
              <XAxis stroke="#434343" dataKey="name" scale="band" />
              <YAxis stroke="#434343" />
              <Tooltip/>
              <Legend/>
              <Bar dataKey="mês" barSize={20} fill="#14213d" />
              <Line type="monotone" dataKey="mês" stroke="#b81919" />
            </ComposedChart>    
          </Flex>
        </Stack>
      </Flex>
    </>
  );
};