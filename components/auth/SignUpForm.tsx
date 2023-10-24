import User from "@/lib/model/User";
import Link from "next/link";
import React, { SyntheticEvent, useRef } from "react";
import AuthFormInput from "./AuthFormInput";
import { useRouter } from "next/navigation";

async function createUser(user: User) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "something went wrong!");
  }

  return data;
}

const SignUpForm = () => {
  const router = useRouter();
  const emailRef: any = useRef();
  const passwordRef: any = useRef();
  const repeatPasswordRef: any = useRef();

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const repeatPassword = repeatPasswordRef.current.value;

    if (password !== repeatPassword) {
      console.log(`ERROR ${password} is not equal to ${repeatPassword}`);
      return;
    }

    const user: User = {
      email: email,
      password: password,
    };

    const result = await createUser(user);

    router.push("/");
  };

  return (
    <section className="c card w-full  space-y-8 bg-neutral p-5">
      <h1 className=" font-extrabol mt-6 text-center text-3xl text-black">
        Sign Up
      </h1>
      <form className="mt-8 space-y-6" onSubmit={submitHandler}>
        <div className=" rounded-md shadow-sm">
          <AuthFormInput
            id="email"
            type="email"
            placeholder="email"
            label="Email"
            customRef={emailRef}
          />
          <AuthFormInput
            id="password"
            type="password"
            placeholder="password"
            label="Password"
            customRef={passwordRef}
          />
          <AuthFormInput
            id="repeat-password"
            type="password"
            placeholder="Repeat password"
            label="Repeat password"
            customRef={repeatPasswordRef}
          />
        </div>
        <div className="block">
          <button
            type="submit"
            className="text-md mx-auto flex w-1/3 justify-center rounded-md bg-primary p-4 font-medium"
          >
            Submit
          </button>
          <Link href={"login"} className="flex w-full justify-center p-2">
            Login with existing account
          </Link>
        </div>
      </form>
    </section>
  );
};

export default SignUpForm;
