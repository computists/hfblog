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
    <div className="m-3 mt-10 mx-auto sm:max-w-[60%]">
      <div className="mx-auto my-10 custom-container">
        <form action="">
            <div className="flex flex-col m-3">
                <h1 className='mb-3 text-xl font-bold'>Sign Up</h1>
                <span className="mb-3">Email</span>
                <input type="email" className="h-8 mb-3" vlaue={inputData.email} onChange={(e) => {updateForm({email:e.target.value})}} />
                <span className="mb-3">Password</span>
                <input type="password" className="h-8 mb-3" value={inputData.password} onChange={(e) => {updateForm({password:e.target.value})}} />
                <div className="flex justify-end">
                    <button className="mx-2 px-4 py-2" onClick={onClickBack}>Back</button>
                    <button className="mx-2 px-4 py-2" onClick={onSubmit}>Sign Up</button>
                </div>
                <p className='text-right mx-3 my-3'>Have an account already? <Link to="/login">Login</Link></p>
                
            </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
