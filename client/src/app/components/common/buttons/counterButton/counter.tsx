import style from "./index.module.scss";

interface CounterProps {
  count:number
  setCount:Function
}

const Counter = ({ count, setCount }:CounterProps) => {
  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count !== 1) {
      setCount(count - 1);
    }
  };
  return (
    <div className={style.counter}>
      <span className={style.increment} onClick={handleIncrement}></span>
      <span className={style.count}>{count}</span>
      <span className={style.decrement} onClick={handleDecrement}></span>
    </div>
  );
};

export default Counter;
