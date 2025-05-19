import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  resumeUrl: { type: String },
  coverLetter: { type: String, default: "" }, // Optional cover letter
  status: { type: String, enum: ['applied', 'interview', 'hired', 'rejected'], default: 'applied' },
  applied_at: { type: Date, default: Date.now }, // Date the application was submitted
}, { timestamps: true });

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);
