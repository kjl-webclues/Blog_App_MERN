const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const blogSchema = new mongoose.Schema({
firstName: {
        type: String,
    },

lastName: {
        type: String,
    },

email: {
        type: String, 
        unique: true,
        //Validate EmailId
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid")
            }
        }
    },

password: {
        type: String,
    },

confirmpassword: {
        type: String,
    },

profileImage: [
    {
        type: String
    }   
],

Blogs: [
    {
        title: {
            type: String
        },

        category: {
            type: String
        },

        description: {
            type: String
        },

        tags: {
            type: String
        },

        banner: {
            type: String
        }
    }
],

Token: [
        {
            token: {
                type: String,
                // required: true
            }
        }
    ],

})

//========================== BCRYPT PASSWORD ====================================//
blogSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
        this.confirmpassword = await bcrypt.hash(this.confirmpassword, 12);
    }
    next();
})

//========================== GENERATE TOKEN ====================================//
blogSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEYS);
        this.Token = this.Token.concat({ token });

        await this.save();
        return token;
    }
    catch (err) {
        console.log(err);
    }
}

const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog