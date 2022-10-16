interface PaginationProps {
  arrToPagination:number[]
  onPagination:Function
  numberOfPagination:number
  currentPage:number
}


const Pagination = ({
  arrToPagination,
  onPagination,
  numberOfPagination,
  currentPage,
}:PaginationProps) => {
  if (numberOfPagination === 1) return null;
  return (
    <div className="row">
      <ul className="pagination">
        {arrToPagination.map((item) => (
          <li
            className={currentPage === item ? "active" : ""}
            key={"page_" + item}
          >
            <a
              className={currentPage === item ? "active" : ""}
              href="#"
              onClick={() => onPagination(item)}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
