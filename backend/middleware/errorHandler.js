function errorHandler(err, req, res, next) {
  console.error(err);
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ errors: messages });
  }
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
}

module.exports = errorHandler;
