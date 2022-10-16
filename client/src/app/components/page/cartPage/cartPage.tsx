import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUserData, getIsLoggedIn } from "../../../store/users";
import CartList from "../../ui/cart/cartList";
import Loader from "../../ui/Loader/loader";
import style from "./index.module.scss";

const CartPage:FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const currentUser = useSelector(getCurrentUserData());
  const isLoggedIn = useSelector(getIsLoggedIn());

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (currentUser && isLoading) {
      setIsLoading(false);
    }
  }, [currentUser]);
  return (
    <div className="container">
      <div className="row">
        {isLoggedIn ? (
          !isLoading ? (
            currentUser.cart.length === 0 ? (
              <div className={style.basket_box}>
                <h2 className={style.basket_h2}>Ваша корзина пуста</h2>
                <div className={style.basket_text}>
                  Чтобы добавить товар в корзину перейдите в каталог
                </div>
                <Link to={"/"} className={style.blackBtn}>
                  Перейти в каталог
                </Link>
              </div>
            ) : (
              <CartList cart={currentUser.cart} />
            )
          ) : (
            <Loader />
          )
        ) : (
          <div className={style.basket_box}>
            <h2 className={style.basket_h2}>Ваша корзина пуста</h2>
            <div className={style.basket_text}>
              Чтобы добавить товар в корзину авторизируйтесь
            </div>
            <Link to={"/"} className={style.blackBtn}>
              Перейти в каталог
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
