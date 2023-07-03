import { SignUp } from "@clerk/nextjs";

export default function SignUpPage () {
  return (
    <div className="min-h-screen items-center justify-center flex flex-col m-auto">
      
        <SignUp 
            path="/sign-up" 
            routing="path" 
            signInUrl="/sign-in"
            redirectUrl="/"
            appearance={{
                    elements: {
                        formButtonPrimary  : 'bg-[#0F172A]'
                    }
                }}
            />
    </div>
  )
}