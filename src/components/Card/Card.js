import React from 'react';

import selectedLogo from '../../images/light/premium-icon-select-2594142.png';

function Card(props) {

  function selectCard() {
    if (props.btnChoiceActve) {
      props.onCardSelect(props.card);
    }
  }

  const isLiked = props.selectedCards.some(i => i === props.card);
  const overlaySelectedClass = isLiked ? 'card__overlay card__overlay_selected' : 'card__overlay';
  const selectedClass = isLiked ? 'card__selected_active' : '';
  const newClass = !props.selectBtnActive ? 'card__overlay card__overlay_inactive' : overlaySelectedClass;

  return (
    <div className="card" >
      <img src={props.card.link} alt={props.card.name} className="card__img" ></img>
      <div className={newClass} onClick={selectCard} ></div>
      <img src={selectedLogo} alt="selected logo" className={`card__selected ${selectedClass}`} ></img>
    </div>
  );
}


export default Card;
