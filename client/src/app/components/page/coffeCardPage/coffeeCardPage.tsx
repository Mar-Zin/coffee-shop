import { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import BuyButton from "../../common/buttons/buyButton/buyButton";
import Counter from "../../common/buttons/counterButton/counter";
import { getItemById } from "../../../store/catalog";
import style from "./index.module.scss";
import Comments from "../../ui/comments";
import useOutsideAlertet from "../../ui/hooks/useOutsideAlerter";
import BackButton from "../../common/buttons/backButton/BackButton";
import { useAppSelector } from "../../ui/hooks/redux";

const CoffeeCardPage = () => {
  const params = useParams();
  const { id } = params;

  const currentItem = useAppSelector(getItemById(id));
  const { ref, isShow, setIsShow } = useOutsideAlertet(false);
  const [count, setCount] = useState(1);
  const [active, setActive] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!currentItem) return <Navigate to="/" />;
  return (
    <div className="container">
      <div className="row">
        <BackButton />
        <div className="grid">
          <div className="coffeeCard-img">
            <img
              width={400}
              height={400}
              alt="coffeePack"
              className="img"
              src="https://coffee-static.storage.yandexcloud.net/files/shares/data/_newpack6/alt-microlot/costa-rica-santa-teresa-025.png"
            ></img>
          </div>
          <div className="coffeeCard-description">
            <p className="coffeeCard__method">{currentItem.method}</p>
            <h3 className="coffeeCard__title">{currentItem.title}</h3>
            <p className="coffeeCard__method">{currentItem.processing}</p>
            <p className="coffeeCard__desc">
              Сбалансированный вкус с нотами фундука, какао и сухофруктов
            </p>
            <div className="line">
              <div className="line_item">
                <div className="line__item-left">
                  <span className="line__item__string"></span>
                </div>
                <p className="line__item__text">Кислотность</p>
              </div>
              <div className="line_item">
                <div className="line__item-right">
                  <span className="line__item__string"></span>
                </div>
                <p className="line__item__text">Плотность</p>
              </div>
            </div>
            <div className="coffeeCard__counter">
              <Counter count={count} setCount={setCount} />
            </div>
            <BuyButton
              id={currentItem._id}
              price={currentItem.price}
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
              <button
                className={style.greyText}
                onClick={() => setIsShow(false)}
              >
                Продолжить покупки
              </button>
            </div>
          </div>
        )}
        <div className={style.commentsWrapper}>
          <div className={style.commentsHeader}>
            <div className={style.menu}>
              <a
                className={
                  style.commentsBtn + " " + (active === 2 ? style.active : "")
                }
                onClick={() => setActive(2)}
              >
                Описание
              </a>
              <a
                className={
                  style.commentsBtn + " " + (active === 1 ? style.active : "")
                }
                onClick={() => setActive(1)}
              >
                Комментарии
              </a>

              <a
                className={
                  style.commentsBtn + " " + (active === 3 ? style.active : "")
                }
                onClick={() => setActive(3)}
              >
                Рецепты
              </a>
            </div>
          </div>
          <div className={style.commentsContent}>
            <div className={style.content}>
              <Comments />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeCardPage;
