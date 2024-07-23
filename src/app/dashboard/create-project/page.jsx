"use client";
import React, { useState } from "react";

import Button from "@/components/shared/button";
import Step1 from "@/components/createProjectFormComponent/Step1";
import Step2 from "@/components/createProjectFormComponent/Step2";
import Step3 from "@/components/createProjectFormComponent/Step3";
import Step4 from "@/components/createProjectFormComponent/Step4";
import Step5 from "@/components/createProjectFormComponent/Step5";
import HeadingBlue25px from "@/components/shared/HeadingBlue25px";
import axios from "axios";
import { baseURL } from "@/app/baseURL";

const Page = () => {
  const [currentStep, setCurrentStep] = useState(5);
  const [formData, setFormData] = useState({
    name: "",
    host: "",
    startTime: "",
    duration: "",
    description: "",
    passcodeSelect: false,
    passcode: "",
    waitingRoomSelect: false,
    language: "English",
    interpreterSelect: false,
    interpreterName: "",
    interpreterEmail: "",

    waitingRoom: false,
    interpreter: false,
    participants: [],
    observers: [],
    breakoutRooms: [],
    polls: [],
  });

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${baseURL}/api/create/project`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Success:", response.data);
      alert("Project created successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create project");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 formData={formData} setFormData={setFormData} />;
      case 2:
        return <Step2 formData={formData} setFormData={setFormData} />;
      case 3:
        return <Step3 formData={formData} setFormData={setFormData} />;
      case 4:
        return <Step4 formData={formData} setFormData={setFormData} />;
      case 5:
        return <Step5 formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  return (
    <div className="my_profile_main_section_shadow bg-[#fafafb] bg-opacity-90 h-full min-h-screen">
      <div className="bg-white h-24 w-full">
        <div className="px-10 flex justify-between items-center pt-5">
          <div>
            <HeadingBlue25px>New Project</HeadingBlue25px>
          </div>
        </div>
      </div>
      <div className="flex-grow mx-auto p-5 pt-10 px-10">
        {renderStep()}
        <div className="flex justify-end gap-5 mt-5">
          {currentStep > 1 && (
            <Button
              onClick={prevStep}
              variant="cancel"
              className="rounded-lg px-7 py-1"
            >
              Back
            </Button>
          )}
          {currentStep < 5 && (
            <Button
              onClick={nextStep}
              variant="save"
              className="rounded-lg px-7 py-1"
            >
              Next
            </Button>
          )}
          {currentStep === 5 && (
            <Button
              variant="save"
              type="submit"
              className="rounded-lg px-7 py-1"
              onClick={handleSubmit}
            >
              Save Project
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
