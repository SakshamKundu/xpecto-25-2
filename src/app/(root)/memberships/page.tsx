"use client";

import { useCurrentUser } from "@/lib/utils";
import { api } from "@/trpc/react";
import React from "react";
import PlansSection from "@/components/(test)/plans-section";
import Footer from "@/components/home/footer";

const Page = () => {
  const { CurrentUser } = useCurrentUser();

  const { data: offlinePlans } = api.event.getOfflinePlans.useQuery();
  
  offlinePlans?.regPlans.sort((a, b) => a.price - b.price);

  const { data: offlineReg, isLoading } =
    api.registration.checkUserRegisteration.useQuery(
      {
        userId: CurrentUser?.id ?? "",
        eventId: "universaleve",
      },
      {
        enabled: !!CurrentUser,
      },
    );

  return (
    <div>
      {CurrentUser?.accomodation ? (
        <div className="pt-32">
          {CurrentUser.college_name ===
          "Indian Institute of Technology, Mandi" ? (
            <div>You are an IIT Mandi Student</div>
          ) : (
            <div>You have purchased {offlineReg?.plan.name} membership.</div>
          )}
        </div>
      ) : isLoading ? (
        <div className="pt-32">Loading...</div>
      ) : offlineReg && !offlineReg.verified ? (
        <div className="flex h-screen w-full items-center justify-center pt-32">
          <div className="w-fit border-2 bg-amber-50/[0.7] px-5 py-2 text-xl font-normal uppercase text-neutral-900">
            Your payment is being verified right now
          </div>
        </div>
      ) : (
        <PlansSection />
      )}
      <Footer />
    </div>
  );
};

export default Page;
