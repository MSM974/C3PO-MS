/**
 * Get all "Déjeuner" (lunch) menus for a specific date.
 *
 * @param {Array<Object>} menus - Full menu list (array of days with menus).
 * @param {string} date - Date in ISO format (YYYY-MM-DD).
 * @returns {Array<Object>} - List of lunch menus for the specified date.
 */
export function getLunchMenusForDate(menus, date) {
  const menuDuJour = menus.find(day => day.date === date);
  if (!menuDuJour) return [];
  return menuDuJour.menus.filter(menu => menu.type === "Déjeuner");
}

/**
 * Check if a date is marked as "CLOSED" in the exceptional days list.
 *
 * @param {string} date - Date in ISO format (YYYY-MM-DD).
 * @param {Object<string, {status: string}>} exceptionalDays - Map of exceptional days in the data.js.
 * @returns {boolean} - True if the date is already closed.
 */
export function isClosed(date, exceptionalDays) {
  return exceptionalDays.hasOwn(date) && exceptionalDays[date].status === "CLOSED";
}

/**
 * Automatically adds closure or partial opening status to days based on the weekday.
 * - Friday (5): marked as "PARTIAL" because has no lunch service just breakfast
 * - Saturday (6) and Sunday (0): marked as "CLOSED"
 *
 * If a date is already defined in 'exceptionalDays', it's not modified.
 *
 * @param {Array<{ date: string }>} menus - List of menu days with ISO dates.
 * @param {Object<string, {status: string, message: string}>} exceptionalDays - Object to enrich with automatic rules.
 */
export function applyAutoClosures(jours, exceptionalDays) {
  jours.forEach(jour => {
    const date = jour.date;
    if (!exceptionalDays[date]) {
      const day = new Date(date).getDay();
      if (day === 5) { // Vendredi
        exceptionalDays[date] = {
          status: 'PARTIAL',
          message: getClosureMessage(day),
        };
      } else if (day === 6 || day === 0) { // Samedi ou Dimanche
        exceptionalDays[date] = {
          status: 'CLOSED',
          message: getClosureMessage(day),
        };
      }
    }
  });
}

/**
 * Get the appropriate closure message depending on the day.
 *
 * @param {number} day - Day of the week (0 = Sunday, 5 = Friday, 6 = Saturday).
 * @returns {string} - message describing the closure.
 */
export function getClosureMessage(day) {
  switch (day) {
    case 5: return "Ouvert jusqu’à 11h30 (Petit déjeuner uniquement)";
    case 6: return "Fermé le Samedi";
    case 0: return "Fermé le Dimanche";
    default: return "Fermeture exceptionnelle";
  }
}
// for menusearch



/**
 * Normalize a string: lowercase and remove accents
 * @param {string} str
 * @returns {string}
 */
function normalize(str) {
  return (str || '')
    .normalize('NFD')                  // décompose les accents
    .replace(/[\u0300-\u036f]/g, '')   // supprime les accents
    .toLowerCase();                    // met tout en minuscule

}

// ⬅️ Fonction de filtrage
export function filterMenus(jours, searchTerm, menus, exceptionalDays) {
  const normalizedSearch = normalize(searchTerm.trim());

  return jours.filter(jour => {
    const lunchMenus = getLunchMenusForDate(menus, jour.date).filter(menu => {
      const entree = normalize(menu.entree);
      const plat = normalize(menu.plat);
      const dessert = normalize(menu.dessert);

      return (
        entree.includes(normalizedSearch) ||
        plat.includes(normalizedSearch) ||
        dessert.includes(normalizedSearch)
      );
    });

    if (normalizedSearch === '') {
      return lunchMenus.length > 0 || (exceptionalDays[jour.date] && exceptionalDays[jour.date].status);

    }

    return lunchMenus.length > 0;
  });
}


