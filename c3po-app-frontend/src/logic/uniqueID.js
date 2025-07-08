// logic/UniqueID.js - It generate a unique key for managing with the prefix

/**
 * @param {string} prefix - ex: "resa", "menu", "user"
 * @returns {string} - ex: "menu-a1b2c3" with number 0 to 9 and string a to z
 */
export function generateUniqueId(prefix = 'id') {
  const randomStr = Math.random().toString(36).substring(2, 8); 
  return `${prefix}-${randomStr}`;
}
