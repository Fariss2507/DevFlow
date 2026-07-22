/**
 * apiResponse — standardized API response helpers.
 */

const success = (res, data, statusCode = 200) =>
  res.status(statusCode).json({ success: true, data });

const error = (res, message, statusCode = 500) =>
  res.status(statusCode).json({ success: false, message });

const notFound = (res, entity = 'Resource') =>
  res.status(404).json({ success: false, message: `${entity} not found` });

module.exports = { success, error, notFound };
