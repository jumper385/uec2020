import { Schema, model } from 'mongoose';

const AccountSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: Array },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  gender: { type: String },
});

export const Account = model("account", AccountSchema);
