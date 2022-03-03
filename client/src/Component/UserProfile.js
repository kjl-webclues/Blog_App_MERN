// import react, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { NavLink } from "react-router-dom";
// import { user_Profile } from "../Actions/actions";


// const UserProfile = () => {

//     const userProfile = useSelector(state => state.userProfile)
//     console.log("userProfile", userProfile);

//     const dispatch = useDispatch()

//     useEffect(() => {
//         dispatch(user_Profile())
//     }, [dispatch])

//     return (
//         <div  className="mainDiv">
//             <div className='row'>            
//                 {
//                     userProfile && (
//                         <>
//                             <div className="addBlog">
//                                 <label>FirstName: {userProfile.firstName}</label><br/>
//                                 <label>LastName: {userProfile.lastName}</label><br/>
//                                 <label>Email: {userProfile.email}</label><br />
//                                 <NavLink to={`/editUser/:?id=${userProfile._id}`}><button className='editbtn'>Edit</button></NavLink>
//                             </div>


                           
//                         </>
//                     )
//                 }
//             </div>                    
//         </div>

        


//     )
// }

// export default UserProfile