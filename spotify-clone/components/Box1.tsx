import { twMerge } from "tailwind-merge";

interface BoxProps {
    children: React.ReactNode;
    className?: string;
}

const Box: React.FC<BoxProps> = ({
    children,
    className
}) => {
    return ( 
        <div
            className={twMerge(`
                bg-neutral-900
                rounded-lg
                h-fit
                w-full
            `,
            className)} //to be able to add in additional classnames on top of this reusable box component
        >
            {children}
        </div>
     );
}
 
export default Box;