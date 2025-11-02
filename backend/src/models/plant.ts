import { Schema, model, Document } from 'mongoose';

export interface IPlant extends Document {
  userId: Schema.Types.ObjectId;
  name: string;
  location: { lat: number; lng: number };
  datePlanted: Date;
  photo?: string;
}

const plantSchema = new Schema<IPlant>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  location: { type: Object, required: true },
  datePlanted: { type: Date, default: Date.now },
  photo: { type: String },
}, { timestamps: true });

export default model<IPlant>('Plant', plantSchema);