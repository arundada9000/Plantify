import { Schema, model, Document } from 'mongoose';

export interface IPost extends Document {
  userId: Schema.Types.ObjectId;
  content: string;
  image?: string;
  likes: Schema.Types.ObjectId[];
  comments: { userId: Schema.Types.ObjectId; content: string; createdAt: Date }[];
}

const postSchema = new Schema<IPost>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  image: { type: String },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  comments: [{
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    content: { type: String },
    createdAt: { type: Date, default: Date.now },
  }],
}, { timestamps: true });

export default model<IPost>('Post', postSchema);