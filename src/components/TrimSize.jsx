import { useCalc, useCalcDispatch } from "../context/CalcContext";
import { useEffect } from "react";

const TrimSize = ({ trimSizeTypesRange }) => {
  const state = useCalc();
  const dispatch = useCalcDispatch();

  // 冊子サイズ、本文の印刷方法の選択を変更した場合、
  // 選択している使用本文用紙の種類が選択肢になければ、
  // 使用本文用紙のstateをnullに変更する。
  useEffect(() => {
    const textPaperTypeSelctOptions = trimSizeTypesRange[state.trimSize.id]?.textPaperTypes[state.textPrintingMethod.id];
    // 特定のサイズが選択されたときのみリセット
    if (!textPaperTypeSelctOptions?.includes(state.textPaperType.name)) {
      dispatch({
        item: "textPaperType",
        payload: { name: null },
      });
    }
  }, [state.trimSize.id,
      state.textPrintingMethod.id,
      state.textPaperType.name,
      dispatch
  ]);

  // 冊子のサイズ
  const handleTrimSize = (e) => {
    const isCustomSize = ["stdPaperback", "pocketEdition", "customSizeSm", "customSizeLg"].includes(e.target.id); // 変形サイズかどうか
    dispatch({
      item: "trimSize",
      payload: {
        key: e.target.id,
        name: e.target.name,
        customTrimSize: isCustomSize ? state.trimSize.customTrimSize : { height: null, width: null},
      }
    });
  };

  return (
    <div className="calc__item-wrapper trim_size">
      <div className="calc__entry">
        冊子のサイズ<span>※</span>
      </div>
      <div className="calc__content-inner">
        {
          Object.entries(trimSizeTypesRange).map(([key, item]) => {
            return (
              <label htmlFor={key} key={key}>
                <input
                  id={key}
                  type="radio"
                  name={item.name}
                  checked={state.trimSize.id === key}
                  onChange={handleTrimSize}
                />
                {item.name}
              </label>
            )
          })
        }
      </div>
    </div>
  );
};

export default TrimSize;