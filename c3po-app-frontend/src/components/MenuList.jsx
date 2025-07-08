import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import MenuCard from './MenuCard';
import { menus, EXCEPTIONAL_DAYS } from '../data/data.js';
import { getPriceForRole } from '../logic/users.js';
import '../css/style.css';

const MenuList = () => {
  const location = useLocation();
  const subRole =
    location.state?.subRole || localStorage.getItem('subRole') || 'Apprenant';

  const [reservations, setReservations] = useState({});
  const todayISO = new Date().toISOString().split('T')[0];

  const pricePerMeal = getPriceForRole(subRole, 'DEJEUNER');


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

      <div className="container">
        <h1 className="mb-5 text-navy text-center fw-bold">Menus de la semaine</h1>


        {EXCEPTIONAL_DAYS[todayISO] && (
          <div
            className={`alert ${
              EXCEPTIONAL_DAYS[todayISO].status === 'CLOSED' ? 'alert-danger' : 'alert-warning'
            } text-center fw-semibold`}
          >
            📅 Aujourd’hui : {EXCEPTIONAL_DAYS[todayISO].message}
          </div>
        )}

        <div className="row flex-nowrap">
          {menus.map((day, index) => {
            const dayKey = day.date;
            const exceptional = EXCEPTIONAL_DAYS[dayKey];

            const formattedDate = new Date(dayKey).toLocaleDateString("fr-FR", {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            });

            return (
              <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="text-center text-green fw-bold p-3">
                      {formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}
                    </h5>
                    {exceptional?.status === 'CLOSED' ? (
                      <div className="text-center text-danger fw-semibold">
                        <span className="badge bg-danger fs-5 mb-3">Fermé</span><br />
                        🚫 {exceptional.message} 
                      </div>
                    ) : day.menus.length > 0 ? (
                      day.menus.map((menu, idx) => (
                        <div key={idx} className="mb-3">
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
                      <p className="text-center text-muted fst-italic p-3">Pas de menu ce jour.</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>


        {/* Summary */}
        <div className="text-center mt-5">
          <h4 className="fw-bold text-green m-3">
            🟢 Menus réservés cette semaine : {totalReserved}/{menus.filter(day => day.menus.length > 0).length}
          </h4>
          <h3 className="fw-bold text-warning m-4">
            💰 Total à payer : {totalPrice.toFixed(2)} €
          </h3>
          <button
            className="btn btn-green fs-5 fw-bold"
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
