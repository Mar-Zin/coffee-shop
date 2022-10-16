import { useState } from "react";
import { useSelector } from "react-redux";
import {
  getCurrentUserData,
  getIsLoggedIn,
  updateUserData,
} from "../../../../store/users";
import { useAppDispatch } from "../../../ui/hooks/redux";
import style from "./index.module.scss";

interface BuyButtonProps {
  id:string
  price:number
  count:number
  setIsShow:Function
}
interface ICart {
  id:string
  price:number
  count:number
}

const BuyButton = ({ id, price, count, setIsShow }:BuyButtonProps) => {
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch()
  const currentUser = useSelector(getCurrentUserData());
  const isLoggedIn = useSelector(getIsLoggedIn());

  let cartValue:ICart[] = [];
  if (currentUser) {
    if (currentUser.cart.length === 0) {
      cartValue = [{ id, price, count: count }];
    } else {
      if (currentUser.cart.some((item:ICart) => item.id === id)) {
        cartValue = currentUser.cart.map((item:ICart) => ({
          ...item,
          count: item.id === id ? item.count + count : item.count,
        }));
      } else {
        cartValue = [...currentUser.cart, { id, price, count: count }];
      }
    }
  }
  const click = () => {
    if (isLoggedIn) {
      setIsShow(true);
    } else {
      setShow(true);
    }
  };
  const handleAddToCart = () => {
    if (currentUser) {
      dispatch(updateUserData({
          ...currentUser,
          cart: cartValue,
        })
      );
    }
    if (!currentUser) setShow(true);
  };

  return (
    <div
      className={style.buyBtnBlock}
      onMouseLeave={() => setShow(false)}
      onClick={click}
    >
      <a className={style.buyButton} onClick={handleAddToCart}>
        <span className={style.text}>Купить</span>
      </a>
      <div
        className={style.help}
        style={show ? { display: "block" } : { display: "none" }}
      >
        Для добавления товара в корзину необходимо авторизоваться
      </div>
    </div>
  );
};

export default BuyButton;
