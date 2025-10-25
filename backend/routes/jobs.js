const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Job = require('../models/Job');

const statusOptions = ['Applied', 'Interview', 'Offer', 'Rejected'];

/**
 * Create job
 */
router.post(
  '/',
  [
    body('companyName').isString().isLength({ min: 3 }).withMessage('Company name must be at least 3 characters'),
    body('jobTitle').notEmpty().withMessage('Job title is required'),
    body('applicationDate').isISO8601().withMessage('Application date must be a valid date'),
    body('applicationDate').custom(value => {
      const d = new Date(value);
      if (d > new Date()) throw new Error('Application date cannot be in the future');
      return true;
    }),
    body('status').optional().isIn(statusOptions).withMessage('Invalid status')
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array().map(e => e.msg) });

      const { companyName, jobTitle, applicationDate, status } = req.body;
      const job = new Job({ companyName, jobTitle, applicationDate, status });
      await job.save();
      res.status(201).json(job);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * Read all jobs
 */
router.get('/', async (req, res, next) => {
  try {
    const jobs = await Job.find().sort({ applicationDate: -1 });
    res.json(jobs);
  } catch (err) {
    next(err);
  }
});

/**
 * Read single job
 */
router.get('/:id', async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (err) {
    next(err);
  }
});

/**
 * Update job
 */
router.put(
  '/:id',
  [
    body('companyName').optional().isString().isLength({ min: 3 }).withMessage('Company name must be at least 3 characters'),
    body('jobTitle').optional().notEmpty().withMessage('Job title is required'),
    body('applicationDate').optional().isISO8601().withMessage('Application date must be a valid date'),
    body('applicationDate').optional().custom(value => {
      const d = new Date(value);
      if (d > new Date()) throw new Error('Application date cannot be in the future');
      return true;
    }),
    body('status').optional().isIn(statusOptions).withMessage('Invalid status')
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array().map(e => e.msg) });

      const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!job) return res.status(404).json({ error: 'Job not found' });
      res.json(job);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * Delete job
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json({ message: 'Job deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
