import Hero from "@/components/section/Hero";
import UserInfo from "@/components/userInfo";

export default async function Home() {
  return (
    <div className="lg:px-20 px-10 ">
      {/* clert sugnOut button */}
      <UserInfo greeting="Hey" msg={"I hope you're fine and doing very well"} />
      {/** hero section */}
      <Hero />
    </div>
  );
}
