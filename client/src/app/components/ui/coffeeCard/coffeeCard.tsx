import React, { useState } from "react";
import style from "./index.module.scss";
import { Link } from "react-router-dom";
import useOutsideAlertet from "../hooks/useOutsideAlerter";
import Counter from "../../common/buttons/counterButton/counter";
import BuyButton from "../../common/buttons/buyButton/buyButton";
import { ICatalogItem } from "../../../../models";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { getIsLoggedIn, toggleBookmark } from "../../../store/users";

interface CoffeeCardProps {
  item : ICatalogItem
}

const CoffeeCard = ({ item }:CoffeeCardProps) => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(getIsLoggedIn())
  const { ref, isShow, setIsShow } = useOutsideAlertet(false);
  const [count, setCount] = useState(1);

  const addToFavorites = (item:ICatalogItem) => {
    if (isLoggedIn) {
      dispatch(toggleBookmark(item)) 
    }
  }

  return (
    <div className="coffee-card">
      <div className="item">
        <Link to={`/catalog/${item._id}`} style={{ display: "inline-block" }}>
          <div className="method">
            <i>{item.method}</i>
          </div>
          <div className="title ">
            <h3>{item.title}</h3>
          </div>
          <div className="processing">
            <i>{item.processing}</i>
          </div>
          <div className="item-img">
            <img
              width={200}
              height={230}
              alt="coffeePack"
              className="img"
              src="https://coffee-static.storage.yandexcloud.net/files/shares/data/_newpack6/alt-microlot/costa-rica-santa-teresa-025.png"
            ></img>
          </div>
        </Link>
        <span className={style.favotites} onClick={()=>addToFavorites(item)}></span>
      </div>

      <div className="coffee-card-footer">
        <div className="coffee-card-footer__left">
          <span className="price">Цена: {item.price} ₽</span>
        </div>
        <div className="coffe-card-footer__right">
          <Counter count={count} setCount={setCount}  />
          <BuyButton
            id={item._id}
            price={item.price}
            count={count}
            setIsShow={setIsShow}
          />
        </div>
      </div>
      {isShow && (
        <div className={style.modal}>
          <div className={style.modalContent} ref={ref}>
            <div className={style.check}></div>
            <h3 className={style.h3}>
              Товар добавлен <br /> в корзину
            </h3>
            <Link to="/basket" className={style.blackBtn}>
              Перейти в корзину
            </Link>
            <button className={style.greyText} onClick={() => setIsShow(false)}>
              Продолжить покупки
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoffeeCard;
