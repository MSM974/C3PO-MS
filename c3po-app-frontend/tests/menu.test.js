import QUnit from 'qunit';
import { getLunchMenusForDate} from '../src/logic/menus.js'; 

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


// TEST U22 ET U26
QUnit.module("US-22 ET U-26 - Réservation d’un menu avec ANNULATION possible");

QUnit.test("Un seul menu réservé par jour", function (assert) {
  let reservations = {};

  const reserve = (dayKey, choice) => {
    if (reservations[dayKey] && reservations[dayKey] !== choice) return;
    reservations = {
      ...reservations,
      [dayKey]: reservations[dayKey] === choice ? null : choice,
    };
  };

  reserve("2025-07-15", "Choix 1");
  assert.equal(reservations["2025-07-15"], "Choix 1", "Menu Choix 1 réservé");

  reserve("2025-07-15", "Choix 2");
  assert.equal(reservations["2025-07-15"], "Choix 1", "Menu Choix 2 ignoré car un autre choix est déjà réservé");

  reserve("2025-07-15", "Choix 1");
  assert.equal(reservations["2025-07-15"], null, "Annulation du menu après second clic");
});

// TEST U27
QUnit.module("US-27 - Confirmation des réservations");

QUnit.test("Message de confirmation affiché", function (assert) {
  const menusReserved = 2;
  const total = 12;
  const message = `Vous avez réservé ${menusReserved} menu(s). ✅\n 🧾Total : ${total.toFixed(2)} € 💶\n\nSouhaitez-vous confirmer ces réservations ?`;

  assert.ok(message.includes("Souhaitez-vous confirmer"), "Le message contient une demande de confirmation");
});

