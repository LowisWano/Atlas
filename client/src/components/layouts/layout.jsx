import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "./navbar"
import { Outlet } from "react-router-dom"
import { Toaster } from "../ui/toaster"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"

// eslint-disable-next-line react/prop-types
export default function Layout({ children }) {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <SidebarProvider>
          {/* <Navbar /> */}
          <AppSidebar />
          <main className="w-full">
            <SidebarTrigger />
            {children ? children : <Outlet />}
          </main>
          <Toaster />
        </SidebarProvider>
      </ThemeProvider>
    </>
  )
}