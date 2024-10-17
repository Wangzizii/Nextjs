 "use client"
 import React from 'react'
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
import { Button } from '@/components/ui/button'
import axios from 'axios'
import Link from 'next/link'
import { useRouter} from 'next/navigation'
import { useEffect, useState } from 'react'


export default function Page({params}:{params:{id:string}}) {


  
    const Router=useRouter()

    const [activeres,setactiveres]=useState(false)
    const [username,setusername]=useState("")
    const [alert,setalert]=useState(false)
    const active=async (params:string) => {
       const res= await axios.get(process.env.HOST+"/user/active/"+params)
      //  console.log(res.data)
       if(res.data.code==200){
        setactiveres(true)
        const i=setTimeout(() => {
          Router.push(`/auth/mfa?username=${res.data.data}`)
    
        }, 1000);
        return true
       }
       else{
        if(res.data.data!=null){
        setusername(res.data.data)

        console.log(res.data)
        setactiveres(false)        
        return false
      }
      else{
        setalert(true)

      }
       }
    }
   
    useEffect(()=>{
      active(params.id)
      console.log(activeres)

      
    },[])

    const  resend=async () => {
      const res = await axios.post(process.env.HOST+"/user/reactvie",{
        username:username
      },{
        headers:{
          'Content-Type':'application/x-www-form-urlencoded'
        }

      })
      console.log(res.data)
      return null;
    }
    
    
   



    
  return (
    <div className='text-center'>
        
    <p className='text-3xl font-bold'>
    {activeres?"Activation Success":"Activation Failed!!"}
    
    </p>
    {activeres?"":<div>
      <p className='text-3xl font-bold'>
        Resend an Email?
      </p>
    <p className='text-3xl font-bold'>
    <Button onClick={resend} >Click here</Button>
    
    </p>
    <span>
    or back to <Link className='text-muted-foreground transition-colors underline hover:text-foreground' href={'/login'}>login?</Link>
    </span>
    </div>}
    

    <AlertDialog  open={alert} >
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Alert</AlertDialogTitle>
        <AlertDialogDescription>
          Please Enter by your Email 's Link
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <Link href={'/login'}><AlertDialogAction>Continue</AlertDialogAction></Link>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
      
    </div>
  )
}
