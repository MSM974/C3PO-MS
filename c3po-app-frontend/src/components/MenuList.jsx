import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import MenuCard from './MenuCard';
import { menus, EXCEPTIONAL_DAYS } from '../data/data.js';
import { getPriceForRole } from '../logic/users.js';

const MenuList = () => {
  const location = useLocation();
  const subRole = location.state?.subRole || localStorage.getItem('subRole') || 'Apprenant';

  const [reservations, setReservations] = useState({});
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

  const jours = menus.map(day => ({
    ...day,
    formattedDate: new Date(day.date).toLocaleDateString("fr-FR", {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    }).replace(/^./, str => str.toUpperCase())
  }));

  return (
    <div className="menu-wrapper">
      <h1 className="menu-title">Menus de la semaine</h1>

      {/* TABLEAU POUR TABLETTE & DESKTOP */}
      <div className="d-none d-md-block">
        <table className="table table-bordered " style={{ backgroundColor: 'var(--primary)' }}>
          <thead className="table-navy table-c3po">
            <tr>
              <th>Jour</th>
              <th>Menu A</th>
              <th>Menu B</th>
            </tr>
          </thead>
          <tbody>
            {jours.map(jour => (
              <tr key={jour.date}>
                <td>{jour.formattedDate}</td>
                {EXCEPTIONAL_DAYS[jour.date]?.status === 'CLOSED' ? (
                  <td colSpan={2} className="text-center">
                    <div className="card bg-light text-danger p-3">
                      <h5 className="mb-2">🔒 {EXCEPTIONAL_DAYS[jour.date].message}</h5>
                      <p>Aucune réservation possible ce jour.</p>
                    </div>
                  </td>
                ) : (
                  <>
                    <td>
                      <MenuCard
                        dayKey={jour.date}
                        choice={'Menu A'}
                        {...jour.menus.find(m => m.choice === 'Menu A')}
                        price={pricePerMeal.toFixed(2)}
                        isSelected={isSelected(jour.date, 'Menu A')}
                        isDisabled={reservations[jour.date] && reservations[jour.date] !== 'Menu A'}
                        onReservation={handleReservation}
                      />
                    </td>
                    <td>
                      <MenuCard
                        dayKey={jour.date}
                        choice={'Menu B'}
                        {...jour.menus.find(m => m.choice === 'Menu B')}
                        price={pricePerMeal.toFixed(2)}
                        isSelected={isSelected(jour.date, 'Menu B')}
                        isDisabled={reservations[jour.date] && reservations[jour.date] !== 'Menu B'}
                        onReservation={handleReservation}
                      />
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* VERSION MOBILE EN CARTES */}
      <div className="d-md-none">
        {jours.map(jour => (
          <div key={jour.date} className="mb-4">
            <h5>{jour.formattedDate}</h5>

            {EXCEPTIONAL_DAYS[jour.date]?.status === 'CLOSED' ? (
              <div className="card bg-white text-danger p-3">
                <h5 className="mb-2">🔒 {EXCEPTIONAL_DAYS[jour.date].message}</h5>
                <p>Aucune réservation possible ce jour.</p>
              </div>
            ) : (
              <>
                <div className="mb-3">
                  <div className="fw-bold">Menu A</div>
                  <MenuCard
                    dayKey={jour.date}
                    choice={'Menu A'}
                    {...jour.menus.find(m => m.choice === 'Menu A')}
                    price={pricePerMeal.toFixed(2)}
                    isSelected={isSelected(jour.date, 'Menu A')}
                    isDisabled={reservations[jour.date] && reservations[jour.date] !== 'Menu A'}
                    onReservation={handleReservation}
                  />
                </div>

                <div>
                  <div className="fw-bold">Menu B</div>
                  <MenuCard
                    dayKey={jour.date}
                    choice={'Menu B'}
                    {...jour.menus.find(m => m.choice === 'Menu B')}
                    price={pricePerMeal.toFixed(2)}
                    isSelected={isSelected(jour.date, 'Menu B')}
                    isDisabled={reservations[jour.date] && reservations[jour.date] !== 'Menu B'}
                    onReservation={handleReservation}
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>


      <div className="menu-summary d-flex justify-content-between align-items-center mt-4 px-3">
        <h5>🟢 Vous avez réservé <span className='text-green fs-4 fw-bold'>{totalReserved}</span> pour cette semaine<br/>
        💰 Prix total de vos réservations <span className='text-yellow fs-4 fw-bold'>{totalPrice.toFixed(2)} €</span></h5>

        {totalReserved > 0 ? (
          <button
            className="btn btn-sm fw-bold btn-yellow"
            onClick={handleSubmit}
          >
            Valider mes réservations
          </button>
        ) : (
          <button
            className="btn btn-light border-0 text-muted btn-sm"
            disabled
          >
            Aucune réservation
          </button>
        )}
      </div>
    </div>
  );
};

export default MenuList;