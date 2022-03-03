import { ADD_BANNER, Comment_Article, CREATE_BLOG,  DELETE_BLOG,  DISLIKE_ARTICLES,  EDIT_USER_BLOG,  GET_BLOG_LIST, Get_CommentArticle, Get_LikeArticle, GET_MY_ARTICLE, Like_Article, LOGIN_USER, LOGOUT_USER, REGISTER_USER, UPDATE_USER_BLOG, UPLOAD_PROFILE_IMAGE, VALIDE_REGISTER } from "../Actions/actionTypes"

const initialState = {
    loginStatus: false,
    blogDetails: [], //Public Blog
    LoginUserDetails: [], //Personal Blog
    validRegister: false,
    loginUser: '',
    User: [],
    Toggle: false,
    Banner: [],
    Like: [],
    Comment: []
    
}

const blogReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER:
            return {
                ...state,
                validRegister : true
            }
        
        case UPLOAD_PROFILE_IMAGE:
            return {
                ...state,
            }
        
        case LOGIN_USER:
            return {
                ...state,
                loginStatus: true
            }
        
        case CREATE_BLOG:
            return {
                ...state,
                loginStatus: true,
                Toggle: true
            }
        
        case ADD_BANNER:
            return {
                ...state,
                Banner: action.payload
            }
        
        case GET_BLOG_LIST:
        
            return {
                ...state,
                loginStatus: true,
                blogDetails: action.payload
            }
        
        case GET_MY_ARTICLE:
            return {
                ...state,
                loginStatus: true,
                LoginUserDetails: action.payload.MyArticles,
                loginUser: action.payload.LoginUser,
                Banner: [],
                Toggle: false
            }
        case EDIT_USER_BLOG:
            return {
                ...state
            }
        
        case UPDATE_USER_BLOG:
            return {
                ...state,
                Toggle:[]
            }
        
        case DELETE_BLOG:
            return {
                ...state,
                Toggle: true
            }
    
        case LOGOUT_USER:
            return {
                ...state,
                loginStatus: false
            }
        
        case Like_Article:
            return {
                ...state,
                Toggle: true
            }
        
        case Get_LikeArticle: 
            return {
                ...state,
                Like: action.payload
            }
        
        case DISLIKE_ARTICLES: {
            return {
                ...state                
            }
        }
        
        case Comment_Article:
            return {
                ...state,
                Toggle: true
            }
        
        case Get_CommentArticle: 
            return {
                ...state,
                Comment: action.payload
            }
        default: 
            return state
    }
}

export default blogReducer