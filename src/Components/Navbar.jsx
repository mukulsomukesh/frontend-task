import { Box, Container, Progress } from "@chakra-ui/react";

function Navbar({ currentStage }) {
  const progressBarValue = (currentStage - 1) * 20;

  return (
    <Box bg="white"  boxShadow="lg">
      <Container maxW="container.lg" py={2} px={4}>
        <Progress value={progressBarValue} colorScheme="blue" />
      </Container>
    </Box>
  );
}

export default Navbar;
