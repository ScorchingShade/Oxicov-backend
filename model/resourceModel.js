import mongoose from 'mongoose';

//model for collection store_info
var ResourceModel = new mongoose.Schema({


        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        contactInfo: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        verified: {
            type: Boolean,
            required: true,
        }

    }, { versionKey: false })
    //the _id is false so that mongo doesn't create an auto id
    //_v is ommitted using versionKey


const Resource = mongoose.model("resource", ResourceModel);
export default Resource;