import axios from 'axios';
import { useQRCode } from 'next-qrcode';
import React, { useEffect, useState } from 'react';
export  function  Qrcodeimg({username}:{username:string}) {
 const {Canvas} =useQRCode();
 const [secretLink, setSecretLink] = useState('1');

 const getsecretlink= async () => {
  
  const res=await axios.post(process.env.HOST+"/user/twostepbind",{username:username},{
    headers:{
      Authorization:typeof window !== "undefined" ? window.localStorage.getItem('token') : false,
      'Content-Type':'application/x-www-form-urlencoded'}
  })  
  console.log(username)
  console.log(res)
  setSecretLink(res.data.data)
}
useEffect(()=>{
  getsecretlink()
},[])


  
 
  return (
    <div className='w-full justify-center flex'>
       <Canvas 
      text={secretLink}
      options={{
        errorCorrectionLevel: 'L',
        margin: 3,
        scale: 4,
        width: 200,
        color: {
          dark: '#010599FF',
          light: '#FFBF60FF',
        },
      }}
    />
    </div>
  );
}
 