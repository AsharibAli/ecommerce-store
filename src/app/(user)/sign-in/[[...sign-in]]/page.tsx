import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className=" min-h-screen items-center justify-center flex flex-col m-auto  ">
            {/* <h2>Hello </h2> */}
            <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" redirectUrl={'/'} 
             appearance={{
                elements : {
                    formButtonPrimary : `bg-[#0F172A]`
                }
             }}
            />
        </div>
    )
}