import { FormEvent, FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import userService from "../../../services/user.service";
import { validator } from "../../../utils/validator";
import TextField from "../../common/textForm/textField/textField";
import style from './index.module.scss'

type Errors = {
    email?:string
    password?:string
    copyPassword?:string
}
 
const ResetPassword: FunctionComponent = () => {
    const { token } = useParams()
    const [data, setData] = useState({email:'', password:'', copyPassword:''});
    const [errors, setErrors] = useState<Errors>({});

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
            isEmail: { message: "Email введен некорректно" }
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
        copyPassword : {
            isPasswordMatch: { message: 'Поле Пароль не совпадает с подтверждением.', value: data.password }
        }
    }

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
            const { content } = await userService.checkToken(token, data)
            console.log(content)
        } catch (error:any) {
            if(error.response.data.message === "INVALID_TOKEN") {
                setErrors({email:'Ссылка для смены пароля устарела. Запросите еще раз.'})
             }
        }
    };

    return (  
    <div className="container">
       
        <div className="row">
             <div className="h2">
                <h2 className="h2-title">
                    Смена пароля
                </h2>
             </div>
             <form onSubmit={handleSubmit}>
                    <div style={{ width: "30%", marginBottom: '50px' }}>
                        <TextField
                        placeholder="Email"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        error={errors.email}
                        />
                    </div>
                    <div style={{ width: "30%", marginBottom: '50px' }}>
                        <TextField
                        placeholder="Новый пароль"
                        name="password"
                        type="password"
                        value={data.password}
                        onChange={handleChange}
                        error={errors.password}
                        />
                    </div>
                    <div style={{ width: "30%", marginBottom: '50px'}}>
                        <TextField
                        placeholder="Повторите пароль"
                        name="copyPassword"
                        type="password"
                        value={data.copyPassword}
                        onChange={handleChange}
                        error={errors.copyPassword}
                        />
                    </div>
                    
                    
                    <button className={style.blackBtn} disabled={!isValid}>Сменить пароль</button>
                </form>

        </div>
    </div>
         );
}
 
export default ResetPassword;