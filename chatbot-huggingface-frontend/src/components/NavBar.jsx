import React from 'react'
import Heading from './Heading'

function NavBar({...props}) {
  return (
    <header {...props} className={`${props.className} flex sm:flex-col justify-between items-center gap-5 sm:p-4 bg-myHeaderGreen text-myWhite`}>
      <Heading as="p">
        TECH SUPPORT
      </Heading>
    </header>
  )
}

export default NavBar