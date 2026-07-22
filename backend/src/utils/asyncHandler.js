/**
 * asyncHandler — wraps an async Express route handler with try/catch
 * so errors are automatically passed to next().
 * @param {Function} fn - async route handler
 * @returns {Function}
 */
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;
