import PropTypes from "prop-types";
import style from "./index.module.scss";

interface RadioFieldProps  {
  options:Option[]
  name:string
  onChange:Function
  value:string|undefined
}
interface Option  {
  name:string
  value:string
  label:string
}

const RadioField = ({ options, name, onChange, value }:RadioFieldProps) => {
  const handleChange = ({ target }:any) => {
    onChange({ name: target.name, value: target.value });
  };

  return (
    <div className={style.radio_wrapper}>
      <p className={style.radio_text}>
        Уведомлять меня о скидках, <br /> распродажах и новостях:
      </p>
      <div className={style.radio}>
        {options.map((option) => (
          <div
            className={style.radio_yes}
            key={option.name + "_" + option.value}
          >
            <label
              htmlFor={option.name + "_" + option.value}
              style={{ cursor: "pointer" }}
              className={style.radio_label}
            >
              <input
                type="radio"
                name={name}
                id={option.name + "_" + option.value}
                value={option.value}
                onChange={handleChange}
                style={{ display: " none" }}
                checked={option.value === value}
              />
              <span className={style.radio_span}></span>
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

RadioField.propTypes = {
  options: PropTypes.array,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.string,
};

export default RadioField;
