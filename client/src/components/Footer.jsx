import { FaFacebook, FaInstagramSquare, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  
  return (
    <footer className='border-t'>
        <div className='container mx-auto p-4 text-center flex flex-col gap-2 lg:flex-row lg:justify-between'>
            <p>All Rights Reserveb 2025</p>
            <div className='flex items-center justify-center text-2xl gap-4'>
              <a href="" className='hover:text-primary-200'>
                <FaFacebook />
              </a>
              <a href="" className='hover:text-primary-200'>
                < FaInstagramSquare />
              </a>
              <a href="" className='hover:text-primary-200'>
                <FaLinkedin />
              </a>
            </div>
        </div>
    </footer>
  )
}

export default Footer