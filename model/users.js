import mongoose from 'mongoose';


//model for collection store_info
var UserAuth = new mongoose.Schema({


        phone: {
            type: String,
            required: true,
        },
        pass: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
            required: true
        }

    }, { versionKey: false })
    //the _id is false so that mongo doesn't create an auto id
    //_v is ommitted using versionKey


const User = mongoose.model("userAuth", UserAuth);
export default User;