import { Schema, model } from 'mongoose';

const UserSchema = Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    timestamp: { type: Date, required: true, default: new Date() },
    name: { type: String, required: true },
    role: { type: String, required: true, default: "member"}
});

export const User = model('user', UserSchema);