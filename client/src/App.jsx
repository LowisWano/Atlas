import { ThemeProvider } from "@/components/theme-provider"
import { Outlet } from 'react-router-dom';
import Navbar from "./components/layouts/navbar";

function App() {

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        <main>
          {/* Child routes (like Login) will be rendered here */}
          <Outlet />
        </main>

      </ThemeProvider>
    </>
  )
}

export default App
