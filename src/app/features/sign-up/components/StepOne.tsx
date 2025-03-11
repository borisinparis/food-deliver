"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { valueSignType } from "../page";
import axios from "axios";
import { toast } from "sonner";

type StepOneProps = {
  onNextStep: () => void;
  valueSign: valueSignType;
  setValueSign: (value: valueSignType) => void;
};

export const StepOne = (props: StepOneProps) => {
  const { onNextStep, valueSign, setValueSign } = props;

  const [errors, setErrors] = useState(true);
  const [loading, setLoading] = useState(false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueSign({ ...valueSign, email: event.target.value });
  };
  useEffect(() => {
    console.log(valueSign.email);
  }, [valueSign.email]);
  const onSubmit = async () => {
    let validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (
      valueSign.email.match(validRegex) &&
      valueSign.email.length >= 6 &&
      valueSign.email.includes(".com") &&
      valueSign.email.includes("gmail")
    ) {
      try {
        onNextStep();
      } catch (err) {}
      setLoading(false);
    } else {
      setLoading(false);
      alert("mail buruu bna");
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
              <Link href={"/features/login"} className="text-[#2563EB]">
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
