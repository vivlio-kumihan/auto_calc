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
      payload: { key: e.target.id, name: e.target.name }
    });
  };





  const INSIDE_FRONT_BACK_COVER_COLOR = ["フルカラー印刷", "モノクロ印刷"];


  // 「Polypropylene (PP) Lamination」または「PP Coating」
  // Gloss PP Lamination：ラミネーション
  // Matte PP Lamination：PPラミネーション
  const PP_COATING_TYPES = ["グロス（光沢）PP", "マット（艶消し）PP"];
  // PP加工関連
  // 選択したキーに紐づく使用可能な紙のタイプSELECTED_COVER_PAPER_TYPESの中にstatetypenameがあれば表示させる作戦
  const RECENT_COLOR = coverPaperTypesGroup[state.coverPrintingMethod.id];
  const SELECTED_COVER_PAPER_TYPES = RECENT_COLOR
    ? RECENT_COLOR.coverPaperTypes.reduce((acc, hash) => {
        acc.push(hash.types);
        return acc;
      }, []).flat()
    : [];



  const handleAddPPCoating = (e) => {
    dispatch({
      item: "ppCoating",
      payload: { name: e.target.value }
    });
  }; 
  
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
      <ul>
        <li className="calc__explanation">表2・表3に印刷をご希望の場合は、下記のオプション加工をお選び下さい。</li>
        <li className="calc__explanation">表表紙（表1）の裏側を表2、裏表紙（表4）の内側を表3と呼びます。</li>
      </ul>
    </div>
  );
};

export default CoverPrintingMethod;