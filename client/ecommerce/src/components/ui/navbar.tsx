"use client";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import { authUnSuccesful } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";





const Navbar = () => {

  const [mounted, setMounted] = useState(false);
  const isAuthenticated = useAppSelector((state: RootState) => state.authReducer.auth.isAuthenticated ?? false)
  const dispatch = useAppDispatch();
  
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    dispatch(authUnSuccesful());
  }, [dispatch])

  async function logout(){
    try{
      const response = await fetch('api/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        
      })
      console.log(response)
      if (response.ok) {{
        router.push('/')
        dispatch(authUnSuccesful())
      }
    }
    }catch(err){
      console.log(err)
      // setError("Failed to login try again later");
    }
  }

  if (!mounted) {
    return null;
  }


  
  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <Link href="#" className="flex items-center" prefetch={false}>
          <span className="italic bold font-extrabold" >
            Gamerzz
          </span>
            
          </Link>
          <nav className="hidden md:flex gap-4">
            <Link
              href="#"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              prefetch={false}
            >
              Home
            </Link>
            <Link
              href="#"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              prefetch={false}
            >
              About
            </Link>
            <Link
              href="#"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              prefetch={false}
            >
              Services
            </Link>
            <Link
              href="#"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              prefetch={false}
            >
              Contact
            </Link>
          </nav>
          {!isAuthenticated && (
            <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  Sign in
                </Button>
            <Button size="sm">Sign up</Button>
            </div>
          )}

          {isAuthenticated && (
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                Profile
              </Button>
              <Button size="sm" onClick={() => logout}>Logout</Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar;

