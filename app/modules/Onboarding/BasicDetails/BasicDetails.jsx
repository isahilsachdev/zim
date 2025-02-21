"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import styles from "./BasicDetails.module.scss";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useRouter } from "next/navigation";
import showToast from "@/app/utils/notifications/toast";
import OnboardingFormLayout from "@/app/components/OnboardingFormLayout/OnboardingFormLayout";
import Typography from "@/app/design-systems/Typography/Typography";
import FileInput from "@/app/components/FileInput/FileInput";

const basicDetailsSchema = z.object({
  gymName: z.string().min(3, "Gym name must be at least 3 characters"),
  logo: z.instanceof(File).optional(),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Phone number must only contain digits"),
});

const BasicDetails = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    gymName: "",
    logo: null,
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { id, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: files ? files[0] : value,
    }));
    setErrors((prev) => ({
      ...prev,
      [id]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = basicDetailsSchema.safeParse(formData);
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
      // Send formData to the backend for processing
      // const response = await submitBasicDetails(formData);
      router.push("/onboarding/next-step"); // Adjust path for the next onboarding step
    } catch (error) {
      setIsLoading(false);
      showToast("error", "Failed to save details. Please try again.");
    }
  };

  console.log('first', formData)
  return (
    <OnboardingFormLayout>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.formHeading}>
          <Typography textType="h4" text="Tell us about your Gym" align="left" />
        </div>
        <div className={styles.formMiddleContainer}>
          <div>
            <Label htmlFor="gymName">Gym Name</Label>
            <Input
              type="text"
              id="gymName"
              value={formData.gymName}
              onChange={handleInputChange}
              aria-invalid={!!errors.gymName}
              aria-describedby="gymName-error"
            />
            {errors.gymName && (
              <p id="gymName-error" className="mt-1 text-sm text-red-600">
                {errors.gymName}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="logo">Logo/Image</Label>
            <FileInput
              selectedImg={formData.logo}
              onChange={(selectedLogo) => setFormData((prev) => ({
                ...prev,
                logo: selectedLogo
              }))}/>
            {errors.logo && (
              <p id="logo-error" className="mt-1 text-sm text-red-600">
                {errors.logo}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              type="tel"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              aria-invalid={!!errors.phoneNumber}
              aria-describedby="phoneNumber-error"
            />
            {errors.phoneNumber && (
              <p id="phoneNumber-error" className="mt-1 text-sm text-red-600">
                {errors.phoneNumber}
              </p>
            )}
          </div>
          <div>
            <Button
              type="submit"
              variant="secondary"
              isLoading={isLoading}
              disabled={!formData.gymName || !formData.phoneNumber}
            >
              Save & Continue
            </Button>
          </div>
        </div>
      </form>
    </OnboardingFormLayout>
  );
};

export default BasicDetails;
