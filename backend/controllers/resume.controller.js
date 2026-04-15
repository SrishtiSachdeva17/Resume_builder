const Resume = require('../models/Resume');

// @route  GET /api/resumes
// @access Private
exports.getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user._id }).sort('-updatedAt');
    res.json({ resumes });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch resumes.' });
  }
};

// @route  GET /api/resumes/:id
// @access Private
exports.getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, user: req.user._id });
    if (!resume) return res.status(404).json({ error: 'Resume not found.' });
    res.json({ resume });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch resume.' });
  }
};

// @route  POST /api/resumes
// @access Private
exports.createResume = async (req, res) => {
  try {
    const resume = await Resume.create({ ...req.body, user: req.user._id });
    res.status(201).json({ resume });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create resume.' });
  }
};

// @route  PUT /api/resumes/:id
// @access Private
exports.updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!resume) return res.status(404).json({ error: 'Resume not found.' });
    res.json({ resume });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update resume.' });
  }
};

// @route  DELETE /api/resumes/:id
// @access Private
exports.deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!resume) return res.status(404).json({ error: 'Resume not found.' });
    res.json({ message: 'Resume deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete resume.' });
  }
};
