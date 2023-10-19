import User from "@/lib/model/User";
import Link from "next/link";
import React, { SyntheticEvent, useRef } from "react";
import AuthFormInput from "./AuthFormInput";

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

    createUser(user);
  };

  return (
    <section className="container login-form-container">
      <h1 className=" text-center">Sign Up</h1>
      <form className="card p-4" onSubmit={submitHandler}>
        <div className="form-group">
          <AuthFormInput
            id="email"
            type="email"
            placeholder="email"
            label="Email"
            customRef={emailRef}
          />
        </div>
        <div className="form-group">
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
        <div className="row  d-flex  justify-content-center">
          <button type="submit" className="btn w-25 btn-primary m-2">
            Submit
          </button>
          <Link href={"login"} className=" link-info  text-center m-2">
            Login with existing account
          </Link>
        </div>
      </form>
    </section>
  );
};

export default SignUpForm;
