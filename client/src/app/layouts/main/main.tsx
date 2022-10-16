import  { ChangeEvent, FC, useEffect, useState } from "react";
import pagination from "../../utils/pagination";
import _ from 'lodash'
import { useSelector } from "react-redux";
import { getCatalog } from "../../store/catalog";
import style from "./index.module.scss";
import Filter from "../../components/common/filter/filter";
import CardList from "../../components/ui/cardList";
import Pagination from "../../components/common/pagination";

const Main:FC = () => {
  const catalog = useSelector(getCatalog());
  const [page, setPage] = useState(1);
  const [coffeeMethod, setCoffeeMethod] = useState('');
  const [search, setSearch] = useState("");
  const [scroll, setScroll] = useState(0);
  const [sortBy, setSortBy]:any = useState({
    path: "title",
    order: "asc",
  });

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  const handleUpButton = () => {
    window.scrollTo({top:0, behavior:'smooth'});
  };

  const onSort = (select:string) => {
    setSortBy({
      path: select,
      order: sortBy.order === "asc" ? "desc" : "asc",
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {}, [search]);

  const handleChange = ({ target }:ChangeEvent<HTMLInputElement>) => {
    setSearch(target.value);
    setCoffeeMethod('');
  };

  const pageSize = 6;

  useEffect(() => {
    setPage(1);
  }, [coffeeMethod]);

  const handleFiltred = (method:string)=> {
    setCoffeeMethod(method);
    setSearch("");
  };

  const onClear = () => {
    setCoffeeMethod('');
    setSortBy({
      path: "title",
      order: "asc",
    })

  };
  const onClearSearch = () => {
    setSearch("");
  };

  let filterCatalog = coffeeMethod
    ? catalog.filter((item) => item.method === coffeeMethod)
    : catalog;

  const searchCatalog = catalog.filter((coffee) => {
    return coffee.title.toLowerCase().includes(search.toLowerCase());
  });

  if (search) {
    filterCatalog = searchCatalog;
  }

  const sortCatalog = _.orderBy(filterCatalog, [sortBy.path], [sortBy.order]);
  const catalogCrop = pagination(sortCatalog, page, pageSize);

  const numberOfPagination = Math.ceil(filterCatalog.length / pageSize);
  const arrToPagination = _.range(1, numberOfPagination + 1);

  const onPagination = (item:number) => {
    setPage(item);
  };
  return (
    <div className="container">
      <div className="wrapper">
        <div className="row">
          <div className="h2">
            <h2 className="h2-title">Каталог кофе</h2>
            <p className="h2-text">Выберите вкус и способ приготовления</p>
          </div>
        </div>
        <Filter onFilter={handleFiltred} onClear={onClear}  onSort={onSort}/>


        <div className="row">
          <form style={{ position: "relative" }}>
            <input
              onChange={handleChange}
              value={search}
              placeholder="Search..."
              className="search"
            ></input>
            <a className="formBtn" onClick={onClearSearch}>
              Очистить
            </a>
          </form>
        </div>

        {catalog?<CardList items={catalogCrop} />:'loading...'}

        <Pagination
          currentPage={page}
          numberOfPagination={numberOfPagination}
          arrToPagination={arrToPagination}
          onPagination={onPagination}
        />
        <button
          className={
            scroll < 300 ? style.button : style.button + " " + style.show
          }
          onClick={handleUpButton}
        >
          Go Up
        </button>
      </div>
    </div>
  );
}

export default Main;
