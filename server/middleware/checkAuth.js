const jwt = require('jsonwebtoken');
const Blog = require('../Models/blogSchema');


const Authenticate = async (req, res, next) => {
    try {
        //get cookie
        const token = req.cookies.jwtLogin;
        
        //verify token 
        const verifyToken = jwt.verify(token, process.env.SECRET_KEYS)
        
        //find the authenticateuser
        const authenticateUser = await Blog.findOne({ _id: verifyToken._id, "Token.token": token })

        if (!authenticateUser) {
            throw new Error('User not found')
        }

        req.token = token;
        req.authenticateUser = authenticateUser;
        req.userId = authenticateUser._id;

        next();
    }
    catch (err) {
        res.status(401).send('Unauthorized: No token Provided');
        console.log(err)
    }

}

module.exports = Authenticate;