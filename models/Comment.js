import mongoose from 'mongoose';

const { Schema } = mongoose;
const CommentSchema = new Schema({
  text: {
    type: String,
    required: 'Text is required',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const model = mongoose.model('Comment', CommentSchema);

export default model;
