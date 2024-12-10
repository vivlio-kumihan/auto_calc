import { useCalc, useCalcDispatch } from "../context/CalcContext";
import { useEffect } from "react";

const CoverPaperType = ({ coverPaperTypesGroup, coatingAvailable }) => {
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
    return coatingAvailable.includes(type);
  };

  useEffect(() => {
    (coatingAvailable.includes(state.coverPaperType.name) !== true 
    && state.ppCoating.name !== null) && 
      dispatch({
        item: "ppCoating",
        payload: { name: null }
    });
  }, [state.coverPaperType.name, state.ppCoating.name, dispatch]);  
    
  return (
    <div className="calc__item-wrapper cover_paper_type">
      <div className="calc__entry margin-bottom-unset">
        表紙用紙の種類<span>※</span>
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
            <p>表紙の印刷方法を選択してください。</p>
          )
        }
      </div>
    </div>
  );

};

export default CoverPaperType;