// logic/users.js


import { PRICES, USER_TYPES } from '../data/data';

/**
 * Returns the price for a given user sub-role label and meal type.
 * Defaults to DEJEUNER and fallback to APPRENANT if role not found.
 * 
 * @param {string} subRoleLabel - e.g. "Formateur", "Apprenant", etc.
 * @param {string} mealType - e.g. "DEJEUNER", "PETIT_DEJEUNER", "DINER"
 * @returns {number} - price in euros
 */
export function getPriceForRole(subRoleLabel = 'Apprenant', mealType = 'DEJEUNER') {
  // Match the label to its key (e.g. "Formateur" => "FORMATEUR")
  const key = Object.keys(USER_TYPES).find(
    k => USER_TYPES[k].toLowerCase() === subRoleLabel.toLowerCase()
  );

  const roleKey = key ?? 'APPRENANT';

  return PRICES[roleKey]?.[mealType.toUpperCase()] ?? PRICES.APPRENANT[mealType.toUpperCase()];
}