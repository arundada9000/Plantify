import { Schema, model, Document } from 'mongoose';

export interface IChallenge extends Document {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  goal: string; // e.g., "1000 Pomodoros collectively"
}

const challengeSchema = new Schema<IChallenge>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  goal: { type: String, required: true },
}, { timestamps: true });

export default model<IChallenge>('Challenge', challengeSchema);