import { useState, useEffect, ChangeEvent } from "react";
import { ICatalogItem } from "../../../../models";
import { createItem, updateItemData } from "../../../store/catalog";
import SelectField from "../../common/textForm/selectField/selectField";
import TextField from "../../common/textForm/textField/textField";
import { useAppDispatch } from "../hooks/redux";
import style from "./index.module.scss";

type ModalProps = {
  active:boolean
  setActive:Function
  catalogItem:ICatalogItem 
  add:boolean
  setAdd:Function
}

const Modal = ({ active, setActive, catalogItem, add, setAdd }:ModalProps) => {
  const dispatch = useAppDispatch()
  const methods = ["Для фильтра", "Для эспрессо", "Дрип-пакеты", "Капсулы"];
  const processing = ["Мытый", "Натуральный"];
  const [data, setData] = useState({
    title: "",
    price: 0,
    method: "",
    processing: "",
  });

  useEffect(() => {
    setData({ ...catalogItem });
  }, [catalogItem]);

  const handleChange = (target:any) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const closeModal = () => {
    setActive(false);
    setData({
      title: "",
      price: 0,
      method: "Для фильтра",
      processing: "Мытый",
    });
    setAdd(false);
  };

  const handleSubmit = (event:any) => {
    event.preventDefault();
    if (!add) {
      dispatch(
        updateItemData({...catalogItem,
          ...data,
        })
      );
    }
    if (add) {
      dispatch(createItem({ ...data }));
    }
    console.log(data);
    setActive(false);
    setData({
      title: "",
      price: 0,
      method: "Для фильтра",
      processing: "Мытый",
    });
  };

  return (
    <div
      className={style.modal}
      style={active ? { display: "flex" } : { display: "none" }}
      onClick={closeModal}
    >
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className={style.form}>
          <TextField
            placeholder="Название"
            name="title"
            value={data.title}
            onChange={handleChange}
          />
          <TextField
            placeholder="Цена"
            name="price"
            value={data.price}
            onChange={handleChange}
            type="number"
            min="1"
          />

          <SelectField
            label="Выбери метод"
            options={methods}
            name="method"
            onChange={handleChange}
            value={data.method}
            defaultValue={"Открыть список"}
          />
          <SelectField
            label="Выбери обработку"
            options={processing}
            name="processing"
            onChange={handleChange}
            value={data.processing}
            defaultValue={"Открыть список"}
          />
          {add ? (
            <button className={style.button}>Добавить товар</button>
          ) : (
            <button className={style.button}>Редактировать товар</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Modal;
