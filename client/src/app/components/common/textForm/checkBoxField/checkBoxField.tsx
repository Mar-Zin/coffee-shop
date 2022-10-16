import style from "./index.module.scss";

type CheckBoxFieldProps = {
  name:string
  value:any
  onChange:Function
  error:string | undefined
}

const CheckBoxField = ({ name, value, onChange, error }:CheckBoxFieldProps) => {
  const handleChange = ({ target }:any) => {
    onChange({ name: name, value: !value });
  };

  return (
    <div className={style.checkbox_wrapper}>
      <label
        htmlFor={name}
        style={{ cursor: "pointer" }}
        className={style.checkbox_label}
      >
        <input
          type="checkbox"
          name={name}
          id={name}
          value={value}
          style={{ display: " none" }}
          onChange={handleChange}
        />

        <span className={style.checkbox_span}></span>
        <span className={style.label_text}>
          <p>
            Согласен с{" "}
            <a href="#" className={style.link}>
              условиями обработки персональных данных
            </a>
            ,
            <br />
            <a href="#" className={style.link}>
              Пользовательского соглашения
            </a>{" "}
            и{" "}
            <a href="#" className={style.link}>
              Публичной оферты
            </a>
          </p>
        </span>
      </label>
      {error && <div className={style.error}>{error}</div>}
    </div>
  );
};

export default CheckBoxField;
