import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Heading, Input, Select, Stack, Tag, TagLabel} from "@chakra-ui/react";
import { BsCameraVideo } from "react-icons/bs";
import { MdOutlineCall } from "react-icons/md";

function ScheduleAppointment({ onNext }) {


  const [formData, setFormData] = useState({
    appointmentDate: new Date().toISOString().slice(0, 10),
    appointmentTime: "10:30am to 11:00am",
    timeSlot: "10:30am to 10:45am",
    callType: "Video Call",
  });

  const handleChange = (e) => {
    setFormData((data) => ({ ...data, [e.target.name]: e.target.value }));
    
  };

  const handleClick = () => {
    onNext(formData);
    localStorage.setItem("ScheduleAppointment", JSON.stringify(formData));
  };

  const availableTimeSlots = {
    "10:30am to 11:00am": ["10:30am to 10:45am", "10:45am to 11:00am"],
    "11:00am to 11:30am": ["11:00am to 11:15am", "11:15am to 11:30am"],
    "11:30am to 12:00pm": ["11:30am to 11:45am", "11:45am to 12:00pm"],
  };

  const timeSlots = availableTimeSlots[formData.appointmentTime] || [];

  return (
    <Box bg="white" p="4" borderRadius="md" boxShadow="md">
      <Stack spacing="4">
        <Heading as="h2" mb="4" size="md">
          Schedule an appointment
        </Heading>

        <FormControl mb="4">
          <FormLabel>Select date</FormLabel>
          <Input
            type="date"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl mt="4">
          <FormLabel>Select Time</FormLabel>
          <Select
            name="appointmentTime"
            value={formData.appointmentTime}
            onChange={handleChange}
          >
            <option value="10:30am to 11:00am">10:30am to 11:00am</option>
            <option value="11:00am to 11:30am">11:00am to 11:30am</option>
            <option value="11:30am to 12:00pm">11:30am to 12:00pm</option>
          </Select>
        </FormControl>

        <FormControl mt="4">
          <FormLabel>Select Time Slot</FormLabel>
          <Stack direction="row">
            {timeSlots.map((time) => (
              <Tag
                key={time}
                size="lg"
                _hover={{ cursor: "pointer" }}
                mr="4"
                colorScheme={time === formData.timeSlot ? "purple" : "gray"}
                borderRadius="full"
                onClick={() =>
                  handleChange({ target: { name: "timeSlot", value: time } })
                }
              >
                <TagLabel>{time}</TagLabel>
              </Tag>
            ))}
          </Stack>
        </FormControl>

        <FormControl mt="4">
          <FormLabel>Select Call Type</FormLabel>
          <Stack direction="row">
            <Tag
              size="lg"
              colorScheme={
                formData.callType === "Video Call" ? "purple" : "gray"
              }
              borderRadius="full"
              onClick={() =>
                setFormData((data) => ({ ...data, callType: "Video Call" }))
              }
              _hover={{ cursor: "pointer" }}
              mr="4"
            >

              < BsCameraVideo/>
              <TagLabel ml="2">Video Call</TagLabel>
            </Tag>


            <Tag

              size="lg"
              colorScheme={
                formData.callType === "Audio Call" ? "purple" : "gray"
              }
              borderRadius="full"
              onClick={() =>
                setFormData((data) => ({ ...data, callType: "Audio Call" }))
              }
              _hover={{ cursor: "pointer" }}
            >

<MdOutlineCall  />
 

              <TagLabel ml="2">Audio Call</TagLabel>
            </Tag>
          </Stack>
        </FormControl>

        <Button
          bg={"#FED7D7"}
          color={"#822727"}
          size="md"
          mt="8"
          onClick={handleClick}
        >
          Next
        </Button>
      </Stack>
    </Box>
  );
}

export default ScheduleAppointment;
