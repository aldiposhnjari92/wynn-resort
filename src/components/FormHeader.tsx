export type FormHeaderProps = {
    steps: number;
    activeStep: number;
    title?: string;
    subTitle?: string;
}

const FormHeader = ({steps, activeStep = 1, title, subTitle}: FormHeaderProps) => {
  return (
    <section className="flex items-start px-4 gap-2">
        <div className="flex flex-col flex-grow gap-[20px]">
            <h1 className="text-[37px] font-heading leading-[42px]">{title}</h1>
            <p className="text-[15.5px] font-body tracking-[0.3px]">{subTitle}</p>
        </div>
        <p className="text-[24px] font-heading min-w-max">
            Step {activeStep} of <sub className="text-[24px]">{steps}</sub>
        </p>
    </section>
  )
}

export default FormHeader