import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import MenuCard from './MenuCard';
import MenuSearch from './MenuSearch';
import { menus, EXCEPTIONAL_DAYS } from '../data/data.js';
import { getPriceForRole } from '../logic/users.js';
import { getLunchMenusForDate } from '../logic/menus.js';


const MenuList = () => {
  const location = useLocation();
  const subRole = location.state?.subRole || localStorage.getItem('subRole') || 'Apprenant';

  const [reservations, setReservations] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

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
    const confirmation = window.confirm(
      `Vous avez réservé ${totalReserved} menu(s). ✅\n 🧾Total : ${totalPrice.toFixed(2)} € 💶\n\nSouhaitez-vous confirmer ces réservations ?`
    );

    if (confirmation) {
      alert(`Réservations confirmées ✅`);
      
    } else {
      alert(`Réservations annulées. Vous pouvez les modifier avant de valider.`);
    }
  };

  const jours = menus.map(day => ({
    ...day,
    formattedDate: new Date(day.date).toLocaleDateString("fr-FR", {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    }).replace(/^./, str => str.toUpperCase())
  }));

  const hasMenuError = !Array.isArray(menus) || menus.length === 0;


  // Filtrer les jours en fonction de la recherche
  const filteredJours = jours.filter(jour => {
    const lunchMenus = getLunchMenusForDate(menus, jour.date).filter(menu =>
      menu.entree.toLowerCase().includes(searchTerm) ||
      menu.plat.toLowerCase().includes(searchTerm) ||
      menu.dessert.toLowerCase().includes(searchTerm)
    );

    // Si la recherche est vide → on garde tous les jours y compris les fermetures
    if (searchTerm.trim() === '') {
      return lunchMenus.length > 0 || EXCEPTIONAL_DAYS[jour.date];
    }

    // Si une recherche est active → garder uniquement les jours avec menus correspondants
    return lunchMenus.length > 0;
  });

  return (
    <div className="menu-wrapper">
      <h1 className="menu-title">Menus de la semaine</h1>

      {hasMenuError ? (
        <div className="alert alert-danger text-center my-4">
          ❌ Erreur lors du chargement des menus, veuillez réessayer.
        </div>
      ) : (
        <></> )}
      {/* Barre de recherche */}
      <MenuSearch searchTerm={searchTerm} onSearch={setSearchTerm} />

      {filteredJours.length === 0 ? (
        <div className="alert alert-danger text-center my-4">
          ❌ Aucun menu ne correspond à votre recherche.
        </div>
      ) : (
        <>
          {/* TABLEAU DESKTOP */}
          <div className="d-none d-md-block">
            <table className="table c3po-table">
              <tbody>
                {filteredJours.map(jour => {
                  const exceptional = EXCEPTIONAL_DAYS[jour.date];

                  const lunchMenus = getLunchMenusForDate(menus, jour.date).filter(menu =>
                    menu.entree.toLowerCase().includes(searchTerm) ||
                    menu.plat.toLowerCase().includes(searchTerm) ||
                    menu.dessert.toLowerCase().includes(searchTerm)
                  );

                  if (lunchMenus.length === 0 && !exceptional) return null; 
                  return (
                    <tr className='table-date' key={jour.date}>
                      <td><p className='text-light fs-5'>{jour.formattedDate}</p></td>

                      {exceptional?.status === 'CLOSED' ? (
                        <td colSpan={2} className="text-center">
                          <div className="table-exceptional">
                            <h5 className="mb-2">🔒 {exceptional.message}</h5>
                          </div>
                        </td>
                      ) : lunchMenus.length === 0 ? (
                        <td colSpan={2}> <h5 className="table-exceptional text-secondary">
                          {exceptional?.status === 'PARTIAL'
                            ? exceptional.message
                            : 'Aucun déjeuner disponible'}</h5>
                        </td>
                      ) : (
                        <>
                          <td className='menu-col'>
                            {/* Choix 1 */}
                            {(() => {
                              const menu = lunchMenus.find(m => m.choice === 'Choix 1');
                              const hide = reservations[jour.date] && reservations[jour.date] !== 'Choix 1';

                              return (
                                <td>
                                  {!hide && menu ? (
                                    <MenuCard
                                      dayKey={jour.date}
                                      choice="Choix 1"
                                      {...menu}
                                      price={pricePerMeal.toFixed(2)}
                                      isSelected={isSelected(jour.date, 'Choix 1')}
                                      isDisabled={reservations[jour.date] && reservations[jour.date] !== 'Choix 1'}
                                      onReservation={handleReservation}
                                    />
                                  ) : null}
                                </td>
                              );
                            })()}

                            {/* Choix 2 */}
                            {(() => {
                              const menu = lunchMenus.find(m => m.choice === 'Choix 2');
                              const hide = reservations[jour.date] && reservations[jour.date] !== 'Choix 2';

                              return (
                                <td>
                                  {!hide && menu ? (
                                    <MenuCard
                                      dayKey={jour.date}
                                      choice="Choix 2"
                                      {...menu}
                                      price={pricePerMeal.toFixed(2)}
                                      isSelected={isSelected(jour.date, 'Choix 2')}
                                      isDisabled={reservations[jour.date] && reservations[jour.date] !== 'Choix 2'}
                                      onReservation={handleReservation}
                                    />
                                  ) : null}
                                </td>
                              );
                            })()}
                          </td>
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

            const lunchMenus = getLunchMenusForDate(menus, jour.date).filter(menu =>
              menu.entree.toLowerCase().includes(searchTerm) ||
              menu.plat.toLowerCase().includes(searchTerm) ||
              menu.dessert.toLowerCase().includes(searchTerm)
            );

            if (lunchMenus.length === 0 && !exceptional) return null; // 👈 masque la carte

              return (
                <div key={jour.date} className="mb-4 card-mobile">
                  <h5 className='date-mobile'>{jour.formattedDate}</h5>
                  
                  {exceptional?.status === 'CLOSED' ? (
                    <div className="card-exceptional"> 
                      <h5 className="m-0"> {exceptional.message}</h5>
                    </div>
                  ) : lunchMenus.length === 0 ? (
                    <div className="card-exceptional text-secondary">
                      <p className="m-0">
                        {exceptional?.status === 'PARTIAL'
                          ? exceptional.message
                          : 'Aucun déjeuner disponible'}
                      </p>
                    </div>
                  ) : (
                    <>
                      {['Choix 1', 'Choix 2'].map(choice => {
                        const menu = lunchMenus.find(m => m.choice === choice);
                        const alreadyReserved = reservations[jour.date] && reservations[jour.date] !== choice;

                        if (alreadyReserved) return null;

                        return (
                          <div key={choice} className="mt-3">
                            <MenuCard
                              dayKey={jour.date}
                              choice={choice}
                              {...menu}
                              price={pricePerMeal.toFixed(2)}
                              isSelected={isSelected(jour.date, choice)}
                              isDisabled={reservations[jour.date] && reservations[jour.date] !== choice}
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
