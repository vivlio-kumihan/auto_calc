import { useCalc, useCalcDispatch } from "../context/CalcContext";
import { useEffect } from "react";

// 表紙の印刷方法（度数）
const COVER_PRINTING_METHOD = { mono: "モノクロ印刷", color: "フルカラー印刷" };

const CoverPrintingMethod = ({ coverPaperTypesGroup }) => {
  const state = useCalc();
  const dispatch = useCalcDispatch();

  // 表紙の印刷方法
  const handleCoverPrintingMethod = (e) => {
    dispatch({
      item: "coverPrintingMethod",
      payload: { key: e.target.id, name: e.target.name, value: 4 }
    });
  };

  // PP加工関連
  // 選択したキーに紐づく使用可能な紙のタイプSELECTED_COVER_PAPER_TYPESの中にstatetypenameがあれば表示させる作戦
  const RECENT_COLOR = coverPaperTypesGroup[state.coverPrintingMethod.id];
  const SELECTED_COVER_PAPER_TYPES = RECENT_COLOR
    ? RECENT_COLOR.coverPaperTypes.reduce((acc, hash) => {
        acc.push(hash.types);
        return acc;
      }, []).flat()
    : [];
  
  // サイズ変更時にcustomTrimSizeをリセットするためのuseEffect
  useEffect(() => {
    SELECTED_COVER_PAPER_TYPES.includes(state.coverPaperType.name) === false &&
      dispatch({
        item: "coverPaperType",
        payload: {
          name: null
        }
      });
  }, [SELECTED_COVER_PAPER_TYPES.includes(state.coverPaperType.name)]);   

  // 表2・3に印刷がない場合の表紙台ページ数の変更
  useEffect(() => {
    const value = state.insideFrontBackCoverColor.name === "印刷しない" ? 2 : 4;
    dispatch({
      item: "coverPrintingMethod",
      payload: {
        key: state.coverPrintingMethod.id,
        name: state.coverPrintingMethod.name,
        value: value
      }
    });
  }, [state.insideFrontBackCoverColor.name, 
      state.coverPrintingMethod.id, 
      state.coverPrintingMethod.name, 
      dispatch
      ]
  );   

  return (
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
  );
};

export default CoverPrintingMethod;