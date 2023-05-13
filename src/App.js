// Importing necessary components and hooks from Chakra UI and React
import { useState } from "react";
import { Box, Container, Progress, Button } from "@chakra-ui/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
// Importing child components that make up the form
import ChildBasicInfo from "./Components/ChildBasicInfo";
import AliceNeedHelp from "./Components/AliceNeedHelp";
import TellUsMore from "./Components/TellUsMore";
import AnyOtherInfo from "./Components/AnyOtherInfo";
import SechduleAppoinment from "./Components/SechduleAppoinment";
import SechduleSuccess from "./Components/SechduleSuccess";

function App() {
// Setting up state variables using the useState hook
const [currentStage, setCurrentStage] = useState(1); // Used to track which stage of the form the user is on
const [formData, setFormData] = useState({}); // Used to store form data entered by the user
let progressBarValue = 0;

// Function to handle "Next" button click in child components
const onNext = (data) => {
setCurrentStage(currentStage + 1);
};

// Function to handle "Back" button click
const onBack = () => {
if(currentStage>1){
setCurrentStage(currentStage - 1);
}
};

// Function to render the appropriate child component based on currentStage
const renderStage = () => {
switch (currentStage) {
case 1:
return <ChildBasicInfo onNext={onNext} />;
case 2:
return <AliceNeedHelp onNext={onNext} onBack={onBack} />;
case 3:
return <TellUsMore onNext={onNext} onBack={onBack} />;
case 4:
return <AnyOtherInfo onNext={onNext} onBack={onBack} />;
case 5:
return <SechduleAppoinment onNext={onNext} onBack={onBack} />;
case 6:
return <SechduleSuccess />;
default:
return null;
}
};

// Calculating the progress bar value based on the current stage
if(currentStage<3){
progressBarValue = (currentStage ) * 25;
}
else{
progressBarValue = (currentStage -1 ) * 25;
}

return (
<Box bg="gray.100" minH="100vh">
{/* Navbar with progress bar and back button */}
{currentStage !== 6 && (
<Box bg="white" boxShadow="lg">
<Container maxW="container.lg" py={2} px={4}  alignItems="center">
<Button onClick={onBack} leftIcon={<AiOutlineArrowLeft />} color={"#322659"} bg={"#eee5ff"} mb={2}>Back</Button>
<Progress value={progressBarValue} colorScheme="purple" bg={"#eee5ff"} flex={1} />
</Container>
</Box>
)}

  {/* Render the current stage of the form */}
  <Container maxW="container.lg" py={4}>
     {renderStage()} 
  </Container>
</Box>
);
}

export default App;