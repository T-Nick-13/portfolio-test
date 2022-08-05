import React from 'react';

import validationLogo from '../../images/light/premium-icon-check-mark-4225683.png';

function Sketch(props) {

  const [nameIsValid, setNameIsValid] = React.useState(false);
  const [tagIsValid, setTagIsValid] = React.useState(false);

  function onNameChange(e) {
    if (e.target.value.length > 1) {
      setNameIsValid(true);
    } else setNameIsValid(false);
    props.handleNameChange(e.target);
  }

  function onTagChange(e) {
    if (e.target.value.length > 0) {
      setTagIsValid(true);
    } else setTagIsValid(false);
    props.handleTagChange(e.target);
  }

  const valdiationClass = nameIsValid && tagIsValid ? 'form__validation form__validation_active' : 'form__validation';

  return (
    <div className="form__sketch">
      <img src={props.src} alt="" className="form__img"></img>
      <div className="form__overlay">
        <input className="form__sketch-input id" placeholder="Name" onChange={onNameChange}
          minLength="2" maxLength="30" required></input>
        <select className="form__sketch-input" required="required" onChange={onTagChange}>
          <option value="">Tag</option>
          <option value="#card">#card</option>
          <option value="#advertising">#advertising</option>
          <option value="#sticker">#sticker</option>
          <option value="#people">#people</option>
          <option value="#holidays">#holidays</option>
        </select>
        <img src={validationLogo} alt="validationLogo" className={valdiationClass}></img>
      </div>
    </div>
  );
}

export default Sketch;
