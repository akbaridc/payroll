/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
interface LoadingProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
}

export function Loading({className,...props}: LoadingProps) {
    return (
        <div className="loader-container">
            <div className={cn("loader", className)} {...props}></div>
        </div>
    )
}