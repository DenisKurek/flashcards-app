import Link from "next/link";
import React from "react";
import AuthFormInput from "./AuthFormInput";

const SignUpForm = () => {
  return (
    <section className="container login-form-container">
      <h1 className=" text-center">Sign Up</h1>
      <form className="card p-4">
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
          <AuthFormInput
            id="repeat-password"
            type="password"
            placeholder="Repeat password"
            label="Repeat password"
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
