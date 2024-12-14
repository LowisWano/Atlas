import { LoginForm } from "./login-form"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const cachedUser = JSON.parse(localStorage.getItem("token"));
    if(cachedUser){
      navigate('/');
    } 
  }, [])
  
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className="mt-[-140px]">
        <LoginForm />
      </div>
    </div>
  )
}