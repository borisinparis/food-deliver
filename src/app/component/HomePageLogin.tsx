"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
type searchValue = string;

// const [error, setErrors] = useState({});
const [valueInput, setValueInput] = useState([]);
const [valueLogin, setValueLogin] = useState<searchValue>("");
const onChange = (event) => {
  setValueLogin(event.target.value);
};
useEffect(() => {}, []);

export const HomePageLogin = () => {
  return (
    <>
      <div className="m-0 p-0 w-screen h-screen  box-border">
        <div className="flex justify-center gap-[20px] w-full h-full items-center ">
          <div className="w-[416px] h-[376px]">
            <h3>Log in</h3>
            <p className="mt-[6px] text-base text-gray-400">
              Log in to enjoy your favorite dishes.
            </p>
            <Input
              //   value={valueLogin}
              onChange={onChange}
              className="mt-[25px]"
              type="email"
              placeholder="Email"
            />
            {/* <div className="text-red-700">{error}</div> */}
            <Input
              //   value={valueLogin}
              onChange={onChange}
              className="mt-[20px]"
              type="password"
              placeholder="Password"
            />
            <div className=" mt-[10px] text-[14px] underline cursor-pointer">
              forgot password ?
            </div>
            <Button className="w-full" variant="secondary">
              Let's Go
            </Button>
            <div className="flex justify-center gap-[10px]">
              <p className="text-base">Dont't Have an account?</p>
              <Link href={"#"} className="text-[#2563EB]">
                Sign in
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
export default HomePageLogin;
