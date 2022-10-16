import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUserData, getIsLoggedIn } from "../../../store/users";
import style from "./index.module.scss";

interface Item {
  id:string
  price:number
  count:number
}



const Basket = () => {
  const currentUser = useSelector(getCurrentUserData());
  const isLoggedIn = useSelector(getIsLoggedIn());
  let counts;
  let totalPrice;
  if (currentUser) {
    counts = currentUser.cart.reduce((acc:number, item:Item) => {
      return acc + item.count;
    }, 0);
    totalPrice = currentUser.cart.reduce((acc:number, item:Item) => {
      return acc + item.count * item.price;
    }, 0);
  }

  const renderPhrase = (number:number) => {
    const lastOne = Number(number.toString().slice(-1));
    if (number > 4 && number < 15) {
      return " товаров";
    }
    if (lastOne === 1) return " товар";
    if ([2, 3, 4].indexOf(lastOne) >= 0) return " товара";
    return " товаров";
  };

  return (
    <div className={style.basket}>
      <Link to={"/basket"} className={style.basket_link}>
        <img className={style.basket_btn}></img>
        <span className={style.basket_text}>
          <div className={style.basket_price}>
            {isLoggedIn ? totalPrice : 0}
            <span className={style.rub}> ₽</span>
          </div>
          <div className={style.basket_greyText}>
            {isLoggedIn ? counts : 0}
            {currentUser ? renderPhrase(counts) : " товаров"}
          </div>
        </span>
      </Link>
    </div>
  );
};

export default Basket;
