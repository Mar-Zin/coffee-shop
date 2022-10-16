
interface SelectFieldProps {
 label:string
 value:string
 onChange:Function
 options:string[]
 name:string
 defaultValue:string
}

const SelectField = ({
  label,
  value,
  onChange,
  options,
  name,
  defaultValue,
}:SelectFieldProps) => {
  const handleChange = ({ target }:any) => {
    onChange({ name: target.name, value: target.value });
  };

  return (
    <div style={{ backgroundColor: "#fff" }}>
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name} value={value} onChange={handleChange}>
        <option disabled value="">
          {defaultValue}
        </option>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};



export default SelectField;
