import Link from 'next/link'
import React from 'react'

interface props {
  children: React.ReactNode;
  href: string;
}

export default function FloatingButton({children, href}: props) {
  return (
    <Link href={href}>
      <button className=' fixed right-5 bottom-24 bg-orange-400 p-3 rounded-full text-white
                            hover:bottom-[5.2rem] transition'>
          {children}
      </button>
      
    </Link>
  )
}
