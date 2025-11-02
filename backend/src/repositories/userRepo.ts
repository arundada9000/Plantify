import  User,{  IUser } from "../models/user";

export const userRepo = {
  create,
  updateById,
  updateByEmail,
  findById,
  findByEmail,
};

async function create(input: Partial<IUser>) {
  const user = new User(input);
  return user.save();
}

async function updateById(id: string, input: Partial<IUser>) {
  return User.findByIdAndUpdate(id, input, { new: true });
}

async function updateByEmail(email: string, input: Partial<IUser>) {
  return User.findOneAndUpdate({ email }, input, { new: true });
}

async function findById(id: string) {
  return User.findById(id);
}

async function findByEmail(email: string) {
  return User.findOne({ email });
}
