import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import { H1, P } from "./components/Typography"

function App() {

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ModeToggle/>
        <H1>Atlas</H1>
        <P>
          An RPG style task management app that gamifies your goals and tasks. Earn exp, gold, and rank points as you accomplish tasks to level up your character and increase your rank!
        </P>

    </ThemeProvider>
    </>
  )
}

export default App
