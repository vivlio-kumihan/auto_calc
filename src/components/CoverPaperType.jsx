import { useCalc, useCalcDispatch } from "../context/CalcContext";
import { useEffect } from "react";

// コーティング加工が可能な用紙
const COATING_AVAILABLE = [
  "レザック 175kg",
  "アートポスト紙 200kg",
  "ミラーコート紙 220kg",
  "サテン金藤 180kg",
  "マットポスト紙 220kg",
  "アラベール スノーホワイト 160kg",
  "アラベール ナチュラル 160kg",
  "ペルーラ スノーホワイト 180kg",
  "ミランダ スノーホワイト 170kg",
  "エスプリコートVNエンボス アラレ 176.5kg",
  "しこくてんれい ゆき 180kg"
];

const CoverPaperType = ({ coverPaperTypesGroup }) => {
  const state = useCalc();
  const dispatch = useCalcDispatch();

  // 表紙の種類
  const handleCoverPaperType = (type) => {
    dispatch({
      item: "coverPaperType",
      payload: { name: type }  // 納得いってないが、クリックしたラジオボタンのtypeをstateにセットさせる。
    });
  };

  const putAvilablePPMark = (type) => {
    return COATING_AVAILABLE.includes(type);
  };

  useEffect(() => {
    (COATING_AVAILABLE.includes(state.coverPaperType.name) !== true 
    && state.ppCoating.name !== null) && 
      dispatch({
        item: "ppCoating",
        payload: { name: null }
    });
  }, [state.coverPaperType.name, state.ppCoating.name, dispatch]);  
    
  return (
    <div className="calc__item-wrapper cover_paper_type">
      <div className="calc__entry margin-bottom-unset">
        表紙の種類（印刷方法）<span>※</span>
      </div>
      <div className="calc__content-inner">
        {
          state.coverPrintingMethod.id && // id が存在することを確認
          coverPaperTypesGroup?.[state.coverPrintingMethod.id]?.coverPaperTypes?.length > 0 ? ( // データが存在するか確認
            coverPaperTypesGroup[state.coverPrintingMethod.id].coverPaperTypes.map((item) => (
              <div key={item.group}>
                <h3>{item.group}</h3>
                <div className="set-flex">
                  {item.types.map((type) => (
                    <label htmlFor={type} key={type}>
                      <input
                        id={type}
                        type="radio"
                        name="coverPaperType" // 全てのラジオボタンで共通のname属性にする
                        checked={state.coverPaperType.name === type}
                        onChange={() => handleCoverPaperType(type)} // typeを引数に渡す
                      />
                      {putAvilablePPMark(type) ? `${type}★` : `${type}`}
                    </label>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>データが見つかりません</p> // データがない場合のフォールバック
          )
        }
      </div>
    </div>
  );

};

export default CoverPaperType;