import { twMerge } from "tailwind-merge";

const SectionHeader = ({ title, className }: { title: string, className?: string }) => {
     const containerClasses = twMerge("flex flex-col mb-6", className);
     
  return (
    <div className={containerClasses}>
      <h1 className="font-heading text-[22px]">{title}</h1>
      <span className="h-[1px] w-[164px] bg-primary"></span>
    </div>
  );
}

export default SectionHeader;