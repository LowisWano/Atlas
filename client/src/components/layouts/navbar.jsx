<<<<<<< HEAD
import { Link } from "react-router-dom"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  CircleUser,
  Menu,
} from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { useUserStore } from "@/hooks/auth-hooks"
import { useNavigate } from "react-router-dom"

export default function Navbar() {
  const logoutUser = useUserStore(state=>state.logoutUser);
  const navigate = useNavigate();

  const logoutHandler = () => {
    window.localStorage.removeItem("token");
    logoutUser();
    navigate('/login');
  }

  return (
    <div>
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <img src="/atlas-web-logo-theme.png" loading="lazy" className="object-cover h-10 w-10 max-w-none" alt="atlas logo" />
            <span className="sr-only">Atlas</span>
          </Link>
          <Link
            to="/"
            className="text-foreground transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
          <Link
            to="/calendar"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Calendar
          </Link>
          <Link
            to="/shop"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Shop
          </Link>
          <Link
            to="/achievements"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Achievements
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                to="/"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <img src="/atlas-web-logo-theme.png" loading="lazy" className="object-cover h-10 w-10 max-w-none" alt="atlas logo" />
                <span className="sr-only">Atlas</span>
              </Link>
              <Link to="/" className="hover:text-foreground">
                Dashboard
              </Link>
              <Link
                to="/calendar"
                className="text-muted-foreground hover:text-foreground"
              >
                Calendar
              </Link>
              <Link
                to="/shop"
                className="text-muted-foreground hover:text-foreground"
              >
                Shop
              </Link>
              <Link
                to="/achievements"
                className="text-muted-foreground hover:text-foreground"
              >
                Achievements
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <ModeToggle />
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logoutHandler}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </div>
  )
=======
import { Link } from "react-router-dom"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  CircleUser,
  Menu,
} from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { useUserStore } from "@/hooks/auth-hooks"
import { useNavigate, useLocation } from "react-router-dom"

export default function Navbar() {
  const { user, logoutUser }= useUserStore();
  const navigate = useNavigate();
  const location = useLocation();

  const logoutHandler = () => {
    window.localStorage.removeItem("token");
    logoutUser();
    navigate('/login');
  }

  const navLinks = [
    {
      name: "Dashboard",
      to: "/",
    },
    {
      name: "Calendar",
      to: "/calendar",
    },
    {
      name: "Shop",
      to: "/shop",
    },
    {
      name: "Achievements",
      to: "/achievements",
    },
  ];

  return (
    <div>
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <img src="/atlas-web-logo-theme.png" loading="lazy" className="object-cover h-10 w-10 max-w-none" alt="atlas logo" />
            <span className="sr-only">Atlas</span>
          </Link>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`transition-colors hover:text-foreground ${location.pathname === link.to ? 'text-foreground' : 'text-muted-foreground'}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                to="/"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <img src="/atlas-web-logo-theme.png" loading="lazy" className="object-cover h-10 w-10 max-w-none" alt="atlas logo" />
                <span className="sr-only">Atlas</span>
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`hover:text-foreground ${location.pathname === link.to ? 'text-foreground' : 'text-muted-foreground'}`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <ModeToggle />
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logoutHandler}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </div>
  )
>>>>>>> cb994f1909cc53292308ba9d0fda67ec4e17bd72
}