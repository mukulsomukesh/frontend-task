import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  Stack,
  Text,
} from "@chakra-ui/react";
import { childSymptomsType } from "../constant/data";

function TellUsMore({ onNext }) {

  // selectedItems is an array that will contain the names of the selected symptoms
  const [selectedItems, setSelectedItems] = useState([]);

  // This useEffect hook will load the previously stored symptom list from local storage
  useEffect(() => {
    const storedItems = localStorage.getItem("childSymptomsList");
    if (storedItems) {
      setSelectedItems(JSON.parse(storedItems));
    }

  }, []);

  // handleCheckboxChange is a function that will be called when a checkbox is clicked
  const handleCheckboxChange = (e) => {
    const itemName = e.target.name;

    setSelectedItems((prevItems) => {
      // if the clicked item is already in the selectedItems array, remove it
      if (prevItems.includes(itemName)) {
        return prevItems.filter((item) => item !== itemName);
      } 
      // if the clicked item is not in the selectedItems array, add it
      else {
        return [...prevItems, itemName];
      }
    });
    // Store the updated selectedItems array in local storage
    localStorage.setItem("childSymptomsType", JSON.stringify(selectedItems));
  };


  return (
    <Box bg="white" p="4" borderRadius="md" boxShadow="md">
      <Stack >
        <Text fontWeight="bold" fontSize="xl" mb="4">
          Tell Us More
        </Text>
        {/* Filter the childSymptomsType array to show only the selected symptoms */}
        {childSymptomsType
          .filter((item) => selectedItems.includes(item.name))
          .map((item) => (
            <Box key={item.name}>
              <Text fontWeight="bold" mb={2}>
                {item.name}
              </Text>
              <Stack spacing={4}>
                {/* Create a checkbox for each symptom in the selected symptom group */}
                {item.symptoms.map((symptom) => (
                  <Checkbox
                    colorScheme='purple'
                    key={symptom}
                    name={symptom}
                    onChange={handleCheckboxChange}
                    isChecked={selectedItems.includes(symptom)}
                  >
                    {symptom}
                  </Checkbox>
                ))}
              </Stack>
            </Box>
          ))}
        {/* When the Next button is clicked, call the onNext function and pass in the selectedItems array */}
        <Button  bg={"#FED7D7"}  color={"#822727"} size="md" mt="8" onClick={() => onNext(selectedItems)}>
          Next
        </Button>
      </Stack>
    </Box>
  );
}

export default TellUsMore;
