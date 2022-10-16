import  {  useState } from "react";
import style from "./index.module.scss";
import dots from "../../../../images/dots.svg";
import like from "../../../../images/like.svg";
import chat from "../../../../images/chat.svg";
import share from "../../../../images/share.svg";
import fav from "../../../../images/fav.svg";
import { useSelector } from "react-redux";
import { getCurrentUserId, getUserById } from "../../../../store/users";
import { displayDate } from "../../../../utils/displayDate";

interface CommentProps {
  content:string
  created_at: string
  _id: string
  userId:string
  onRemove:Function
}

const Comment= ({
  content,
  created_at: created,
  _id: id,
  userId,
  onRemove,
}:CommentProps) => {
  const [show, setShow] = useState(false);
  const user = useSelector(getUserById(userId));
  const currentUserId = useSelector(getCurrentUserId());
  if (user) {
    const firstLetter = user.name.slice(0, 1);

    return (
      <div className={style.postItem}>
        <div className={style.postHeader}>
          <a>
            <div className={style.headerImg}>{firstLetter}</div>
          </a>
          <div className={style.headerName}>
            <p className={style.name}>{user.name} (г. Москва)</p>
            <p className={style.level}>Новичок</p>
          </div>
          <div className={style.headerRight}>
            {currentUserId === userId && (
              <span className={style.remove} onClick={() => onRemove(id)}>
                Удалить
              </span>
            )}

            <a className={style.subscribe}>
              <span className={style.subscribeText}>Подписаться</span>
            </a>
            <div
              className={style.postAction}
              onMouseEnter={() => setShow(true)}
            >
              <button className={style.postBtn}>
                <img src={dots} className={style.btnImg}></img>
              </button>
              <ul
                className={style.postActionDropdown}
                onMouseLeave={() => setShow(false)}
                style={show ? { display: "block" } : { display: "none" }}
              >
                <li> Скрыть публикации этого пользователя </li>
                <li> Пожаловаться на пост </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={style.postBody}>
          <div className={style.bodyText}>{content}</div>
          <div className={style.bodyLike}>
            <a className={style.likeUp}>
              <img src={like} />
              <span>0</span>
            </a>
            <a className={style.likeDown}>
              <img src={like} style={{ transform: "scaleY(-1)" }} />
              <span>0</span>
            </a>
            <a className={style.chat}>
              <img src={chat} />
              <span>0</span>
            </a>
            <a className={style.share}>
              <img src={share} />
            </a>
            <a className={style.fav}>
              <img src={fav} />
            </a>
            <p className={style.time}>{displayDate(created)}</p>
          </div>
          <form className={style.postListFooter}>
            <textarea
              placeholder="Добавить комментарий"
              className={style.postForm}
            />
            <a className={style.formBtn}>Опубликовать</a>
          </form>
        </div>
      </div>
    );
  } else return <>loading</> 
};

export default Comment;
