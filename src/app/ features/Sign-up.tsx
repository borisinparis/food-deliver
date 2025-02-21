import { useEffect, useState } from "react";
import StepOne from "./components/StepOne";
import { StepTwo } from "./components/StepTwo";
import { StepThird } from "./components/stepThird";

export function SignUp() {
  const [currentStep, setCurrentStep] = useState(0);
  const [valueSign, setValueSign] = useState({ email: "", password: "" });

  const Step = [StepOne, StepTwo, StepThird][currentStep];

  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <div>
      <Step
        valueSign={valueSign}
        setValueSign={setValueSign}
        onNextStep={handleNextStep}
      />
    </div>
  );
}
export default SignUp;
