import React, { useState } from 'react';
import MenuCard from './MenuCard';
import { menus, PRICES, EXCEPTIONAL_DAYS } from '../data/data.js';
import '../css/style.css'; 

/**
 * Display all lunch menus with reservation buttons and handle exceptional days.
 *
 * @param {Object} props
 * @param {Object} props.user - The current user object
 */
const MenuList = ({ user }) => {
  const [reservations, setReservations] = useState({});
  const todayISO = new Date().toISOString().split('T')[0]; // Format "YYYY-MM-DD"

  const roleKey = user?.subRole?.toUpperCase() || "APPRENANT";
  const pricePerMeal = PRICES[roleKey]?.DEJEUNER || PRICES["APPRENANT"].DEJEUNER;

  const handleReservation = (dayKey, menuchoice) => {
    if (reservations[dayKey] && reservations[dayKey] !== menuchoice) return;
    setReservations(prev => ({
      ...prev,
      [dayKey]: prev[dayKey] === menuchoice ? null : menuchoice,
    }));
  };

  const isSelected = (dayKey, menuchoice) => reservations[dayKey] === menuchoice;

  const totalReserved = Object.values(reservations).filter(Boolean).length;
  const totalPrice = totalReserved * pricePerMeal;

  const handleSubmit = () => {
    alert(`✅ Réservations confirmées pour ${totalReserved} jour(s).\n💰 Total : ${totalPrice.toFixed(2)} €`);
  };

  return (
    <div className="custom-box p-5">
      <h2 className="mb-4">Menus de la semaine</h2>

      {/* Display today's exceptional day if applicable */}
      {EXCEPTIONAL_DAYS[todayISO] && (
        <div
          className={`alert ${
            EXCEPTIONAL_DAYS[todayISO].status === 'CLOSED' ? 'alert-danger' : 'alert-warning'
          } text-center fw-semibold`}
        >
          📅 Aujourd’hui : {EXCEPTIONAL_DAYS[todayISO].message}
        </div>
      )}

      <div className="d-flex overflow-auto gap-3 pb-3">
        {menus.map((day, index) => {
          const dayKey = day.date;
          const exceptional = EXCEPTIONAL_DAYS[dayKey];

          // Format date in french
          const formattedDate = new Date(dayKey).toLocaleDateString("fr-FR", {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          });

          return (
            <div
              key={index}
              className="flex-shrink-0 rounded shadow-sm"
              style={{ minWidth: '250px' }}
            >
              <h5 className="text-green text-center fw-semibold m-3">
                {formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}<br />
                {exceptional?.status === 'CLOSED' && (
                  <span className="badge bg-danger m-2 p-2">Fermé</span>
                )}
              </h5>

              {/* Jour férié (fermé) */}
              {exceptional?.status === 'CLOSED' ? (
                <div className="text-center text-danger fw-semibold m-5">
                  🚫 {exceptional.message} <br />
                  Aucun service prévu ce jour.
                </div>
              ) : day.menus.length > 0 ? (
                day.menus.map((menu, idx) => (
                  <div key={idx} className="mb-3 text-center">
                    <MenuCard
                      dayKey={dayKey}
                      choice={menu.choice}
                      entree={menu.entree}
                      plat={menu.plat}
                      dessert={menu.dessert}
                      price={pricePerMeal.toFixed(2)}
                      isSelected={isSelected(dayKey, menu.choice)}
                      isDisabled={reservations[dayKey] && reservations[dayKey] !== menu.choice}
                      onReservation={handleReservation}
                    />
                  </div>
                ))
              ) : (
                <p className="text-center text-danger fst-italic p-5">Pas de menu ce jour.</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="text-center mt-4 p-5">
        <p className="fw-bold text-green">
          🟢 Menus réservés cette semaine : {totalReserved}/{menus.filter(day => day.menus.length > 0).length}
        </p>
        <p className="fw-bold text-yellow">
          💰 Total à payer : {totalPrice.toFixed(2)} €
        </p>
        <button
          className="btn btn-green fw-bold"
          onClick={handleSubmit}
          disabled={totalReserved === 0}
        >
          Valider mes réservations
        </button>
      </div>
    </div>
  );
};

export default MenuList;
