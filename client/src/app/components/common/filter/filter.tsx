import style from "./index.module.scss";

interface FilterProps {
  onFilter:Function
  onClear:any
  onSort:Function
}

const Filter = ({ onFilter, onClear, onSort }:FilterProps) => {
  return (
    <div className="filterBox-wrap">
      <div className="row">
        <div className={style.filterBox}>
          <div
            className={style.filter_item}
            onClick={() => onFilter("Для эспрессо")}
          >
            <div className={style.filter1__icon}></div>
            <i className={style.filter__to}>Для эспрессо</i>
          </div>

          <div
            className={style.filter_item}
            onClick={() => onFilter("Для фильтра")}
          >
            <div className={style.filter2__icon}></div>
            <i className={style.filter__to}>Для фильтра</i>
          </div>

          <div
            className={style.filter_item}
            onClick={() => onFilter("Капсулы")}
          >
            <div className={style.filter3__icon}></div>
            <i className={style.filter__to}>Капсулы</i>
          </div>

          <div
            className={style.filter_item}
            onClick={() => onFilter("Дрип-пакеты")}
          >
            <div className={style.filter4__icon}></div>
            <i className={style.filter__to}>Дрип-пакеты</i>
          </div>
        </div>
        <button className={style.blackBtn} onClick={onClear}>
          Очистить фильтры
        </button>
        <button className={style.blackBtn} onClick={() => onSort("title")}>
          Сортировка по названию
        </button>
        <button className={style.blackBtn} onClick={() => onSort("price")}>
          Сортировка по цене
        </button>
      </div>
    </div>
  );
};

export default Filter;
