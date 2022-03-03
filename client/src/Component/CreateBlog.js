import React, { useEffect, useState } from "react";
import * as Yup from 'yup'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { add_Banner, create_Blog, edit_UserBlog, update_User_Blog } from "../Actions/actions";
import queryString from "query-string";
import { useFormik } from "formik";

const CreateBlog = () => {
    const {id} = queryString.parse(window.location.search)
    // console.log("queryString", id);

    const [banner, setBanner] = useState(''); //For Get Banner
    const [value, setvalue] = useState(''); //For Get Banner

    const [editBlog, setEditBlog] = useState([]) //For store the Edited Blog Value
    const LoginUserDetails = useSelector(state => state.LoginUserDetails)


    const dispatch = useDispatch()

    const history = useHistory()

    const Banner = useSelector(state => state.Banner) //For Get Banner

    console.log("Banner",Banner);

    
    const Toggle = useSelector(state => state.Toggle)

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .min(5, "Too Short")
            .max(30, "Too Long")
            .required("Title is Required!"),
        
        description: Yup.string()
            .min(10, "Too Short")
            .max(1000, "Too Long")
            .required("Description is Required!"),
        
        category: Yup.string().required('Category is Required!'),
        
        tags: Yup.string()
            .max(10, "must be 10 or less")
            .required("Tag is Required!")
    })

    /*===========================Formik values ==================*/
    const initialValues = {
            title: "",
            description:"",
            category: "",
            tags: ""
    }

    const formik = useFormik({
        validationSchema,
        initialValues,        
        onSubmit: (values) => {
            if (id) {
                const formData = new FormData();
                formData.append('image', banner[0]);
                setvalue(values)
                dispatch(add_Banner(formData))
            } else {
            const formData = new FormData();
            formData.append('image', banner[0]);
            setvalue(values)
                dispatch(add_Banner(formData))
                values.target.reset();
            }            
        }
    })

    useEffect(() => {
        
        if (Banner.length !== 0 && !id) {
            dispatch(create_Blog(Banner, value))
            setvalue('')
            history.push('/myArticle')
        } else if (Banner.length !== 0 && id){
            dispatch(update_User_Blog(id, value, Banner))
            setvalue('')
            history.push('/myArticle')            
        }
    }, [Banner])
    
    //============================= get selectedEdit object ================================//
    useEffect(() => {
        if (id) {                 
            setEditBlog(edit_UserBlog)
        }
    }, [id])
    const edit_UserBlog = LoginUserDetails.find((elem) => elem._id === id ? elem : null );
            console.log("edit_UserBlog", edit_UserBlog);
            console.log("LoginUserDetails",LoginUserDetails);
    // console.log("edit_UserBlog", edit_UserBlog);
    //============================= set update blogs values ================================//
    useEffect(() => {
        if (id && editBlog) {
            formik.setValues(editBlog)
        }
    }, [editBlog,  id])


    useEffect(() => {
    if(Toggle === true){
      //============================= Navigate to profile =============================//
      history.push('/myArticle');
    }
}, [Toggle, history])
    
    return (
        <>  
            <div className="blogclass">
                {!id ? null :<h1>Add Blog</h1>}
                    <div className="mainDiv">
                        <div className="addBlog">
                            <form onSubmit={formik.handleSubmit}>
                            
                                <input type="text" 
                                    name="title"
                                    onChange={formik.handleChange}
                                    placeholder="Enter Blog Title" 
                                    {...formik.getFieldProps("title")}
                                /><br />
                                {formik.touched.title && formik.errors.title ? (
                                    <div className="fv-plugins-message-container">
                                        <div className="fv-help-block error">
                                            {formik.errors.title}
                                        </div>
                                    </div>
                                ) : null}  
                            
                                <textarea className="textarea"
                                    name='description'
                                    placeholder="Add Description" 
                                    {...formik.getFieldProps("description")}                                
                                /><br />
                                {formik.touched.description && formik.errors.description ? (
                                    <div className="fv-plugins-message-container">
                                        <div className="fv-help-block error">
                                            {formik.errors.description}
                                        </div>
                                    </div>
                                ) : null}                                                                    
                                                                                    
                                <select {...formik.getFieldProps("category")} className="dropdown" name='category'>
                                    <option placeholder="Category">Category</option>
                                    <option value="food">Food</option>
                                    <option value="travel">Travel</option>
                                    <option value="business">Business</option>
                                    <option value="fashion">Fashion</option>
                                    <option value="personal">Personal</option>                                
                                </select> <br />
                                {formik.touched.category && formik.errors.category ? (
                                    <div className="fv-plugins-message-container">
                                        <div className="fv-help-block error">
                                            {formik.errors.category}
                                        </div>
                                    </div>
                                ) : null}
                                                                
                                <input type="text"
                                    name="tags"
                                    placeholder="#tags" 
                                    {...formik.getFieldProps("tags")}
                                /><br />
                                {formik.touched.tags && formik.errors.tags ? (
                                    <div className="fv-plugins-message-container">
                                        <div className="fv-help-block error">
                                            {formik.errors.tags}
                                        </div>
                                    </div>
                                ) : null}
                            
                                <input type="file" name="file" className="blogImage" onChange={(e) => setBanner(e.target.files)} /><br />

                            {
                                <>
                                !id ?
                                    <button className="blogsave" type="submit"> (Submit) : (Update)</button> 
                                </>
                            }
                            </form>
                        </div>
                    </div>
            </div>
        </>
    )
}

export default CreateBlog
