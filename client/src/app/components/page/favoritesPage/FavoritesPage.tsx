import { FunctionComponent } from "react";
import { ICatalogItem } from "../../../../models";
import { getCurrentUserData } from "../../../store/users";
import CoffeeCard from "../../ui/coffeeCard/coffeeCard";
import { useAppSelector } from "../../ui/hooks/redux";
import style from './index.module.scss'

interface FavoritesPageProps {
    
}
 
const FavoritesPage: FunctionComponent<FavoritesPageProps> = () => {

    const currentUser = useAppSelector(getCurrentUserData())

    return ( 
         <div className="container">
            <div className="row">
                <div className="h2">
                    <h2 className="h2-title">Избранные</h2>
                    {!currentUser && <p className="h2-text">Для добавления в избранные авторизируйтесь</p>}
                    {currentUser && currentUser.favorites.length === 0 && <p className="h2-text">Список избранных пуст</p>}
                </div>
                <div className={style.favoritesBox}>
                    {currentUser && currentUser.favorites.map((item:ICatalogItem)=>{
                      return  <CoffeeCard key={item._id} item={item}/>
                    })}

                </div>
            </div>
        </div>
         );
}
 
export default FavoritesPage;