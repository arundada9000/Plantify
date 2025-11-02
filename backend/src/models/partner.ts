import { Schema, model, Document } from 'mongoose';

export interface IPartner extends Document {
  name: string;
  logo: string;
  description: string;
  link: string;
}

const partnerSchema = new Schema<IPartner>({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
}, { timestamps: true });

export default model<IPartner>('Partner', partnerSchema);