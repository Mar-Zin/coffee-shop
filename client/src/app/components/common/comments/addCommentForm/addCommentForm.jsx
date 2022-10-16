import React, { useState } from "react";
import style from "./index.module.scss";
import PropTypes from "prop-types";
import { validator } from "../../../../utils/validator";
import TextAreaField from "../../textForm/textAreaField/textAreaField";

const AddCommentForm = ({ onSubmit }) => {
  const [data, setData] = useState({ content: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
    setErrors({});
  };

  const validatorConfig = {
    content: {
      isRequired: { message: "Сообщение не может быть пустым" },
    },
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const clearForm = () => {
    setData({});
    setErrors({});
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    onSubmit(data);
    clearForm();
  };

  return (
    <div className={style.addForm}>
      <h2>Добавить комментарий</h2>
      <form onSubmit={handleSubmit}>
        <TextAreaField
          label="Комментарий"
          name="content"
          value={data.content || ""}
          onChange={handleChange}
          error={errors.content}
        />

        <button className={style.blackBtn}>Опубликовать</button>
      </form>
    </div>
  );
};

AddCommentForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default AddCommentForm;
