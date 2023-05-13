import { Box, Button, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react"; 
import success from "../media/success.png" 
import { BsCalendarCheck } from "react-icons/bs"; 
import { HiOutlineLink } from "react-icons/hi";
import { FiPhoneCall } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { BiTimeFive } from "react-icons/bi";
import { useEffect, useState } from "react"; 

function SechduleSuccess() {

  // Initializing state using the useState hook
  const [data, setData] = useState({}) 

  useEffect(()=>{
    // Getting data from local storage and updating state using the useEffect hook
    setData(JSON.parse(localStorage.getItem('ScheduleAppointment'))); 
  },[]) 
// The useEffect hook runs only once, when the component mounts

  return (
    <>
        <Box bg="white" p="4" borderRadius="md" boxShadow="md"> 
      <Stack spacing="4">

      <Heading as="h2" size="lg" mb={4}> 
        Appointment scheduled!
      </Heading>

<Box>
<Image h={"20rem"} w={"20rem"} m={"auto"} src={success} /> 
</Box>

<Box border={"2px"} borderColor={"#FED7D7"} borderRadius={"lg"} p={"4"} > 

<Flex gap={"4"} alignItems={"center"}  > <BsCalendarCheck color={"#822727"} /> <Text> We'll send you a confirmation email with all the details shortly. </Text> </Flex> 
<Flex gap={"4"} alignItems={"center"}  > <BiTimeFive color={"#822727"} /> <Text> From {data.timeSlot}</Text>  <Text ml={"-2"} color={"gray"}>(~15 mins). </Text> </Flex> 
<Flex gap={"4"} alignItems={"center"}  > <FaRegUser color={"#822727"} /> <Text> Consultant will be our care counsellor. </Text> </Flex> 
<Flex gap={"4"} alignItems={"center"}  > <FiPhoneCall color={"#822727"} /> <Text> Consultant will be an {data.callType}. </Text> </Flex> 
<Flex gap={"4"} alignItems={"center"}  > <HiOutlineLink color={"#822727"} /> <Text> Link sent on your email and whatsapp. </Text> </Flex> 


</Box>
  
      <Button  bg={"#FED7D7"}  color={"#822727"} size="md" mt="8"  onClick={()=>{   localStorage.clear();  window.location.reload() }}>Restart</Button> 
      </Stack>
      </Box>
    </>
  );
}

export default SechduleSuccess;
