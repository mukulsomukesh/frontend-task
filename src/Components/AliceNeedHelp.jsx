import { useEffect, useState } from "react";
import { Box, Button, Flex, Stack,  Text} from "@chakra-ui/react";
import { childSymptomsList } from "../constant/data";

function AliceNeedHelp({ onNext }) {

  // State to store selected items
  const [selectedItems, setSelectedItems] = useState([]);

  // Effect hook to retrieve saved items from localStorage on component mount
  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("childSymptomsList"));
    if (savedItems) {
      setSelectedItems(savedItems);
    }
  }, []);

  // Handler function to toggle selected state of item
  const handleItemClick = (item) => {
    setSelectedItems((prevItems) => {
      if (prevItems.includes(item)) {
        return prevItems.filter((prevItem) => prevItem !== item);
      } else {
        return [...prevItems, item];
      }
    });
    console.log(selectedItems.length) // Debugging line to print number of selected items
  };

  // Handler function to save selected items to localStorage and proceed to next step
  const handleSubmit = (e) => {
    e.preventDefault();
    
    localStorage.setItem("childSymptomsList", JSON.stringify(selectedItems));
    onNext();
    
  };

  // Helper function to check if item is selected
  const isSelected = (item) => selectedItems.includes(item);

  return (
    <Box bg="white" p="4" borderRadius="md" boxShadow="md">
      <Stack spacing="4">
        {childSymptomsList.map((el) => {
          const Icon = el.icon;
          return (
            <Flex
              boxShadow="base"
              key={el.id}
              align={"center"}
              cursor={"pointer"}
              gap="4"
              p={4}
              borderRadius={"0.7rem"}
              bg={isSelected(el.name) ? "#eee5ff" : "white"}
              color={isSelected(el.name) ? "#322659" : "black"}
              onClick={() => handleItemClick(el.name)}
            >
              <Icon
                color={isSelected(el.name) ? "#322659" : "#1bc5bd"}
                size={"2rem"}
              />
              <Box>
                <Text as="b">{el.name}</Text>
                <Text>{el.info}</Text>
              </Box>
            </Flex>
          );
        })}
        <form onSubmit={handleSubmit}>
          {/* Add other form fields here */}
          
          {/* Button to proceed to next step */}
          <Button
            isDisabled={selectedItems.length==0} 
            bg={"#FED7D7"}
            color={"#822727"}
            size="md"
            w="100%"
            mt={"2"}
            type="submit"
          >
            Next
          </Button>
        </form>
      </Stack>
    </Box>
  );
}

export default AliceNeedHelp;
