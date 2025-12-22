import React from 'react'
import UserMenu from '../components/UserMenu'
import { IoIosClose } from "react-icons/io";

export default function UserMenuPage() {
  return (
    <section className='bg-white h-full w-full py-4'>
      <button onClick={() => window.history.back()} className='text-neutral-800 w-fit ml-auto'>
        < IoIosClose size={25} />
      </button>
      <div className='container mx-auto px-3 py-5 pb-5'>
        < UserMenu />
      </div>
    </section>
  )
}