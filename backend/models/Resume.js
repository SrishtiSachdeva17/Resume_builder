const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, default: 'Untitled Resume' },
  template: { type: String, enum: ['modern', 'classic', 'minimal', 'creative'], default: 'modern' },

  personalInfo: {
    fullName: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    location: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    github: { type: String, default: '' },
    website: { type: String, default: '' },
    summary: { type: String, default: '' },
  },

  education: [{
    institution: String,
    degree: String,
    field: String,
    startDate: String,
    endDate: String,
    gpa: String,
    description: String,
  }],

  experience: [{
    company: String,
    position: String,
    location: String,
    startDate: String,
    endDate: String,
    current: { type: Boolean, default: false },
    description: String,
  }],

  skills: [{
    category: String,
    items: [String],
  }],

  projects: [{
    name: String,
    description: String,
    technologies: [String],
    link: String,
  }],

  certifications: [{
    name: String,
    issuer: String,
    date: String,
    link: String,
  }],
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);
