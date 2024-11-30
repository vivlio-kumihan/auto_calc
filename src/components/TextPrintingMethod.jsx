import { useCalc, useCalcDispatch } from "../context/CalcContext";

// 本文印刷方法
const TEXT_PRINTING_METHOD = {
  _1C: "モノクロ印刷",
  _4C_MONO: "カラー・モノクロ混在印刷",
  _4C_MONO_SP: "カラー・モノクロ混在印刷お得ver.",
  _4C: "フルカラー印刷"
};

const TextPrintingMethod = () => {
  const state = useCalc();
  const dispatch = useCalcDispatch();

  // 本文の印刷方法
  const handleTextPrintingMethod = (e) => {
    const key = e.target.selectedOptions[0].dataset.key;
    dispatch({
      item: "textPrintingMethod",
      payload: { key: key, name: e.target.value }
    });
  };

  return (
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
        {/* カラー・モノクロ混在印刷 */}
          {/* 「カラーページのご指定」欄に何ページ目がカラー印刷になるかデータのページ数で明記して下さい。 */}
          {/* ページ数のご指定方法はコチラでご確認ください。 */}
        {/* カラー・モノクロ混在印刷お得ver. */}
          {/* お得ver.は、カラーページ数が総ページ数の半分以下で、カラーページが巻頭か巻末かで全て連続しているものに限ります。（例：総ページ数80p 内カラーページ8p&emsp;巻頭カラー 1～8P,モノクロ 9～80P） */}
          {/* カラー・モノクロ混在印刷のデータ作成についての注意点はコチラでご確認ください。 */}
      </div>
    </div>
  );
};

export default TextPrintingMethod;