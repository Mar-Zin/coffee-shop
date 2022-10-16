import { FunctionComponent } from "react";
import Aeropress from "./recipeAeropress";
import Espresso from "./recipeEspresso";

interface RecipesListProps {
    active:string
}
 
const RecipesList: FunctionComponent<RecipesListProps> = ({active}) => {
    return ( <>
            {active==="Espresso" && <Espresso/>}
            {active==="Aeropress" && <Aeropress/>}
            </>

     );
}
 
export default RecipesList;