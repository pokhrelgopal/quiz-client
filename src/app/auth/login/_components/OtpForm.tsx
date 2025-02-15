"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/components/ui/logo";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { OtpFormData, OtpSchema } from "@/schemas/auth";
import FormErrorMessage from "@/components/ui/form-error";
import { Key } from "iconsax-react";
import { verifyUser } from "@/lib/api/requests";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function OtpForm({ email }: { email: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormData>({
    resolver: zodResolver(OtpSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: ({ email, otp }: OtpFormData) => verifyUser(email, otp),
  });

  const onSubmit = async (data: OtpFormData) => {
    mutate(data, {
      onSuccess: () => {
        router.push("/auth/login");
      },
    });
  };

  return (
    <div className="w-sm">
      <div className="flex justify-center mb-5">
        <Logo />
        {email}
      </div>
      <div className="text-center lg:text-left">
        <h2 className="text-3xl font-bold">Enter Code</h2>
        <p className="mb-8">
          We have sent a code to your email. Please enter the code to continue.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <div className="relative">
            <Input
              id="otp"
              type="otp"
              placeholder="Enter 6 digit code"
              className="pl-10"
              errorMessage={errors.otp?.message}
              {...register("otp")}
            />
            <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 stroke-dark" />
          </div>
          <FormErrorMessage message={errors.otp?.message} />
        </div>

        <Button
          size="lg"
          className="w-full text-white"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Verifying..." : "Verify"}
        </Button>

        <p className="text-center text-sm text-gray-500">
          Forget your password?{" "}
          <Link
            href="/panel/forgot-password"
            className="text-[#4F46E5] hover:underline"
          >
            Reset it here
          </Link>
        </p>
      </form>
    </div>
  );
}
