import { useEffect, useState } from "react";
import StepOne from "./components/StepOne";
import { StepTwo } from "./components/StepTwo";
import { StepThird } from "./components/stepThird";

export type valueSignType = {
  password: string;
  email: string;
};

export function SignUp() {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [valueSign, setValueSign] = useState<valueSignType>({
    email: "",
    password: "",
  });

  const Step = [StepThird, StepOne, StepTwo, StepThird][currentStep];

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
