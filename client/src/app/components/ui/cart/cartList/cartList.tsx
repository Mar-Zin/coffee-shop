import  { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import { getCurrentUserData, updateUserData } from "../../../../store/users";
import { useAppDispatch } from "../../hooks/redux";
import CartItem from "../cartItem/cartItem";
import style from "./index.module.scss";

interface CartListItem{
  id:string
  price:number
  count:number
}

type User = {
  _id?: string
  name?: string
  email?: string
  password?: string
  notify?: string
  cart?: []
  roles?: string
  createdAt?: string
  updatedAt?: string
  __v?: number
}

const CartList = ({ cart }:any) => {
  const dispatch = useAppDispatch();
  const currentUser = useSelector(getCurrentUserData());
  const [data, setData] = useState<User>({name:'',email:''});
  const [isLoading, setIsLoading] = useState(true);

  const totalPrice = cart.reduce((acc:number, item:CartListItem) => {
    return acc + item.count * item.price;
  }, 0);

  useEffect(() => {
    if (currentUser && !data) {
      setData({
        ...currentUser,
      });
    }
  }, [currentUser, data]);

  useEffect(() => {
    if (data && isLoading) {
      setIsLoading(false);
    }
  }, [data]);

  const handleChange = ({ target }:any) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const clearBasket = () => {
    dispatch(
      updateUserData({
        ...currentUser,
        cart: [],
      })
    );
  };

  const handleClick = () => {
    console.log({ totalPrice: totalPrice + 120 });
  };

  return (
    <div className={style.basketPage}>
      <div className={style.row_wrap}>
        <div className={style.blackBox}>
          <h2 className={style.h2}>Оформление</h2>
          <form>
            <div className={style.basketForm}>
              <h5 className={style.h5}>Покупатель</h5>
              {!isLoading ? (
                <div className={style.input_wrapper}>
                  <div className={style.input}>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="* Имя"
                      value={data.name}
                      onChange={handleChange}
                      className={style.input_text}
                    />
                  </div>

                  <div className={style.input}>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="* E-Mail"
                      value={data.email}
                      onChange={handleChange}
                      className={style.input_text}
                    />
                  </div>
                </div>
              ) : (
                "Loading..."
              )}
            </div>
          </form>
          <div className={style.resultBasket}>
            <div className={style.discont}>
              <span></span>
              <p>После этого заказа ваша накопительная скидка составит 1%</p>
              <a>Подробнее</a>
            </div>
            <div className={style.boxRb}>
              <div className={style.boxRb_item}>
                <p>Сумма заказа</p>
                <p>{totalPrice} ₽ </p>
              </div>
              <div className={style.boxRb_item}>
                <p>
                  Доставка курьером Почта России (Курьер онлайн): 15 авг–19 авг
                  (4–6 раб. дней)
                </p>
                <p>120 ₽ </p>
              </div>
            </div>
            <div className={style.promoBox}>
              <form className={style.form}>
                <div className={style.promoBox_item}>
                  <input placeholder="Промокод" type="text" />
                  <input type="submit" value="Применить" />
                </div>
              </form>
              <form>
                <div className={style.promoBox_item}>
                  <input placeholder="Подарочный сертификат" type="text" />
                  <input type="submit" value="Применить" />
                </div>
              </form>
            </div>
            <div className={style.payOrder}>
              <h5>{`К оплате: ${totalPrice + 120} ₽`}</h5>
              <a className={style.payButton} onClick={handleClick}>
                <span className={style.paySpan}>Оформить заказ</span>
              </a>
            </div>
          </div>
        </div>
        <div className={style.basketPreload}>
          <h2>Корзина</h2>
          <a className={style.remove} onClick={clearBasket}>
            Очистить корзину
          </a>
          <div className={style.goodsBox}>
            {cart.map((item:CartListItem) => (
              <div key={item.id} className={style.goodsItem}>
                <CartItem {...item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartList;
