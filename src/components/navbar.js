import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../contexts/user.context'

const Navbar = () => {
  const { user, logOutUser } = useContext(UserContext);

  const logOut = async () => {
    await logOutUser();
    window.location.reload(true);
    return;
  }
  
  return (
    <div className='h-10'>
        <div className="px-2 flex justify-between items-center w-full h-full">
              <ul className="flex text-sm text-gray-500 mx-auto">
                <Link className='mx-8' to='/'>Home</Link>
                <Link className='mx-8' to='/note'>Note</Link>
              </ul>
              <ul className="flex text-sm text-gray-500 mx-auto">
                <Link className={user ? 'hidden' : 'mx-8'} to='/login'>Login</Link>
                <Link className={user ? 'hidden' : 'mx-8'} to='/signup'>Sign Up</Link>
                <Link className={user ? 'mx-8' : 'hidden'} onClick={logOut}>LogOut</Link>
              </ul>        
        </div>
    </div>
  )
}

export default Navbar
