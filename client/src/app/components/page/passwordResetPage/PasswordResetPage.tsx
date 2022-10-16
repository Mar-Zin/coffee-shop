import { FormEvent, FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../../../services/user.service";
import { validator } from "../../../utils/validator";
import TextField from "../../common/textForm/textField/textField";
import { useAppDispatch } from "../../ui/hooks/redux";
import style from './index.module.scss'

type Errors = {
    email?:string
}
 
const PasswordResetPage: FunctionComponent = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [data, setData] = useState({email:''});
    const [errors, setErrors] = useState<Errors>({});

    const handleChange = (target:any) => {
        setData((prevState) => ({
          ...prevState,
          [target.name]: target.value,
        }));
      };

    
    const validatorConfig = {
        email: {
        isRequired: { message: "Email обязателен для заполнения" },
        isEmail: { message: "Email введен некорректно" }
        }
    }

    useEffect(() => {
        validate();
      }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = async (event:FormEvent) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        try {
            await userService.checkUser(data.email)
            setErrors({email:'На Ваш Email отправлено письмо с ссылкой на востановление пароля'})
        } catch (error:any) {
            if(error.response.data.error.message === "EMAIL_NOT_FOUND") {
               setErrors({email:'Пользователя с таким Email не существует'})
            }
        }
    };

    return ( 
    <div className="container">
            <div className="row">
                <div className="h2">
                    <h2 className="h2-title">
                        Восстановление пароля
                    </h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div style={{ width: "30%" }}>
                    <TextField
                    placeholder="Email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    error={errors.email}
                    />
                    </div>
                    {/* {errorsToEmail && <p className={style.text}>Пользователя с таким Email не существует</p>} */}
                    <p className={style.text}> Введите адрес электронной почты вашей учетной записи. Нажмите кнопку Продолжить, чтобы получить пароль по электронной почте </p>
                    <button className={style.blackBtn} disabled={!isValid}>Продолжить</button>
                </form>
            </div>
    </div>
         );
}
 
export default PasswordResetPage;