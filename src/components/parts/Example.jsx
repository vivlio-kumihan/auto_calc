import { useReducer } from "react";

const handleRreducer = (prev, { item, payload }) => {
  const { name, value } = payload;
  switch (item) {
    case "printQuantity": return { ...prev, [name]: value };
    case "pageCount": {
      const maxColorPageCount = Math.floor(value / 2);
      // const maxColorPageCount = Math.floor(value - 1);
      const tmpArr = [];
      for (let i = 1; i <= maxColorPageCount; i++) {
        tmpArr.push(i);
      }
      return { ...prev, [name]: value, colorPageCountArr: tmpArr };
    };
    case "colorPageCount": return { ...prev, [name]: value };
    default: throw new Error("error...");
  }
};

const printQuantityArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
for (let i = 10; i <= 2000; i += 5) {
  printQuantityArr.push(i);
}
const pageCountArr = [0, 4, 8];
for (let i = 10; i <= 500; i += 2) {
  pageCountArr.push(i);
}

const Example = () => {
  const initState = {
    printQuantity: 0,
    pageCount: 0,
    colorPageCount: 0,
    colorPageCountArr: [],
  };
  const [state,  dispatch] = useReducer(handleRreducer, initState);
  const handlePrintQuantity = (e) => {
    dispatch({
      item: "printQuantity",
      payload: { name: e.target.name, value: e.target.value }
    });
  };
  const handlePageCount = (e) => {
    dispatch({
      item: "pageCount",
      payload: { name: e.target.name, value: e.target.value }
    });
  };
  const handleColorPageCount = (e) => {
    dispatch({
      item: "colorPageCount",
      payload: { name: e.target.name, value: e.target.value }
    });
  };

  return (
    <>
      <div className="calc">
        {/* 印刷部数 */}
        <div className="calc__item-wrapper print_quantity">
          <div className="calc__entry">
            印刷部数<span>※</span>
          </div>   
          <div className="calc__content-inner">
            <select name="printQuantity" value={state.printQuantity} onChange={handlePrintQuantity}>
              { printQuantityArr.map((num) => { return <option key={num} value={num}>{num}</option> }) }
            </select>
            <div className="result">Result: {state.printQuantity}</div>
          </div>       
        </div>
        {/* ページ数 */}
        <div className="calc__item-wrapper page_count">
          <div className="calc__entry">
            ページ数<span>※</span>
          </div>   
          <div className="calc__content-inner">
            <label htmlFor="">
              <select name="pageCount" value={state.pageCount} onChange={handlePageCount}>
                { pageCountArr.map((num) => { return <option key={num} value={num}>{num}</option> }) }
              </select>
            </label>
            <div className="result">{state.pageCount}</div>
            <ul className="note">
              <li>表紙（表1・2・3・4）を除く本文のページ数</li>
            </ul>
            {/* カラーページ数 */}
            <label htmlFor="">
              <select  name="colorPageCount" value={state.colorPageCount} onChange={handleColorPageCount}>
                { state.colorPageCountArr.map((num) => { return <option key={num} value={num}>{num}</option> }) }
              </select>
              <ul className="note">
                <li>内カラーページ数</li>
              </ul>
            </label>
          </div> 
          <ul className="note">
            <li>片面印刷をご希望の方は、下部のオプション加工を選択して下さい。</li>
          </ul>
        </div>   
      </div>
    </>
  );
};

export default Example;