import React from 'react';
import { EXCEPTIONAL_DAYS } from '../data/data.js';

/**
 * Component to display one lunch menu with a reservation btn.
 * Shows alerts for exceptional days (closed or partial).
 *
 * @param {Object} props
 * @param {string} props.dayKey - Date of the menu (e.g., "2025-07-14")
 * @param {string} props.choice - choice of meal ("Choix a or b", etc.)
 * @param {string} props.entree - Starter
 * @param {string} props.plat - Main course
 * @param {string} props.dessert - Dessert
 * @param {string} props.price - Price of the meal
 * @param {boolean} props.isSelected - If the menu is reserved by user
 * @param {boolean} props.isDisabled - If reservation button is disabled
 * @param {Function} props.onReservation - Click handler for reserve/cancel
 */
const MenuCard = ({
  dayKey,
  choice,
  entree,
  plat,
  dessert,
  price,
  isSelected,
  isDisabled,
  onReservation
}) => {
  const exceptionalDay = EXCEPTIONAL_DAYS[dayKey];

  return (
    <div className="border rounded p-3 bg-white text-navy">

      <span className="badge-choice align-items-start">{choice}
      </span>
      <p className="card-text pt-4">
        <strong className="fs-6">Entrée :</strong><br />{entree}
      </p>
      <p className="card-text">
        <strong className="fs-6">Plat :</strong><br />{plat}
      </p>
      <p className="card-text">
        <strong className="fs-6">Dessert :</strong><br />{dessert}
      </p>

      {/* Price and action button */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <p className="mb-0 fw-bold">Prix : {price} €</p>

        {isDisabled || exceptionalDay?.status === 'CLOSED' ? (
          <button className="btn btn-light border-0 text-muted" disabled>
            
          </button>
        ) : (
          <button
            className={`btn btn-sm fw-bold ${isSelected ? 'btn-danger' : 'btn-yellow'}`}
            onClick={() => onReservation(dayKey, choice)}
          >
            {isSelected ? 'Annuler' : 'Réserver'}
          </button>
        )}
      </div>

    </div>
  );
};

export default MenuCard;
