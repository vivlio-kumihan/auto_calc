import { useCalc, useCalcDispatch } from "../context/CalcContext";
import { useEffect } from "react";

// 製本方法
const BINDING_METHOD = ["無線綴じ製本", "中綴じ製本"];

const BindingMethod = () => {
  const state = useCalc();
  const dispatch = useCalcDispatch();
  
  // 製本の方法
  const renderBindingMethodOptions = () => {
    const pageCount = state.pageCount;
    let methods;
    let defaultMethod;

    // 無線綴じ製本対応
    // if (pageCount >= 25
    if (state.trimSize.name === "A6" || state.trimSize.name === "B6"
        // || state.trimSize.name === "文庫版"
        // || state.trimSize.name === "変形サイズ（小）"
        // || state.trimSize.name === "変形サイズ（大）"
        ) {         
      methods = [BINDING_METHOD[0]];
      defaultMethod = BINDING_METHOD[0];
    // 中綴じ製本対応
    } else if (pageCount >= 4 && pageCount <= 12){
      methods = [BINDING_METHOD[1]];
      defaultMethod = BINDING_METHOD[1];
    // 無線中綴じ選択肢
    } else if (pageCount >= 14 && pageCount <= 40) {
      methods = BINDING_METHOD;
      defaultMethod = null; // 状態管理で制御
    // 中綴じ製本対応
    } else if (pageCount >= 42) {
      methods = [BINDING_METHOD[0]];
      defaultMethod = BINDING_METHOD[0];
    }

    useEffect(() => {
      if (defaultMethod) {
        dispatch({
          item: "bindingMethod",
          payload: { name: defaultMethod }
        });
      }
    }, [defaultMethod, dispatch]);

    return methods;
  };

    // 製本の方法
  const handleBindingMethod = (e) => {
    dispatch({
      item: "bindingMethod",
      payload: { name: e.target.name }
    });
  };

  return (
    <div className="calc__item-wrapper binding_method">
      <div className="calc__entry">
        製本方法<span>※</span>
      </div>
      <div className="calc__content-inner">
        {
          renderBindingMethodOptions()?.map((method) => {
            return (
              <label htmlFor={method} key={method}>
                <input
                  id={method}
                  type="radio"
                  name={method}
                  checked={state.bindingMethod === method}
                  onChange={handleBindingMethod}
                />
                {method}
              </label>
            )
          })
        }
      </div>
      <ul className="calc__explanation">
        <li>無線綴じ製本は、本文が14ページ以上から対応です。</li>
        <li>A6、B6サイズは無線綴じ製本のみ対応です。</li>
        <li>中綴じ製本は本文が4〜28ページのみ対応です。</li>
        <li>※<strong>本文上質70kgの場合となります。</strong></li>
        {/* <li>A6、B6、新書、文庫、変形サイズは無線綴じ製本のみ対応です。</li> */}
      </ul>
    </div>
  );
};

export default BindingMethod;