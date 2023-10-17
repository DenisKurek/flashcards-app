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

    const result = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });
  };

  return (
    <section className="container login-form-container">
      <h1 className=" text-center">Login</h1>
      <form className=" card p-4" onSubmit={submitHandler}>
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
        </div>
        <div className="row  d-flex  justify-content-center">
          <button type="submit" className="btn w-25 btn-primary m-2">
            Submit
          </button>
          <Link href={"sign-up"} className=" link-info  text-center m-2">
            Create new account
          </Link>
        </div>
      </form>
    </section>
  );
};

export default LoginForm;
