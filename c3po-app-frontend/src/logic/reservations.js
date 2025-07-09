// logic/reservations.js ere all functions for reservations

import { reservations } from '../data/data.js';
import { generateUniqueId } from './uniqueID.js';

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

/**
 * CANCELLATION WITH ID
 * @param {Array} reservations - reservations ID
 * @param {string} resaId - the ID's reservation 
 * @param {Array} menus - the array's menu to decrement
 * @returns {boolean} - true if cancelled, false else
 */
export function cancelReservation(reservations, resaId, menus = []) {
  const index = reservations.findIndex(r => r.id === resaId);
  if (index === -1) return false;

  // Decrement the reservation count for the menu concerned
  const menu = menus.find(m => m.id === reservations[index].menuId);
  if (menu && menu.reserved > 0) {
    menu.reserved -= 1;
  }

  reservations.splice(index, 1);
  return true;
}

/**
 * Check if the user has already reserved
 * @param {string} userId
 * @param {string} menuId
 * @returns {boolean}
 */
export function hasUserReserved(userId, menuId) {
  return reservations.some(r => r.userId === userId && r.menuId === menuId);
}

/**
 * Return the user's reservation
 * @param {string} userId
 * @returns {Array}
 */
export function getReservationsByUser(userId) {
  return reservations.filter(r => r.userId === userId);
}

export function saveReservationsToLocalStorage(reservations) {
  localStorage.setItem('reservations', JSON.stringify(reservations));
}

export function loadReservationsFromLocalStorage() {
  return JSON.parse(localStorage.getItem('reservations')) || [];
}
