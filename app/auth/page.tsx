import { LoginForm } from "@/components/views/login/login-form"
import {ModeToggle} from "@/components/views/layouts/mode-toggle";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10 relative">
      <div className="absolute top-10 right-10">
        <ModeToggle />
      </div>
      <div className="flex w-full max-w-sm flex-col gap-6">
        <LoginForm />
      </div>
    </div>
  )
}
