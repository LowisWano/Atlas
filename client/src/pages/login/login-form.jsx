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
import { useUserStore, storeToken } from "@/hooks/auth-hooks"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"

export function LoginForm() {
  const { setUser } = useUserStore(state=>state);
  const navigate = useNavigate();
  const { toast } = useToast();

  const loginHandler = async (event) => {
    event.preventDefault();
    const field = event.target;

    try{
      // api post request to login endpoint
      const userToken = await login({
        username: field.username.value,
        password: field.password.value
      });
      
      console.log(userToken)
      setUser(userToken.user);
      storeToken(userToken)
      
      // display notification login successful
      toast({
        title: "Login Success!",
        description: `Welcome back, ${userToken.user.name}! You're now logged in.`,
      })
      
      // navigate to dashboard '/'
      navigate('/');
    }catch(err){
      toast({
        variant: "destructive",
        title: "Login Failed!",
        description: err.response.data.error,
      })
    }
    
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your username below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={loginHandler}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                name='username'
                placeholder="Username"
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
              <Input id="password" name='password' placeholder="Password" type="password" autoComplete="on" required />
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