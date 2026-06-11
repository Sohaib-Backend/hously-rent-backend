import mongoose, { Schema } from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"
const videoSchema = new Schema({

    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    duration: {
        type: Number,
    },
    views: {
        type: Number,
    },
    isPublish: {
        type: Boolean,
        default: false
    },
    videoFile: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },

    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

}, { timestamps: true })

videoSchema.plugin(mongooseAggregatePaginate)

export default mongoose.model("Video", videoSchema)