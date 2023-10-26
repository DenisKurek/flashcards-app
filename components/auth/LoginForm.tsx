import React, { SyntheticEvent, useRef, useState } from "react";
import Link from "next/link";
import AuthFormInput from "./AuthFormInput";
import { signIn } from "next-auth/react";
import ErrorMessage from "../ErrorMessage";
import { useRouter } from "next/navigation";
import SubmitButton from "./SubmitButton";

const LoginForm = () => {
  const emailRef: any = useRef();
  const passwordRef: any = useRef();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const response = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });

    if (response?.ok) {
      router.replace("/");
    }
    if (response?.error) setError(response.error);
    setLoading(false);
  };

  return (
    <section className="card w-full space-y-8 bg-neutral p-5">
      {error && <ErrorMessage message={error} />}
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
          <SubmitButton loading={loading} />
          <Link href={"sign-up"} className="flex w-full justify-center p-2">
            Create new account
          </Link>
        </div>
      </form>
    </section>
  );
};

export default LoginForm;
