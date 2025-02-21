"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Link from "next/link";

type setValuePass = {
  password: string;
};

export const StepTwo = ({ onNextStep }: { onNextStep: () => void }) => {
  const [valuePassword, setValuePassword] = useState({
    type: "password",
    value: "",
  });
  const [valueConfrim, setValueConfirm] = useState({
    type: "password",
    value: "",
  });
  const [errors, setErrors] = useState(false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValuePassword({ ...valuePassword, value: event.target.value });
  };
  const onChangeConfirm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueConfirm({ ...valueConfrim, value: event.target.value });
  };

  const onSubmit = () => {
    if (valuePassword.value === valueConfrim.value) {
      onNextStep();
      return true;
    } else {
      alert("buruu bna tarsangiu");
    }
  };
  const CheckCheck = () => {
    if (valueConfrim.type === "password") {
      setValueConfirm({ ...valueConfrim, type: "text" });
      setValuePassword({ ...valuePassword, type: "text" });
    } else {
      setValueConfirm({ ...valueConfrim, type: "password" });
      setValuePassword({ ...valuePassword, type: "password" });
    }
  };

  useEffect(() => {
    console.log(valueConfrim);
    console.log(valuePassword);
  }, [valueConfrim, valuePassword]);
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
              value={valuePassword.value}
              onChange={onChange}
              className="mt-[25px]"
              type={valuePassword.type}
              placeholder="Password"
            />
            <Input
              value={valueConfrim.value}
              onChange={onChangeConfirm}
              className="mt-[25px]"
              type={valueConfrim.type}
              placeholder="Password"
            />
            <input type="checkbox" onClick={CheckCheck} /> show password
            {errors && (
              <p className="text-red-700">
                Those password didn't match, Try again
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
