import { ICatalogItem } from "../../../models";
import CoffeeCard from "./coffeeCard/coffeeCard";

interface CardListProps {
  items:ICatalogItem[]
}

const CardList = ({ items }:CardListProps) => {
  return (
    <div className="row ">
      <div className="catalog-wrap">
        {items.map((item) => (
          <CoffeeCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CardList;
