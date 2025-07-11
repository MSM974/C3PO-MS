import QUnit from 'qunit';
import { getLunchMenusForDate} from '../src/logic/menus.js'; 
import { reserveMenu } from '../src/logic/reservations.js';

QUnit.module('US-21 : Voir les menus');

QUnit.test('Renvoie uniquement les menus de type Déjeuner pour une date donnée', assert => {
  const menus = [
    {
      date: "2025-07-14",
      menus: [
        { id: "menu-001", type: "Déjeuner", name: "Poulet rôti" },
        { id: "menu-002", type: "Petit déjeuner", name: "Croissant" },
        { id: "menu-003", type: "Déjeuner", name: "Gratin dauphinois" }
      ]
    }
  ];

  const result = getLunchMenusForDate(menus, "2025-07-14");

  assert.equal(result.length, 2, "2 menus déjeuner doivent être retournés");
  assert.ok(result.find(m => m.name === "Poulet rôti"), "Menu 'Poulet rôti' trouvé");
  assert.ok(result.find(m => m.name === "Gratin dauphinois"), "Menu 'Gratin dauphinois' trouvé");
});


// TEST U22
QUnit.module('US-22 : Réserver un menu');

QUnit.test('Permet à un utilisateur de réserver un menu disponible', assert => {
  const menus = [
    { id: "menu-001", reserved: 2, maxReservations: 5 }
  ];

  const reservations = [];

  const result = reserveMenu(menus, reservations, "user-001", "menu-001", "2025-07-14");

  assert.equal(result.status, "success", "La réservation est acceptée");
  assert.equal(menus[0].reserved, 3, "Le compteur de réservation augmente");
  assert.equal(reservations.length, 1, "La réservation est ajoutée au tableau");
  assert.deepEqual(reservations[0], {
    id: reservations[0].id, // généré dynamiquement
    userId: "user-001",
    menuId: "menu-001",
    date: "2025-07-14"
  }, "La réservation contient les bonnes données");
});