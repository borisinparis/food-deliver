"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
type setValueSigntype = {
  email: string;
};

type valueSignType = {
  email: string;
};

export const StepOne = ({
  onNextStep,
  valueSign,
  setValueSign,
}: {
  onNextStep: () => void;
  valueSign: valueSignType;
  setValueSign: (value: setValueSigntype) => void;
}) => {
  // const [valueLogin, setValueLogin] = useState("");

  const [errors, setErrors] = useState(true);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueSign({ email: event.target.value });
    let validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (valueSign.email.match(validRegex)) {
      return setErrors(true);
    }
  };
  useEffect(() => {
    console.log(valueSign.email);
  }, [valueSign.email]);
  const onSubmit = () => {
    let validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    setErrors(false);
    if (
      valueSign.email.match(validRegex) &&
      valueSign.email.length >= 6 &&
      valueSign.email.includes(".com") &&
      valueSign.email.includes("gmail")
    ) {
      //   alert("valid email");
      onNextStep();
    } else {
      setErrors(false);
      alert("no email");
      return setErrors(false);
    }
  };
  useEffect(() => {
    setErrors(true);
  }, []);

  return (
    <>
      <div className="m-0 p-0 w-screen h-screen  box-border">
        <div className="flex justify-center gap-[20px] w-full h-full items-center ">
          <div className="w-[416px] h-[376px]">
            <h2 className="text-[25px]">Create your account</h2>
            <p className="mt-[6px] text-base text-gray-400">
              Sign up to explore your favorite dishes.
            </p>
            <Input
              value={valueSign.email}
              onChange={onChange}
              className="mt-[25px]"
              type="email"
              placeholder="Enter your email address"
            />
            {errors && (
              <p className=" mt-[25px] text-red-700">
                Invalid email. Use a format like example@email.com
              </p>
            )}
            {errors ? (
              <Button
                onClick={onSubmit}
                className=" mt-[20px] w-full"
                variant="secondary"
              >
                Let's Go
              </Button>
            ) : (
              <Button onClick={onSubmit} className="mt-[20px] w-full">
                Button
              </Button>
            )}

            <div className="flex mt-[20px] justify-center gap-[10px]">
              <p className="text-base">Already have an account?</p>
              <Link href={"#"} className="text-[#2563EB]">
                Log in
              </Link>
            </div>
          </div>
          <div className="w-[856] h-[904px]">
            <img src="deliverFood.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};
export default StepOne;
