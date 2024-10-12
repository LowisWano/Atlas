import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "./navbar"
import { Outlet } from "react-router-dom"
import { Toaster } from "../ui/toaster"

// eslint-disable-next-line react/prop-types
export default function Layout({ children }) {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
          <main>
          {children ? children : <Outlet />}
          </main>
        <Toaster />
      </ThemeProvider>
    </>
  )
}