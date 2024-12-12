import { useCalc, useCalcDispatch } from "../context/CalcContext";
// import { useEffect } from "react";

// 本文ページ数
const pageCountArr = [0, 4, 8];
for (let i = 10; i <= 500; i += 2) {
  pageCountArr.push(i);
}

const PageCount = () => {
  const state = useCalc();
  const dispatch = useCalcDispatch();

  // 本文ページ数
  const handlePageCount = (e) => {
    dispatch({
      item: "pageCount",
      payload: { name: e.target.name, value: e.target.value }
    });
  };

  // // カラー・本文ページ数
  // const handleColorPageCount = (e) => {
  //   dispatch({
  //     item: "colorPageCount",
  //     payload: { name: "colorPageCount", value: e.target.value }
  //   });
  // };

  // // フルカラー印刷を選択すると『count』を返し、
  // // 『count』がある場合は、uesEffectで状態を処理する。
  // useEffect(() => {
  //   if (state.textPrintingMethod.name === "フルカラー印刷" && state.pageCount) {
  //     dispatch({
  //       item: "colorPageCount",
  //       payload: { name: "colorPageCount", value: state.pageCount }
  //     });
  //   } else if (state.colorPageCount !== 0) {
  //     // フルカラー印刷から他の印刷方法に切り替えたときに colorPageCount をリセット
  //     dispatch({
  //       item: "colorPageCount",
  //       payload: { name: "colorPageCount", value: 0 }
  //     });
  //   }
  // }, [state.pageCount, state.textPrintingMethod.name, dispatch]);

  // // カラー本文ページ数
  // const renderColorPageCountSelector = () => {
  //   let count = state.pageCount;
  //   const _4cMonoCount = count - 1;
  //   const _4cMonoSpCount = Math.floor(count / 2);
  //   const makeCountArr = (argCount) => {
  //     if (argCount <= 0) return []; // ===演算子ではダメみたい。
  //     return Array(argCount).fill().reduce((acc, _, idx) => {
  //       acc.push(idx + 1);
  //       return acc;
  //     }, [0]);
  //   };
  //   const colorPageCountArr = state.textPrintingMethod.name === "カラー・モノクロ混在印刷" || state.textPrintingMethod.name === "カラー・モノクロ混在印刷お得ver."
  //     ? state.textPrintingMethod.name === "カラー・モノクロ混在印刷"
  //       ? makeCountArr(_4cMonoCount)
  //       : makeCountArr(_4cMonoSpCount)
  //     : state.textPrintingMethod.name === "フルカラー印刷"
  //       ? [count]
  //       : null ;

  //   return colorPageCountArr;
  // };

  return (
    <div className="calc__item-wrapper page_count">
      <div className="calc__entry">
        本文ページ数<span>※</span>
      </div>
      <div className="calc__content-inner number-pages">
        <label>
          <select
            name="pageCount"
            value={state.pageCount}
            onChange={handlePageCount}
          >
            { pageCountArr.map((num) => {
              return(
                <option key={num} value={num}>{num}</option>
              )
            })}
          </select>
        </label>
        <div className="calc__explanation">表紙（表1・2・3・4）を除くページ数</div>
        {/*         
        <label>
          <select name="colorPageCount" 
                  value={state.colorPageCount} 
                  onChange={handleColorPageCount}
          >
            {
              renderColorPageCountSelector()?.map((num) => (
                <option key={num} value={num}>{num}</option>)
              )
            }
          </select>
          <span className="title-next-label">内、本文カラーページ数</span>
        </label>
        */}
      </div>
    </div>
  );
};

export default PageCount;