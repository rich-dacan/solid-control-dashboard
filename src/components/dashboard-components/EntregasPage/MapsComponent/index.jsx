import {
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
  DirectionsService,
} from "@react-google-maps/api";
import { useEffect } from "react";
import { useState } from "react";

export const MapPage = ({ ticketsList }) => {
  const deliveryList = ticketsList.filter(
    (ele) => ele.status === "Pronto entrega"
  );

  console.log(deliveryList);

  const arrayDelivery = deliveryList.map((ele) => ({
    location: `${ele.clientInfo.addressInfo.address}, ${ele.clientInfo.addressInfo.number}, ${ele.clientInfo.addressInfo.city}`,
    stopover: true,
  }));

  console.log(arrayDelivery);

  const { isLoaded } = useJsApiLoader({
    // id: "google-map-script",
    googleMapsApiKey: "AIzaSyBI_YF6Rs6l6uDAaWXt6PIrU602GxVAk7w",
  });

  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);

  const [showMenu, setShowMenu] = useState(true);

  //   console.log(distance);
  //   console.log(duration);
  console.log(directionsResponse);

  if (!isLoaded) {
    return <SkeletonText width={"300px"} height={"300px"} />;
  }

  const center = { lat: -25.436711733148506, lng: -49.30843817585168 };

  const calculateRoute = async () => {
    //eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: center,
      destination: center,
      //eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
      waypoints: arrayDelivery,
      optimizeWaypoints: true,
      drivingOptions: {
        departureTime: new Date(),
        trafficModel: "pessimistic",
      },
    });
    setDirectionsResponse(results);

    // const time =
    // console.log(time);
    setDuration(
      results?.routes[0].legs.reduce((acc, leg) => acc + leg.duration.value, 0)
    );

    // const totalDistance =
    setDistance(
      results?.routes[0].legs.reduce((acc, leg) => acc + leg.distance.value, 0)
    );
  };

  const clearRoute = () => {
    setDirectionsResponse(null);
    setDistance(0);
    setDuration(0);
  };

  return (
    <Flex backgroundColor={"#ccc"} width={"100%"} height={"100%"}>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={center}
          zoom={15}
          options={{
            zoomControl: true,
            streetViewControl: true,
            mapTypeControl: false,
            fullscreenControl: true,
          }}
        >
          <Marker position={center} />

          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
          <Flex
            backgroundColor={"#fff"}
            width={"100%"}
            maxWidth={"600px"}
            height={"150px"}
            borderRadius={"10px"}
            boxShadow={"0 0 10px #575757"}
            zIndex={"5"}
            position={"absolute"}
            top={"20px"}
            transform={"translate(-50%, 0)"}
            left={"50%"}
            flexDir={"column"}
          >
            <Flex
              width={"100%"}
              padding={"10px"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Heading fontSize={"18px"}>
                Pedidos aguardando entrega:{" "}
                <Text
                  fontSize={"22px"}
                  color={"#ff0000"}
                  display={"inline-block"}
                  ml={"5px"}
                >
                  {deliveryList.length}
                </Text>
              </Heading>
              <Flex width={"fit-content"} padding={"0"}>
                <Button
                  colorScheme={"blue"}
                  size={"sm"}
                  onClick={calculateRoute}
                  ml={"5px"}
                >
                  Gerar Roteiro
                </Button>
                <Button
                  colorScheme={"blue"}
                  size={"sm"}
                  onClick={clearRoute}
                  ml={"5px"}
                >
                  Limpar Roteiro
                </Button>
              </Flex>
            </Flex>
            <Flex
              width={"100%"}
              height={"100%"}
              padding={"10px"}
              justifyContent={"space-around"}
              alignItems={"center"}
            >
              <Flex
                width={"45%"}
                height={"60px"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <InputGroup
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Text width={"100%"} fontSize={"22px"} fontWeight={"bold"}>
                    Tempo total:{" "}
                  </Text>
                  <Input
                    width={"100px"}
                    type="number"
                    value={duration && Math.round(duration / 60)}
                  />
                  <InputRightAddon children="min" />
                </InputGroup>
              </Flex>
              <Flex
                width={"45%"}
                height={"60px"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <InputGroup
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Text width={"100%"} fontSize={"22px"} fontWeight={"bold"}>
                    Distancia:{" "}
                  </Text>
                  <Input
                    type="number"
                    width={"150px"}
                    value={distance && (distance / 1000).toFixed(2)}
                  />
                  <InputRightAddon children="Km" />
                </InputGroup>
              </Flex>
            </Flex>
          </Flex>
        </GoogleMap>
      ) : (
        <></>
      )}
    </Flex>
  );
};
