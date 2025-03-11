import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";

export const AdminPage = () => {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          {/* {children} */}
        </main>
      </SidebarProvider>
    </>
  );
};
export default AdminPage;
