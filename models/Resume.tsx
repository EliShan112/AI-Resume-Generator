import React from 'react'
import mongoose, { Schema, models,model, Document } from 'mongoose';

export interface IResume extends Document{
  userId: string
  fullName: string;
  email: string;
  phone: string;
  jobTitle: string;
  location?: string;
  summary: string;
  skills: string[];
  experience: string;
  education: string;
  projects?: string;
  generatedResume: string;

}

const ResumeSchema = new Schema<IResume>({
    userId: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    jobTitle: { type: String, required: true },
    location: { type: String },
    summary: { type: String, required: true },
    skills: { type: [String], required: true },
    experience: { type: String, required: true },
    education: { type: String, required: true },
    projects: { type: String },
    generatedResume: { type: String, required: true },
}, { timestamps: true });

export const Resume = models.Resume || model<IResume>('Resume', ResumeSchema);
