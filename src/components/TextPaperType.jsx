import { useCalc, useCalcDispatch } from "../context/CalcContext";

const TextPaperType = ({ trimSizeTypesRange }) => {
  const state = useCalc();
  const dispatch = useCalcDispatch();

  // 本文用紙の種類
  const handleTextPaperType = (e) => {
    dispatch({
      item: "textPaperType",
      payload: { name: e.target.name }
    });
  };
    
  return (
    <div className="calc__item-wrapper text_paper_type">
      <div className="calc__entry">
        本文用紙の種類<span>※</span>
      </div>
      <div className="calc__content-inner set-flex">
        {
          state.trimSize.id &&
            Object.values(
              trimSizeTypesRange[state.trimSize.id]?.textPaperTypes[state.textPrintingMethod.id] || {})
              .map((type) => {
                return (
                  <label htmlFor={type} key={type}>
                    <input
                      id={type}
                      type="radio"
                      name={type}
                      checked={state.textPaperType.name === type}
                      onChange={handleTextPaperType}
                    />
                    {type}
                  </label>
                )
            }
          )
        }
      </div>
    </div>
  );
};

export default TextPaperType;