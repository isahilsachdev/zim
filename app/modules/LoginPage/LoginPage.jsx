"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import styles from "./LoginPage.module.scss";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useRouter } from "next/navigation";
import showToast from "@/app/utils/notifications/toast";
import { getGoogleLoginUrl } from "@/app/utils/URLs";
import OnboardingFormLayout from "@/app/components/OnboardingFormLayout/OnboardingFormLayout";
import Typography from "@/app/design-systems/Typography/Typography";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [id]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      const formattedErrors = {};
      result.error.errors.forEach((error) => {
        formattedErrors[error.path[0]] = error.message;
      });
      setErrors(formattedErrors);
      return;
    }

    try {
      setIsLoading(true);
      // Replace the below line with your login API call
      // const resp = await loginUser(formData.email, formData.password);
      router.push("/dashboard");
    } catch (error) {
      setIsLoading(false);
      const errorMessage =
        error.response?.data?.message || "Invalid email or password!";
      showToast("error", errorMessage);
    }
  };

  const handleLoginWithSSO = async () => {
    const loginUrl = getGoogleLoginUrl();
    const width = 500;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const popup = window.open(
      loginUrl,
      "Google Login",
      `width=${width},height=${height},top=${top}`
    );

    const interval = setInterval(() => {
      if (popup.closed) {
        clearInterval(interval);
        // Handle SSO login callback
      }
    }, 500);
  };

  const isFormValid = formData.email && formData.password;

  return (
    <OnboardingFormLayout>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.formHeading}>
          <Typography textType="h4" text="Login to your Gym account" align="left" />
        </div>
        <div className={styles.formMiddleContainer}>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              aria-invalid={!!errors.email}
              aria-describedby="email-error"
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-600">
                {errors.email}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              aria-invalid={!!errors.password}
              aria-describedby="password-error"
            />
            {errors.password && (
              <p id="password-error" className="mt-1 text-sm text-red-600">
                {errors.password}
              </p>
            )}
          </div>
          <div>
            <Button
              type="submit"
              variant="secondary"
              isLoading={isLoading}
              disabled={!isFormValid}
            >
              Login
            </Button>
          </div>
        </div>
        <div className={styles.formFooter}>
          <div className={styles.cursor}>
            <Typography
              textType="small-regular"
              text="Don't have an account?"
            />
            <div onClick={() => router.push("/signup")}>
              <Typography textType="small-regular" text="Sign up" />
            </div>
          </div>
        </div>
      </form>
    </OnboardingFormLayout>
  );
};

export default LoginPage;
