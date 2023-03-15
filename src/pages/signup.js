import React, { useContext, useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../contexts/user.context';

const Signup = () => {
  const [inputData, setInputData] = useState({email:"", password:""});
  const navigate = useNavigate();
  const location = useLocation();
  const { emailPasswordSignup } = useContext(UserContext);  

  const updateForm = (value) => {
    return setInputData((prev) => {
      return {...prev, ...value}
    })
  }
  
  // As explained in the Login page.
  const redirectNow = () => {
    const redirectTo = location.search.replace("?redirectTo=", "");
    navigate(redirectTo ? redirectTo : "/");
  }

  // As explained in the Login page.
  const onSubmit = async () => {
    console.log(inputData.email)
    console.log(inputData.password)
    try {
      const user = await emailPasswordSignup(inputData.email, inputData.password);
      if (user) {
        redirectNow();
      }
    } catch (error) {
      alert(error);
    }
  };

  const onClickBack = () => {
    navigate(-1);
  }

  return (
    <div className="m-3 mt-10 mx-auto md:max-w-[70%] lg:max-w-[716px] custom-container ">
      <form onSubmit={onSubmit}>
          <div className="flex flex-col m-3">
              <h1 className='mb-3 text-xl font-bold'>Sign Up</h1>
              <span className="mb-3">Email</span>
              <input type="email" className="h-8 mb-3 custom-input" vlaue={inputData.email} onChange={(e) => {updateForm({email:e.target.value})}} />
              <span className="mb-3">Password</span>
              <input type="password" className="h-8 mb-3 custom-input" value={inputData.password} onChange={(e) => {updateForm({password:e.target.value})}} />
              <div className="flex justify-end">
                  <button type='button' className="mx-2 px-4 py-2 custom-button" onClick={onClickBack}>Back</button>
                  <button type='submit' className="mx-2 px-4 py-2 custom-button">Sign Up</button>
              </div>
              <p className='text-right mx-3 my-3'>Have an account already? <Link to="/login">Login</Link></p>
              
          </div>
      </form>
    </div>
  )
}

export default Signup
