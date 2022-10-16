import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ICatalogItem } from "../../../../models";
import { getCatalog, removeItem } from "../../../store/catalog";
import { getCurrentUserData } from "../../../store/users";
import { useAppDispatch } from "../../ui/hooks/redux";
import Modal from "../../ui/modal/modal";
import style from "./index.module.scss";

const Admin = () => {
  const dispatch = useAppDispatch();
  const [modalActive, setModalActive] = useState(false);
  const [catalogItem, setCatalogItem] = useState({
    createdAt: '',
    method: '',
    price: 0,
    processing: '',
    title: '',
    updatedAt: '',
    __v: 0,
    _id: ''
});
  const [add, setAdd] = useState(false);
  const catalog = useSelector(getCatalog());
  const currentUser = useSelector(getCurrentUserData());

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const editItem = (item:ICatalogItem) => {
    setCatalogItem({ ...item });
    setModalActive(true);
  };
  const addItem = () => {
    setAdd(true);
    setModalActive(true);
  };

  const handleRemoveItem = (id:string) => {
    dispatch(removeItem(id));
  };

  return (
    <div className="container">
      <div className="row">
        <div className={style.wrapper}>
          <button className={style.blackBtn} onClick={addItem}>
            Добавить товар
          </button>
          <table>
            <thead>
              <tr>
                <th>Название</th>
                <th>Цена</th>
                <th>Метод</th>
                <th>Обработка</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {catalog.map((item) => (
                <tr key={item._id}>
                  <th>{item.title}</th>
                  <td>{item.price}</td>
                  <td>{item.method}</td>
                  <td>{item.processing}</td>
                  <td className={style.buttons}>
                    <button
                      className={style.black}
                      onClick={() => editItem(item)}
                    >
                      Редактировать
                    </button>
                    <button
                      className={style.black}
                      onClick={() => handleRemoveItem(item._id)}
                    >
                      Удалить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Modal
            active={modalActive}
            setActive={setModalActive}
            catalogItem={catalogItem}
            add={add}
            setAdd={setAdd}
          />
        </div>
      </div>
    </div>
  );
};

export default Admin;
