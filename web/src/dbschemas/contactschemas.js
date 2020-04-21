import { Schema, model } from 'mongoose';

const contactSchema = Schema({
    firstName: { type: String, required: true },
    otherNames: { type: String },
    lastName: { type: String, required: true },
    position: { type: String, required: true },
    title: { type: String, required: true },
});

export const Contact = model('contact', contactSchema);