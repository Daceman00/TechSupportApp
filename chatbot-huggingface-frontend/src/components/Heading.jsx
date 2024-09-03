import React from 'react'

const sizes = {
    textxs: "text-[13px] font-medium",
    textmd: "text-[14px] font-medium",
    headingxs: "text-[14px] font-semibold",
    headings: "text-[20px] font-bold lg:text[17-px]"
}

function Heading({children, classname = "", size = "texts", as, ...restProps}) {
    const Component = as || "h6"
  return (
    <Component classname={`text-white-a700 font-poppins ${classname} ${sizes[size]}`} {...restProps}>
        {children}
    </Component>
  )
}

export default Heading