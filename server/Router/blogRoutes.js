const express = require('express')
const Blog = require('../Models/blogSchema')
const authenticate = require('../middleware/checkAuth')
const router = express.Router()
const bcrypt = require('bcrypt')

const cloudinary = require('../utils/cloudinary')
const upload = require('../utils/multer')
const Like = require('../Models/LikeSchema')
const Comment = require('../Models/CommentSchema')

//================================== For Register User ===================================//
router.post('/signUp', async (req, res) => {
    const user = req.body

    try {
        const emailExist = await Blog.findOne({ email: user.email })
        if (emailExist) {
            res.send("Email already Exists")
        } else {
            const result = await Blog(user).save();
            res.send("Register Sucessfully")
        }
    }
    catch (err) {
        console.log(err);
        res.send("error" + err)
    };
})
//================================== For Upload Image ===================================//
router.post('/AddProfileImage',  upload.single('image'), async (req, res) => {
    try {
        const profileImage = req.file;

        const uploadProfile = await cloudinary.uploader.upload(profileImage.path, { resource_type: 'auto' })

        const email = req.query.email 

        await Blog.updateOne({ email: email }, { $push: { profileImage : uploadProfile.secure_url } });

        res.send({msg: "Upload Profile Image"})

    } catch (err) {
        res.status(400).send({ error: "Profile Not Upload" })

    }
})

//================================== For Login User ===================================//
router.post('/signIn', async (req, res) => {
    try {
        let token;
        const { email, password } = req.body;

        //user Exist
        const userLogin = await Blog.findOne({ email: email });

        if (userLogin) {
            const validate = await bcrypt.compare(password, userLogin.password);

            if (!validate) {
            res.status(400).send({ error: "Invalid Credientials!"});
            }
            else {
                //============================= Generate Token =============================
                token = await userLogin.generateAuthToken();

                //============================= Store Token In Cookie =============================
                res.cookie("jwtLogin", token , {
                    expires: new Date(Date.now() + 3600000),

                });
                //============================= Send Login User =============================
                res.send({msg: "User Login Successfully!"});
            }
        
        } else {
            res.status(400).send({ error: "Invalid Credientials!" });
        }

    } catch (err) {
        console.log(err);
    }
})

//================================== For Create blog ===================================//
router.post('/createBlog', authenticate, async (req, res) => {
    try {
        const { title, description, category, tags } = req.body.values

        const banner = req.body.Banner
        const blog = { title, description, category, tags, banner }

        const newblog = await Blog.updateOne({ email: req.authenticateUser.email }, { $push: { Blogs: blog } })

        res.send({ msg: 'Blog create Sucessfully!'});
    } catch (err) {
        res.send(err)
    }
})

//================================== For Add Banner ===================================//
router.post('/AddBlogBanner', authenticate, upload.single('image'), async (req, res) => {
    try {
        const photo = req.file;

        const uploadPhoto = await cloudinary.uploader.upload(photo.path, { resource_type: 'auto' })
        // console.log(uploadPhoto)

        res.send(uploadPhoto.secure_url)

    } catch (err) {
        res.status(400).send({ error: "Banner Not Add" })

    }
})

//================================== For Get blogDetails ===================================//
router.get('/getBlogDetails', async (req, res) => {
    try{
        const SearchValue = req.query.Search;

        let aggregateQuery = [];

        if(SearchValue === ""){
            aggregateQuery.push(
                {
                    $unwind : "$Blogs",
                }   
            )
            const blogs = await Blog.aggregate([aggregateQuery]);
            
            console.log("blogs", blogs);
            
            res.send(blogs);
        }

        else{
            aggregateQuery.push(  
                {
                    $unwind : "$Blogs",
                }, 
                {
                    $match: {
                        $or: [
                            { "firstName": new RegExp("^" + SearchValue, 'i') },
                            { "Blogs.title": new RegExp("^" + SearchValue, 'i') },
                            {"Blogs.category": new RegExp("^" + SearchValue, 'i')},
                            {"Blogs._tags": new RegExp("^" + SearchValue,  'i')},
                        ]   
                    },
                }                  
            );
    
            //============================= Apply AggreagteQuery In User Collection =============================
            const matchUser = await Blog.aggregate([aggregateQuery]);
            
            //============================= Send Response =============================
            res.send(matchUser); 
        }
    } catch (err) {
        res.send('Error' + err)
    }
})
//================================== For Get Personal blogDetails ===================================//
router.get('/getMyArticle', authenticate, async (req, res) => {
    try {
        console.log(req.authenticateUser);
        const LoginUser = req.authenticateUser

        const MyArticles = req.authenticateUser.Blogs

        res.send({ LoginUser, MyArticles })

    } catch (err) {
        res.send('Error', err)
    }
})

//================================== For Edit User Blog ===================================//
router.get('/editUserBlog/:id', authenticate, async (req, res) => {
    try {
        const editBlog = await Blog.findById(req.params.id)
        res.send(editBlog)
    } catch (err) {
        res.send('Error' + err)
    }
})

//================================== For Update User Blog ===================================//
router.put('/updateUserBlog/:id', authenticate,  async (req, res) => {
    try {
        const id = req.params.id
        const { _id, title, description, category, tags, banner } = req.body.values
        const photo = req.body.Banner
        

        if (photo.length === 0) {
            const article = {
                _id: _id,
                title: title,
                description: description,
                category: category,
                tags: tags,
                banner:banner                
            }
            await Blog.findOneAndUpdate(
                { "Blogs._id": id }, { $set: { "Blogs.$": article } }
            );
        } else {
            const article = {
                _id: _id,
                title: title,
                description: description,
                category: category,
                tags: tags,
                banner:photo                
            }
            await Blog.findOneAndUpdate(
                { "Blogs._id": id }, { $set: { "Blogs.$": article } }
            );
        }
        res.send({msg: 'Blog Updated Successfully!'})
    } catch (err) {
        res.send('Error' + err)
    }
})

//================================== Delete Blog ===================================//
router.delete('/deleteBlog', authenticate, async (req, res) => {
    const id = req.query.id
    try {
        const deleteBlog = await Blog.updateOne({ email: req.authenticateUser.email }, { $pull: { Blogs: { _id: id } } })

        res.send({ msg: "Blog Deleted Successfully" })

    } catch (err) {
        res.status(400).send({ error: "Blog Not Deleted" })
    }
})
//============================= Like Article =============================

router.put('/likeArticle', authenticate, async (req,res) => {
    
    try{
    
        const {userId, firstName} = req.body;
        const articleId = req.query.ID;
        
        const alreadyLikeByOtheres = await Like.findOneAndUpdate({articleId: articleId});

        if(alreadyLikeByOtheres !== null) {
            const alreadyLike = alreadyLikeByOtheres.Users.find((user) => user.userId === userId ? user : null)
            
            if(alreadyLike !== undefined){
            
                res.send({msg: 'You Already Like The Article'});
            }
            else{
                const user = {
                    userId: userId,
                    username: firstName
                }
    
                await Like.updateOne({articleId: articleId},{ $push: { Users: user} } )
                
                res.send({msg: "Like The Article"});
    
            }            
        }
        else{
            
            const user = {
                userId: userId,
                username: firstName
            }

            await new Like({articleId}).save();
            
            await Like.updateOne({articleId: articleId},{ $push: { Users: user} } )
            
            res.send({msg: "Like The Article"});

        }        
    }
    catch(err) {
        res.send("error" + err)
    };
});

//============================= Get Like Article =============================

router.get('/likeArticle', authenticate, async (req,res) => {
    
    try{
        const likes = await Like.find();
        res.send(likes);
    }
    catch(err) {
        res.send("error" + err)
    };
});

//============================= disLike Article =============================
router.put('/dislikeArticle', authenticate, async (req, res) => {
    const articleId = req.query.ID;
    try {
        await Like.updateOne({articleId: articleId},{ $pull: { Users: articleId} } )
        
    } catch (err) {
        res.send("error" + err)
    }
})

//============================= Comment Article =============================

router.post('/commentArticle', authenticate, async (req,res) => {
    
    try {
        console.log("req.body",req.body);
        // console.log("req.query.ID",req.query.ID);
        const {userId, firstName, comment} = req.body;
        const articleId = req.query.ID;
       
        const user = {
            userId: userId,
            username: firstName,
            comment: comment
        };

        const alreadyCommentByOtheres = await Comment.findOne({articleId: articleId});
    

        if(alreadyCommentByOtheres !== null){

            await Comment.updateOne({articleId: articleId}, {$push: { Users: user}});

            res.send({msg: "Comment The Article"});
        }
        else {

            await new Comment({ articleId }).save();
            console.log("user", user);
            await Comment.updateOne({articleId: articleId}, {$push: { Users: user}});

            res.send({msg: "Comment The Article"});
        }
        
    }
    catch(err) {
        res.send("error" + err)
    };
});

//============================= Get Comment Article =============================

router.get('/commentArticle', authenticate, async (req,res) => {
    
    try{

        const comments = await Comment.find();
        res.send(comments);
    }
    catch(err) {
        res.send("error" + err)
    };
});

//================================== For Logout User ===================================//
router.get('/logout', authenticate, async (req, res) => {
    try {

        //Remove token from database
        req.authenticateUser.Token = req.authenticateUser.Token.filter((elem) => {
            return elem.token !== req.token
        })
        // console.log(" req.authenticateUser.Token", req.authenticateUser.Token);

        //clear cookie
        res.clearCookie('jwtLogin');
        await req.authenticateUser.save();
        res.status(200).send("user Logout");
    }
    catch (err) {
        console.log('error');
        res.status(500).send(err);
    }
})

module.exports = router