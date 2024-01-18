import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema({
    description: {
        type: String,
        required: true,
        trim: true,
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
   
});



postSchema.pre('save', async function (next) {
    try {
      const post = this;
         next();
    } catch (error) {
      next(error);
    }
  });


const Post = mongoose.model("Post", postSchema)
export default Post;