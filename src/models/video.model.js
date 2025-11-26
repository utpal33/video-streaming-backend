import mongoose from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const videoSchema = new mongoose.Schema(
    {
        videoFile : {
            type : String,      // cloudenary URL
            required : true,
        },
        thumbnail : {
            type : String,       // cloudenary URL
            required : true
        },
        owner  : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        },
        title : {
            type : String,
            required : true,
            unique : true,
            lowercase: true,
            index : true
        },
        description : {
            type : String,
            required : true,
            lowercase: true,
            index : true
        },
        duration : {
            type : String,       // cloudenary URL
            required : true,
        },
        views : {
            type : Number,
            default : 0,
        },
        isPublished : {
            type : Boolean,
            default : true
        }
    }, 
    {
        timestamps:true
    });

const Video = mongoose.model('Video', videoSchema);

videoSchema.plugin(mongooseAggregatePaginate)
export {Video}