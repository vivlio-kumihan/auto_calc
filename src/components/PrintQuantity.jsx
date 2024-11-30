import { useCalc, useCalcDispatch } from "../context/CalcContext";

// 印刷部数
const printQuantityArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
for (let i = 10; i <= 2000; i += 5) {
  printQuantityArr.push(i);
}

const PrintQuantity = () => {
  const state = useCalc();
  const dispatch = useCalcDispatch();

  // 印刷部数
  const handlePrintQuantity = (e) => {
    dispatch({
      item: "printQuantity",
      payload: { name: e.target.name, value: e.target.value }
    });
  };

  return (
    <div className="calc__item-wrapper print_quantity">
      <div className="calc__entry">
        印刷部数<span>※</span>
      </div>
      <div className="calc__content-inner">
        <select
          name="printQuantity"
          value={state.printQuantity}
          onChange={handlePrintQuantity}
        >
          { printQuantityArr.map((num) => {
            return (
              <option key={num} value={num}>{num}</option>
            )
          })}
        </select>
      </div>
    </div>
  );
};

export default PrintQuantity;