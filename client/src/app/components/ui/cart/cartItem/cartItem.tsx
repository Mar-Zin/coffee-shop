import style from "./index.module.scss";
import coffeePack from "../../../../images/coffeePack.png";
import {  useSelector } from "react-redux";
import { getCatalog, getItemById } from "../../../../store/catalog";
import { Link } from "react-router-dom";
import { getCurrentUserData, updateUserData } from "../../../../store/users";
import { useAppDispatch } from "../../hooks/redux";

interface CartListItem{
  id:string
  price:number
  count:number
}


const CartItem = (item:CartListItem) => {
  const dispatch = useAppDispatch();
  const catalog = useSelector(getCatalog());
  const cartItem:any = useSelector(getItemById(item.id));
  const currentUser = useSelector(getCurrentUserData());

  const handleIncrement = () => {
    const cartValue = currentUser.cart.map((items:CartListItem) => ({
      ...items,
      count: items.id === item.id ? items.count + 1 : items.count,
    }));
    dispatch(
      updateUserData({
        ...currentUser,
        cart: cartValue,
      })
    );
  };
  const handleDecrement = () => {
    const cartValue = currentUser.cart.map((items:CartListItem) => ({
      ...items,
      count:
        items.id === item.id
          ? items.count !== 1
            ? items.count - 1
            : items.count
          : items.count,
    }));
    dispatch(
      updateUserData({
        ...currentUser,
        cart: cartValue,
      })
    );
  };
  const handleRemove = () => {
    const cartValue = currentUser.cart.filter((items:CartListItem) => items.id !== item.id);
    dispatch(
      updateUserData({
        ...currentUser,
        cart: cartValue,
      })
    );
  };
  if (!catalog.some((items) => items._id === item.id)) return <></>;
  return (
    <>
      <div className={style.goodsImg}>
        <img src={coffeePack} className={style.img} />
      </div>
      <div className={style.goodsName}>
        <Link to={`/catalog/${item.id}`}>{cartItem.title}</Link>
        <p className={style.goodsDesc}>{cartItem.method}</p>
        <p className={style.goodsDesc}>{cartItem.processing}</p>
      </div>
      <div className={style.goodsCount}>
        <div className={style.counter}>
          <span className={style.increment} onClick={handleIncrement}></span>
          <span className={style.count}>{item.count}</span>
          <span className={style.decrement} onClick={handleDecrement}></span>
        </div>
        <p className={style.greyText}>{`1 шт = ${cartItem.price}₽`}</p>
      </div>
      <div className={style.goodsPrice}>
        <p className={style.priceText}>
          {cartItem.price * item.count} <span>₽</span>
        </p>
        <p className={style.remove} onClick={handleRemove}>
          Удалить
        </p>
      </div>
    </>
  );
};

export default CartItem;
