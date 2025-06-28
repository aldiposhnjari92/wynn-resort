import { useState, useEffect, useCallback } from "react";
import { z } from "zod";
import Button from "./ui/Button";
import FormInput from "./ui/Input";
import SelectMenu from "./ui/Select";
import { useCountries } from "../utilities/fetchCountries";
import RadioButton from "./ui/RadioButton";
import { NavLink } from "react-router";
import OTPInput from "./ui/OtpInput";
import PhoneInput from "./ui/PhoneInput";
import { useCreateUser } from "../utilities/fetchUsers";
import { BadgeCheck } from "lucide-react";
import SectionHeader from "./SectionHeader";

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  gender: z.string().min(1, "Gender is required"),
  countryOfResidence: z.string().min(1, "Residence country is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(5, "Phone number is required"),
  verificationType: z.string().optional(),
  code: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

type UserFormProps = {
  handleStepChange: (step: number) => void;
  activeStep: number;
};

const OTP_LENGTH = 4;

const UserForm = ({ handleStepChange, activeStep }: UserFormProps) => {
  const { countries } = useCountries();
  const { createUser, loading, error, data } = useCreateUser();

  const [verifyStep, setVerifyStep] = useState<"choose" | "input">("choose");
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    gender: "",
    countryOfResidence: "",
    email: "",
    phone: "",
    verificationType: "",
    code: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [otpDigits, setOtpDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));

  useEffect(() => {
    setFormData((prev) => ({ ...prev, code: otpDigits.join("") }));
  }, [otpDigits]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSelectChange = useCallback((name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSendCode = useCallback(() => {
    if (!formData.verificationType) {
      setErrors({ verificationType: "Please select a method to receive the code" });
      return;
    }

    setErrors({});
    setOtpDigits(Array(OTP_LENGTH).fill(""));
    setVerifyStep("input");
    console.log(`Code sent via ${formData.verificationType}`);
  }, [formData.verificationType]);

  const validateStep = useCallback(() => {
    const result = schema.safeParse(formData);
    if (!result.success) {
      const newErrors: { [key: string]: string } = {};
      result.error.errors.forEach(({ path, message }) => {
        if (path[0]) newErrors[path[0]] = message;
      });
      setErrors(newErrors);
      return false;
    }

    if (activeStep === 2) {
      if (verifyStep === "choose") {
        if (!formData.verificationType) {
          setErrors({ verificationType: "Please select a method to receive the code" });
          return false;
        }
        return false;
      }

      if (verifyStep === "input") {
        if (!formData.code || formData.code.trim().length < OTP_LENGTH) {
          setErrors({ code: "Please enter the 4-digit code sent to you" });
          return false;
        }
      }
    }

    setErrors({});
    return true;
  }, [activeStep, formData, verifyStep]);

  const handleBack = useCallback(() => {
    if (activeStep > 1) handleStepChange(activeStep - 1);
  }, [activeStep, handleStepChange]);

  const handleNext = useCallback(() => {
    if (validateStep()) {
      handleStepChange(activeStep + 1);
    }
  }, [validateStep, handleStepChange, activeStep]);

  const handleFinish = useCallback(() => {
    if (validateStep()) {
      createUser(formData).then((response) => {
        // success response
        console.log(response);
        handleStepChange(3);
      }).catch(error => {
        // catch any errors
        console.log(error)
      })
    }
  }, [validateStep, formData]);

  return (
    <form noValidate className="mt-[32px]">
      <div className="px-4 mb-[40px]">
        {activeStep === 1 && (
          <>
            <SectionHeader title="Personal Info" />
            <div className="flex flex-col gap-4 md:gap-[24px] md:flex-row md:items-center">
              <FormInput
                id="firstName"
                name="firstName"
                required
                label="First Name"
                placeholder="Enter first name..."
                value={formData.firstName}
                onChange={handleInputChange}
                error={errors.firstName}
              />
              <FormInput
                id="lastName"
                name="lastName"
                required
                label="Last Name"
                placeholder="Enter last name..."
                value={formData.lastName}
                onChange={handleInputChange}
                error={errors.lastName}
              />
            </div>
            <SelectMenu
              label="Gender"
              name="gender"
              required
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
              ]}
              value={formData.gender}
              onChange={(val:any) => handleSelectChange("gender", val)}
              error={errors.gender}
              placeholder="Select gender..."
            />
            <SelectMenu
              label="Your residence country"
              name="countryOfResidence"
              required
              options={countries.map(({ label }) => ({
                label,
                value: label,
              }))}
              value={formData.countryOfResidence}
              onChange={(val:any) => handleSelectChange("countryOfResidence", val)}
              error={errors.countryOfResidence}
              placeholder="Select residence country..."
            />

            <SectionHeader title="Contact Details" className="mt-[32px]" />
            <FormInput
              id="email"
              name="email"
              required
              label="Email"
              type="email"
              placeholder="Enter email address..."
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
            />
            <PhoneInput
              name="phone"
              required
              label="Phone Number"
              value={formData.phone}
              onChange={(val) => setFormData((prev) => ({ ...prev, phone: val }))}
              error={errors.phone}
            />
          </>
        )}

        {activeStep === 2 && (
          <>
            <SectionHeader title="OTP Verification" />

            <section className="bg-white rounded-[4px] p-[24px] flex flex-col justify-center items-center">
              {verifyStep === "choose" && (
                <>
                  <h3 className="font-heading text-[20px] mb-2">Send Code</h3>
                  <p className="text-[#667085] mb-6 text-center">
                    How would you like to receive the code?
                  </p>
                  <div className="flex justify-center gap-8 mb-6">
                    <RadioButton
                      name="verificationType"
                      label="Send to Phone"
                      value="phone"
                      checked={formData.verificationType === "phone"}
                      onChange={(value) =>
                        setFormData((prev) => ({ ...prev, verificationType: value }))
                      }
                    />
                    <RadioButton
                      name="verificationType"
                      label="Send to Email"
                      value="email"
                      checked={formData.verificationType === "email"}
                      onChange={(value) =>
                        setFormData((prev) => ({ ...prev, verificationType: value }))
                      }
                    />
                  </div>
                  {errors.verificationType && (
                    <p className="text-red-500 text-sm mb-4">{errors.verificationType}</p>
                  )}
                  <Button
                    type="button"
                    className="bg-primary text-white border-primary border px-[40px] py-[12px]"
                    onClick={handleSendCode}
                  >
                    Send Code
                  </Button>
                </>
              )}

              {verifyStep === "input" && (
                <>
                  <div className="flex flex-col items-center text-center gap-4 mb-6">
                    <h3 className="font-heading text-[20px]">
                      {formData.verificationType === "email"
                        ? "Please check your email."
                        : "Please check your phone."}
                    </h3>
                    <p className="text-[#667085]">
                      {formData.verificationType === "email"
                        ? `We've sent a code to ${formData.email}`
                        : `We've sent a code to your phone`}
                    </p>
                  </div>
                  <OTPInput digits={otpDigits} setDigits={setOtpDigits} error={errors.code} />
                  <span className="font-body text-[16px] mt-6">
                    Didn't get a code?{" "}
                    <NavLink className="underline" to={"#resend-code"}>
                      Click to resend
                    </NavLink>
                  </span>
                </>
              )}
            </section>
          </>
        )}
        {
          activeStep === 3 && (
            <section className="bg-white rounded-[4px] p-[24px] flex flex-col justify-center items-center">
                {error && <p className="text-red-500">Error: {error}</p>}
                {data && <div className="flex flex-col items-center gap-2">
                    <BadgeCheck size={32} className="text-green-600" />
                    <h1 className="font-heading text-2xl">{data.msg}</h1>
                  </div>}
              </section>
          )
        }
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between md:gap-[40px] px-4">
        {activeStep > 1 && (
          <Button
            type="button"
            className="text-primary border-primary border w-full px-[86px] py-[16px]"
            onClick={handleBack}
          >
            Back
          </Button>
        )}
        {activeStep < 2 && (
          <Button
            type="button"
            className="bg-primary text-white border-primary border w-full px-[86px] py-[16px] md:w-1/2"
            onClick={handleNext}
          >
            Next
          </Button>
        )}
        {
            activeStep === 2 && (<Button
            type="button"
            className="bg-primary text-white border-primary border w-full px-[86px] py-[16px]"
            disabled={loading || formData.code?.length !== OTP_LENGTH}
            onClick={handleFinish}
          >
            {loading ? "Creating..." : "Finish"}
          </Button>)
          }
      </div>
    </form>
  );
};

export default UserForm;
