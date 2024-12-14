import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "./navbar"
import { Outlet } from "react-router-dom"
import { Toaster } from "../ui/toaster"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { useUserStore } from "@/hooks/auth-hooks";

// eslint-disable-next-line react/prop-types
export default function Layout({ children }) {
  const { user } = useUserStore()
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <SidebarProvider>
          {/* <Navbar /> */}
          <AppSidebar />
          <main className="w-full">
            {
              user ? <SidebarTrigger /> : null 
            }
            
            {children ? children : <Outlet />}
          </main>
          <Toaster />
        </SidebarProvider>
      </ThemeProvider>
    </>
  )
}