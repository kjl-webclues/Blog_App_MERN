import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { delete_Blog, Get_my_Article } from '../Actions/actions'

const MyArticle = () => {
  const dispatch = useDispatch()

  const Toggle = useSelector(state => state.Toggle)

  const LoginUserDetails = useSelector(state => state.LoginUserDetails)
  // console.log("LoginUserDetails", LoginUserDetails);

//========================== For Delete Blog ====================================//
  const handleDeleteBlog = (id) => {
    if (window.confirm("Are You Sure")) {
      dispatch(delete_Blog(id))
    }
  }

//========================== For Get MyArticle List ====================================//
  useEffect(() => {
    dispatch(Get_my_Article())
  }, [Toggle,dispatch])

  return (
    <>
      <h1>My Articles</h1>

      <div className='myarticle-btn'>
        <NavLink to='/createBlog'><button className='create-blogbtn'>Create Blog</button></NavLink>
      </div>
            <div>
                {
                    LoginUserDetails.map((elem) => {
                      return (
                        <div className='mainBlog'>
                          <div className='midDiv'>                            
                            <div key={elem._id}>
                              
                                  <div className='img'> 
                                    <img width="100%" height="300vh" src={elem.banner} alt='article banner'/>
                                  </div>  
                              
                                  <label>Title:<td>{elem.title }</td></label>
                                      <br />
                                  <label>Category:<td>{elem.category}</td></label>
                                      <br />  
                                  <label>Description:<td>{elem.description}</td></label>
                                      <br />
                                  <label>Tags:<td>{elem.tags}</td></label>
                                      <br />
                                  <NavLink to={`/editUserBlog/:?id=${elem._id}`}><button class="btn btn-block btn-primary"><i class="fa fa-thumbs-up">Edit</i> </button></NavLink><br />
                                  {/* <NavLink to={`/editUserBlog/:?id=${elem._id}`}><button className='editbtn'>Edit</button></NavLink> &nbsp; */}
                                  {/* <button className="deletebtn" onClick={() => handleDeleteBlog(elem._id)}>Delete</button> */}
                                  <button class="btn btn-block btn-primary" onClick={() => handleDeleteBlog(elem._id)}><i class="fa fa-thumbs-up">Delete</i> </button>
                            </div>
                          </div>
                        </div>                          
                      )
                  })
                }
            </div>
    </>
  )
}

export default MyArticle