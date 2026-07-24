/**
 * isValidEmail — validates an email address format.
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * isStrongPassword — checks if a password meets minimum security requirements.
 * At least 8 chars, one uppercase, one digit.
 * @param {string} password
 * @returns {boolean}
 */
export function isStrongPassword(password) {
  return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
}

/**
 * isRequired — checks if a value is non-empty.
 * @param {*} value
 * @returns {boolean}
 */
export function isRequired(value) {
  if (typeof value === 'string') return value.trim().length > 0;
  return value !== null && value !== undefined;
}
