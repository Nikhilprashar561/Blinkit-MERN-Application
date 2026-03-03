
import UserMenu from '../components/UserMenu'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Dashboard() {
  const user = useSelector(state => state.user)
  
  return (
    <section className='bg-white'>
        <div className='container mx-auto p-3 grid lg:grid-cols-[250px,1fr]'>
            {/** Left Side */}
            <div className='py-4 max-h-[calc(100vh-96px)] sticky top-24 overflow-auto hidden lg:block border-r'>
                < UserMenu />
            </div>

            { /** Right Side */}
            <div className='bg-white min-h-[75vh]'>
                < Outlet />
            </div>
        </div>
    </section>
  )
}

export default Dashboard

