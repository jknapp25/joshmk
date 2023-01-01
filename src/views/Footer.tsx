import { useContext } from "react";
import { Container, Heading, HStack, Text, VStack } from "@chakra-ui/react";

import { ConfigContext } from "../App";

interface Config {
  fullName?: string;
  tagline?: string;
  emailAddress?: string;
  phoneNumber?: string;
}

export const Footer = () => {
  const config: Config = useContext(ConfigContext);
  return (
    <Container py={10} maxW="container.md">
      <VStack spacing={5} align="start">
        <HStack w="full" align="stretch" spacing={14}>
          <VStack spacing={5} align="start" w="60%">
            <Heading size="md">{config.fullName}</Heading>
            <Text fontSize="lg">{config.tagline}</Text>
          </VStack>
          <VStack spacing={5} w="40%" align="start">
            <Heading size="sm">Contact</Heading>
            <Text>{config.emailAddress}</Text>
            <Text>{config.phoneNumber}</Text>
          </VStack>
        </HStack>
        <Text>All rights reserved © {config.fullName} 2023</Text>
      </VStack>
    </Container>
  );
};
