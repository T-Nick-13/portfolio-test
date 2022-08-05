import React from 'react';
import { Link } from 'react-router-dom';

function Login(props) {

  const [error, setError] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const [data, setData] = React.useState({
    email: '',
    password: ''
  })

  const btnClass = `${isValid ? "auth__btn link" : "auth__btn auth__btn_inactive"}`;
  const unauthorizedClass = `${props.unauthorized ? "auth__auth-err  auth__auth-err_active" : "auth__auth-err"}`;

  function handleChange(e) {
    const {name, value} = e.target;
    setData({
      ...data,
      [name]: value
    });
    setError({ ...error, [name]: e.target.validationMessage });
    setIsValid(e.target.closest("form").checkValidity());
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.handleLogin(data);
  }

  return(
    <div className="auth">
      <p className="auth__heading">Рады видеть!</p>
      <form className="auth__form" onSubmit={handleSubmit}>
        <label className="auth__label">E-mail
          <input id="email" className="auth__input" required name="email" type="email"
            value={data.email} onChange={handleChange} />
        </label>
        <p className="auth__error">{error.email}</p>
        <label className="auth__label">Пароль
          <input id="password" className="auth__input" required name="password" type="password"
            value={data.password} onChange={handleChange} minLength="2" />
        </label>
        <p className="auth__error">{error.password}</p>
        <p className={unauthorizedClass}>Неверный email или пароль</p>
        <button type="submit" className={btnClass}>Войти</button>
        <p className="auth__text">Ещё не зарегистрированы?&nbsp;
          <Link to="/signup" className="auth__link link">Тестовый вход</Link>
        </p>
      </form>
    </div>
  )
}

export default Login;
