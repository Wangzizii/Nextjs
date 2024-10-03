import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import axios from "axios"
import { useRef } from "react"
  

  
  export function Rgwindow() {
    let rgname:any=useRef(null)
    let rgpwd:any=useRef(null)

    const regist = async () => {
      let Rgdata=new FormData()
      Rgdata.append("username",rgname.current.value)
      Rgdata.append("password",rgpwd.current.value)

      const r=await axios.post("http://localhost:8080/user/register",Rgdata)


      console.log(r.data)
    }

  
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className="w-full">Sign Up</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sign Up</AlertDialogTitle>
            <AlertDialogDescription>
            </AlertDialogDescription>
            </AlertDialogHeader>
              <>
              
            <div className="grid gap-4">

          <div className="grid gap-2">
            <Label htmlFor="rgname">Username</Label>
            <Input
              id="rgname"
              type="rgname"
              placeholder="Enter your username"
              required
              ref={rgname}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="rgpwd">Password</Label>
            <Input id="rgpwd" type="password"  ref={rgpwd}/>
          </div>

        </div>
        </>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit" onClick={regist} formMethod="post" formAction={"http://localhost:8080/user/register"}> Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  