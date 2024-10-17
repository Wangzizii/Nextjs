  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
  } from "@/components/ui/dialog"
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
import axios from "axios"
import { useRef, useState } from "react"
import { toast } from "sonner"

  
  export function Rgwindow() {
    const [passwordMismatch, setPasswordMismatch] = useState("");
    let [open,setopen]=useState(false)
    let rgemail:any=useRef(null)
    let rgnickname:any=useRef(null)
    let rgname:any=useRef(null)
    let rgpwd:any=useRef("")
    let rgcfpwd:any=useRef(null)
    const bi=()=>{
      console.log(rgcfpwd.current.value)
      console.log(rgpwd.current.value)
    }


    const regist = async (event:any) => {
      event.preventDefault();

      const password = rgpwd.current.value;
    const confirmPassword = rgcfpwd.current.value;

    if (password !== confirmPassword) {
      setPasswordMismatch("Passwords do not match.");
      return; // 阻止表单提交
    }
    else{
      setPasswordMismatch("");
    }
      

      let Rgdata={
        username:rgname.current.value,
        password:rgpwd.current.value,
        email:rgemail.current.value,
        nickname:rgnickname.current.value
      }
      console.log(Rgdata)


      try {


        const r=await axios.post(process.env.HOST+"/user/register",Rgdata,{
          headers:{
            'Content-Type':'application/x-www-form-urlencoded'
          }
        })
        
        console.log(r.data.code)
        if(r.data.code==200){

        toast("Success", {
          description:r.data.msg,
          action: {
            label: "OK",
            onClick: () => console.log("OK"),
          },
        })
        setopen(false)
      }
        else{
          toast("Failed", {
            description:r.data.msg,
            action: {
              label: "OK",
              onClick: () => console.log("OK"),
            },
          })

        }

        console.log(r)

      } catch (error) {
 
      
        
        
      }

      
    }
   


  
    return (
      <>
      
      <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger asChild>
      <Button variant="outline" className="w-full" >Sign Up</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign Up</DialogTitle>
          <DialogDescription>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={regist}>
        <>
              
              <div className="grid gap-4">
              <div className="grid gap-2">
              <Label htmlFor="rgemail">E-mail</Label>
              <Input   
              type="email"
              id="rgemail"
              placeholder="Enter your email"
              ref={rgemail}
              required
              />
  
            </div>
  
            <div className="grid gap-2">
              <Label htmlFor="rgnickname">NickName</Label>
              <Input id="rgnickname" 
              type="text"
                placeholder="Enter your nickname"
                minLength={2}
                maxLength={12}
               ref={rgnickname}
               required
              />
            </div>
  
            <div className="grid gap-2">
              <Label htmlFor="rgname">Username</Label>
              <Input
                id="rgname"
                placeholder="Enter your username"
                minLength={5}
                maxLength={15}
                required
                ref={rgname}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="rgpwd">Password</Label>
              <Input id="rgpwd" type="password"  
              minLength={6}
              maxLength={15}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters"
              required
              ref={rgpwd}/>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="rgcfpwd">Confirm Password</Label>
              <Input id="rgcfpwd" type="password"  
              title="Password does not match."
              required
              onChange={bi}
              ref={rgcfpwd}/>
            </div>
            {passwordMismatch && <div style={{ color: 'red' }}>{passwordMismatch}</div>}
  
  
            
  
          </div>

          </>
          <DialogFooter>
          <Button type="submit">Sign Up</Button>
          </DialogFooter>

          </form>
    
      </DialogContent>
    </Dialog>
    </>



      
    )
  }
  