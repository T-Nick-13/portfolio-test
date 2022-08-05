import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import uploadLogo from '../../images/light/Загрузить.svg';
import deletedLogo from '../../images/light/Удалить.svg';
import statisticLogo from '../../images/light/Статистика.svg';

function Navigation(props) {

  function handleClickLoading() {
    props.handleLoading();
  }

  function handleLogoClick() {
    props.onLogoClick();
  }

  function handleClickDelete() {
    props.onDeleteClick();
  }

  function handleClickStat() {
    props.onStatClick();
  }

  const deleteClass = props.deletingActive ? 'menu__li menu__li_active' : 'menu__li';
  const menuClass = props.loggedIn ? 'menu' : 'menu menu_inactive';
  const route = useLocation().pathname;

  return (
    <nav className={menuClass}>
      <div className="menu__container">
        <Link to="/" className="menu__heading" onClick={handleLogoClick}>Natalya Stafeeva</Link>
        <Link to="/" className="menu__heading_ts" onClick={handleLogoClick}><p>NS</p></Link>
        <ul className="menu__ul">
          <li onClick={handleClickLoading}>
            <Link to="/upload" className={`${route === '/upload' ? 'menu__li menu__li_active' : 'menu__li'}`}>
              <img className="menu__icon" src={uploadLogo} alt="download-icon"/>
              Загрузить
            </Link>
          </li>
          <li onClick={handleClickDelete}>
            <Link to="/" className={deleteClass}>
              <img className="menu__icon" src={deletedLogo} alt="delete-icon" />
              Удалить
            </Link>
          </li>
          <li onClick={handleClickStat}>
            <Link to="/statistic" className={`${route === '/statistic' ? 'menu__li menu__li_active' : 'menu__li'}`}>
              <img className="menu__icon" src={statisticLogo} alt="stat-icon" />
              Статистика
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}


export default Navigation;
