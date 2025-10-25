const mongoose = require('mongoose');

const validStatuses = ['Applied', 'Interview', 'Offer', 'Rejected'];

const JobSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
    minlength: [3, 'Company name must be at least 3 characters']
  },
  jobTitle: {
    type: String,
    required: [true, 'Job title is required']
  },
  applicationDate: {
    type: Date,
    required: [true, 'Application date is required'],
    validate: {
      validator: function (value) {
        // date must not be in the future
        return value <= new Date();
      },
      message: 'Application date cannot be in the future'
    }
  },
  status: {
    type: String,
    enum: {
      values: validStatuses,
      message: 'Status must be one of: ' + validStatuses.join(', ')
    },
    default: 'Applied'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Job', JobSchema);
