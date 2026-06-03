import React from 'react'
import { useUser } from '../../context/UserContext'
function MyCources() {
    const user = useUser();
  return (
    <div className='w-full bg-red-500 h-[50px]  '>
        <p>{user?.username}</p>
        
    </div>
  )
}

export default MyCources