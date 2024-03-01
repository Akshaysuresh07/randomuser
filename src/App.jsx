import { useEffect, useState } from 'react'
import axios from 'axios'

import './App.css'

function App() {
  const [user,setUser]=useState([])
  const [bgChange,setBgChange]=useState(true)

  useEffect(()=>{
    fetchapi()
   
  },[])


 const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const fetchapi=async()=>{
    const response = await axios.get('https://dummyjson.com/users')

    const randomindex=Math.floor(Math.random()*response.data.users.length)
    console.log(randomindex)
    console.log(response.data.users[randomindex].company);
    setUser(response.data.users[randomindex])
    setBgChange(getRandomColor())

  }
  const handleRefresh=async()=>{
    const res=await fetchapi()
    console.log(res);
    const newBgColor = getRandomColor();
    setBgChange(newBgColor);

  }



  return (
    
     <>
      <h1 className='text-center text-fw-3'>Random User</h1>
     
     <div className=' mt-3 item-center  ' style={{ backgroundColor:bgChange,marginLeft:"400px", padding: 20 ,width:"700px" }}>
    <div className='d-flex me-5 justify-content-center '>
      
       <img src={user.image} alt="User profile" />
      <div className='p-5' >
         <p>Name: {user.firstName} {user.lastName}</p>
         <p>Email: {user.email}</p>
         <p>Phone: {user.phone}</p>
          <p>Age: {user.age}</p>
          
   

          
      </div>
   
      
     </div>
    <div className='d-flex justify-content-center'>
     <button style={{backgroundColor:"green"}}  onClick={handleRefresh}>Refresh</button>
     </div>
    </div>
  
     </>
    
    
  )
}

export default App
