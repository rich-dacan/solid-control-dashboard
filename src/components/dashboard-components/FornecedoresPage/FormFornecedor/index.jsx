import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Flex,
  FormControl,
  Text,
  FormLabel,
  Input,
  useToast,
  Select,
} from "@chakra-ui/react";
import api from "../../../../services/api";
import { motion } from "framer-motion";
import { useProvidersList } from "../../../../Providers/ProvidersList";
import { useContext } from "react";
import { TokenContext } from "../../../../Providers/Token";
const states = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];
export const FormProviders = () => {
  const toast = useToast();
  const { setProvidersList } = useProvidersList();
  const { token } = useContext(TokenContext);

  const getApi = () => {
    api.get("/providers").then((res) => setProvidersList(res.data));
  };

  const handleSubmitForm = (data) => {
    const {
      companyName,
      fantasyName,
      cnpj,
      ie,
      cep,
      street,
      number,
      complement,
      district,
      city,
      state,
    } = data;

    const provider = {
      userId: 1,
      ownerId: 1,
      companyName,
      fantasyName,
      cnpj,
      ie,
      address: {
        cep,
        street,
        number,
        complement,
        district,
        city,
        state,
      },
    };

    api
      .post("/providers", provider, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        getApi();
        toast({
          description: "cadastrado com sucesso",
          status: "success",
          duration: 2500,
          isClosable: true,
          position: "top",
        });
      })
      .catch((err) => {
        toast({
          description: "Ops! Algo deu errado",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      });
  };

  const formSchema = yup.object().shape({
    companyName: yup.string().required("campo obrigatório"),
    fantasyName: yup.string().required("campo obrigatório"),
    cnpj: yup
      .string()
      .required("campo obrigatório")
      .min(14, "CNPJ inválido")
      .max(14, "CNPJ inválido"),
    ie: yup
      .string()
      .required("campo obrigatório")
      .min(9, "I.E inválida")
      .max(9, "I.E inválida"),
    cep: yup
      .string()
      .required("campo obrigatório")
      .min(8, "CEP inválido")
      .max(8, "CEP inválido"),
    street: yup.string().required("campo obrigatório"),
    number: yup.string().required("campo obrigatório"),
    complement: yup.string(),
    district: yup.string().required("campo obrigatório"),
    city: yup.string().required("campo obrigatório"),
    state: yup.string().required("campo obrigatório"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <Flex direction="column">
          <FormControl
            p="10px"
            sx={{
              label: {
                margin: "0px",
                color: "#101010",
              },
              input: {
                height: "29px",
                color: "#101010",
                border: "1px solid #101010",
              },
            }}
          >
            <Flex>
              <FormLabel>Nome da empresa</FormLabel>
              {errors.companyName && (
                <Text ml="5px" color="red.500">
                  {errors.companyName.message}
                </Text>
              )}
            </Flex>
            <Input
              type="text"
              {...register("companyName")}
              placeholder="digite o nome da empresa"
              _placeholder={{ color: "#716C6C" }}
              borderColor={errors.companyName && "#ff0000"}
              variant="outline"
            />

            <Flex>
              <FormLabel>Nome fantasia</FormLabel>
              {errors.fantasyName && (
                <Text ml="5px" color="red.500">
                  {errors.fantasyName.message}
                </Text>
              )}
            </Flex>
            <Input
              type="text"
              {...register("fantasyName")}
              placeholder="digite o nome fantasia"
              _placeholder={{ color: "#716C6C" }}
              borderColor={errors.fantasyName && "#ff0000"}
              variant="outline"
            />

            <Flex>
              <FormLabel>CNPJ</FormLabel>
              {errors.cnpj && (
                <Text ml="5px" color="red.500">
                  {errors.cnpj.message}
                </Text>
              )}
            </Flex>
            <Input
              type="number"
              {...register("cnpj")}
              placeholder="digite o CNPJ"
              _placeholder={{ color: "#716C6C" }}
              borderColor={errors.cnpj && "#ff0000"}
              variant="outline"
            />

            <Flex>
              <FormLabel>I.E</FormLabel>
              {errors.ie && (
                <Text ml="5px" color="red.500">
                  {errors.ie.message}
                </Text>
              )}
            </Flex>
            <Input
              type="number"
              {...register("ie")}
              placeholder="digite a Inscrição Estadual"
              _placeholder={{ color: "#716C6C" }}
              borderColor={errors.number && "#ff0000"}
              variant="outline"
            />

            <Flex>
              <FormLabel>CEP</FormLabel>
              {errors.cep && (
                <Text ml="5px" color="red.500">
                  {errors.cep.message}
                </Text>
              )}
            </Flex>
            <Input
              type="number"
              {...register("cep")}
              placeholder="digite o CEP"
              _placeholder={{ color: "#716C6C" }}
              borderColor={errors.cep && "#ff0000"}
              variant="outline"
            />

            <Flex>
              <FormLabel>Rua</FormLabel>
              {errors.street && (
                <Text ml="5px" color="red.500">
                  {errors.street.message}
                </Text>
              )}
            </Flex>
            <Input
              type="text"
              {...register("street")}
              placeholder="digite a rua"
              _placeholder={{ color: "#716C6C" }}
              borderColor={errors.street && "#ff0000"}
              variant="outline"
            />

            <Flex>
              <FormLabel>Número</FormLabel>
              {errors.number && (
                <Text ml="5px" color="red.500">
                  {errors.number.message}
                </Text>
              )}
            </Flex>
            <Input
              type="number"
              {...register("number")}
              placeholder="digite o número"
              _placeholder={{ color: "#716C6C" }}
              border="1px"
              borderColor={errors.number && "#ff0000"}
              variant="outline"
            />

            <Flex>
              <FormLabel>Complemento</FormLabel>
              {errors.complement && (
                <Text ml="5px" color="red.500">
                  {errors.complement.message}
                </Text>
              )}
            </Flex>
            <Input
              type="text"
              {...register("complement")}
              placeholder="digite o complemento se houver"
              _placeholder={{ color: "#716C6C" }}
              borderColor={errors.complement && "#ff0000"}
              variant="outline"
            />

            <Flex>
              <FormLabel>Bairro</FormLabel>
              {errors.district && (
                <Text ml="5px" color="red.500">
                  {errors.district.message}
                </Text>
              )}
            </Flex>
            <Input
              type="text"
              {...register("district")}
              placeholder="digite o bairro"
              _placeholder={{ color: "#716C6C" }}
              borderColor={errors.district && "#ff0000"}
              variant="outline"
            />

            <Flex justify="space-between">
              <Flex direction="column">
                <Flex>
                  <FormLabel>Cidade</FormLabel>
                  {errors.city && (
                    <Text ml="5px" color="red.500">
                      {errors.city.message}
                    </Text>
                  )}
                </Flex>
                <Input
                  type="text"
                  {...register("city")}
                  placeholder="digite a cidade"
                  _placeholder={{ color: "#716C6C" }}
                  borderColor={errors.city && "red.500"}
                  variant="outline"
                />
              </Flex>

              <Flex direction="column">
                <Flex ml="5px">
                  <FormLabel>Estado</FormLabel>
                </Flex>
                <Select
                  ml="5px"
                  w="120px"
                  {...register("state")}
                  placeholder="Estados"
                  _placeholder={{ color: "#716C6C" }}
                  borderColor={errors.state ? "#ff0000" : "#101010"}
                  h="28px"
                  color="#101010"
                >
                  {states.map((state, index) => (
                    <option
                      style={{ color: "black" }}
                      key={index}
                      value={state}
                    >
                      {state}
                    </option>
                  ))}
                </Select>
              </Flex>
            </Flex>
          </FormControl>
          <Button alignSelf="center" type="submit" variant="primary">
            cadastrar
          </Button>
        </Flex>
      </form>
    </motion.div>
  );
};
