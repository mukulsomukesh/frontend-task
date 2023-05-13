import { useState } from "react";
import { Box,Text,Heading, Button, FormControl, FormLabel, Input, Radio, Stack, RadioGroup, Flex, Select, HStack,} from "@chakra-ui/react";

const countryCodes = [
  {
    name: "United States",
    code: "US",
    dialerCode: 1,
  },
  {
    name: "China",
    code: "CN",
    dialerCode: 86,
  },
  {
    name: "India",
    code: "IN",
    dialerCode: 91,
  },
  {
    name: "Brazil",
    code: "BR",
    dialerCode: 55,
  },
  {
    name: "Russia",
    code: "RU",
    dialerCode: 7,
  },
];

// Define a functional component called ChildBasicInfo that takes a prop called onNext
function ChildBasicInfo({ onNext }) {
  // Set up state for the form data and errors using the useState hook
  const [formState, setFormState] = useState({
    name: "",
    dateOfBirth: "",
    childBornPrematurely: "No",
    bornInWeek: 0,
    weight: "",
    weightUnit: "kg",
    height: "",
    heightUnit: "cm",
    emailAddress: "",
    phoneNumber: "",
    countryCode: "1",
  });
  const [errors, setErrors] = useState({});

  // Define a function to handle changes to the form inputs
  const handleInputChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  // Define a function to handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the validate function to check for errors in the form data
    const errors = validate(formState);
    // If there are errors, set the state for errors
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } 
    // Otherwise, save the form data to local storage and call the onNext function
    else {
      localStorage.setItem("childInformation", JSON.stringify(formState));
      onNext();
    }
  };

  // Define functions to validate the form inputs
 const isNameValid = (name) => {
  const regex = /^[a-zA-Z ]{3,20}$/;
  return regex.test(name.trim());
};

  const isDOBValid = (dob) => {
    const today = new Date();
    const selectedDate = new Date(dob);
    const maxDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    return selectedDate <= maxDate;
  };
  const isEmailValid = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };
  const isPhoneValid = (phone) => {
    const regex = /^\d{10}$/;
    return regex.test(phone);
  };

  // Define a function to validate the form data and return an object with any errors
  const validate = (formState) => {
    const errors = {};
    // Check if the name is valid and add an error message to the errors object if not
    if (!isNameValid(formState.name)) {
      errors.name = "Please enter a valid name.";
    }
    // Check if the date of birth is valid and add an error message to the errors object if not
    if (!isDOBValid(formState.dateOfBirth)) {
      errors.dateOfBirth = "Please select a valid date of birth.";
    }
    // If the child was born prematurely, check if the gestational age is valid and add an error message if not
    if (formState.childBornPrematurely === "Yes") {
      const bornInWeek = parseInt(formState.bornInWeek);
      if (isNaN(bornInWeek) || bornInWeek < 20 || bornInWeek > 36) {
        errors.bornInWeek = "Please enter a number between 20 and 36.";
      }
    }
    // If there is an email address, check if it is valid and add an error message if not
    if (formState.emailAddress && !isEmailValid(formState.emailAddress)) {
      errors.emailAddress = "Please enter a valid email address.";
    }

    // If there is a phone number, check if it is valid and add an error message if not
    if (formState.phoneNumber && !isPhoneValid(formState.phoneNumber)) {
      errors.phoneNumber = "Please enter a valid phone number.";
    }

    return errors;
  };

  return (
    <Box bg="white" p="4" borderRadius="md" boxShadow="md">
      <Stack >
      <Heading  mt={2} as="h4" size="md">
        Get your questions answered by our consultants from the comfort of your
        home.
      </Heading>

      <form onSubmit={handleSubmit}>
        <Flex mt={4} justify="space-between" gap={"4"} flexDirection={{ base: "column", md: "row" }}>
          <FormControl w={{ base: "100%", md: "48%" }} isRequired>
            <FormLabel>Child's Name</FormLabel>
            <Input name="name" onChange={handleInputChange} />
            {errors.name && (
              <Text fontSize="xs" color="red">
                {errors.name}
              </Text>
            )}
          </FormControl>

          <FormControl w={{ base: "100%", md: "48%" }} isRequired>
            <FormLabel>Child date of birth</FormLabel>
            <Input
              type="date"
              name="dateOfBirth"
              onChange={handleInputChange}
            />
            {errors.dateOfBirth && (
              <Text fontSize="xs" color="red">
                {errors.dateOfBirth}
              </Text>
            )}
          </FormControl>
        </Flex>

        <FormControl isRequired mt={4} display={"flex"} gap={{base:"0", md:"5"}} flexDirection={{ base: "column", md: "row" }}>
          <FormLabel>Was the child born prematurely?</FormLabel>
          <RadioGroup
            name="childBornPrematurely"
            value={formState.childBornPrematurely}
            onClick={handleInputChange}
          >
            <HStack spacing={4} mt={"1"}>
              <Radio value="No">No</Radio>
              <Radio value="Yes">Yes</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>

        {formState.childBornPrematurely === "Yes" && (
          <FormControl mt={2}>
            <FormLabel>Born In Weeks</FormLabel>
            <Input
              type="number"
              name="bornInWeek"
              value={formState.bornInWeek}
              onChange={handleInputChange}
            />
            {errors.bornInWeek && (
              <Text fontSize="xs" color="red">
                {errors.bornInWeek}
              </Text>
            )}
          </FormControl>
        )}

        <Flex mt={4} justify="space-between" flexDirection={{ base: "column", md: "row" }}>
          <FormControl w={{ base: "100%", md: "48%" }}>
            <FormLabel>Child's Weight</FormLabel>
            <HStack spacing={2} >
              <Input type="number" name="weight" onChange={handleInputChange} />
              <Select
                w={"8rem"}
                name="weightUnit"
                value={formState.weightUnit}
                onChange={handleInputChange}
              >
                <option value="kg">kg</option>
                <option value="gm">gm</option>
              </Select>
            </HStack>
          </FormControl>

          <FormControl w={{ base: "100%", md: "48%" }}>
            <FormLabel>Child's height</FormLabel>
            <HStack spacing={2}>
              <Input type="number" name="height" onChange={handleInputChange} />
              <Select
                w={"8rem"}
                name="heightUnit"
                value={formState.heightUnit}
                onChange={handleInputChange}
              >
                <option value="cm">cm</option>
                <option value="feet">feet</option>
              </Select>
            </HStack>
          </FormControl>
        </Flex>

        <FormControl mt={4} isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input
            type="email"
            name="emailAddress"
            onChange={handleInputChange}
          />
          {errors.emailAddress && (
            <Text fontSize="xs" color="red">
              {errors.emailAddress}
            </Text>
          )}
        </FormControl>

        <FormControl mt={4} isRequired>
          <FormLabel>Phone Number</FormLabel>
          <Flex align="center">
            <Select
              w="10rem"
              name="countryCode"
              value={formState.countryCode}
              onChange={handleInputChange}
            >
              {countryCodes.map(({ dialerCode, flagUrl }) => (
                <option key={dialerCode} value={dialerCode}>
                  {"+ " + dialerCode}
                </option>
              ))}
            </Select>
            <Input name="phoneNumber" onChange={handleInputChange} />
          </Flex>
          {errors.phoneNumber && (
            <Text fontSize="xs" color="red">
              {errors.phoneNumber}
            </Text>
          )}
        </FormControl>
        {/* input data varifify error message */}

        <Button type="submit" w={"100%"} bg={"#FED7D7"}  color={"#822727"} size="md" mt="5" >
          Next
        </Button>
      </form>

      </Stack>
    </Box>
  );
}

export default ChildBasicInfo;
