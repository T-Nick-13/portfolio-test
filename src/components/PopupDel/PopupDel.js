import React from 'react';

function PopupDel(props) {

  const activePopup = props.activePopup ? 'popup popup_active' : 'popup';
  const activeForm = props.activePopup ? 'popup__form popup__form_active' : 'popup__form';

  const objectsAmount = props.amountSelectedCards === 1 ? 'объект'
    : props.amountSelectedCards > 1 && props.amountSelectedCards < 5 ? 'объекта' : 'объектов';

  function closePopup() {
    props.onPopupClose();
  }

  function submitDeleting(e) {
    e.preventDefault();
    props.onSubmit();
  }

  return (
    <div className={activePopup}>
      <form className={activeForm} noValidate onSubmit={submitDeleting}>
        <button className="popup__btn" type="submit">Удалить {props.amountSelectedCards} {objectsAmount}</button>
        <button className="popup__btn popup__btn_cancel" type="button" onClick={closePopup}>Отмена</button>
      </form>
    </div>
  );
}

export default PopupDel;
