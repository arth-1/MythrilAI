import Sidebar from "@/components/sidebar";
import { getApiLimitCount } from "@/lib/api-limit";

interface SidebarProps {
  apiLimitCount: number;
  isPro?: boolean; // Make it optional
}


const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const apiLimitCount = await getApiLimitCount();

  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:flex-col md:fixed md:w-72 md:inset-y-0 bg-gray-900">
      <Sidebar apiLimitCount={apiLimitCount} isPro={false} />
      </div>
      <main className="md:pl-72">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
