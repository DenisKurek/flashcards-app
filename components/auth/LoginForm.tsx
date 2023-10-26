import React, { SyntheticEvent, useRef } from "react";
import Link from "next/link";
import AuthFormInput from "./AuthFormInput";
import { signIn } from "next-auth/react";

const LoginForm = () => {
  const emailRef: any = useRef();
  const passwordRef: any = useRef();

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    signIn("credentials", {
      callbackUrl: "/",
      redirect: true,
      email: email,
      password: password,
    });
  };

  return (
    <section className="card w-full  space-y-8 bg-neutral p-5">
      <h1 className="font-extrabol mt-6 text-center text-3xl text-secondary">
        Login
      </h1>
      <form className="mt-8 space-y-6" onSubmit={submitHandler}>
        <div className="rounded-md shadow-sm">
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
        </div>
        <div className="block">
          <button
            type="submit"
            className="text-md mx-auto flex w-1/3 justify-center rounded-md bg-primary p-4 font-medium"
          >
            Submit
          </button>
          <Link href={"sign-up"} className="flex w-full justify-center p-2">
            Create new account
          </Link>
        </div>
      </form>
    </section>
  );
};

export default LoginForm;
