import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ADD_BANNER, Comment_Article, CREATE_BLOG, DELETE_BLOG, DISLIKE_ARTICLES, EDIT_USER_BLOG, GET_BLOG_LIST, Get_CommentArticle, Get_LikeArticle, GET_MY_ARTICLE, Like_Article, LOGIN_USER, LOGOUT_USER, REGISTER_USER, UPDATE_USER_BLOG, UPLOAD_PROFILE_IMAGE, VALIDE_REGISTER } from "./actionTypes";
toast.configure()


//==================================Register User =============================//
export const register_user = (values) => dispatch => {
       axios.post(`/signUp`, values)
            .then((res) => {
                const result = res.data
                // console.log(result);
                if (result === "Email already Exists") {
                toast.error(result, { position: toast.POSITION.TOP_LEFT, autoClose:2000 })
                } else {
                    toast.success(result, { position: toast.POSITION.TOP_LEFT, autoClose: 2000 });
                    dispatch({ type: REGISTER_USER, payload: values })                    
                }
            })
            .catch(error => {
                console.log('error', error);
            })

}
//============================= End =============================//

//============================= Valid Register Toggle =============================//
export const valid_Register = () => dispatch => {
    dispatch({type: VALIDE_REGISTER})
}
//============================= End =============================//

//==================================Upload ProfileImage =============================//
export const upload_ProfileImage = (photo, email) => dispatch => {
       axios.post(`/AddProfileImage/?email=${email}`, photo)
            .then((res) => {
                const result = res.data
                // console.log(result);
                if (result === "Email already Exists") {
                toast.error(result, { position: toast.POSITION.TOP_LEFT, autoClose:2000 })
                } else {
                    toast.success(result, { position: toast.POSITION.TOP_LEFT, autoClose: 2000 });
                    dispatch({ type: UPLOAD_PROFILE_IMAGE })                    
                }
            })
            .catch(error => {
                console.log('error', error);
            })

}
//============================= End =============================//

//==================================Login User =============================//
export const login_User = (values) => dispatch => {
        axios.post(`/signIn`, values)
            .then((res) => {
                // console.log("values", values)                
                toast.success("Login Successful", { position: toast.POSITION.TOP_LEFT, autoClose:2000 });
                dispatch({ type: LOGIN_USER })
            })
            .catch(error => {
                toast.error("Invalid Credentials", { position: toast.POSITION.TOP_LEFT, autoClose:2000 })
                console.log('error', error);
            })
    
}
//============================= End =============================//

//================================== Create Blog List =============================//
export const create_Blog = (Banner, values) => dispatch => {
    axios.post(`/createBlog`, {Banner, values})
        .then((res) => {                
                console.log("values", values)                
                dispatch({ type: CREATE_BLOG })
            })
            .catch(error => {
                console.log('error', error);
            })
}
//============================= End =============================//

//================================== Add Banner =============================//
export const add_Banner = (banner) => dispatch => {
    axios.post(`/AddBlogBanner`, banner)
        .then(res => {
            console.log("banner", res.data);
            dispatch({ type: ADD_BANNER, payload: res.data})            
            })
        .catch(error => {
                console.log("error", error);            
            })
}
//============================= End =============================//

//================================== Get Blog List =============================//
export const Get_Blog_List = (search) => dispatch => {
    axios.get(`/getBlogDetails/?Search=${search}`)
        .then(res => {
            // console.log("res.data", res.data);
            dispatch({ type: GET_BLOG_LIST , payload: res.data })            
            })
        .catch(error => {
                console.log("error", error);            
            })
}
//============================= End =============================//

//================================== Get My Article =============================//
export const Get_my_Article = () => dispatch => {
    axios.get(`/getMyArticle`)
        .then(res => {
            // console.log("res.data", res.data);
            dispatch({ type: GET_MY_ARTICLE , payload: res.data })            
            })
        .catch(error => {
                console.log("error", error);            
            })
}
//============================= End =============================//


//================================== Edit User Blog =============================//
export const edit_UserBlog = (id) => dispatch => {
    return (
        axios.get(`/editUserBlog/${id}`)
            .then(res => {
                const editUserBlog = res.data;
                dispatch({type: EDIT_USER_BLOG , payload:editUserBlog})
            })
                .catch(error => {
                console.log("error", error);
            })
    )
}
//============================= End =============================//

//================================== Update User Blog =============================//
export const update_User_Blog = (id, values, Banner) => dispatch => {
    console.log("values",values);
    console.log("Banner",Banner);

    return (
        axios.put(`/updateUserBlog/${id}`, {Banner, values})
            .then(res => {
                toast.success("Blog Updated Successfully!", { position: toast.POSITION.TOP_LEFT, autoClose:2000 });                
                dispatch({ type: UPDATE_USER_BLOG })
            })
            .catch(error => {
                toast.error("Blog Not Update!", { position: toast.POSITION.TOP_LEFT, autoClose:2000 });
                console.log("error", error);
            })
    )
}
//============================= End =============================//

//============================= Like Article Action Start =============================

export const likeArticle = (articleId, userId, firstName) => {
    console.log("articleId",articleId, userId, firstName);
    return (dispatch) => {
        axios.put(`/likeArticle/?ID=${articleId}`,{userId, firstName} )
        .then(() => {
            dispatch({type: Like_Article});
        })
        .catch(err => {
            console.log(err);
        })
    }
}
//============================= End =============================

//============================= Get Like Articles Action Start =============================//
export const getLikeArticles = () => {

    return (dispatch) => {
        axios.get(`/likeArticle`)
        .then((res) => {
            dispatch({type: Get_LikeArticle, payload: res.data});
        })
        .catch(err => {
            console.log(err);
        })
    }
}
//============================= End =============================//

//============================= disLike Articles Action Start =============================//
export const dislike_Articles = () => dispatch => {
    axios.put(`/dislikeArticle`) 
        .then((res) => {
            dispatch({type: DISLIKE_ARTICLES})
        })
        .catch(err => {
            console.log(err);
        })
}

//============================= Comment Article Action Start =============================

export const commentArticle = (articleId, userId, firstName, comment) => {
console.log(articleId, userId, firstName, comment);
    return (dispatch) => {
        axios.post(`/commentArticle/?ID=${articleId}`, {comment, userId, firstName})
        .then(() => {
            dispatch({type: Comment_Article});
        })
        .catch(err => {
            console.log(err);
        })
    }
}

//============================= End =============================

//============================= Get Comment Articles Action Start =============================

export const getCommentArticles = () => {

    return (dispatch) => {
        axios.get(`/commentArticle`)
        .then((res) => {
            dispatch({type: Get_CommentArticle, payload: res.data});
        })
        .catch(err => {
            console.log(err);
        })
    }
}

//============================= End =============================


//================================== Delete Blog  =============================//
export const delete_Blog = (id) => dispatch => {
    axios.delete(`/deleteBlog/?id=${id}`)
        .then(() => {
            toast.success("Blog Deleted Successfully", { position: toast.POSITION.TOP_LEFT, autoClose: 2000 });
            console.log("DeleteBlog", id);
            dispatch({type: DELETE_BLOG })
        })
        .catch(error => {
            toast.error("Blog not Deleted", { position: toast.POSITION.TOP_LEFT, autoClose: 2000 });            
            console.log('error', error);
        })
}
//============================= End =============================//

//================================== Logout User =============================//
export const logout_User = () => dispatch => {
    return (
        axios.get(`/logout`)
            .then(res => {
                toast.success("User Logout", { position: toast.POSITION.TOP_LEFT, autoClose:2000 });
                dispatch({ type: LOGOUT_USER})
            })
            .catch(error => {
                toast.error("User Can Not Logout", { position: toast.POSITION.TOP_LEFT, autoClose:2000 });
                console.log("error", error);
            })
    )
}
//============================= End =============================//

