/*
* @param {string} dateString - Date in ISO format (YYYY-MM-DD)
 * @returns {string} - Formatted date string in French
 */

export function formatFrenchDate(dateString) {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  }).replace(/^./, str => str.toUpperCase());
}