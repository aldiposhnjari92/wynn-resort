import { useState } from "react"
import Container from "./components/Container"
import FormHeader from "./components/FormHeader"
import UserForm from "./components/UserForm"

function App() {
  const [activeStep, setActiveStep] = useState<number>(1);

  return (
    <div className="max-w-[630px] w-full flex flex-col items-center mx-auto my-[60px]">
      <Container>
        <FormHeader title={'Registration'} subTitle={'Please enter below information to create your account.'} steps={3} activeStep={activeStep} />
        <UserForm activeStep={activeStep} handleStepChange={setActiveStep} />
      </Container>
    </div>
  )
}

export default App
