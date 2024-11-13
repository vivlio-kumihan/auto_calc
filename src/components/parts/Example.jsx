import { useReducer, useEffect } from "react";

// 表紙の印刷方法（度数）
const COVER_PRINTING_METHOD = { mono: "モノクロ印刷", color: "フルカラー印刷" };
const INSIDE_FRONT_BACK_COVER_COLOR = ["フルカラー印刷", "モノクロ印刷"];

// 関数Reducer
const handleRreducer = (prev, { item, payload }) => {
  const { key, name, value, customTrimSize } = payload;
  switch (item) {
    case "coverPrintingMethod": return { ...prev, coverPrintingMethod: { id: key, name: name } };
    case "insideFrontBackCoverColor": return { ...prev, insideFrontBackCoverColor: { name: name } };    
    default: throw new Error("error...");
  }
};

// 本体
const Example = () => {
  // 初期値
  const initState = {
    coverPrintingMethod: { id: null, name: null },
    insideFrontBackCoverColor: { name: null },
  };

  // 状態
  const [state,  dispatch] = useReducer(handleRreducer, initState);
  console.log(state);

  // 表紙の印刷方法
  const handleCoverPrintingMethod = (e) => {
    dispatch({
      item: "coverPrintingMethod",
      payload: { key: e.target.id, name: e.target.name }
    });
  };

  const handleInsideFrontBackCoverColor = (e) => {
    dispatch({
      item: "insideFrontBackCoverColor",
      payload: { name: e.target.name }
    });
  };

  useEffect(() => {
    (state.coverPrintingMethod.id === "mono"
    && state.insideFrontBackCoverColor.name === "フルカラー印刷") &&
      dispatch({
        item: "insideFrontBackCoverColor",
        payload: { name: null }
    });
  }, [state.coverPrintingMethod.id, state.insideFrontBackCoverColor.name, dispatch]);

  return (
    <>
      <div className="calc">
        {/* 表紙の印刷方法 */}
        <div className="calc__item-wrapper cover_printing_method">
          <div className="calc__entry">
            表紙の印刷方法<span>※</span>
          </div>
          <div className="calc__content-inner">
            {
              Object.entries(COVER_PRINTING_METHOD).map(([key, color]) => {
                return (
                  <label htmlFor={key} key={key}>
                    <input
                      id={key}
                      type="radio"
                      name={color}
                      checked={state.coverPrintingMethod.name === color}
                      onChange={handleCoverPrintingMethod}
                    />
                    {color}
                  </label>
                )
              })
            }
          </div>
        </div>

        {/* オプション加工 */}
        <div className="calc__item-wrapper optional_finishing">
          <div className="calc__entry">
            オプション加工<span>※</span>
          </div>
          <div className="calc__content-inner">
            <section>
              {
                state.coverPrintingMethod.id === "color" &&
                INSIDE_FRONT_BACK_COVER_COLOR.map((color) => {
                  return (
                    <label htmlFor={color} key={color}>
                      <input
                        id={color}
                        type="radio"
                        name={color}
                        checked={state.insideFrontBackCoverColor.name === color}
                        onChange={handleInsideFrontBackCoverColor} />
                      {color}
                    </label>
                  )
                })
              }
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Example;