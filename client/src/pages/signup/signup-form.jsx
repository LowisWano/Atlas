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

import { signup, login } from "@/services/auth.service"
import { useUserStore } from "@/hooks/auth-hooks"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"

export default function SignupForm() {
  const setUser = useUserStore(state=>state.setUser)
  const navigate = useNavigate()
  const { toast } = useToast();

  const signupHandler = async (event) => {
    event.preventDefault();
    const field = event.target;
    

    if(field.password.value != field.confirm_password.value){
      toast({
        variant: "destructive",
        title: "Passwords do not match!",
        description: "Please make sure both passwords are identical.",
      })
    }else{
      try{
        await signup({
          name: field.name.value,
          username: field.username.value,
          password: field.password.value
        });

        const userToken = await login({
          username: field.username.value,
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
        console.log(err.response.data.error);
      }
      
    }
  }
  return (
      <Card className="mx-auto max-w-sm">
          <CardHeader>
              <CardTitle className="text-xl">Sign Up</CardTitle>
              <CardDescription>
                  Enter your information to create an account
              </CardDescription>
          </CardHeader>
          <CardContent>
              <form onSubmit={signupHandler} >
                <div className="grid gap-4">
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" placeholder="John Doe" required />
                        </div>
               
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="username">username</Label>
                        <Input
                            id="username"
                            name="username"
                            type="username"
                            placeholder="johndoe123"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" type="password" autoComplete="on" required/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="confirm_password">Confirm Password</Label>
                        <Input id="confirm_password" name="confirm_password" type="password" autoComplete="on" required/>
                    </div>
                    <Button type="submit" className="w-full">
                        Create an account
                    </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="underline">
                        Sign in
                    </Link>
                </div>
              </form>
          </CardContent>
      </Card>
  )
}
