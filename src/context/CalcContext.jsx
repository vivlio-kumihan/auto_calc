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
  const { key, name, value, customTrimSize } = payload;
  switch (item) {
    case "trimSize": return { ...prev, trimSize: { id: key, name: name, customTrimSize: customTrimSize } };
    case "textPaperType": return { ...prev, textPaperType: { name: name } };
    case "textPrintingMethod": return { ...prev, textPrintingMethod: { id: key, name: name } };
    case "printQuantity": return { ...prev, [name]: parseInt(value) };
    case "pageCount": { return { ...prev, [name]: parseInt(value) } };
    case "colorPageCount": return { ...prev, [name]: parseInt(value) };
    case "bindingMethod": return { ...prev, bindingMethod: name };
    case "coverPrintingMethod": return { ...prev, coverPrintingMethod: { id: key, name: name, count: value } };
    case "insideFrontBackCoverColor": return { ...prev, insideFrontBackCoverColor: { name: name } };    
    case "coverPaperType": return { ...prev, coverPaperType: { name: name } };
    case "ppCoating": return { ...prev, ppCoating: { name: name } };
    // case "addBreedAutoCover": return { ...prev, addBreedAutoCover: payload };
    // case "addBreedAutoText": return { ...prev, addBreedAutoText: payload };    
    case "horizontalBinding": return { ...prev, horizontalBinding: payload };    
    case "submissionInMSWordFormat": return { ...prev, submissionInMSWordFormat: payload }; 
    case "onDemandResult": return { ...prev, onDemandResult: payload }; 
    case "ctpResult": return { ...prev, ctpResult: payload }; 
    case "blackResult": return { ...prev, blackResult: payload }; 
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
    colorPageCount: 0,
    coverPrintingMethod: { id: null, name: null },
    insideFrontBackCoverColor: { name: null },
    coverPaperType: { name: null },
    ppCoating: { name: null },
    // addBreedAutoCover: false,
    // addBreedAutoText: false,
    horizontalBinding: false,
    submissionInMSWordFormat: false,
  };

  // 状態
  const [state,  dispatch] = useReducer(handleRreducer, initState);
  console.log(state);

  return (
    <CalcContext.Provider value={state}>
      <CalcDispatchContext.Provider value={dispatch}>
        {children}
      </CalcDispatchContext.Provider>
    </CalcContext.Provider>
  );
};