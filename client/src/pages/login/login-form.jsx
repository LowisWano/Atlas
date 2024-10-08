import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { login } from "@/services/auth.service"
import { useUserStore } from "@/hooks/auth-hooks"
import { useNavigate } from "react-router-dom"

export function LoginForm() {
  const setUser = useUserStore(state=>state.setUser)
  const navigate = useNavigate()

  const loginHandler = async (event) => {
    event.preventDefault();
    const field = event.target;

    try{
      const userToken = await login({
        email: field.email.value,
        password: field.password.value
      });

      window.localStorage.setItem(
        "token",
        JSON.stringify(userToken),
      );
      setUser(userToken);

      // display notification login successful
      console.log('login succesful!');

      // navigate to dashboard '/'
      navigate('/');
    }catch(err){
      console.log(err.response.data.error)
    }
    
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={loginHandler}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name='email'
                placeholder="johndoe@gmail.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link to="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" name='password' type="password" autoComplete="on" required />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>

          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}