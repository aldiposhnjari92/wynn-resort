import { twMerge } from 'tailwind-merge';

export type ContainerProps = {
    className?: string;
    children: React.ReactNode;
}

const Container = ({className, children}: ContainerProps) => {
  return (
    <div className={twMerge('mx-auto', className)}>
        {children}
    </div>
  )
}

export default Container