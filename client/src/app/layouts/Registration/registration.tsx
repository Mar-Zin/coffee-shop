import React, { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import CheckBoxField from "../../components/common/textForm/checkBoxField/checkBoxField";
import RadioField from "../../components/common/textForm/radioField/radioField";
import TextField from "../../components/common/textForm/textField/textField";
import { useAppDispatch } from "../../components/ui/hooks/redux";
import { signUp } from "../../store/users";
import { validator } from "../../utils/validator";
import style from "./index.module.scss";

type Errors = {
  name?:string
  email?:string
  password?:string
  licence?:string
  notify?:string
}

const Registration = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    notify: "yes",
    licence: false,
  });
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (target:any) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validatorConfig = {
    email: {
      isRequired: { message: "Email обязателен для заполнения" },
      isEmail: { message: "Email введен некорректно" },
    },
    name: {
      isRequired: { message: "Имя обязательно для заполнения" },
      min: { message: "Имя должно содержать минимум 2 буквы", value: 2 },
    },
    password: {
      isRequired: { message: "Пароль обязателен для заполнения" },
      isCapitalSymbol: {
        message: "Пароль должен содержать как минимум один заглавный символ",
      },
      isContainDigital: {
        message: "Пароль должен содержать как минимум одну цифру",
      },

      min: { message: "Пароль должен содержать минимум 8 символов", value: 8 },
    },
    licence: {
      isRequired: {
        message:
          "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения",
      },
    },
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (event:FormEvent) => {
    event.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const newData = { ...data, cart: [], favorites: [] };
    dispatch(signUp(newData, navigate));
  };
  return (
    <div className="container">
      <div className="wrapper">
        <div className="row">
          <div className={style.loginPage}>
            <form onSubmit={handleSubmit}>
              <h2 className={style.h2}>Регистрация</h2>
              <div style={{ width: "40%" }}>
                <TextField
                  placeholder="* Имя"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  error={errors.name}
                />
              </div>
              <div style={{ width: "40%" }}>
                <TextField
                  placeholder="* E-Mail"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  error={errors.email}
                />
              </div>
              <div style={{ width: "40%" }}>
                <TextField
                  type="password"
                  placeholder="* Пароль"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  error={errors.password}
                />
              </div>
              <RadioField
                options={[
                  { name: "Yes", value: "yes", label: "Да" },
                  { name: "No", value: "no", label: "Нет" },
                ]}
                value={data.notify}
                name="notify"
                onChange={handleChange}
              />

              <CheckBoxField
                value={data.licence}
                onChange={handleChange}
                name="licence"
                error={errors.licence}
              />

              <button className={style.blackBtn} disabled={!isValid}>
                Зарегистрироваться
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
