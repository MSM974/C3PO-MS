// logic/reservations.js ere all functions for reservations

export { reservations } from '../data/data.js';


/** FOR RESERVATION
 * Reserve a menu for a user if it's available and if it's opened
 * @param {Array} menus - all available menus
 * @param {Array} reservations - reservations arrays exists
 * @param {string} userId - user ID
 * @param {string} menuId - menu ID to reserve
 * @param {string} date - reservation day (format ISO)
 * @param {Array} EXCEPTIONAL_DAYS - closed day
 * @returns {Object} - { status: "success" | "error", message: string }
 */
export function reserveMenu(menus, reservations, userId, menuId, date, EXCEPTIONAL_DAYS = []) {
  // Check if it's a closed day
  if (EXCEPTIONAL_DAYS.some(d => d.date === date && d.status === "CLOSED")) {
    return { status: "error", message: "Le service est fermé ce jour-là." };
  }

  const menu = menus.find(m => m.id === menuId);
  if (!menu) return { status: "error", message: "Menu introuvable." };

  if (menu.reserved >= menu.maxReservations) {
    return { status: "error", message: "Plus de places disponibles." };
  }

  if (hasUserReserved(userId, menuId)) {
    return { status: "error", message: "Vous avez déjà réservé ce menu." };
  }

  const newReservation = {
    id: generateUniqueId('resa'),
    userId,
    menuId,
    date,
    choice: "A",
    createdAt: new Date().toISOString()
  };

  reservations.push(newReservation);
  menu.reserved += 1;

  return { status: "success", message: "Réservation confirmée." };
}
