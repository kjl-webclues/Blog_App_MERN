import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from 'formik';
import { register_user, upload_ProfileImage, valid_Register } from '../Actions/actions';


const RegisterForm = () => {

    const [profile, setProfile] = useState('')

    const dispatch = useDispatch()

    const history = useHistory()

    const validRegister = useSelector(state => state.validRegister)


    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .max(20, "must be 20 character or less")
            .required("Firstname is Required!"),
        
        lastName: Yup.string()
            .max(20, "must be 20 character or less")
            .required('Lastname is Required!'),
        
        email: Yup.string()
            .email('E-mail is not valid!')
            .required('E-mail is required!'),
        
        password: Yup.string()
            .min(6, 'must be 6 at least character')
            .max(8, 'must be 8 at least character')
            .required('Password is required!'),
        
        confirmpassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Password must match')
            .required('Password is required!'),
        
    })  
    //////////////////////////////// Formik Values ///////////////////////////////
        const initialValues = {
            firstName: "",
            lastName:"",
            email: "",
            password: "",
            confirmpassword: "",
    }
    
    const formik = useFormik({
        validationSchema,
        initialValues,
        onSubmit: (values) => {
            const formData = new FormData();            
            formData.append('image', profile[0]);
            dispatch(register_user(values))
            dispatch(upload_ProfileImage(formData, values.email))
        },   
    })

    useEffect(() => {
        if (validRegister === true) {
            history.push('/loginPage')
            dispatch(valid_Register());
        }
    }, [validRegister, dispatch, history])

    return (
        <>
            <div className='wrapper'>
                <h1>Register Form</h1>                
                    <div className="mainDiv">
                        <div className="subDiv">
                            <form className='registerform' onSubmit={formik.handleSubmit}>
                                <input type="text"
                                    name="firstName"
                                    placeholder='Enter FirstName'
                                    onChange={formik.handleChange}
                                    {...formik.getFieldProps("firstName")}
                                /><br />
                                {formik.touched.firstName && formik.errors.firstName ? (
                                    <div className="fv-plugins-message-container">
                                        <div className="fv-help-block error">
                                            {formik.errors.firstName}
                                        </div>
                                    </div>
                                ) : null}        

                                <input type="text"
                                    name="lastName"
                                    placeholder='Enter LastName'
                                    onChange={formik.handleChange}
                                    {...formik.getFieldProps("lastName")}
                                /><br />
                                {formik.touched.lastName && formik.errors.lastName ? (
                                    <div className="fv-plugins-message-container">
                                        <div className="fv-help-block error">
                                            {formik.errors.lastName}
                                        </div>
                                    </div>
                                ) : null}

                                <input type="email"
                                    name="email"
                                    placeholder='Enter Email'
                                    onChange={formik.handleChange}
                                    {...formik.getFieldProps("email")}
                                /><br />
                                {formik.touched.email && formik.errors.email ? (
                                    <div className="fv-plugins-message-container">
                                        <div className="fv-help-block error">
                                            {formik.errors.email}
                                        </div>
                                    </div>
                                ) : null}


                                <input type="password"
                                    name='password'
                                    placeholder='Enter Password'
                                    onChange={formik.handleChange}
                                    {...formik.getFieldProps("password")}
                                /><br />
                                {formik.touched.password && formik.errors.password ? (
                                    <div className="fv-plugins-message-container">
                                        <div className="fv-help-block error">
                                            {formik.errors.password}
                                        </div>
                                    </div>
                                ) : null}
                                
                                <input type="password"
                                    name='confirmpassword'
                                    placeholder='Enter Confirm Password'
                                    onChange={formik.handleChange}
                                    {...formik.getFieldProps("confirmpassword")}

                                /><br />
                                {formik.touched.confirmpassword && formik.errors.confirmpassword ? (
                                    <div className="fv-plugins-message-container">
                                        <div className="fv-help-block error">
                                            {formik.errors.confirmpassword}
                                        </div>
                                    </div>
                                ) : null}
                            
                                <input type='file' name="file" onChange={(e) => setProfile(e.target.files)} /><br />
                                                            
                                <button className='registerbtn'>Submit</button>

                            </form>
                            <div className='paragrapg'>                   
                                <p>already registered <NavLink to='/loginpage'><button>Login</button></NavLink></p>
                            </div>
                        </div>
                    </div>
            </div>    
        </>
    )
}

export default RegisterForm