import { useCalc, useCalcDispatch } from "../context/CalcContext";
import { useEffect } from "react";

// 製本方法
const BINDING_METHOD = ["無線綴じ製本", "中綴じ製本"];

const BindingMethod = () => {
  const state = useCalc();
  const dispatch = useCalcDispatch();

  // 製本の方法
  const handleBindingMethod = (e) => {
    dispatch({
      item: "bindingMethod",
      payload: { name: e.target.name }
    });
  };
  
  // 製本の方法
  const renderBindingMethodOptions = () => {
    const pageCount = state.pageCount;
    let methods;
    let defaultMethod;

    if (pageCount >= 25
        || state.trimSize.name === "A6"
        || state.trimSize.name === "B6"
        || state.trimSize.name === "文庫版"
        || state.trimSize.name === "変形サイズ（小）"
        || state.trimSize.name === "変形サイズ（大）") {
      methods = [BINDING_METHOD[0]];
      defaultMethod = BINDING_METHOD[0];
    } else if (pageCount >= 14 && pageCount <= 24) {
      methods = BINDING_METHOD;
      defaultMethod = null; // 状態管理で制御
    } else if (pageCount <= 13) {
      methods = [BINDING_METHOD[1]];
      defaultMethod = BINDING_METHOD[1];
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
        <li>中綴じ製本は4〜24ページのみ対応可能です。</li>
        <li>A6、B6、新書、文庫、変形サイズは無線綴じ製本のみ対応可能</li>
        <li>くるみ製本は14ページ以上から対応可能</li>
      </ul>
    </div>
  );
};

export default BindingMethod;