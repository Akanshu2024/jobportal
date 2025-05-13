import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: Number, required: true },
  category: { type: String, required: true },
  employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  job_type: { type: String, enum: ['full-time', 'part-time', 'freelance'], default: 'full-time' }, // New field for job type
  status: { type: String, enum: ['open', 'closed', 'filled'], default: 'open' }, // New field for job status
}, { timestamps: true });


export default mongoose.models.Job || mongoose.model('Job', JobSchema);
