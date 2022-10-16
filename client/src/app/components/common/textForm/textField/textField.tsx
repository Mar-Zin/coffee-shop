import { ChangeEvent } from "react";
import style from "./index.module.scss";

type TextFieldProps = {
  placeholder: string,
  name: string,
  onChange: any,
  type: string,
  value: string|number|undefined,
  min?: any,
  error?: string,
};

const TextField = ({
  placeholder,
  name,
  onChange,
  type,
  value,
  min,
  error,
}: TextFieldProps) => {
  const handleChange = ({ target }:any) => {
    onChange({ name: target.name, value: target.value });
  };

  return (
    <div style={{ marginBottom: "20px", backgroundColor: "inherit" }}>
      <input
        type={type}
        min={type === "number" ? min : null}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={style.input}
      />
      {error && <div className={style.error}>{error}</div>}
    </div>
  );
};

TextField.defaultProps = {
  type: "text",
};


export default TextField;
