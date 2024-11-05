import { useReducer, useEffect } from "react";

// 本文の種類
// オブジェクトを整理して配列に変換する関数
const corectPaperTypeToArr = (hash) => {
  const arr = Object.entries(hash).reduce((acc, item) => {
    acc.push(item[1]);
    return acc;
  }, []);
  return arr;
};

// 基本になる用紙の組み合わせ
const BASIC_TEXT_PAPER_TYPE = { 1: "上質 70kg", 2: "上質 90kg", 6: "書籍用紙 72.5kg（淡クリームキンマリ）", 7: "書籍用紙 90kg（淡クリームキンマリ）" };

// 本文 => モノクロ: A6, 文庫版
const TEXT_PAPER_TYPE_1C_A6_PocketEdition = corectPaperTypeToArr(
  { ...BASIC_TEXT_PAPER_TYPE, 3: "上質 55kg", 8: "書籍用紙 57kg（淡クリームキンマリ）", 9: "ラフクリーム琥珀 71.5kg" }
);

// 本文 => モノクロ: 変形サイズ（小）（大）
// 本文 => カラー・モノクロ混在・お得: 変形サイズ（小）（大）
const TEXT_PAPER_TYPES_1C_4cMonoSP_CustomSizeSmLg = corectPaperTypeToArr(
  { ...BASIC_TEXT_PAPER_TYPE }
);

// 本文 => モノクロ: B6, A5, B5, A4, 新書版
// 本文 => カラー・モノクロ混在・お得: A6, B6, A5, B5, A4, 新書版, 文庫版
const TEXT_PAPER_TYPE_1C_4cMonoSP_OTHERS = corectPaperTypeToArr(
  { ...BASIC_TEXT_PAPER_TYPE, 9: "ラフクリーム琥珀 71.5kg" }
);

// 本文 => カラー: 変形サイズ（小）（大）
const TEXT_PAPER_TYPE_4C_CustomSizeSmLg = corectPaperTypeToArr(
  { ...BASIC_TEXT_PAPER_TYPE, 4: "コート 110kg", 5: "マットコート 90kg" }
);

// 本文 => カラー: カラー・モノクロ混在: A6, B6, A5, B5, A4, 新書版, 文庫版
const TEXT_PAPER_TYPE_4C_4cMono_OTHERS = corectPaperTypeToArr(
  { ...BASIC_TEXT_PAPER_TYPE, 4: "コート 110kg", 5: "マットコート 90kg",  9: "ラフクリーム琥珀 71.5kg" }
);


// 冊子のサイズと対応する用紙の種類
const TRIM_SIZES_TYPES_RANGE = {
  A6: {
    name: "A6", 
    textPaperTypes: {
      _1C: TEXT_PAPER_TYPE_1C_A6_PocketEdition, 
      _4C_MONO: TEXT_PAPER_TYPE_4C_4cMono_OTHERS,  
      _4CSP: TEXT_PAPER_TYPE_1C_4cMonoSP_OTHERS,
      _4C: TEXT_PAPER_TYPE_4C_4cMono_OTHERS
    } 
  },
  B6: {
    name: "B6", 
    textPaperTypes: {
      _1C: TEXT_PAPER_TYPE_1C_4cMonoSP_OTHERS, 
      _4C_MONO: TEXT_PAPER_TYPE_4C_4cMono_OTHERS,      
      _4CSP: TEXT_PAPER_TYPE_1C_4cMonoSP_OTHERS,
      _4C: TEXT_PAPER_TYPE_4C_4cMono_OTHERS
    } 
  },
  A5: {
    name: "A5", 
    textPaperTypes: {
      _1C: TEXT_PAPER_TYPE_1C_4cMonoSP_OTHERS,
      _4C_MONO: TEXT_PAPER_TYPE_4C_4cMono_OTHERS,      
      _4CSP: TEXT_PAPER_TYPE_1C_4cMonoSP_OTHERS ,
      _4C: TEXT_PAPER_TYPE_4C_4cMono_OTHERS
    } 
  },
  B5: {
    name: "B5", 
    textPaperTypes: {
      _1C: TEXT_PAPER_TYPE_1C_4cMonoSP_OTHERS,
      _4C_MONO: TEXT_PAPER_TYPE_4C_4cMono_OTHERS,      
      _4CSP: TEXT_PAPER_TYPE_1C_4cMonoSP_OTHERS,
      _4C: TEXT_PAPER_TYPE_4C_4cMono_OTHERS
    } 
  },
  A4: {
    name: "A4", 
    textPaperTypes: {
      _1C: TEXT_PAPER_TYPE_1C_4cMonoSP_OTHERS,
      _4C_MONO: TEXT_PAPER_TYPE_4C_4cMono_OTHERS,
      _4CSP: TEXT_PAPER_TYPE_1C_4cMonoSP_OTHERS,
      _4C: TEXT_PAPER_TYPE_4C_4cMono_OTHERS
    } 
  },
  stdPaperback: {
    name: "新書版", 
    textPaperTypes: {
      _1C: TEXT_PAPER_TYPE_1C_4cMonoSP_OTHERS,
      _4C_MONO: TEXT_PAPER_TYPE_4C_4cMono_OTHERS,      
      _4CSP: TEXT_PAPER_TYPE_1C_4cMonoSP_OTHERS,
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
      _4CSP: TEXT_PAPER_TYPE_1C_4cMonoSP_OTHERS,
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
      _4CSP: TEXT_PAPER_TYPES_1C_4cMonoSP_CustomSizeSmLg,
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
      _4CSP: TEXT_PAPER_TYPES_1C_4cMonoSP_CustomSizeSmLg,
      _4C: TEXT_PAPER_TYPE_4C_CustomSizeSmLg
    },
    customTrimSizeRange: {
      height: [149, 297],
      width: [149, 210]
    }
  }
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
    default: throw new Error("error...");
  }
};

// 本体
const Example = () => {
  // 初期値
  const initState = {
    trimSize: { id: "B5",
                name: "B5", 
                customTrimSize: { height: null, width: null },
    },
  };

  // 状態
  const [state,  dispatch] = useReducer(handleRreducer, initState);
  console.log(state);

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

  // 新書版・文庫版・変形サイズ入力
  const handleCustomTrimSize = (e) => {
    const isHeight = e.target.selectedOptions[0].dataset.name === "height";
    dispatch({
      item: "trimSize",
      payload: {
        key: state.trimSize.id,
        name: state.trimSize.name,
        customTrimSize: { ...state.trimSize.customTrimSize, [isHeight ? 'height' : 'width']: e.target.value },
      }
    });
  };

  // サイズ変更時にcustomTrimSizeをリセットするためのuseEffect
  useEffect(() => {
    // 特定のサイズが選択されたときのみリセット
    if (["stdPaperback", "pocketEdition", "customSizeSm", "customSizeLg"].includes(state.trimSize.id)) {
      dispatch({
        item: "trimSize",
        payload: {
          key: state.trimSize.id,
          name: state.trimSize.name,
          customTrimSize: { height: null, width: null },
        },
      });
    }
  }, [state.trimSize.id]);  

  const renderCustomTrimSize = () => {
    const handleHeightWidthDiff = (trimSize) => {
      if (trimSize.customTrimSizeRange) {
        const range = trimSize.customTrimSizeRange;
        return {
          // 高の始点の値と差分
            startHeight: range.height[0], 
            heightDiff: range.height[1] - range.height[0] + 1, 
            // 幅の始点の値と差分
            startWidth: range.width[0], 
            widthDiff: range.width[1] - range.width[0] + 1, 
        };
      } else {
        return {
          startHeight: null,
          heightDiff: null,
          startWidth: null,
          widthDiff: null
        };
      }
    };

    const customTrimSize = TRIM_SIZES_TYPES_RANGE[state.trimSize.id];
    const { startHeight, heightDiff, startWidth, widthDiff } = handleHeightWidthDiff(customTrimSize);

    const createRangeArr = (start, diff) => {
      if (start === null && diff === null) {
        return ["---"];
      }
      return Array(diff).fill().reduce((acc, _, idx) => {
        acc.push(start + idx);
        return acc;
      }, ["---"]);  
    };

    const HEIGHT_RANGE = createRangeArr(startHeight, heightDiff);
    const WIDTH_RANGE = createRangeArr(startWidth, widthDiff);

    return (
      <label className="custom-size-input-value-wrapper">
        <div>
          <span>高さ:&nbsp;</span>
          <select
            id={state.trimSize.id}
            name={state.trimSize.name}
            value={ state.trimSize.customTrimSize.height ?? "---" }
            onChange={handleCustomTrimSize}
          >
          { 
            HEIGHT_RANGE.map((pageNum) => {
              return(
                <option key={pageNum} data-name="height" value={pageNum}>{pageNum}</option>
              )
            }) 
          }          
          </select>
          <span>mm</span>
        </div>
        <div>×</div>
        <div>
          <span>幅:&nbsp;</span>
          <select
            id={state.trimSize.id}          
            name={state.trimSize.name}
            value={ state.trimSize.customTrimSize.width ?? "---" }      
            onChange={handleCustomTrimSize}
          >
          { 
            WIDTH_RANGE.map((pageNum) => { 
              return(
                <option key={pageNum} data-name="width" value={pageNum}>{pageNum}</option>
              )
            }) 
          }  
          </select>
          <span>mm</span>
        </div>
      </label>      
    )
  };

  return (
    <div className="calc">
      {/* 冊子のサイズ */}
      <div className="calc__item-wrapper trim_size">
        <div className="calc__entry">
          冊子のサイズ<span>※</span>
        </div>
        <div className="calc__content-inner">
          {
            Object.entries(TRIM_SIZES_TYPES_RANGE).map(([key, item]) => {
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

      <div className="calc__item-wrapper custom_size">
        <div className="calc__entry">
          新書版・文庫版・変形サイズ入力<span>※</span>
        </div>        
        <div className="calc__content-inner">
          {renderCustomTrimSize()}
        </div>
          {
            state.trimSize.name === "新書版" && (
              <>
                <div>基本サイズ：高&nbsp;176&ensp;×&ensp;幅&nbsp;103mm&ensp;または、高&nbsp;182&ensp;×&ensp;幅&nbsp;112mm</div>
                <div>可能範囲：［高&nbsp;172～192mm］&ensp;×&ensp;［幅&nbsp;103～138mm］</div>
              </>
            )
          }
          {
            state.trimSize.name === "文庫版" && (
              <>
                <div>基本サイズ：高&nbsp;148～152mm&ensp;×&ensp;幅&nbsp;105mm</div>
                <div>可能範囲：［高&nbsp;138～152mm］&ensp;×&ensp;［幅&nbsp;103～115mm］</div>
              </>
            )
          }
          {
            state.trimSize.name === "変形サイズ（小）" && (
              <div>可能範囲：［高&nbsp;105～210mm］&ensp;×&ensp;［幅&nbsp;90～148mm］</div>
            )
          }
          {
            state.trimSize.name === "変形サイズ（大）" && (
              <div>可能範囲：［高&nbsp;149～297mm］&ensp;×&ensp;［幅&nbsp;149～210mm］</div>
            )
          }
      </div>     
    </div>
  );
};

export default Example;
