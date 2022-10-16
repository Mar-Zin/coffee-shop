import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUserData, getIsLoggedIn } from "../../../store/users";

const NavProfile = () => {
  const currentUser = useSelector(getCurrentUserData());
  const isLoggedIn = useSelector(getIsLoggedIn());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn && currentUser) {
      setIsLoading(false);
    }
  }, [isLoggedIn, currentUser]);

  return (
    <>
      {!isLoading ? (
        <div className={style.navProfive}>
          {currentUser.roles === "ADMIN" && (
            <Link to="/admin" className={style.admin}>
              Админ Панель
            </Link>
          )}
          <Link to={`/edit/${currentUser._id}`} className={style.profile_link}>
            <span>{currentUser.name}</span>
          </Link>
          <Link to="/logout" className={style.logOut}>
            Выйти
          </Link>
        </div>
      ) : (
        "loading"
      )}
    </>
  );
};

export default NavProfile;
