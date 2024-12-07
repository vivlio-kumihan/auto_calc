import { useCalc, useCalcDispatch } from "../context/CalcContext";
import { useEffect } from "react";

// 表2・3の印刷方法
const INSIDE_FRONT_BACK_COVER_COLOR = ["印刷しない", "フルカラー印刷", "モノクロ印刷"];

const InsideCoverPrintingMethod = () => {
  const state = useCalc();
  const dispatch = useCalcDispatch();

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
        payload: { name: "モノクロ印刷" }
    });
  }, [state.coverPrintingMethod.id, state.insideFrontBackCoverColor.name, dispatch]);

  return (
    <div className="calc__item-wrapper insede_cover_printing_method">
      <div className="calc__entry">
        表2・3の印刷方法<span>※</span>
      </div>
      <ul>
        <li className="calc__explanation">表2・表3に印刷をご希望の場合は、フルカラーかモノクロ印刷どちらかを選択してださい。</li>
        <li className="calc__explanation">おもて表紙（表1）の裏側を表2、裏表紙（表4）の内側を表3と呼びます。</li>
      </ul>      
      <div className="calc__content-inner">
        {
          state.coverPrintingMethod.id !== null &&
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
      </div>
    </div>    
  );
};

export default InsideCoverPrintingMethod;


// カバーの印刷方法をカラーかモノクロかで選択した場合にボタンを表示させるためのもの
// state.coverPrintingMethod.id !== null &&

// // 表紙の印刷方法
// const handleCoverPrintingMethod = (e) => {
//   dispatch({
//     item: "coverPrintingMethod",
//     payload: { key: e.target.id, name: e.target.name }
//   });
// };

// // PP加工関連
// // 選択したキーに紐づく使用可能な紙のタイプSELECTED_COVER_PAPER_TYPESの中にstatetypenameがあれば表示させる作戦
// const RECENT_COLOR = coverPaperTypesGroup[state.coverPrintingMethod.id];
// const SELECTED_COVER_PAPER_TYPES = RECENT_COLOR
//   ? RECENT_COLOR.coverPaperTypes.reduce((acc, hash) => {
//       acc.push(hash.types);
//       return acc;
//     }, []).flat()
//   : [];

// // サイズ変更時にcustomTrimSizeをリセットするためのuseEffect
// useEffect(() => {
//   SELECTED_COVER_PAPER_TYPES.includes(state.coverPaperType.name) === false &&
//     dispatch({
//       item: "coverPaperType",
//       payload: {
//         name: null
//       }
//     });
// }, [SELECTED_COVER_PAPER_TYPES.includes(state.coverPaperType.name)]);   
