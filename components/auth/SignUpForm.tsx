import User from "@/lib/model/User";
import Link from "next/link";
import React, { SyntheticEvent, useRef, useState } from "react";
import AuthFormInput from "./AuthFormInput";
import { useRouter } from "next/navigation";
import SubmitButton from "./SubmitButton";
import ErrorMessage from "../ErrorMessage";

async function createUser(user: User) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
}

const SignUpForm = () => {
  const router = useRouter();
  const emailRef: any = useRef();
  const passwordRef: any = useRef();
  const repeatPasswordRef: any = useRef();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const repeatPassword = repeatPasswordRef.current.value;

    if (password !== repeatPassword) {
      setError("passwords are not equal");
      setLoading(false);
      return;
    }

    const user: User = {
      email: email,
      password: password,
    };

    const response = await createUser(user);
    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "something went wrong!");
      setLoading(false);
      return;
    }
    setLoading(false);
    router.push("/");
  };

  return (
    <section className="c card w-full  space-y-8 bg-neutral p-5">
      {error && <ErrorMessage message={error} />}
      <h1 className=" font-extrabol mt-6 text-center text-3xl text-secondary">
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
          <SubmitButton loading={loading} />
          <Link href={"login"} className="flex w-full justify-center p-2">
            Login with existing account
          </Link>
        </div>
      </form>
    </section>
  );
};

export default SignUpForm;
