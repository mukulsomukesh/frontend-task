import { useState } from "react";
import { Box, Button, Heading, Stack, Textarea } from "@chakra-ui/react";

function AnyOtherInfo({ onNext }) {
  // state to hold child's additional information
  const [clildMoreInfo, setclildMoreInfo] = useState(); 

  // function to handle click event on the next button
  const handleClick = () => {
    // save the child's additional information to local storage
    localStorage.setItem("childMoreInformation", JSON.stringify(clildMoreInfo));
    // call the callback function to move to the next step
    onNext(clildMoreInfo);
  };

  // function to handle change event in the text area
  const handleChange = (e) => {
    // update the state with the new value of the text area
    setclildMoreInfo(e.target.value);
  };

  return (
    <Box bg="white" p="4" borderRadius="md" boxShadow="md">
      <Stack spacing="4">
      <Heading as="h2" size="md" mb={4}>Any other information you'd like us to know?</Heading>

      {/* text area for the child's additional information */}
      <Textarea
      mb={4}
        onChange={handleChange}
        placeholder="Mention any medical history, family history, any incident which caused concern, food and sleep routine."
      />

      {/* next button */}
      <Button  bg={"#FED7D7"}  color={"#822727"} size="md" mt="8"  onClick={handleClick}>Next</Button>

      </Stack>
      </Box>
  );
}

export default AnyOtherInfo;
