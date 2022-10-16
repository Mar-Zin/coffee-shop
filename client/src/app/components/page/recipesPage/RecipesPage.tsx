import { FunctionComponent, useEffect, useState } from "react";
import RecipesList from "../../ui/recipesContent/recipesList";
import style from './index.module.scss'

interface RecipesPageProps {
    
}
interface RecipeItem {
    title:string
    url:string
}
 
const RecipesPage: FunctionComponent<RecipesPageProps> = () => {
    const recipes:RecipeItem[] = [
        {
            title:"Espresso",
            url:'https://images.unsplash.com/photo-1432107294469-414527cb5c65?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
        },
        {
            title: "Aeropress",
            url: 'https://images.unsplash.com/photo-1567953833314-6105de24618d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80'
        },
        {
            title: 'V60',
            url: 'https://images.unsplash.com/photo-1545665225-b23b99e4d45e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2077&q=80'
        },
        {
            title: 'Chemex',
            url: 'https://images.unsplash.com/photo-1574359172160-c7ae4fadcacc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2051&q=80'
        },
        {
            title: 'FrenchPress',
            url: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80'
        },
          
    ]

    const [scroll, setScroll] = useState(0);
    const [active, setActive] = useState('Espresso')




    const handleScroll = () => {
        setScroll(window.scrollY);
      };
    
      const handleUpButton = () => {
        window.scrollTo({top:0, behavior:'smooth'});
      };
 
      
    useEffect(() => {
        window.scrollTo(0, 0);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    function handleClick() {
        const content:any = document.getElementById('content')
        content.scrollIntoView({block: "start", behavior: "smooth"});
     }


    return ( 
        <div className="container">
            <div className="row">
                <div className={style.wrapper}>
                    {recipes.map((item) => {
                    return  <div 
                                className={style.slide + " " + (active === item.title? style.active : '')}   
                                style={{backgroundImage: `url(${item.url})`}}
                                onClick={()=>setActive(item.title)}
                                key={`key_${item.title}`}
                            >
                                
                                    <h3>{item.title}</h3>
                                    <h6 onClick={()=>handleClick()}>Узнать подробнее</h6>

                            </div>

                    })}
                </div>
                <div className={style.content} id='content'>
                    <RecipesList active={active}/>
                </div>
              
            </div>
            <button
                className={
                    scroll < 300 ? style.button : style.button + " " + style.show
                }
                onClick={handleUpButton}
                >
                Go Up
            </button>
        </div>
         
    );
}
 
export default RecipesPage;