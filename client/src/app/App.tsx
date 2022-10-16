import { FC } from "react";
import { useRoutes } from "react-router-dom";
import Footer from "./components/ui/footer/footer";
import Header from "./components/ui/header/header";
import AppLoader from "./components/ui/hoc/appLoader";
import { useAppSelector } from "./components/ui/hooks/redux";
import routes from "./routes";
import { getIsLoggedIn, getRole } from "./store/users";

const App:FC = () => {

  const isLoggedIn = useAppSelector(getIsLoggedIn())
  const adminRole = useAppSelector(getRole())
  const elements = useRoutes(routes(isLoggedIn, adminRole))

  return (
    <>
      <AppLoader>
        <Header/>
            {elements}
        <Footer/>
      </AppLoader>
    </>
  );
}

export default App;
