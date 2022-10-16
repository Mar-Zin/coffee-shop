import style from "./index.module.scss";

interface TextAreaFieldProps {
  name:string
  value:string
  onChange:Function
  error:string
}

const TextAreaField = ({ name, value, onChange, error }:TextAreaFieldProps) => {
  const handleChange = ({ target }:any) => {
    onChange({ name: target.name, value: target.value });
  };

  return (
    <>
      <textarea
        placeholder="Добавить текст"
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        className={style.postForm}
      />
      {error && <div className={style.error}>{error}</div>}
    </>
  );
};

TextAreaField.defaultProps = {
  type: "text",
};



export default TextAreaField;
