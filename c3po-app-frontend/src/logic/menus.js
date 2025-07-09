// logic/menus.js - Here all functions for  menus

/**  return all type "lunch" for one day
 * @param {Array} menus - menu list (ex: data.menus)
 * @param {string} date - date format ISO "YYYY-MM-DD"
 * @returns {Array} - lunch for the day
 */
export function getLunchMenusForDate(menus, date) {
  const menuDuJour = menus.find(day => day.date === date);
  if (!menuDuJour) return [];
  return menuDuJour.menus.filter(menu => menu.type === "Déjeuner");
}

/**
 * Check if it's a working day
 * @param {string} dateStr - date ISO "YYYY-MM-DD"
 * @returns {boolean}
 */
export function isWorkingDay(dateStr) {
  const date = new Date(dateStr);
  const day = date.getDay(); // 0 = for sunday 6 = for saturday 
  return day >= 1 && day <= 4; // monday to thursday
}

/**
 * Check if it's a exceptionnal day (closed)
 * @param {string} date - date ISO "YYYY-MM-DD"
 * @param {Array} exceptionalDays - ex: [{ date: "2024-12-25", status: "CLOSED" }]
 * @returns {boolean}
 */
export function isClosed(date, exceptionalDays) {
  return exceptionalDays.some(d => d.date === date && d.status === "CLOSED");
}

/**
 * Retourne tous les menus valides pour une semaine donnée
 * - only filter days between mondays and thursdays
 * - ignore les jours fériés
 * @param {Array} menus - menu list
 * @param {Array} exceptionalDays - public holidays
 * @returns {Array} - valids menus
 */
export function getValidLunchMenus(menus, exceptionalDays) {
  return menus.filter(menu =>
    menu.type === "Déjeuner" &&
    isWorkingDay(menu.date) &&
    !isClosed(menu.date, exceptionalDays)
  );
}
