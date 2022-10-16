import React, { useState } from "react";
import {  useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { validator } from "../../../utils/validator";
import { getAuthError, logIn } from "../../../store/users";
import style from "./index.module.scss";
import TextField from "../textForm/textField/textField";
import { useAppDispatch } from "../../ui/hooks/redux";

type LoginPopUpProps = {
  popUp:boolean
  setPopUp:Function
}

type LocationState = {
    referrer :{
      pathname: string;
    }
}

type ErrorType = {
  email?: string,
  password?: string,
}

const LoginPopUp = ({ popUp, setPopUp }:LoginPopUpProps) => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const loginError = useSelector(getAuthError());
  const [errors, setErrors] = useState<ErrorType>({});

  const [data, setData] = useState({
    email: "",
    password: "",
    stayOn: false,
  });

  const handleChange = (target:any) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    setErrors((prevState) => ({ ...prevState, [target.name]: "" }));
  };

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения",
      },
    },
    password: {
      isRequired: { message: "Пароль обязателен для заполнения" },
    },
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event:any) => {
    event.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const redirect = location.state ? (location.state as LocationState).referrer.pathname : "/";
    dispatch(logIn({ payload: data, redirect }));
    if (!loginError) setPopUp(false);
  };

  return (
    <>
      {popUp && (
        <div className={style.popUp}>
          <a className={style.closeBtn} onClick={() => setPopUp(false)}></a>
          <form className={style.popUp__En} onSubmit={handleSubmit}>
            <h5>Вход на сайт</h5>

            <TextField
              type="email"
              placeholder="* Email"
              name="email"
              value={data.email}
              onChange={handleChange}
              error={errors.email}
            />
            <TextField
              type="password"
              placeholder="* Password"
              name="password"
              value={data.password}
              onChange={handleChange}
              error={errors.password}
            />

            <div className={style.checkbox_wrap}>
              <input
                type="checkbox"
                name="remember"
                id="remember"
                className={style.checkbox_input}
              />
              <label htmlFor="remember" className={style.checkbox_label}>
                <span className={style.label__text}>
                  Запомнить меня на этом компьютере
                </span>
              </label>
            </div>
            <span className={style.error}>{loginError}</span>
            <input type="submit" value="Войти" className={style.blackBtn} />
            <Link 
            to='password/reset' 
            className={style.enterLk__link}
            onClick={() => setPopUp(false)}
            >
              Забыли пароль?
            </Link>
          </form>
          <Link
            to="/registration"
            className={style.popUp_reg}
            onClick={() => setPopUp(false)}
          >
            Регистрация
          </Link>
        </div>
    )}  
    </>
  );
};

export default LoginPopUp;
