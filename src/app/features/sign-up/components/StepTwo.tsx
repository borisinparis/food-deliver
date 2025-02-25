"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Link from "next/link";
import { valueSignType } from "../page";
import axios from "axios";
type StepTwoProps = {
  onNextStep: () => void;
  valueSign: valueSignType;
  setValueSign: (value: valueSignType) => void;
};

export const StepTwo = (props: StepTwoProps) => {
  const { onNextStep, valueSign, setValueSign } = props;
  const [loading, setLoading] = useState(false);
  const [valueConfrim, setValueConfirm] = useState({
    type: "password",
    value: "",
  });
  const [errors, setErrors] = useState(false);

  const getData = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/users`);
      console.log(response);
    } catch (err) {
      console.log("data oldsongui");
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueSign({ ...valueSign, password: event.target.value });
  };

  const onChangeConfirm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueConfirm({ ...valueConfrim, value: event.target.value });
  };

  const onSubmit = async () => {
    if (valueSign.password === valueConfrim.value) {
      try {
        setLoading(true);
        const response = await axios.post(`http://localhost:4000/users`, {
          password: valueSign.password,
        });
        console.log(response);

        onNextStep();
      } catch (err) {}
    } else {
      alert("buruu bna tarsangiu");
    }
  };

  const checkPassword = () => {
    if (valueConfrim.type === "password") {
      setValueConfirm({ ...valueConfrim, type: "text" });
      // setValueSign({ ...valueSign, });
    } else {
      setValueConfirm({ ...valueConfrim, type: "password" });
      // setValuePassword({ ...valueSign.password, type: "password" });
    }
  };

  useEffect(() => {
    console.log(valueConfrim);
    console.log(valueSign.password);
  }, [valueConfrim, valueSign.password]);

  useEffect(() => {
    getData();
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
              value={valueSign.password}
              onChange={onChange}
              className="mt-[25px]"
              type={valueConfrim.type}
              placeholder="Password"
            />
            <Input
              value={valueConfrim.value}
              onChange={onChangeConfirm}
              className="mt-[25px]"
              type={valueConfrim.type}
              placeholder="Password"
            />
            <input type="checkbox" onClick={checkPassword} /> show password
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
