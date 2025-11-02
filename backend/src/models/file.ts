import mongoose, { Schema, Document } from 'mongoose';

export interface IFile extends Document {
  publicId: string;
  url: string;
  originalName: string;
  createdAt: Date;
}

const fileSchema = new Schema<IFile>({
  publicId: { type: String, required: true },
  url: { type: String, required: true },
  originalName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IFile>('File', fileSchema);
