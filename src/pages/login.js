import React, { useContext, useState, useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../contexts/user.context'

const Login = () => {
  const { user, fetchUser, emailPasswordLogin } = useContext(UserContext);
  const [inputData, setInputData] = useState({email: "", password: ""});
  const navigate = useNavigate();
  const location = useLocation();

  const updateForm = (value) => {
    return setInputData((prev) => {
      return {...prev, ...value}
    }) 
  }

  const redirectNow = () => {
    const redirectTo = location.search.replace("?redirectTo=", "");
    navigate(redirectTo ? redirectTo : "/");
  }

  const loadUser = async () => {
    if (!user) {
      const fetchedUser = await fetchUser();
      if (fetchedUser) {
        // Redirecting them once fetched.
        redirectNow();
      }
    }
  }

  useEffect(() => {
    loadUser();
  },[]);

  const onSubmit = async (event) => {
    event.preventDefault();
    
    try {
      // Here we are passing user details to our emailPasswordLogin
      // function that we imported from our realm/authentication.js
      // to validate the user credentials and login the user into our App.
      const user = await emailPasswordLogin(inputData.email, inputData.password);
      if (user) {
        redirectNow();
      }
    } catch (error) {
      alert(error)
    }
  };

  const onClickBack = () => {
    navigate(-1);
  }

  return (
    <div className="m-3 mt-10 mx-auto md:max-w-[70%] lg:max-w-[716px] custom-container ">
      <form onSubmit={onSubmit}>
          <div className="flex flex-col m-3">
              <h1 className='mb-3 text-xl font-bold'>Login</h1>
              <span className="mb-3">Email</span>
              <input type="email" className="h-8 mb-3 custom-input" value={inputData.email} onChange={(e) => updateForm({email:e.target.value})} />
              <span className="mb-3">Password</span>
              <input type="password" className="h-8 mb-3 custom-input" value={inputData.password} onChange={(e) => updateForm({password:e.target.value})} />
              <div className="flex justify-end">
                  <button type='button' className="mx-2 px-4 py-2 custom-button" onClick={onClickBack}>Back</button>
                  <button className="mx-2 px-4 py-2 custom-button" type='submit'>Login</button>
              </div>
              <p className='text-right mx-3 my-3'>Don't have account? <Link to="/signup">Sign Up</Link></p>
              
          </div>
      </form>
    </div>
  )
}

export default Login
