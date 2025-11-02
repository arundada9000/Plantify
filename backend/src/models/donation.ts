import { Schema, model, Document } from 'mongoose';

export interface IDonation extends Document {
  userId: Schema.Types.ObjectId;
  amount: number;
  cause: string;
  date: Date;
}

const donationSchema = new Schema<IDonation>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  cause: { type: String, required: true },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

export default model<IDonation>('Donation', donationSchema);