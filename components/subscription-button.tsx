"use client";

import { Zap } from "lucide-react";
import { FC, useState } from "react";
import { Button } from "./ui/button";

interface SubscriptionButtonProps {
  isPro: boolean;
}

export const SubscriptionButton: FC<SubscriptionButtonProps> = ({ isPro = false }) => {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <Button disabled={loading} variant={isPro ? "default" : "premium"} onClick={onClick}>
      {isPro ? "Manage Subscription" : "Upgrade to Pro"}
      {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
    </Button>
  );
};
