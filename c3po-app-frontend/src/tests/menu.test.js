// tests/menu.test.js

import { getLunchMenusForDate, reserveMenu } from '../src/utils/logic.js';
import QUnit from 'qunit';

QUnit.module('US-21 : Voir les menus');

QUnit.test("Filtrer les menus déjeuner à une date donnée", assert => {
  const menus = [
    { id: "menu-1", type: "Déjeuner", date: "2025-01-01" },
    { id: "menu-2", type: "Petit déjeuner", date: "2025-01-01" },
  ];
  const result = getLunchMenusForDate(menus, "2025-01-01");
  assert.equal(result.length, 1);
  assert.equal(result[0].id, "menu-1");
});

QUnit.module('US-22 : Réserver un menu');

QUnit.test("Réserver un menu disponible", assert => {
  const menus = [{ id: "menu-1", type: "Déjeuner", reserved: 3, maxReservations: 5 }];
  const reservations = [];
  const result = reserveMenu(menus, reservations, "user-001", "menu-1", "2025-01-02");
  assert.equal(result.status, "success");
  assert.equal(menus[0].reserved, 4);
});

