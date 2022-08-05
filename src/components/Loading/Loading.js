import React from 'react';

import Sketch from '../Sketch/Sketch';
import uploadLogo from '../../images/light/result.svg';

const urlSet = new Set([]);
const nameSet = new Map();
const tagSet = new Map();
let fileSet = [];

function Loading(props) {

  const [formClass, setFormClass] = React.useState('');
  const [objectURL, setObjectURL] = React.useState([]);
  const [isValid, setIsValid] = React.useState(false);


  function handleDragOver(e) {
    e.preventDefault();
    setFormClass('form_dragover');
  }

  function handleDragLeave(e) {
    e.preventDefault();
/*     let dx = e.pageX - e.currentTarget.offsetLeft;
    let dy = e.pageY - e.currentTarget.offsetTop;
    if ((dx < 0) || (dx > e.currentTarget.clientWidth) || (dy < 0) || (dy > e.currentTarget.clientHeight)) {
      setFormClass('');
    }; */
    setFormClass('');
  }

  function checkFileType(file) {
    if (
      (file && file.type === 'image/png') |
      file.type === 'image/jpeg' ||
      file.type === 'image/jpg' ||
      file.type === 'image/svg+xml'
    ) {
        urlSet.add(window.URL.createObjectURL(file));
        fileSet.push(file);
      } else alert(`Неподходящий формат файла (${file.type}). Используйте jpeg, jpg, png, svg`);
  }


  function handleLoadingInput(e) {
    let files = e.target.files;
    Array.from(files).forEach((file) => {
      checkFileType(file);
    })
    setObjectURL(Array.from(urlSet));
  }

  function handleDrop(e) {
    e.preventDefault();
    let files = e.dataTransfer.files;
    Array.from(files).forEach((file) => {
      checkFileType(file);
    })
    setObjectURL(Array.from(urlSet));
    setFormClass('');
  }

  function handleNameChange(e) {
    nameSet.set(Array.from(e.form).indexOf(e), e.value);
    setIsValid(e.form.checkValidity());
  }

  function handleTagChange(e) {
    tagSet.set(Array.from(e.form).indexOf(e), e.value);
    setIsValid(e.form.checkValidity());
  }

  function submit(e) {
    e.preventDefault();
    if(isValid) {
      props.addNewCard(fileSet, nameSet, tagSet);
      setObjectURL([]);
      urlSet.clear();
      fileSet = [];
      setIsValid(false);
    }
  }

  const uploadBtnClass = isValid ? 'form__btn form__btn_active' : 'form__btn';

  return (
    <form className={`form ${formClass}`} onDragOver={handleDragOver}
      onDragLeave={handleDragLeave} onDrop={handleDrop} onSubmit={submit}>
      <img className="form__image" src={uploadLogo} alt="upload logo" />
      <input className="form__input" id="form__input" type="file" accept="image/*" multiple onChange={handleLoadingInput} />
      <label className="form__label" htmlFor="form__input">Выберите файлы </label>
      <span className="form__span">или перетащите их сюда</span>
      <button className={uploadBtnClass} type="submit">Загрузить</button>
      <div className="form__container">
        {objectURL.map((i) => {
          return (
            <Sketch
              objectURL={objectURL}
              key={i}
              src={i}
              handleNameChange={handleNameChange}
              handleTagChange={handleTagChange}
            />
          )
        })}
      </div>
    </form>
  );
}

export default Loading;
