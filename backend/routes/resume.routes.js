const express = require('express');
const { protect } = require('../middleware/auth.middleware');
const {
  getResumes, getResume, createResume, updateResume, deleteResume,
} = require('../controllers/resume.controller');

const router = express.Router();

router.use(protect); // All resume routes require auth

router.route('/').get(getResumes).post(createResume);
router.route('/:id').get(getResume).put(updateResume).delete(deleteResume);

module.exports = router;
