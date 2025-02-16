import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { FilePlus2, Zap } from "lucide-react";
import useProModal from "@/hooks/use-pro-modal";

const Header = () => {
  const proModal = useProModal();

  return (
    <header className="w-full bg-white shadow-md p-4 flex items-center justify-between">
      <Link href="/dashboard" className="text-2xl font-bold text-indigo-600">
        Lets Innovate!
      </Link>
      
      <SignedIn>
        <div className="flex items-center space-x-4">
          <Button variant="premium" onClick={proModal.onOpen} className="flex items-center">
            Upgrade <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
          
          <Button asChild variant="outline" className="bg-[rgb(240,234,226)]">
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          
          <UserButton />
        </div>
      </SignedIn>
    </header>
  );
};

export default Header;