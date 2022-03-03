import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './Component/Navbar';
import HomePage from './Component/HomePage';
import RegisterForm from './Component/RegisterForm';
import LoginForm from './Component/LoginForm';
import CreateBlog from './Component/CreateBlog';
import Blogs from './Component/Blogs';
import MyArticle from './Component/MyArticle';
import Error404 from './Component/Error';
import ProtectedRoute from './Component/ProtectedRoutes';
import './index.css';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
 
const App = () => {
  const loginStatus = useSelector(state => state.loginStatus)

  const cookie = Cookies.get('jwtLogin')
    return (
      <>
        <Navbar />
          <hr />
            <Switch>
              <Route exact path='/' component={HomePage} />
              <Route exact path='/registerPage' component={RegisterForm} />
              <Route exact path='/editUserBlog/:id' component={CreateBlog}></Route>

          
          
              <ProtectedRoute exact path='/createBlog' component={CreateBlog} isAuth={cookie} />
              <ProtectedRoute exact path='/publicBlog' component={Blogs} isAuth={cookie} />
              <ProtectedRoute exact path='/myArticle' component={MyArticle} isAuth={cookie} />          
          
              {loginStatus === false ? 
                  <Route exact path='/loginPage' component={LoginForm} />
                    : <Redirect to='./publicBlog' isAuth={cookie} />}
                      <Route component={Error404} />                   
            </Switch> 
      </>
   )
 }
 
 export default App