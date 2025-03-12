"use client";
import { useState } from "react";
import StepOne from "./components/StepOne";
import { StepTwo } from "./components/StepTwo";

export type valueSignType = {
  password: string;
  email: string;
};

export function SignUp() {
  const [currentStep, setCurrentStep] = useState(0);
  const [valueSign, setValueSign] = useState<valueSignType>({
    email: "",
    password: "",
  });

  const Step = [StepOne, StepTwo][currentStep];

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
