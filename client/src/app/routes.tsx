import { Navigate } from "react-router-dom"
import Admin from "./components/page/adminPage/adminPage"
import CartPage from "./components/page/cartPage/cartPage"
import CoffeeCardPage from "./components/page/coffeCardPage/coffeeCardPage"
import EditPage from "./components/page/editPage"
import FavoritesPage from "./components/page/favoritesPage/FavoritesPage"
import PasswordResetPage from "./components/page/passwordResetPage/PasswordResetPage"
import RecipesPage from "./components/page/recipesPage/RecipesPage"
import ResetPassword from "./components/page/reset/ResetPassword"
import LogOut from "./layouts/logout/logout"
import Main from "./layouts/main/main"
import Registration from "./layouts/Registration/registration"


const routes =(isLoggedIn:boolean, adminRole:boolean)=> [
    {
        path:'',
        element:<Main/>
        
    },
    {
        path:'admin',
        element:isLoggedIn? (adminRole?
        <Admin/>:<Navigate to='/'/>):<Navigate to='/'/>
    },
    {
        path:'registration',
        element:<Registration/>
    },
    {

        path:"password/reset",
        element:<PasswordResetPage/>
    },
    {

        path:'resetpassword/:token',
        element:<ResetPassword/>

    },
    {
        path:'logout',
        element:<LogOut/>
    },
    {
        path:"edit",
        element:isLoggedIn?<EditPage/>:<Navigate to='/'/>,
        children: [
            {path:'', element:isLoggedIn?<EditPage/>:<Navigate to='/'/>},
            {path:':id', element:<EditPage/>}
        ]
    },
    {

        path:"catalog/:id",
        element:<CoffeeCardPage />
    },
    {

        path:'basket',
        element:<CartPage/>
    },
    {

        path:'favorites',
        element:<FavoritesPage/>
    },
    {

        path:'recipes',
        element:<RecipesPage/>
    },
    {
        path:'*',
        element:<Navigate to=''/>
    },

]

export default routes