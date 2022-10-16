import { useNavigate } from "react-router-dom";
import style from './index.module.scss'


const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button className={style.blackBtn} onClick={() => navigate(-1)}>
      Go Back
    </button>
  );
};

export default BackButton;
