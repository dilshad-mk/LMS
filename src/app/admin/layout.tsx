import React from 'react'

function adminDashbordlayout({children}: {children: React.ReactNode}) {
  return (
       <div className='min-h-screen 
      '>

        {children}
        </div>
  )
}

export default adminDashbordlayout;