"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { userSchema } from "@/utils/loginValidation";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

type LoginInfoTypes = {
  email: string;
  password: string;
};
type ErrorType = {
  error: string;
};

export const Login = () => {
  const { push } = useRouter();
  const [getDatas, setGetDatas] = useState([]);
  const [showStepOne, setShowStepOne] = useState(false);

  const [valueSign, setValueSign] = useState({
    email: "",
    password: "",
  });

  const handleSignUpClick = () => {
    setShowStepOne(true);
    push("/features/sign-up");
  };

  // const handleClick = () => {
  //   toast.success("This is a success message!");
  //   toast.error("This is an error message!");
  // };

  const handleSubmit = async (values: LoginInfoTypes) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/users/login`,
        values
      );

      console.log(response.data.user.role);
      if (response.data.user.role == "ADMIN") {
        push("/features/admin");
      } else if (response.data.user.role == "USER") {
        push("/features/homePage");
      }
    } catch (error) {
      toast.error(`error:${error.response?.data?.message || error.message} `);
    }
  };

  return (
    <>
      <div className="m-0 p-0 w-screen h-screen box-border">
        <div className="flex justify-center gap-[20px] w-full h-full items-center">
          <div className="w-[416px] h-[376px]">
            <h2 className="text-[25px]">Log in</h2>
            <p className="mt-[6px] text-base text-gray-400">
              Log in to enjoy your favorite dishes.
            </p>

            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={userSchema}
              onSubmit={handleSubmit}
            >
              {({ values, handleChange, handleBlur }) => (
                <Form>
                  <div className="mt-[25px]">
                    <Field
                      name="email"
                      type="email"
                      as={Input}
                      placeholder="Enter your email address"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-700 mt-1"
                    />
                  </div>

                  <div className="mt-[25px]">
                    <Field
                      name="password"
                      type="password"
                      as={Input}
                      placeholder="Password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-700 mt-1"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="mt-[20px] border-none w-full"
                    variant="secondary"
                  >
                    Let's Go
                  </Button>
                </Form>
              )}
            </Formik>

            <div className="flex mt-[20px] justify-center gap-[10px]">
              <p className="text-base">Don’t have an account?</p>
              <button onClick={handleSignUpClick} className="text-[#2563EB]">
                Sign up
              </button>
            </div>
          </div>

          <div className="w-[856px] h-[904px]">
            <img src="deliverFood.png" alt="Food delivery illustration" />
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
