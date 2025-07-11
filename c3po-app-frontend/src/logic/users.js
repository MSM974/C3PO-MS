import { PRICES } from '../data/data.js';

/**
 * CANCELLED FUNCTION BEACAUSE I WANTED TO GET PRICES WITH SUBROLE SUCH AS 'APPRENANT
 * Dynamically returns the price for a user sub-role (label or key) and a meal type.
 *
 * @param {string|object} subRoleInput - role string or user object with .subRole
 * @param {string} mealType - e.g. "DEJEUNER", "DINER", etc.
 * @returns {number} - price in euros
 */
export function getPriceForRole(subRoleInput = 'Apprenant', mealType = 'DEJEUNER') {
  let roleKey;

  if (typeof subRoleInput === 'object' && subRoleInput?.subRole) {
    subRoleInput = subRoleInput.subRole;
  }

  // Normalise en majuscule pour clé directe
  const candidate = subRoleInput?.toUpperCase?.() || 'APPRENANT';

  // Si PRICES contient cette clé, c'est une clé valide
  if (candidate in PRICES) {
    roleKey = candidate;
  } else {
    // Sinon on essaie de matcher contre les valeurs PRICES (labels)
    roleKey = Object.keys(PRICES).find(
      k => k.toLowerCase() === subRoleInput.toLowerCase()
    ) ?? 'APPRENANT';
  }

  const mealKey = mealType?.toUpperCase?.() || 'DEJEUNER';

  return PRICES[roleKey]?.[mealKey] ?? PRICES.APPRENANT[mealKey] ?? 0;
}
