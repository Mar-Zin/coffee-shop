import { useState, useEffect, useRef, FC } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import login from "../../../images/login.png";
import { getIsLoggedIn } from "../../../store/users";
import LoginPopUp from "../../common/popUp/popUp";
import Basket from "../basket/basket";
import NavProfile from "../navProfile/navProfile";
import logo from "../../../images/logo.svg";
import style from "./index.module.scss";


const Header:FC = () => {
  const isLoggedIn = useSelector(getIsLoggedIn());
  const [popUp, setPopUp] = useState(false);
  const [scroll, setScroll] = useState(0);
  const enterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.addEventListener("click", (event:any) => {
      if (!event.path.includes(enterRef.current)) {
        setPopUp(false);
      }
    });
    window.addEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  return (
    <header
      className={scroll > 0 ? style.header + " " + style.shadow : style.header}
    >
      <div className="row">
        <div className={style.navBar}>
          <div className={style.logo}>
            <Link to="/" className={style.logo_a}>
              <img src={logo} className={style.logo_img} />
            </Link>
            <div className={style.logo_text}>
              <span>
                Интернет магазин
                <br /> свежеобжаренного кофе
              </span>
            </div>
          </div>
          <div className={style.phone}>
            <a className={style.link}>
              8 (950) 947-56-58<span className={style.arrow}></span>
            </a>
          </div>
          <div className={style.selectCoffee}>
            <a className={style.link}>Как выбрать кофе?</a>
          </div>
          <div className={style.makeCoffee}>
            <Link to='/recipes' className={style.link}>Как Приготовить?</Link>
          </div>

          {isLoggedIn ? (
            <NavProfile />
          ) : (
          
            <div className={style.enter}   ref={enterRef}>
              <div className={style.login}>
                <button
                  className={style.enterOpen}
                  onClick={() => setPopUp(!popUp)}
                >
                  <img src={login} className={style.login_img} />

                  <span className={style.login_text}>Вход</span>
                </button>
                <LoginPopUp popUp={popUp} setPopUp={setPopUp} />
              </div>
              <div className={style.reg} onClick={() => setPopUp(false)}>
                <Link to="/registration" className={style.login_reg}>
                  Регистрация
                </Link>
              </div>
            </div>
          )}
          <div className={style.line_h}></div>
          <div className={style.header_menu}>
            <div className={style.menu_h}>
              <a className={style.menu_link_h}>Купить</a>
              <span className={style.arrow}></span>
              <ul className={style.menu_ul} style={{ display: "none" }}>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
            <div className={style.menu_h}>
              <a className={style.menu_link_h}>Читать</a>
              <span className={style.arrow}></span>
              <ul className={style.menu_ul} style={{ display: "none" }}>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
            <div className={style.menu_h}>Отзывы</div>
            <div className={style.menu_h}>Сообщество</div>
          </div>
          <Link className={style.favorites} to='favorites'></Link>
          <Basket />
        </div>
      </div>
    </header>
  );
};

export default Header;
