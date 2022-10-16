import { FC } from 'react';
import style from './index.module.scss'

const Footer:FC = () => {
  return (
    <footer className={style.footer}>
      <div className="row">
        <div className={style.footer}>
          <div className="footer_first">
            <p className={style.text}>ПОМОЩЬ</p>
            <ul className={style.ul_f}>
              <li>Вопрос-ответ</li>
              <li>Как выбрать кофе?</li>
              <li>Как готовить кофе?</li>
              <li>Журнал о кофе</li>
              <li>Доставка и оплата</li>
              <li>Система скидок</li>
              <li>Возврат денежных средств</li>
              <li>Контакты</li>
            </ul>
          </div>
          <div className="footer_second">
            <p className={style.text}>КОМПАНИЯ</p>
            <ul className={style.ul_f}>
              <li>О компании </li>
              <li>Достижения </li>
              <li>Перейти на оптовый сайт </li>
              <li>Наше производство </li>
              <li>Партнёрская программа</li>
              <li>Канал в Яндекс.Дзен </li>
            </ul>
          </div>
          <div className="footer_third">
            <p className={style.text}>КАТАЛОГ</p>
            <ul className={style.ul_f}>
              <li>Кофе</li>
              <li>Чай</li>
              <li>Аксессуары</li>
              <li>Архив сортов</li>
            </ul>
          </div>
          <div className={style.footer_fourth}>
            <p className={style.text}>КАТАЛОГ</p>
            <ul className={style.ul_f}>
              <li>Кофе</li>
              <li>Чай</li>
              <li>Аксессуары</li>
              <li>Архив сортов</li>
            </ul>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;