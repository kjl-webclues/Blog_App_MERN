import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Get_Blog_List, commentArticle, getCommentArticles, likeArticle, getLikeArticles, Get_my_Article } from "../Actions/actions"
import debounce from 'lodash.debounce'

const Blogs = () => {

    const dispatch = useDispatch()

    const [showLikedUser, setShowLikedUser] = useState("Likes");

    const [comment, setComment] = useState('')
    // console.log("comment", comment);
    const [search, setSearch] = useState('')

    const Toggle = useSelector(state => state.Toggle)
    const blogDetails = useSelector(state => state.blogDetails);

    const Like = useSelector(state => state.Like);
    const loginUser = useSelector(state => state.loginUser);
    const Comment = useSelector(state => state.Comment);
    // console.log("blogDetails", blogDetails);
  

    const userId = loginUser._id;
    const username = loginUser.firstName;

    const handleSearch = debounce((value) => {
        setSearch(value)
    }, 500)

    //
    const handleLike = (articleId) => {
        dispatch(likeArticle(articleId, userId, username))
    }

    const handleComment = (articleId ) => {
        dispatch(commentArticle(articleId, userId, username, comment))
    }

    useEffect(() => {
        dispatch(Get_my_Article())
        dispatch(Get_Blog_List(search))
        dispatch(getLikeArticles())
        dispatch(getCommentArticles())
    }, [dispatch, Toggle, search])


    return (
        <>
            <h1>Blog List </h1>
            <div className='searchbar'>
                <input type="search" placeholder='Search Here...'onChange={(e) => handleSearch(e.target.value)} />        
            </div>
            <div>
                {
                    blogDetails && blogDetails.map((elem) => {
                    
                        return (
                            <>
                                {
                                    elem.Blogs && 
                                         (
                                            <>                                                    
                                                <div className="mainBlog">
                                                    <div className="midDiv">
                                                        <h2>Author : {elem.firstName} { elem.lastName}</h2>                                                        
                                                        <div key={elem._id}> 
                                                            
                                                            <img width="100%" height="200vh" src={elem.Blogs.banner} alt='article banner'/>                                                            
                                                            <label>Title:<td>{elem.Blogs.title }</td> </label>
                                                            <br />
                                                            <label>Category:<td>{elem.Blogs.category}</td></label>
                                                            <br />  
                                                            <label>Description:<td>{elem.Blogs.description}</td></label>
                                                            <br />
                                                            <label>Tags:<td>{elem.Blogs.tags}</td></label>
                                                            <br /><br />

                                                            <div className='commentBox'>
                                                                <input type="text" placeholder="Write Comments..." 
                                                                    onChange={(e) => setComment(e.target.value)}
                                                                />
                                                            </div>
                                                            <br /><br />
                                                            
                                                            {
                                                                Like && Like.map((like) => {
                                                                    return (
                                                                        <>
                                                                            {
                                                                                elem.Blogs._id === like.articleId ? 
                                                                                    (
                                                                                        <>
                                                                                            {showLikedUser === "Likes" ? (
                                                                                                <div className="Likes">
                                                                                                    <h4 onClick={() => setShowLikedUser("users")}>{ `${like.Users.length} Likes`}</h4>
                                                                                                </div>
                                                                                            ) : null}
                                                                                        </>
                                                                                    ) : null
                                                                            }
                                                                            {
                                                                                elem.Blogs._id === like.articleId ? 
                                                                                    (
                                                                                        <>
                                                                                            {showLikedUser === "users" ? (
                                                                                                <div className="likesUser">
                                                                                                    {like.Users.map((elem) => {
                                                                                                        return (
                                                                                                            <>
                                                                                                                <h2 onClick={() => setShowLikedUser("Likes")}>{`${elem.username}`}</h2>
                                                                                                            </>
                                                                                                        )
                                                                                                    })
                                                                                                        }
                                                                                                </div>
                                                                                            ) : null}
                                                                                        </>
                                                                                    ) : null
                                                                            }
                                                                        </>
                                                                    )
                                                                })
                                                            }
                                                        
                                                        <button class="btn btn-block btn-primary" onClick={() => handleLike(elem.Blogs._id)}><i class="fa fa-thumbs-up">Like</i> </button>
                                                        <button class="btn btn-block btn-primary" onClick={() => handleLike(elem.Blogs._id)}><i class="fa fa-thumbs-up">Dislike</i> </button>
                                                                                                                    
                                                        <button class="btn btn-block btn-primary" onClick={() => handleComment(elem.Blogs._id)}><i class="fa fa-thumbs-up">Comment</i> </button>
                                                            {
                                                                Comment && Comment.map((ele) => {
                                                                    return (
                                                                        <>
                                                                            {
                                                                            elem.Blogs._id === ele.articleId ? 
                                                                                (
                                                                                <>
                                                                                    <h2 style={{ margin: 0 , textAlign: "left" }}>Comments</h2>
                                                                                    {
                                                                                    ele.Users.map((user) => {
                                                                                        return (
                                                                                        <>
                                                                                            <div className= 'showcomment'>
                                                                                            <h2 >{user.username}</h2>
                                                                                            <p>{user.comment}</p>
                                                                                            </div>
                                                                                        </>
                                                                                        )
                                                                                    })
                                                                                    }
                                                                                </>
                                                                                )
                                                                            : null
                                                                            }
                                                                        </>
                                                                        )
                                                                })
                                                            }
                                                        </div>                                                        
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }
                                
                            </>
                            
                        )
                    })
                }
            </div>


        </>    
    )






    
}

export default Blogs