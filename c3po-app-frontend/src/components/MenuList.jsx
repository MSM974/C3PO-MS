import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import MenuCard from './MenuCard';
import MenuSearch from './MenuSearch';
import { menus, EXCEPTIONAL_DAYS, PRICES } from '../data/data.js';
import { getLunchMenusForDate, filterMenus, applyAutoClosures } from '../logic/menus.js';
import { updateReservation, isMenuSelected, getConfirmationMessage } from '../logic/reservations.js';

// Fonction de normalisation pour la recherche
function normalize(str) {
  return (str || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

const MenuList = () => {
  const location = useLocation();
  const subRole = location.state?.subRole || localStorage.getItem('subRole') || 'Apprenant';

  const [reservations, setReservations] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const pricePerMeal = PRICES[subRole.toUpperCase()]?.DEJEUNER ?? PRICES.APPRENANT.DEJEUNER;

  const handleReservation = (dayKey, menuchoice) => {
    setReservations(prev => updateReservation(prev, dayKey, menuchoice));
  };

  const isSelected = (dayKey, menuchoice) => {
    return isMenuSelected(reservations, dayKey, menuchoice);
  };

  const totalReserved = Object.values(reservations).filter(Boolean).length;
  const totalPrice = totalReserved * pricePerMeal;

  const handleSubmit = () => {
    const message = getConfirmationMessage(totalReserved, totalPrice);
    const confirmation = window.confirm(message);

    if (confirmation) {
      alert(`Réservations confirmées ✅`);
    } else {
      alert(`Réservations annulées. Vous pouvez les modifier avant de valider.`);
    }
  };

  // --- Ici on filtre les jours du lundi (1) au vendredi (5) présents dans le data.js
  const jours = menus
    .map(day => ({
      ...day,
      formattedDate: new Date(day.date).toLocaleDateString("fr-FR", {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).replace(/^./, str => str.toUpperCase())
    }))
    .filter(day => {
      const jsDate = new Date(day.date);
      const dayOfWeek = jsDate.getDay(); // 1=lundi, ... 5=vendredi
      return dayOfWeek >= 1 && dayOfWeek <= 5;
    });

  // --- On applique les exceptions automatiques (vendredi PARTIAL, week-end CLOSED si jamais il y en a)
  applyAutoClosures(jours, EXCEPTIONAL_DAYS);

  // --- On filtre selon la recherche (menus + exceptions)
  const hasMenuError = !Array.isArray(menus) || menus.length === 0;
  const filteredJours = filterMenus(jours, searchTerm, menus, EXCEPTIONAL_DAYS);

  return (
    <div className="menu-wrapper">
      <h1 className="wrapper-title">Menus de la semaine</h1>

      {hasMenuError ? (
        <div className="alert alert-danger text-center my-4">
          ❌ Erreur lors du chargement des menus, veuillez réessayer.
        </div>
      ) : null}

      <MenuSearch searchTerm={searchTerm} onSearch={setSearchTerm} />

      {filteredJours.length === 0 ? (
        <div className="alert alert-danger text-center my-4">
          ❌ Aucun menu ne correspond à votre recherche.
        </div>
      ) : (
        <>
          {/* TABLEAU DESKTOP */}
          <div className="table-responsive d-none d-md-block">
            <table className="table td-navy">
              <tbody>
                {filteredJours.map(jour => {
                  const exceptional = EXCEPTIONAL_DAYS[jour.date];
                  const lunchMenus = getLunchMenusForDate(menus, jour.date);

                  const filteredMenus = lunchMenus.filter(menu =>
                    normalize(menu.entree).includes(normalize(searchTerm)) ||
                    normalize(menu.plat).includes(normalize(searchTerm)) ||
                    normalize(menu.dessert).includes(normalize(searchTerm))
                  );

                  // Affiche la ligne si menu ou exception
                  if (filteredMenus.length === 0 && !(exceptional && exceptional.status)) return null;

                  return (
                    <tr key={jour.date}>
                      <td className='td-navy'><p className='table-date fs-5'>{jour.formattedDate}</p></td>
                      {exceptional?.status === 'CLOSED' ? (
                        <td colSpan={2} className="td-navy">
                          <div className="table-closed">
                            <p className="mb-2">🔒 {exceptional.message}</p>
                          </div>
                        </td>
                      ) : filteredMenus.length === 0 ? (
                        <td colSpan={2} className='td-navy'>
                          <p className="table-partial">
                            {exceptional?.status === 'PARTIAL'
                              ? exceptional.message
                              : 'Aucun déjeuner disponible'}
                          </p>
                        </td>
                      ) : (
                        <>
                          {filteredMenus.map(menu => {
                            const hide = reservations[jour.date] && reservations[jour.date] !== menu.choice;
                            return (
                              <td className='td-navy' key={menu.choice}>
                                {!hide ? (
                                  <MenuCard
                                    dayKey={jour.date}
                                    choice={menu.choice}
                                    {...menu}
                                    price={pricePerMeal.toFixed(2)}
                                    isSelected={isSelected(jour.date, menu.choice)}
                                    isDisabled={reservations[jour.date] && reservations[jour.date] !== menu.choice}
                                    onReservation={handleReservation}
                                  />
                                ) : null}
                              </td>
                            );
                          })}
                        </>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* VERSION MOBILE */}
          <div className="d-md-none">
            {filteredJours.map(jour => {
              const exceptional = EXCEPTIONAL_DAYS[jour.date];
              const lunchMenus = getLunchMenusForDate(menus, jour.date);

              const filteredMenus = lunchMenus.filter(menu =>
                normalize(menu.entree).includes(normalize(searchTerm)) ||
                normalize(menu.plat).includes(normalize(searchTerm)) ||
                normalize(menu.dessert).includes(normalize(searchTerm))
              );

              if (filteredMenus.length === 0 && !(exceptional && exceptional.status)) return null;

              return (
                <div key={jour.date} className="mb-4 card-mobile">
                  <h5 className='date-mobile'>{jour.formattedDate}</h5>
                  {exceptional?.status === 'CLOSED' ? (
                    <div className="card-closed">
                      <p className="m-0">{exceptional.message}</p>
                    </div>
                  ) : filteredMenus.length === 0 ? (
                    <div className="card-partial bg-secondary">
                      <p className="m-0">
                        {exceptional?.status === 'PARTIAL'
                          ? exceptional.message
                          : 'Aucun déjeuner disponible'}
                      </p>
                    </div>
                  ) : (
                    <>
                      {filteredMenus.map(menu => {
                        const alreadyReserved = reservations[jour.date] && reservations[jour.date] !== menu.choice;
                        if (alreadyReserved) return null;
                        return (
                          <div key={menu.choice} className="mt-3">
                            <MenuCard
                              dayKey={jour.date}
                              choice={menu.choice}
                              {...menu}
                              price={pricePerMeal.toFixed(2)}
                              isSelected={isSelected(jour.date, menu.choice)}
                              isDisabled={reservations[jour.date] && reservations[jour.date] !== menu.choice}
                              onReservation={handleReservation}
                            />
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Résumé des réservations */}
      <div className="card-mobile text-light mt-4 px-3">
        <p>
          🟢 Vous avez réservé <span className='text-green fs-4 fw-bold'>{totalReserved}</span> menu(s)<br />
          💰 Prix total : <span className='text-yellow fs-4 fw-bold'>{totalPrice.toFixed(2)} €</span>
        </p>

        {totalReserved > 0 ? (
          <button className="btn btn-sm fw-bold btn-yellow" onClick={handleSubmit}>
            Valider mes réservations
          </button>
        ) : (
          <button className="btn btn-navy border-0 btn-sm" disabled>
            Aucune réservation
          </button>
        )}
      </div>
    </div>
  );
};

export default MenuList;
