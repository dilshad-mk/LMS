import React from 'react'

function Dashbordlayout({children}: {children: React.ReactNode}) {
  return (
       <div className='min-h-screen 
      '>

        {children}
        </div>
  )
}

export default Dashbordlayout;