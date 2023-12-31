import { RiHourglass2Line, RiVipDiamondLine } from "react-icons/ri";
import { PlanCardProps } from "./planCard.props";
import { AiOutlineLoading3Quarters, AiOutlineVideoCameraAdd } from "react-icons/ai";
import { useState, useContext } from "react";
import { AuthContext } from "@/Context/auth.context";

const PlanCard = ({ product }: PlanCardProps) => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onSubmitSubscription = async (priceId: string) => {
    setIsLoading(true)
    const payload = { email: user?.email, priceId };
    try {
      const response = await fetch("/api/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      window.open(data.subscription.url);
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  };

  return (
    <div className="max-w-sm cursor-pointer bg-white/20 px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
      <h3 className="mb-3 text-xl font-bold text-[#E10856]">{product.name}</h3>
      <div className="relative">
        <img
          src={product.images[0]}
          alt="Colors"
          className="rounded-xl w-full"
        />
        <p className="absolute top-0 bg-black/70 text-white font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">
          {(product.default_price.unit_amount / 100).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
        <div className="w-full h-full rounded-xl bg-black/20 absolute left-0 right-0 bottom-0" />
      </div>
      <div className="border-[1px] border-white/20 mt-4" />
      <button
        onClick={() => onSubmitSubscription(product.default_price.id)}
        className="mt-4 font-semibold w-full rounded bg-[#E10856] py-4 hover:opacity-70 transition-all"
        disabled={isLoading}
      >
        {isLoading ? <div className="flex justify-center items-center">
                <AiOutlineLoading3Quarters className="mx-2 transition-all animate-spin" />{" "}
                Loading...
              </div> : 'BUY PLAN'}
      </button>
      <div className="my-4 flex flex-col space-y-3">
        {product.metadata.adv.split(", ").map((c, id) => (
          <div key={id} className="flex items-center space-x-2">
            {id === 0 && <RiVipDiamondLine className="w-6 h-6" />}
            {id === 1 && <RiHourglass2Line className="w-6 h-6" />}
            {id === 2 && <AiOutlineVideoCameraAdd className="w-6 h-6" />}
            <p>{c}.</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanCard;
