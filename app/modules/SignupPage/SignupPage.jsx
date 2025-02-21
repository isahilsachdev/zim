"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import styles from "./SignupPage.module.scss";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useRouter } from "next/navigation";
// import { registerWithSSO, registerUser } from "@/app/utils/apiCalls/onboarding";
import showToast from "@/app/utils/notifications/toast";
import { getGoogleLoginUrl } from "@/app/utils/URLs";
import OnboardingFormLayout from "@/app/components/OnboardingFormLayout/OnboardingFormLayout";
import Typography from "@/app/design-systems/Typography/Typography";

const signupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const SignupPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSSOLoading, setIsSSOLoading] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    setErrors(prev => ({
      ...prev,
      [id]: ""
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = signupSchema.safeParse(formData);

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
      // const resp = await registerUser(formData.email, formData.password);
      router.push("/onboarding/basic-details");
      localStorage.setItem("userEmail", formData.email);
    } catch (error) {
      setIsLoading(false);
      const errorMessage = error.response?.data?.message || "Something went wrong!";
      showToast("error", errorMessage);
    }
  };

  function handleSignIn() {
    router.push("login");
  }

  const verifyCodeFromParams = async (code) => {
    setIsSSOLoading(true);
    try {
      // const resp = await registerWithSSO(code, 'google');
      // localStorage.setItem("shuum-token", resp.data.token);
      // setIsSSOLoading(false);
      router.push("/onboarding/knowyou");
    } catch (error) {
      setIsSSOLoading(false);
      showToast('error', error.response.data.message);
    }
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  useEffect(() => {
    const handleOAuthResponse = (event) => {
      if (event.origin !== window.location.origin) return;

      const { code, error } = event.data;
      if (code) {
        verifyCodeFromParams(code);
      } else if (error) {
        showToast('error', `SSO signup failed: ${error}`);
      }
    };

    window.addEventListener('message', handleOAuthResponse);

    return () => {
      window.removeEventListener('message', handleOAuthResponse);
    };
  }, []);

  const handleSignupWithSSO = async () => {
    setIsSSOLoading(true);
    const loginUrl = getGoogleLoginUrl();

    const width = 500;
    const height = 600;
    const left = (window.screen.width / 2) - (width / 2);
    const top = (window.screen.height / 2) - (height / 2);

    const popup = window.open(
      loginUrl,
      'Google Login',
      `width=${width},height=${height},top=${top},left=${left},toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=no,copyhistory=no`
    );

    const interval = setInterval(() => {
      if (popup.closed) {
        clearInterval(interval);
      }
    }, 500);
  };

  const isFormValid = formData.email && formData.password && formData.confirmPassword;

  return (
    <OnboardingFormLayout>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.formHeading}>
          <Typography textType="h4" text="Register your Gym for free" align='left' />
        </div>
        <div className={styles.formMiddleContainer}>
          <div>
            <Label htmlFor="email">Work email</Label>
            <Input
              type="email"
              id="email"
              placeholder=""
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
              placeholder=""
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
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              type="password"
              id="confirmPassword"
              placeholder=""
              value={formData.confirmPassword}
              onChange={handleInputChange}
              aria-invalid={!!errors.confirmPassword}
              aria-describedby="confirm-password-error"
            />
            {errors.confirmPassword && (
              <p id="confirm-password-error" className="mt-1 text-sm text-red-600">
                {errors.confirmPassword}
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
              Create account
            </Button>
          </div>
        </div>
        <div className={styles.formFooter}>
          <div className={styles.cursor}>
            <div>
              <Typography
                textType="small-regular"
                text="Already have an account?"
              />
            </div>
            <div onClick={handleSignIn}>
              <Typography textType="small-regular" text="Sign in" />
            </div>
          </div>
        </div>
      </form>
    </OnboardingFormLayout>
  );
};

export default SignupPage;