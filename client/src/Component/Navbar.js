import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Get_my_Article, logout_User } from '../Actions/actions';


const Navbar = () => {
  const dispatch = useDispatch()

  const loginStatus = useSelector(state => state.loginStatus)
  
  const loginUser = useSelector(state => state.loginUser)
  
  const logout = () => {
     dispatch(logout_User())
  }
  
  useEffect(() => {
    dispatch(Get_my_Article())
  }, [dispatch])

  return (    
      <div className='nav_div'>        
        {
          loginStatus === true ? (
            <>                              
                <NavLink to='/myArticle'><button>My Article</button></NavLink>            
                <button  onClick={logout}>Logout</button>
              
                <div class="logo-image">
                  {loginUser && (<h3>{loginUser && (`Welcome ${loginUser.firstName} signIn as ${loginUser.email}`)}</h3>) }
                  {loginUser && <img src={loginUser.profileImage[0]}  alt='profile'/>}
                </div>                        
            </>
          ) : (
              <>
                <NavLink to='/registerPage'><button>Sign Up</button></NavLink>        
                <NavLink to='/loginPage'><button>Sign In</button></NavLink>
              </>
          )
        }        
      </div>
  )
}

export default Navbar