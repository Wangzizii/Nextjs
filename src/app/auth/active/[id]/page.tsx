 "use client"
// "use server"
import axios from 'axios'
import { useRouter} from 'next/navigation'

export default async function Page({params}:{params:{id:string}}) {
    const Router=useRouter()
    const active=async (params:string) => {
       const res= await axios.get(process.env.HOST+"/user/active/"+params)
      //  console.log(res.data)
       if(res.data.code==200){
        return true
       }
       else{
        
        
        return false
       }
    }
    const activeres= await active(params.id)
    
    console.log(activeres)
    const i=setTimeout(() => {
      Router.push('/login')

    }, 1500);
   



    
  return (
    <div className='text-center'>
        
    <p className='text-3xl font-bold'>
    {activeres?"Activation Success":"Activation Failed"}
    </p>

      
    </div>
  )
}
