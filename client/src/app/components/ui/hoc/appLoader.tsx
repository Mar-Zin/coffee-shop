import { useEffect } from "react";
import {  useSelector } from "react-redux";
import { getCatalogLoadingStatus, loadCatalogList } from "../../../store/catalog";
import {
  getIsLoggedIn,
  getUsersLoadingStatus,
  loadUsersList,
} from "../../../store/users";
import { useAppDispatch } from "../hooks/redux";

const AppLoader = ({ children }:any) => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useSelector(getIsLoggedIn());
  const catalogLoadingStatus = useSelector(getCatalogLoadingStatus());
  const usersLoadingStatus = useSelector(getUsersLoadingStatus());
  useEffect(() => {
    dispatch(loadCatalogList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadUsersList());
  }, [isLoggedIn]);
  if (!catalogLoadingStatus &&!usersLoadingStatus) return children;
  // if (usersLoadingStatus) return "loading...";
  return "loading...";
};
export default AppLoader;
