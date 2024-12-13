import { useCalc, useCalcDispatch } from "../context/CalcContext";

// 綴じ方向
const BINDING_DIRECTION = ["左綴じ", "右綴じ"];

const BindingDirection = () => {
  const state = useCalc();
  const dispatch = useCalcDispatch();

  // 本文の印刷方法
  const handleBindingDirection = (e) => {
    dispatch({
      item: "bindingDirection",
      payload: { name: e.target.value }
    });
  };

  return (
    <div className="calc__item-wrapper binding-Direction">
      <div className="calc__entry">
        綴じ方向<span>※</span>
      </div>
      <div className="calc__content-inner">
        {
          BINDING_DIRECTION.map((direction) => {
            return (
              <label htmlFor={direction} key={direction}>
                <input
                  id={direction}
                  type="radio"
                  name="binding-direction"
                  value={direction}
                  onClick={handleBindingDirection} />
                {direction}
              </label>
            )
          })
        }
        {/* カラー・モノクロ混在印刷 */}
          {/* 「カラーページのご指定」欄に何ページ目がカラー印刷になるかデータの本文ページ数で明記して下さい。 */}
          {/* 本文ページ数のご指定方法はコチラでご確認ください。 */}
        {/* カラー・モノクロ混在印刷お得ver. */}
          {/* お得ver.は、カラー本文ページ数が総本文ページ数の半分以下で、カラーページが巻頭か巻末かで全て連続しているものに限ります。（例：総本文ページ数80p 内カラーページ8p&emsp;巻頭カラー 1～8P,モノクロ 9～80P） */}
          {/* カラー・モノクロ混在印刷のデータ作成についての注意点はコチラでご確認ください。 */}
      </div>
    </div>
  );
};

export default BindingDirection;