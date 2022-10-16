import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../components/ui/hooks/redux";
import { logOut } from "../../store/users";

const LogOut = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logOut(navigate));
  }, []);

  return <h1>Loading</h1>;
};

export default LogOut;
