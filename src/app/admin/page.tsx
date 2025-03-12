import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import * as React from "react";

export const AdminPage = () => {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          <div className="w-[1171px] h-[948px]"></div>
        </main>
      </SidebarProvider>
    </>
  );
};
export default AdminPage;
