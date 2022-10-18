import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
import { validator } from "../../../utils/validator";
import TextField from "../../common/textForm/textField/textField";
import RadioField from "../../common/textForm/radioField/radioField";
import { useSelector} from "react-redux";
import { getCurrentUserData, updateUserData } from "../../../store/users";
import { useAppDispatch } from "../../ui/hooks/redux";

type User = {
  _id?: string
  name?: string
  email?: string
  password?: string
  notify?: string
  cart?: []
  roles?: string
  createdAt?: string
  updatedAt?: string
  __v?: number
}
type Errors = {
  name?:string
  email?:string
  notify?:string
}

const EditUserPage = () => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<User>({});
  const currentUser = useSelector(getCurrentUserData());
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (currentUser && !data) {
      setData({
        ...currentUser,
      });
    }
  }, [currentUser, data]);

  useEffect(() => {
    if (data && isLoading) {
      setIsLoading(false);
    }
  }, [data]);

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения",
      },
      isEmail: {
        message: "Email введен некорректно",
      },
    },
    name: {
      isRequired: {
        message: "Введите ваше имя",
      },
    },
  };
  useEffect(() => {
    validate();
  }, [data]);
  const handleChange = (target:any) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e:any) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    dispatch(
      updateUserData({
        ...data,
      })
    );
  };

  return (
    <div className="container">
      <div className="row">
        <div className={style.room}>
          <h2 className={style.h2}>Личный кабинет</h2>
          <div className={style.menu}>
            <ul className={style.menu_list}>
              <li>Личные данные</li>
              <li>Накопительная система</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="">
          {!isLoading ? (
            <form onSubmit={handleSubmit}>
              <div style={{width:"30%"}}>
              <TextField
                placeholder="* Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
              />
              </div>
              <div style={{width:"30%"}}>
              <TextField
                placeholder="* E-Mail"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
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
              <button
                type="submit"
                disabled={!isValid}
                className={style.blackBtn}
              >
                Обновить
              </button>
            </form>
          ) : (
            "Loading..."
          )}
        </div>
      </div>
    </div>
  );
};

export default EditUserPage;
