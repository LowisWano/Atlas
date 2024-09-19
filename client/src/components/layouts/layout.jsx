import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "./navbar"
import { Outlet } from "react-router-dom"

// eslint-disable-next-line react/prop-types
export default function Layout({ children }) {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
          <main>
          {children ? children : <Outlet />}
          </main>
      </ThemeProvider>
    </>
  )
}