/**
 * Update reservations object for a given day and menu choice.
 *
 * - If the same menu is clicked again → cancel the reservation (toggle)
 * - If another choice is already selected for the day → ignore the action
 *
 * @param {Object} currentReservations - Current reservations object (e.g., { "2025-07-14": "Choix 1" })
 * @param {string} dayKey - Date string (YYYY-MM-DD)
 * @param {string} menuchoice - "Choix 1" or "Choix 2"
 * @returns {Object} - Updated reservations object
 */
export function updateReservation(currentReservations, dayKey, menuchoice) {
  if (currentReservations[dayKey] && currentReservations[dayKey] !== menuchoice) {
    return currentReservations; // Another choice already selected → ignore
  }

  return {
    ...currentReservations,
    [dayKey]: currentReservations[dayKey] === menuchoice ? null : menuchoice,
  };
}

/**
 * Check if a menu choice is selected for a specific day.
 *
 * @param {Object} reservations - Reservations object
 * @param {string} dayKey - Date string
 * @param {string} menuchoice - Menu choice
 * @returns {boolean} - True if the choice is selected
 */
export function isMenuSelected(reservations, dayKey, menuchoice) {
  return reservations[dayKey] === menuchoice;
}

/**
 * Generate a user-friendly confirmation message summarizing reservations.
 *
 * @param {number} menusReserved - Total number of reserved menus
 * @param {number} totalPrice - Total price (in €)
 * @returns {string} - Confirmation message string
 */
export function getConfirmationMessage(menusReserved, totalPrice) {
  return `Vous avez réservé ${menusReserved} menu(s). ✅\n` +
         `🧾Total : ${totalPrice.toFixed(2)} € 💶\n\n` +
         `Souhaitez-vous confirmer ces réservations ?`;
}
