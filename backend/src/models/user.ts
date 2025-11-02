import mongoose, { Schema, Document } from 'mongoose';

interface IPlant {
  location: [number, number]; // [longitude, latitude]
    createdAt: Date;
}
enum RoleEnum {
  USER="USER",
  ADMIN="ADMIN"
}

export interface IUser extends Document {
  username: string;
  password: string;
  role: RoleEnum;
  sessionsCompleted: number;
  energySavedMinutes: number;
  treesPlanted: number;
  currentStreak: number;
  pomodorosCompleted: number;
  totalFocusHours: number;
  energySavedKWh: number;
  plants: IPlant[];
  isDeleted?: boolean;       
  createdAt: Date;
updatedAt: Date;
}
const PlantSchema = new Schema<IPlant>({
  location: {
    type: [Number], // [lng, lat]
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  }
}
);

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      enum: RoleEnum
    },
    password: {
      type: String,
      required: true,
    },
    sessionsCompleted: {
      type: Number,
      default: 0,
    },
    energySavedMinutes: {
      type: Number,
      default: 0,
    },
    treesPlanted: {
      type: Number,
      default: 0,
    },
    currentStreak: {
      type: Number,
      default: 0,
    },
    pomodorosCompleted: {
      type: Number,
      default: 0,
    },
    totalFocusHours: {
      type: Number,
      default: 0,
    },
    energySavedKWh: {
      type: Number,
      default: 0,
    },
    plants: {
      type: [PlantSchema],
      default: [],
    },
        isDeleted: { type: Boolean,required: false, default: false }, 

  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);