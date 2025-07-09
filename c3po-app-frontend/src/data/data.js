// Menus

export const menus = [
  {
    date: "2025-07-14", // Lundi 
    menus: [
      {
        id: "menu-001",
        name: "Poulet rôti",
        description: "Avec pommes de terre",
        type: "Déjeuner",
        choice: "Choix 1",
        center: "Centre A",
        reserved: 5,
        consumed: 3,
        entree: "Salade de tomates, mozzarella",
        plat: "Poulet rôti, légumes de saison",
        dessert: "Flan caramel",
      },
      {
        id: "menu-002",
        name: "Gratin dauphinois",
        description: "Sans viande",
        type: "Déjeuner",
        choice: "Choix 2",
        center: "Centre A",
        reserved: 2,
        consumed: 1,
        entree: "Salade verte",
        plat: "Gratin dauphinois",
        dessert: "Tarte aux pommes",
      },
    ],
  },
  {
    date: "2025-07-15", // Mardi
    menus: [
      {
        id: "menu-003",
        name: "Poisson au four",
        description: "Avec riz haricots rouges",
        type: "Déjeuner",
        choice: "Choix 1",
        center: "Centre A",
        reserved: 4,
        consumed: 3,
        entree: "Friand fromage",
        plat: "Riz Haricots rouges Poisson au four",
        dessert: "Compote",
      },
      {
        id: "menu-004",
        name: "Cordon bleu",
        description: "Avec haricots blancs",
        type: "Déjeuner",
        choice: "Choix 2",
        center: "Centre A",
        reserved: 5,
        consumed: 2,
        entree: "Salade palmiste",
        plat: "Riz Haricots blancs Cordon bleu",
        dessert: "Yaourt",
      },
    ],
  },
  {
    date: "2025-07-16", // Mercredi
    menus: [
      {
        id: "menu-005",
        name: "Sauté de Dinde",
        description: "Avec lentilles",
        type: "Déjeuner",
        choice: "Choix 1",
        center: "Centre A",
        reserved: 3,
        consumed: 2,
        entree: "Salade exotique",
        plat: "Riz Lentilles Sauté de Dinde",
        dessert: "Fruit",
      },
      {
        id: "menu-006",
        name: "Cuisse poulet sarcive",
        description: "Avec pois du cap",
        type: "Déjeuner",
        choice: "Choix 2",
        center: "Centre A",
        reserved: 1,
        consumed: 0,
        entree: "Salade carottes",
        plat: "Riz Pois du cap Poulet Sarcive",
        dessert: "Fruit",
      },
    ],
  },
  {
    date: "2025-07-17", // Jeudi
    menus: [
      {
        id: "menu-007",
        name: "Steak frites",
        description: "Maison",
        type: "Déjeuner",
        choice: "Choix 1",
        center: "Centre A",
        reserved: 6,
        consumed: 5,
        entree: "Taboulé",
        plat: "Steak boeuf frites maison",
        dessert: "Moelleux chocolat",
      },
      {
        id: "menu-008",
        name: "Cordon bleu",
        description: "Avec pâtes au beurre",
        type: "Déjeuner",
        choice: "Choix 2",
        center: "Centre A",
        reserved: 2,
        consumed: 1,
        entree: "Salade concombre",
        plat: "Cordon bleu, pâtes au beurre",
        dessert: "Eclair chocolat",
      },
    ],
  },

  {
    date: "2025-07-18", // Vendredi
    menus: [
      {
        id: "menu-009",
        name: "Classique",
        description: "Café ou thé, croissant, jus d’orange",
        type: "Petit Déjeuner",
        choice: "Choix 1",
        center: "Centre A",
        reserved: 10,
        consumed: 8,
        entree: "Boissons au choix",
        plat: "Viennoiseries",
        dessert: "Fruits"
      },
      {
        id: "menu-010",
        name: "Formule santé",
        description: "0 matières grasses",
        type: "Petit Déjeuner",
        choice: "Choix 2",
        center: "Centre A",
        reserved: 4,
        consumed: 3,
        entree: "Boissons au choix",
        plat: "Pain complet & confiture",
        dessert: "Fromage blanc"
      }
    ]
  },

];

// ** RESERVATIONS
export const reservations = [
  {
    id: "resa-001",
    userId: "user-001",
    menuId: "menu-001",
    date: "2025-07-14",
    status: "Confirmée",
  },
  {
    id: "resa-002",
    userId: "user-002",
    menuId: "menu-004",
    date: "2025-07-15",
    status: "Confirmée",
  },
];

// ** USERS **
export const users = [
  {
    id: "user-001",
    name: "Mathilde",
    email: "m.s@example.com",
    roleId: "role-001",
  },
  {
    id: "user-002",
    name: "Jean Moulin",
    email: "jean.moulin@example.com",
    roleId: "role-002",
  },
];

// ** ROLES ** 
export const roles = [
  {
    id: "role-001",
    name: "Restaurateur",
    permissions: ["create_menu", "delete_menu", "view_reservations"],
  },
  {
    id: "role-002",
    name: "Utilisateur",
    permissions: ["view_menu_list","reserve_menu"],
  },

  { 
    id: "role-003",
    name : "Comptable",
    permissions : ["view-reservations"]
  }
];

// ** JOURS EXCEPTIONNELS 
export const EXCEPTIONAL_DAYS = {
  "2025-01-01": { status: "CLOSED", message: "Férié (Jour de l’An)" },
  "2025-03-19": { status: "CLOSED", message: "Férié (Abolition de l’esclavage)" },
  "2025-03-31": { status: "CLOSED", message: "Férié (Lundi de Pâques)" },
  "2025-05-01": { status: "CLOSED", message: "Férié (Fête du Travail)" },
  "2025-05-08": { status: "CLOSED", message: "Férié (Victoire 1945)" },
  "2025-05-29": { status: "CLOSED", message: "Férié (Ascension)" },
  "2025-06-09": { status: "CLOSED", message: "Férié (Lundi de Pentecôte)" },
  "2025-07-14": { status: "CLOSED", message: "Férié (Fête nationale)" },
  "2025-12-25": { status: "CLOSED", message: "Férié (Noël)" },
  "2025-07-11": { status: "PARTIAL", message: "Ouvert jusqu’à 11h30 (Petit déjeuner uniquement)" },
};

// --- Ajout automatique des jours fermés : samedi (6), dimanche (0) ---
menus.forEach((menuDay) => {
  const date = new Date(menuDay.date);
  const day = date.getDay(); // 0 = dimanche, 5 = vendredi, 6 = samedi

  // S'il n'y a PAS déjà une exception définie
  if (!EXCEPTIONAL_DAYS[menuDay.date]) {
    if (day === 5) {
      // Tous les vendredis sont PARTIAL
      EXCEPTIONAL_DAYS[menuDay.date] = {
        status: 'PARTIAL',
        message: 'Ouvert jusqu’à 11h30 (Petit déjeuner uniquement)',
      };
    } else if (day === 6 || day === 0) {
      // Samedi et dimanche sont CLOSED
      EXCEPTIONAL_DAYS[menuDay.date] = {
        status: 'CLOSED',
        message: getClosureMessage(day),
      };
    }
  }
});


// 🔧 Petite fonction utilitaire pour message personnalisé par jour
function getClosureMessage(day) {
  switch (day) {
    case 6: return "Fermé le Samedi";
    case 0: return "Fermé le Dimanche";
    default: return "Fermeture exceptionnelle";
  }
}

// ** CONSTANTES 
export const PRICES = {
  FORMATEUR: {
    PETIT_DEJEUNER: 2.5,
    ENTREE: 1.5,
    DEJEUNER: 7,
    DINER: 5,
  },
  APPRENANT: {
    PETIT_DEJEUNER: 2,
    ENTREE: 1,
    DEJEUNER: 6,
    DINER: 4,
  },
  ADMINISTRATIF: {
    PETIT_DEJEUNER: 3,
    ENTREE: 2,
    DEJEUNER: 8,
    DINER: 6,
  },
  TECHNIQUE: {
    PETIT_DEJEUNER: 2.8,
    ENTREE: 1.8,
    DEJEUNER: 7.5,
    DINER: 5.5,
  },
};

export const CENTERS = {
  CENTRE_A: "Centre A",
};

export const MEAL_TYPES = {
  PETIT_DEJEUNER: "Petit déjeuner",
  ENTREE: "Entrée",
  DEJEUNER: "Déjeuner",
  DINER: "Dîner",
};

export const MENU_CHOICES = {
  CHOIX_1: "Choix 1",
  CHOIX_2: "Choix 2",
  NONE: null,
};

export const USER_TYPES = {
  FORMATEUR: "Formateur",
  APPRENANT: "Apprenant",
  ADMINISTRATIF: "Administratif",
  TECHNIQUE: "Technique",
};

export const SECTIONS = {
  FORMATEURS: "Formateurs",
  ADMINISTRATIFS: "Administratifs",
  TECHNIQUES: "Techniques",
  SECTION_A: "Section A",
  SECTION_B: "Section B",
};
