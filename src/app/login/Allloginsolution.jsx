"use client";

import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { FaGoogle } from "react-icons/fa";
import { authClient } from "../lib/auth-client";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

const Allloginsolution = () => {

    const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formindata = Object.fromEntries(formData.entries());
    const { password, email } = formindata;

    const { data, error } = await authClient.signIn.email({
      email: email,
      password: password,
      rememberMe: true,
      callbackURL: "/",
    });

    if (data) {
      toast.success("Login successful! Redirecting...", {
        position: "top-center",
        autoClose: 2000,
      });
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
    
    if (error) {
      toast.error(error.message || "Login failed. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      toast.error("Google login failed. Please try again.", {
        position: "top-center",
      });
    }
  };

    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#111f33] to-[#0f1c2e] px-3 sm:px-4 py-6 sm:py-8">
      {/* CARD */}
      <div className="w-full max-w-sm sm:max-w-md bg-[#0f1724] border border-white/10 rounded-xl sm:rounded-2xl shadow-2xl p-5 sm:p-6 md:p-8">
        {/* TITLE */}
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Welcome Back 👋</h1>
          <p className="text-gray-400 text-sm sm:text-base mt-1 sm:mt-2">Login to continue your journey</p>
        </div>

        {/* GOOGLE LOGIN */}
        <Button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-gray-100 mb-4 sm:mb-5 text-sm sm:text-base py-2 sm:py-2.5"
        >
          <FaGoogle className="text-sm sm:text-base" />
          Continue with Google
        </Button>

        {/* DIVIDER */}
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
          <div className="h-px bg-gray-700 flex-1"></div>
          <span className="text-gray-400 text-xs sm:text-sm">OR</span>
          <div className="h-px bg-gray-700 flex-1"></div>
        </div>

        {/* FORM */}
        <Form className="flex flex-col gap-3 sm:gap-4" onSubmit={onSubmit}>
          {/* EMAIL */}
          <TextField isRequired name="email" type="email">
            <Label className="text-gray-300 text-sm sm:text-base">Email</Label>
            <Input
              placeholder="john@example.com"
              className="bg-[#111f33] text-white text-sm sm:text-base"
            />
            <FieldError />
          </TextField>

          {/* PASSWORD */}
          <TextField isRequired minLength={8} name="password" type="password">
            <Label className="text-gray-300 text-sm sm:text-base">Password</Label>
            <Input
              type="password"
              placeholder="Enter your password"
              className="bg-[#111f33] text-white text-sm sm:text-base"
            />
            <Description className="text-gray-500 text-xs sm:text-sm">
              Must be 8+ chars with 1 uppercase & 1 number
            </Description>
            <FieldError />
          </TextField>

          {/* SUBMIT */}
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white text-sm sm:text-base py-2 sm:py-2.5 mt-1 sm:mt-2"
          >
            Login
          </Button>

          {/* REGISTER LINK */}
          <p className="text-center text-gray-400 text-xs sm:text-sm mt-2 sm:mt-3">
            Dont have an account?{" "}
            <Link
              href="/signup"
              className="text-blue-400 hover:text-blue-300 font-medium"
            >
              Create account
            </Link>
          </p>
        </Form> 
      </div>
      <ToastContainer position="top-center" />
    </div>
        </div>
    );
};

export default Allloginsolution;