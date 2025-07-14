import QUnit from 'qunit';
import { getLunchMenusForDate, filterMenus} from '../src/logic/menus.js'; 

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


// TEST FILTERMENU

QUnit.module("Recherche insensible à la casse et aux accents");

QUnit.test("Trouver un plat même si l'utilisateur tape sans accent ni majuscule", assert => {
  const jours = [
    { date: "2025-07-14", formattedDate: "Lundi 14 juillet 2025" }
  ];
  const menus = [
    {
      date: "2025-07-14",
      menus: [
        { id: "menu-001", entree: "Salade", plat: "Poulet rôti", dessert: "Flan", type: "Déjeuner", choice: "Choix 1" },
        { id: "menu-002", entree: "Salade Verte", plat: "Gratin dauphinois", dessert: "Tarte", type: "Déjeuner", choice: "Choix 2" }
      ]
    }
  ];
  const exceptionalDays = {};

  // Test 1 : recherche "poulet"
  let filtered = filterMenus(jours, "poulet", menus, exceptionalDays);
  assert.equal(filtered.length, 1, "Le jour est trouvé avec 'poulet'");

  // Test 2 : recherche "POULET" (majuscules)
  filtered = filterMenus(jours, "POULET", menus, exceptionalDays);
  assert.equal(filtered.length, 1, "Le jour est trouvé avec 'POULET'");

  // Test 3 : recherche "pôûlét" (accents bizarres)
  filtered = filterMenus(jours, "pôûlét", menus, exceptionalDays);
  assert.equal(filtered.length, 1, "Le jour est trouvé avec 'pôûlét'");

  // Test 4 : recherche "GRATIN" (autre plat)
  filtered = filterMenus(jours, "GRATIN", menus, exceptionalDays);
  assert.equal(filtered.length, 1, "Le jour est trouvé avec 'GRATIN'");

  // Test 5 : recherche "tarte" (dessert)
  filtered = filterMenus(jours, "tarte", menus, exceptionalDays);
  assert.equal(filtered.length, 1, "Le jour est trouvé avec 'tarte'");

  // Test 6 : recherche qui ne doit rien trouver
  filtered = filterMenus(jours, "lasagne", menus, exceptionalDays);
  assert.equal(filtered.length, 0, "Aucun jour trouvé avec 'lasagne'");
});

