import { CalcProvider } from "./context/CalcContext";

import TrimSize from "./components/TrimSize.jsx";
import CustomSize from "./components/CustomSize.jsx";

// 本体
const AutoCalc = () => {
  return (
    <>
      <div className="calc content-width">
        <h1>自動お見積もり</h1>
        <CalcProvider>
          {/* 冊子のサイズ */}
          <TrimSize />
          {/* 新書版・文庫版・変形サイズ（大）（小）入力 */}
          <CustomSize />
          {/* 本文の印刷方法 */}
        </CalcProvider>
      </div>
    </>
  );
};

export default AutoCalc;


// 冊子のサイズと対応する用紙の種類
const TRIM_SIZES_TYPES_RANGE = {
  A6: {
    name: "A6",
    textPaperTypes: {
      _1C: TEXT_PAPER_TYPE_1C_A6_PocketEdition,
      _4C_MONO: TEXT_PAPER_TYPE_4C_4cMono_OTHERS,
      _4C_MONO_SP: TEXT_PAPER_TYPE_1C_4cMonoSP_OTHERS,
      _4C: TEXT_PAPER_TYPE_4C_4cMono_OTHERS
    }
  },
  B6: {
    name: "B6",
    textPaperTypes: {
      _1C: TEXT_PAPER_TYPE_1C_4cMonoSP_OTHERS,
      _4C_MONO: TEXT_PAPER_TYPE_4C_4cMono_OTHERS,
      _4C_MONO_SP: TEXT_PAPER_TYPE_1C_4cMonoSP_OTHERS,
      _4C: TEXT_PAPER_TYPE_4C_4cMono_OTHERS
    }
  },
  A5: {
    name: "A5",
    textPaperTypes: {
      _1C: TEXT_PAPER_TYPE_1C_4cMonoSP_OTHERS,
      _4C_MONO: TEXT_PAPER_TYPE_4C_4cMono_OTHERS,
      _4C_MONO_SP: TEXT_PAPER_TYPE_1C_4cMonoSP_OTHERS ,
      _4C: TEXT_PAPER_TYPE_4C_4cMono_OTHERS
    }
  },
  B5: {
    name: "B5",
    textPaperTypes: {
      _1C: TEXT_PAPER_TYPE_1C_4cMonoSP_OTHERS,
      _4C_MONO: TEXT_PAPER_TYPE_4C_4cMono_OTHERS,
      _4C_MONO_SP: TEXT_PAPER_TYPE_1C_4cMonoSP_OTHERS,
      _4C: TEXT_PAPER_TYPE_4C_4cMono_OTHERS
    }
  },
  A4: {
    name: "A4",
    textPaperTypes: {
      _1C: TEXT_PAPER_TYPE_1C_4cMonoSP_OTHERS,
      _4C_MONO: TEXT_PAPER_TYPE_4C_4cMono_OTHERS,
      _4C_MONO_SP: TEXT_PAPER_TYPE_1C_4cMonoSP_OTHERS,
      _4C: TEXT_PAPER_TYPE_4C_4cMono_OTHERS
    }
  },
  stdPaperback: {
    name: "新書版",
    textPaperTypes: {
      _1C: TEXT_PAPER_TYPE_1C_4cMonoSP_OTHERS,
      _4C_MONO: TEXT_PAPER_TYPE_4C_4cMono_OTHERS,
      _4C_MONO_SP: TEXT_PAPER_TYPE_1C_4cMonoSP_OTHERS,
      _4C: TEXT_PAPER_TYPE_4C_4cMono_OTHERS
    },
    customTrimSizeRange: {
      height: [172, 192],
      width: [103, 138]
    }
  },
  pocketEdition: {
    name: "文庫版",
    textPaperTypes: {
      _1C: TEXT_PAPER_TYPE_1C_A6_PocketEdition,
      _4C_MONO: TEXT_PAPER_TYPE_4C_4cMono_OTHERS,
      _4C_MONO_SP: TEXT_PAPER_TYPE_1C_4cMonoSP_OTHERS,
      _4C: TEXT_PAPER_TYPE_4C_4cMono_OTHERS
    },
    customTrimSizeRange: {
      height: [138, 152],
      width: [103, 115]
    }
  },
  customSizeSm: {
    name: "変形サイズ（小）",
    textPaperTypes: {
      _1C: TEXT_PAPER_TYPES_1C_4cMonoSP_CustomSizeSmLg,
      _4C_MONO: TEXT_PAPER_TYPE_4C_CustomSizeSmLg,
      _4C_MONO_SP: TEXT_PAPER_TYPES_1C_4cMonoSP_CustomSizeSmLg,
      _4C: TEXT_PAPER_TYPE_4C_CustomSizeSmLg
    },
    customTrimSizeRange: {
      height: [105, 210],
      width: [90, 148]
    }
  },
  customSizeLg: {
    name: "変形サイズ（大）",
    textPaperTypes: {
      _1C: TEXT_PAPER_TYPES_1C_4cMonoSP_CustomSizeSmLg,
      _4C_MONO: TEXT_PAPER_TYPE_4C_CustomSizeSmLg,
      _4C_MONO_SP: TEXT_PAPER_TYPES_1C_4cMonoSP_CustomSizeSmLg,
      _4C: TEXT_PAPER_TYPE_4C_CustomSizeSmLg
    },
    customTrimSizeRange: {
      height: [149, 297],
      width: [149, 210]
    }
  }
};



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
    case "trimSize": return {
      ...prev,
      trimSize: {
        id: key,
        name: name,
        customTrimSize: customTrimSize
      }
    };
    case "textPaperType": return { ...prev, textPaperType: { name: name } };
    case "textPrintingMethod": return { ...prev, textPrintingMethod: { id: key, name: name } };
    case "printQuantity": return { ...prev, [name]: parseInt(value) };
    case "pageCount": { return { ...prev, [name]: parseInt(value) } };
    case "colorPageCount": return { ...prev, [name]: parseInt(value) };
    case "bindingMethod": return { ...prev, bindingMethod: name };
    case "coverPrintingMethod": return { ...prev, coverPrintingMethod: { id: key, name: name } };
    case "coverPaperType": return { ...prev, coverPaperType: { name: name } };
    case "ppCoating": return { ...prev, ppCoating: { name: name } };
    case "addBreedAutoCover": return { ...prev, addBreedAutoCover: payload };
    case "addBreedAutoText": return { ...prev, addBreedAutoText: payload };    
    case "horizontalBinding": return { ...prev, horizontalBinding: payload };    
    case "submissionInMSWordFormat": return { ...prev, submissionInMSWordFormat: payload };    
    case "insideFrontBackCoverColor": return { ...prev, insideFrontBackCoverColor: { name: name } };    
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

// 冊子のサイズと対応する用紙の種類
const TRIM_SIZES_TYPES_RANGE = {
  A6: {
    name: "A6",
    textPaperTypes: {
      _1C: TEXT_PAPER_TYPE_1C_A6_PocketEdition,
      _4C_MONO: TEXT_PAPER_TYPE_4C_4cMono_OTHERS,
      _4C_MONO_SP: TEXT_PAPER_TYPE_1C_4cMonoSP_OTHERS,
      _4C: TEXT_PAPER_TYPE_4C_4cMono_OTHERS
    }
  },
  B6: {
    name: "B6",
    textPaperTypes: {
      _1C: TEXT_PAPER_TYPE_1C_4cMonoSP_OTHERS,
      _4C_MONO: TEXT_PAPER_TYPE_4C_4cMono_OTHERS,
      _4C_MONO_SP: TEXT_PAPER_TYPE_1C_4cMonoSP_OTHERS,
      _4C: TEXT_PAPER_TYPE_4C_4cMono_OTHERS
    }
  },
  A5: {
    name: "A5",
    textPaperTypes: {
      _1C: TEXT_PAPER_TYPE_1C_4cMonoSP_OTHERS,
      _4C_MONO: TEXT_PAPER_TYPE_4C_4cMono_OTHERS,
      _4C_MONO_SP: TEXT_PAPER_TYPE_1C_4cMonoSP_OTHERS ,
      _4C: TEXT_PAPER_TYPE_4C_4cMono_OTHERS
    }
  },
  B5: {
    name: "B5",
    textPaperTypes: {
      _1C: TEXT_PAPER_TYPE_1C_4cMonoSP_OTHERS,
      _4C_MONO: TEXT_PAPER_TYPE_4C_4cMono_OTHERS,
      _4C_MONO_SP: TEXT_PAPER_TYPE_1C_4cMonoSP_OTHERS,
      _4C: TEXT_PAPER_TYPE_4C_4cMono_OTHERS
    }
  },
  A4: {
    name: "A4",
    textPaperTypes: {
      _1C: TEXT_PAPER_TYPE_1C_4cMonoSP_OTHERS,
      _4C_MONO: TEXT_PAPER_TYPE_4C_4cMono_OTHERS,
      _4C_MONO_SP: TEXT_PAPER_TYPE_1C_4cMonoSP_OTHERS,
      _4C: TEXT_PAPER_TYPE_4C_4cMono_OTHERS
    }
  },
  stdPaperback: {
    name: "新書版",
    textPaperTypes: {
      _1C: TEXT_PAPER_TYPE_1C_4cMonoSP_OTHERS,
      _4C_MONO: TEXT_PAPER_TYPE_4C_4cMono_OTHERS,
      _4C_MONO_SP: TEXT_PAPER_TYPE_1C_4cMonoSP_OTHERS,
      _4C: TEXT_PAPER_TYPE_4C_4cMono_OTHERS
    },
    customTrimSizeRange: {
      height: [172, 192],
      width: [103, 138]
    }
  },
  pocketEdition: {
    name: "文庫版",
    textPaperTypes: {
      _1C: TEXT_PAPER_TYPE_1C_A6_PocketEdition,
      _4C_MONO: TEXT_PAPER_TYPE_4C_4cMono_OTHERS,
      _4C_MONO_SP: TEXT_PAPER_TYPE_1C_4cMonoSP_OTHERS,
      _4C: TEXT_PAPER_TYPE_4C_4cMono_OTHERS
    },
    customTrimSizeRange: {
      height: [138, 152],
      width: [103, 115]
    }
  },
  customSizeSm: {
    name: "変形サイズ（小）",
    textPaperTypes: {
      _1C: TEXT_PAPER_TYPES_1C_4cMonoSP_CustomSizeSmLg,
      _4C_MONO: TEXT_PAPER_TYPE_4C_CustomSizeSmLg,
      _4C_MONO_SP: TEXT_PAPER_TYPES_1C_4cMonoSP_CustomSizeSmLg,
      _4C: TEXT_PAPER_TYPE_4C_CustomSizeSmLg
    },
    customTrimSizeRange: {
      height: [105, 210],
      width: [90, 148]
    }
  },
  customSizeLg: {
    name: "変形サイズ（大）",
    textPaperTypes: {
      _1C: TEXT_PAPER_TYPES_1C_4cMonoSP_CustomSizeSmLg,
      _4C_MONO: TEXT_PAPER_TYPE_4C_CustomSizeSmLg,
      _4C_MONO_SP: TEXT_PAPER_TYPES_1C_4cMonoSP_CustomSizeSmLg,
      _4C: TEXT_PAPER_TYPE_4C_CustomSizeSmLg
    },
    customTrimSizeRange: {
      height: [149, 297],
      width: [149, 210]
    }
  }
};