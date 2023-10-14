import React from "react";
import Link from "next/link";
import AuthFormInput from "./AuthFormInput";

const LoginForm = () => {
  return (
    <section className="container login-form-container">
      <h1 className=" text-center">Login</h1>
      <form className=" card p-4">
        <div className="form-group">
          <AuthFormInput
            id="email"
            type="email"
            placeholder="email"
            label="Email"
          />
        </div>
        <div className="form-group">
          <AuthFormInput
            id="password"
            type="password"
            placeholder="password"
            label="Password"
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
