import { useReducer, useEffect } from "react";

// 本文印刷方法
const TEXT_PRINTING_METHOD = {
  _1C: "モノクロ印刷",
  _4C_MONO: "カラー・モノクロ混在印刷",
  _4C_MONO_SP: "カラー・モノクロ混在印刷お得ver.",
  _4C: "フルカラー印刷"
};

// 印刷部数
const printQuantityArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
for (let i = 10; i <= 2000; i += 5) {
  printQuantityArr.push(i);
}

// ページ数
const pageCountArr = [0, 4, 8];
for (let i = 10; i <= 500; i += 2) {
  pageCountArr.push(i);
}

// 関数Reducer
const handleRreducer = (prev, { item, payload }) => {
  const { key, name, value } = payload;
  switch (item) {
    case "textPrintingMethod": return { ...prev, textPrintingMethod: { id: key, name: name } };
    case "pageCount": { return { ...prev, [name]: parseInt(value) } };
    case "colorPageCount": return { ...prev, [name]: parseInt(value) };
    default: throw new Error("error...");
  }
};

// 本体
const AutoCalc = () => {
  // 初期値
  const initState = {
    textPrintingMethod: { id: "_1C", name: "モノクロ印刷" },
    printQuantity: 1,
    pageCount: 16,
    colorPageCount: 0,
  };

  // 状態
  const [state,  dispatch] = useReducer(handleRreducer, initState);
  console.log(state);

  // 本文の印刷方法
  const handleTextPrintingMethod = (e) => {
    const key = e.target.selectedOptions[0].dataset.key;
    dispatch({
      item: "textPrintingMethod",
      payload: { key: key, name: e.target.value }
    });
  };

  // 印刷部数
  const handlePrintQuantity = (e) => {
    dispatch({
      item: "printQuantity",
      payload: { name: e.target.name, value: e.target.value }
    });
  };  

  // ページ数
  const handlePageCount = (e) => {
    dispatch({
      item: "pageCount",
      payload: { name: e.target.name, value: e.target.value }
    });
  };

  // カラー・ページ数
  const handleColorPageCount = (e) => {
    dispatch({
      item: "colorPageCount",
      payload: { name: "colorPageCount", value: e.target.value }
    });
  };

  // フルカラー印刷を選択すると『count』を返し、
  // 『count』がある場合は、uesEffectで状態を処理する。
  useEffect(() => {
    if (state.textPrintingMethod.name === "フルカラー印刷" && state.pageCount) {
      dispatch({
        item: "colorPageCount",
        payload: { name: "colorPageCount", value: state.pageCount }
      });
    } else if (state.colorPageCount !== 0) {
      // フルカラー印刷から他の印刷方法に切り替えたときに colorPageCount をリセット
      dispatch({
        item: "colorPageCount",
        payload: { name: "colorPageCount", value: 0 }
      });
    }
  }, [state.pageCount, state.textPrintingMethod.name, dispatch]);

  // カラーページ数
  const renderColorPageCountSelector = () => {
    let count = state.pageCount;
    const _4cMonoCount = count - 1;
    const _4cMonoSpCount = Math.floor(count / 2);
    const makeCountArr = (argCount) => {
      if (argCount <= 0) return []; // ===演算子ではダメみたい。
      return Array(argCount).fill().reduce((acc, _, idx) => {
        acc.push(idx + 1);
        return acc;
      }, [0]);
    };
    const colorPageCountArr = state.textPrintingMethod.name === "カラー・モノクロ混在印刷" || state.textPrintingMethod.name === "カラー・モノクロ混在印刷お得ver."
      ? state.textPrintingMethod.name === "カラー・モノクロ混在印刷"
        ? makeCountArr(_4cMonoCount)
        : makeCountArr(_4cMonoSpCount)
      : state.textPrintingMethod.name === "フルカラー印刷"
        ? [count]
        : null ;

    return colorPageCountArr;
  };

  return (
    <>
      <div className="calc content-width">
        <h1>自動お見積もり</h1>
        {/* 本文の印刷方法 */}
        {/* 方法によって可変するテキストが入る */}
        <div className="calc__item-wrapper text_printing_method">
          <div className="calc__entry">
            本文の印刷方法<span>※</span>
          </div>
          <div className="calc__content-inner">
            <label>
              <select
                name="textPrintingMethod"
                value={state.textPrintingMethod.name}
                onChange={handleTextPrintingMethod}
              >
                { Object.entries(TEXT_PRINTING_METHOD).map(([key, method]) => {
                  return(
                    <option data-key={key} key={key} value={method}>{method}</option>
                  )
                }) }
              </select>
            </label>
          </div>
        </div>

        {/* ページ数 */}
        <div className="calc__item-wrapper page_count">
          <div className="calc__entry">
            ページ数<span>※</span>
          </div>
          <div className="calc__content-inner number-pages">
            <label htmlFor="">
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
            <div className="calc__explanation">表紙（表1・2・3・4）を除く本文のページ数</div>
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
              <span className="title-next-label">内カラーページ数</span>
            </label>
          </div>
        </div>
      </div>

    </>
  );
};

export default AutoCalc;