"use client";
import Header from "@/components/Header";
import { Heading } from "@/components/heading";
import { Settings } from "lucide-react";

const SettingsPage = () => {
  return (
    <div className="bg-[rgb(240,234,226)]">
      <Header />
      <br />
      <Heading 
        title="Settings" 
        description="Manage account settings." 
        icon={Settings} 
        iconColor="text-gray-700" 
        bgColor="bg-gray-700/10" 
      />
      <div className="px-4 lg:px-8 space-y-4">
        <div className="text-muted-foreground text-sm">
          Account settings will be available here.
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default SettingsPage;
