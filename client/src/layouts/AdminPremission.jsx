
import { isAdmin } from '../utils/isAdmin'
import { useSelector } from 'react-redux'

const AdminPremission = ({children}) => {
    const user = useSelector(state => state.user)
  return (
    <>
     {
        isAdmin(user.role) ? children : <p className='text-red-600 bg-red-100 p-4'>Do Not Have an permission access these page</p>
     }
    </>
  )
}

export default AdminPremission