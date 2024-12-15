import { createContext, useContext, useReducer } from "react";

const CalcContext = createContext();
const CalcDispatchContext = createContext();

export const useCalc = () => {
  return useContext(CalcContext);
};
export const useCalcDispatch = () => {
  return useContext(CalcDispatchContext);
};

// 関数Reducer
const handleRreducer = (prev, { item, payload }) => {
  const { key, 
          name, 
          value, 
          customTrimSize, 
          ondemandOutCalcItems, 
          ctpOutCalcItems, 
          blackOutCalcItems 
        } = payload;
  switch (item) {
    case "trimSize": return { ...prev, trimSize: { id: key, name: name, customTrimSize: customTrimSize } };
    case "textPaperType": return { ...prev, textPaperType: { name: name } };
    case "textPrintingMethod": return { ...prev, textPrintingMethod: { id: key, name: name } };
    case "printQuantity": return { ...prev, [name]: parseInt(value) };
    case "pageCount": { return { ...prev, [name]: parseInt(value) } };
    // case "colorPageCount": return { ...prev, [name]: parseInt(value) };
    case "bindingMethod": return { ...prev, bindingMethod: name };
    case "bindingDirection": return { ...prev, bindingDirection: name };
    case "coverPrintingMethod": return { ...prev, coverPrintingMethod: { id: key, name: name, count: value } };
    case "insideFrontBackCoverColor": return { ...prev, insideFrontBackCoverColor: { name: name } };    
    case "coverPaperType": return { ...prev, coverPaperType: { name: name } };
    case "ppCoating": return { ...prev, ppCoating: { name: name } };
    // case "addBreedAutoCover": return { ...prev, addBreedAutoCover: payload };
    // case "addBreedAutoText": return { ...prev, addBreedAutoText: payload };    
    case "horizontalBinding": return { ...prev, horizontalBinding: payload };    
    case "submissionInMSWordFormat": return { ...prev, submissionInMSWordFormat: payload }; 
    case "onDemandResult": return { ...prev, onDemandResult: { name: name, value: value, ondemandOutCalcItems: ondemandOutCalcItems }}; 
    case "ctpResult": return { ...prev, ctpResult: { name: name, value: value, ctpOutCalcItems: ctpOutCalcItems } }; 
    case "blackResult": return { ...prev, blackResult: { name: name, value: value, blackOutCalcItems: blackOutCalcItems } }; 
    case "resultOutPutMethodAndFee": return { ...prev, resultOutPutMethodAndFee: payload }; 
    case "makeJson": return { ...prev, value: payload }; 
    case "submitButton": return { ...prev, submitButton: payload }; 
    default: throw new Error("error in reduce...");
  }
};

export const CalcProvider = ({ children }) => {
  // 初期値
  const initState = {
    trimSize: {
      id: "B5",
      name: "B5",
      customTrimSize: { height: null, width: null },
    },
    textPaperType: { name: null },
    textPrintingMethod: { id: "_1C", name: "モノクロ印刷" },
    printQuantity: 1,
    pageCount: 16,
    // colorPageCount: 0,
    coverPrintingMethod: { id: null, name: null },
    insideFrontBackCoverColor: { name: null },
    coverPaperType: { name: null },
    ppCoating: { name: null },
    // addBreedAutoCover: false,
    // addBreedAutoText: false,
    horizontalBinding: false,
    submissionInMSWordFormat: false,
    ctpResult: { name: "CTP出力", value: 0 },
    onDemandResult: { name: "オンデマンド出力", value: 0 },
    blackResult: { name: "ブラックマスター出力", value: 0 },
    resultOutPutMethodAndFee: { name: null, value: 0 },
  };

  // 状態
  const [state, dispatch] = useReducer(handleRreducer, initState);
  // console.log(state);

  return (
    <CalcContext.Provider value={state}>
      <CalcDispatchContext.Provider value={dispatch}>
        {children}
      </CalcDispatchContext.Provider>
    </CalcContext.Provider>
  );
};