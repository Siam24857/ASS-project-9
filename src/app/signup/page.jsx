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
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
import { useState } from "react";

const Signuppage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const formindata = Object.fromEntries(formData.entries());
    console.log(formindata);
    const { name, image, password, email } = formindata;

    const { data, error } = await authClient.signUp.email({
      name: name,
      email: email,
      password: password,
      image: image || undefined, // Allow empty image URL
      callbackURL: "/login",
    });

    if (data) {
      toast.success("Signup successful! Redirecting to login...", {
        position: "top-center",
        autoClose: 2000,
      });
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
    
    if (error) {
      toast.error(error.message || "Signup failed. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
    
    setIsLoading(false);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#111f33] to-[#0f1c2e] px-4">
      {/* CARD */}
      <div className="w-full max-w-md bg-[#0f1724] border border-white/10 rounded-2xl shadow-2xl p-8">
        {/* TITLE */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white">
            Create Account 🚀
          </h1>
          <p className="text-gray-400 mt-2">
            Sign up to start your study journey
          </p>
        </div>

        {/* GOOGLE SIGNUP */}
        <Button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-gray-100 mb-5"
        >
          <FaGoogle />
          Continue with Google
        </Button>

        {/* DIVIDER */}
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px bg-gray-700 flex-1"></div>
          <span className="text-gray-400 text-sm">OR</span>
          <div className="h-px bg-gray-700 flex-1"></div>
        </div>

        {/* FORM */}
        <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
          {/* NAME */}
          <TextField isRequired name="name" type="text">
            <Label className="text-gray-300">Full Name</Label>
            <Input
              placeholder="John Doe"
              className="bg-[#111f33] text-white"
            />
            <FieldError />
          </TextField>

          {/* EMAIL */}
          <TextField isRequired name="email" type="email">
            <Label className="text-gray-300">Email</Label>
            <Input
              placeholder="john@example.com"
              className="bg-[#111f33] text-white"
            />
            <FieldError />
          </TextField>

          {/* IMAGE URL (Optional) */}
          <TextField name="image" type="text">
            <Label className="text-gray-300">Profile Image URL (Optional)</Label>
            <Input
              placeholder="https://example.com/avatar.jpg"
              className="bg-[#111f33] text-white"
            />
            <Description className="text-gray-500">
              Leave empty to use default avatar
            </Description>
            <FieldError />
          </TextField>

          {/* PASSWORD */}
          <TextField isRequired minLength={8} name="password" type="password">
            <Label className="text-gray-300">Password</Label>
            <Input
              type="password"
              placeholder="Enter your password"
              className="bg-[#111f33] text-white"
            />
            <Description className="text-gray-500">
              Must be at least 8 characters with 1 uppercase & 1 number
            </Description>
            <FieldError />
          </TextField>

          {/* SUBMIT BUTTON */}
          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white"
          >
            Sign Up
          </Button>

          {/* LOGIN LINK */}
          <p className="text-center text-gray-400 text-sm mt-2">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-400 hover:text-blue-300 font-medium"
            >
              Login here
            </Link>
          </p>
        </Form>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Signuppage;