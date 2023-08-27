import React from "react";
import { MembershibPlanPorps } from "./MembershipPlanProps";
import moment from "moment";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const MembershpPlan = ({ subscription }: MembershibPlanPorps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [cancelLoading, setcancelLoading] = useState<boolean>(false);

  const OpenPortal = async () => {
    setIsLoading(true);
    const payload = { user_id: subscription.customer.metadata.user_id };

    const response = await fetch("/api/subscription/manage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log(data);
    window.open(data.portal);
    setIsLoading(false);
  };

  const openPortal2 = async () => {
    setLoading(true);
    const payload = { user_id: subscription.customer.metadata.user_id };

    const response = await fetch("/api/subscription/manage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log(data);
    window.open(data.portal);
    setLoading(false);
  };

  const openPortal3 = async () => {
    setcancelLoading(true);
    const payload = { user_id: subscription.customer.metadata.user_id };

    const response = await fetch("/api/subscription/manage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log(data);
    window.open(data.portal);
    setcancelLoading(false);
  };

  return (
    <div className='className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4  md:border-t md:border-b-0  md:pb-0"'>
      <div className="space-y-2 py-4">
        <h4 className="text-lg text-[gray]">MembershipPlan & Billing</h4>

        <button
          onClick={openPortal3}
          className="h-10 w-3/5 transition-all whitespace-nowrap bg-gray-300 py-2 text-sm font-medium text-black shadow-md hover:bg-gray-200 md:w-4/5"
        >
          {cancelLoading ? (
            <div className="flex justify-center items-center">
              <AiOutlineLoading3Quarters className="mx-2 transition-all animate-spin" />{" "}
              Loading...
            </div>
          ) : (
            "Cancel Membership"
          )}
        </button>
      </div>
      <div className="col-span-3">
        <div className="flex flex-col justify-between border-b border-white/10  py-4 md:flex-row">
          <div>
            <span className="font-medium">{subscription.customer.email}</span>
            <p className="text-[gray]">Password: ******</p>
          </div>
          <div className="md:text-right">
            {loading ? (
              <div className="flex justify-center items-center">
                <AiOutlineLoading3Quarters className="mx-2 transition-all animate-spin" />{" "}
                Loading...
              </div>
            ) : (
              <>
                <p onClick={openPortal2} className={"membershipLink"}>
                  Change email
                </p>
                <p onClick={openPortal2} className={"membershipLink"}>
                  Change password
                </p>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-between pt-4 pb-4 md:flex-row md:pb-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="py-2 px-3 uppercase rounded bg-white/20">
                {subscription.default_payment_method
                  ? subscription.default_payment_method.card.brand
                  : subscription.customer.invoice_settings
                      .default_payment_method.card.brand}{" "}
                **** **** ****{" "}
                {subscription.default_payment_method
                  ? subscription.default_payment_method.card.last4
                  : subscription.customer.invoice_settings
                      .default_payment_method.card.last4}
              </span>
            </div>
            <p className="mt-4">
              Your next billing date is{" "}
              {moment(subscription.current_period_end * 1000).format(
                "DD MMM yyyy"
              )}
            </p>
          </div>
          <div className="md:text-right">
            {isLoading ? (
              <div className="flex justify-center items-center">
                <AiOutlineLoading3Quarters className="mx-2 transition-all animate-spin" />{" "}
                Loading...
              </div>
            ) : (
              <>
                <p onClick={OpenPortal} className={"membershipLink"}>
                  Manage payment info
                </p>
                <p onClick={OpenPortal} className={"membershipLink"}>
                  Add beckup payment method
                </p>
                <p onClick={OpenPortal} className={"membershipLink"}>
                  Billing detail
                </p>
                <p onClick={OpenPortal} className={"membershipLink"}>
                  Change billing detail
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershpPlan;
