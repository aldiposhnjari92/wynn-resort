import Button from "./ui/Button";

type UserFormProps = {
  handleStepChange: (step: number) => void;
  activeStep: number;
};

const FormStepOne = () => <div className="flex flex-col gap-[32px]">
    <div className="flex flex-col">
        <h1 className="font-heading text-[22px]">
            Personal Info
        </h1>
        <span className="h-[1px] w-[164px] bg-primary"></span>
    </div>
    <div>
        forms input
    </div>
    <div className="flex flex-col mt-[32px]">
        <h1 className="font-heading text-[22px]">
            Contact Details
        </h1>
        <span className="h-[1px] w-[164px] bg-primary"></span>
    </div>
</div>;

const FormStepTwo = () => <div className="flex flex-col gap-[32px]">
    <div className="flex flex-col">
        <h1 className="font-heading text-[22px]">
            OTP Verification
        </h1>
        <span className="h-[1px] w-[164px] bg-primary"></span>
    </div>
    <div className="bg-white rounded-[4px] p-[24px] flex flex-col justify-center items-center">
        forms input
    </div>
</div>;
const FormStepThree = () => <div className="flex flex-col gap-[32px]">
    <div className="flex flex-col">
        <h1 className="font-heading text-[22px]">
            Success
        </h1>
        <span className="h-[1px] w-[164px] bg-primary"></span>
    </div>
    <div>
        <p>Congratulation you may now login to your account</p>
    </div>
</div>;

const UserForm = ({ handleStepChange, activeStep }: UserFormProps) => {
  const renderStep = () => {
    switch (activeStep) {
      case 1:
        return <FormStepOne />;
      case 2:
        return <FormStepTwo />;
      case 3:
        return <FormStepThree />;
      default:
        return <div>Invalid step</div>;
    }
  };

  const handleBack = () => {
    if (activeStep > 1) {
      handleStepChange(activeStep - 1);
    }
  };

  const handleNext = () => {
    if (activeStep < 3) {
      handleStepChange(activeStep + 1);
    }
  };

  const handleFinish = () => {
   
  };

  return (
    <form noValidate className="mt-[32px]">
      <div className="px-4 mb-[40px]">{renderStep()}</div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between md:gap-[40px] px-4">
        {activeStep > 1 && (
          <Button className="text-primary border-primary border w-full px-[86px] py-[16px]" onClick={handleBack}>Back</Button>
        )}

        {activeStep < 3 ? (
          <Button className="bg-primary text-white border-primary border w-full px-[86px] py-[16px]" onClick={handleNext}>Next</Button>
        ) : (
          <Button className="bg-primary text-white border-primary border w-full px-[86px] py-[16px]" onClick={handleFinish}>Finish</Button>
        )}
      </div>
    </form>
  );
};

export default UserForm;
