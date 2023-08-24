import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import { AiOutlineLogout, AiOutlineVideoCameraAdd } from "react-icons/ai";
import { RiVipDiamondLine, RiHourglass2Line } from "react-icons/ri";
import { SubscriptionPlanProps } from "./Subscription-plan.props";
import PlanCard from "../planCard/PlanCard";

const SubscriptionPlan = ({ products }: SubscriptionPlanProps) => {
  const { logOut } = useAuth();
  return (
    <div className=" min-h-screen">
      <div className="border-b-2 border-gray-300/20 h-[10vh] flex justify-between items-center px-4 md:px-10 py-2">
        <Image
          src={"/logo.svg"}
          alt={"logo"}
          width={56}
          height={56}
          className="object-contain cursor-pointer"
        />
        <div onClick={logOut} className="cursor-pointer hover:underline">
          <AiOutlineLogout onClick={logOut} className="w-6 h-6" />
        </div>
      </div>
      <div className="flex flex-col space-y-4 text-center pt-3">
        <h1 className="text-2xl md:text-5xl text-shadow ">
          Flexible pricing for teams of any size.
        </h1>
        <p className="text-xl text-shadow">
          Realxing with watching your favourite movies an tv.
        </p>
      </div>
      <div className="flex justify-center items-center py-20">
        <div className="md:px-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 space-y-4 md:space-y-0">
          {products
            .map((product) => <PlanCard key={product.id} product={product} />)
            .reverse()}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlan;
