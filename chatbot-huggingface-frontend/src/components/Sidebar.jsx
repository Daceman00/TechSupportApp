import React from 'react'

function Sidebar() {
  return (
    <aside className='sticky flex flex-col justify-start items-center bg-mySidebarGreen h-screen mt-[0rem] overflow-auto'>
        <img className='h-[8rem] w-[10rem]' src='/src/assets/591638_15209895_2779177_eb4b7a2a_image-removebg-preview.png' alt='Logo'/>
        <hr className='w-full border-myWhite border-t-2' />        
    </aside>
  )
}

export default Sidebar