import { useReducer, useEffect } from "react";

import Example from './parts/Example.jsx'


// 本文の種類
// オブジェクトを整理して配列に変換する関数
const corectPaperTypeToArr = (hash) => {
  const arr = Object.entries(hash).reduce((acc, item) => {
    acc.push(item[1]);
    return acc;
  }, []);
  return arr;
};

// 版型ごとに使用できる紙の種類を配列で格納。
// 本文の全ての種類を参考のために置いておく
// const TEXT_PAPER_TYPE = { 
//   1: "上質 70kg", 
//   2: "上質 90kg", 
//   3: "上質 55kg", 
//   4: "コート 110kg", 
//   5: "マットコート 90kg", 
//   6: "書籍用紙 72.5kg（淡クリームキンマリ）", 
//   7: "書籍用紙 90kg（淡クリームキンマリ）", 
//   8: "書籍用紙 57kg（淡クリームキンマリ）", 
//   9: "ラフクリーム琥珀 71.5kg" 
// };

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

// 本文印刷方法
const TEXT_PRINTING_METHOD = { 
  _1C: "モノクロ印刷", 
  _4C_MONO: "カラー・モノクロ混在印刷", 
  _4C_MONO_SP: "カラー・モノクロ混在印刷お得ver.", 
  _4C: "フルカラー印刷" 
};

// 印刷部数
const printQuantityArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
for (let i = 10; i <= 2000; i += 5) {
  printQuantityArr.push(i);
}

// ページ数
const pageCountArr = [0, 4, 8];
for (let i = 10; i <= 500; i += 2) {
  pageCountArr.push(i);
}

// 製本方法
const BINDING_METHOD = ["無線とじ製本", "中とじ製本"];

// 表紙の印刷方法（度数）
const COVER_PRINTING_METHOD = { mono: "モノクロ印刷", color: "フルカラー印刷" };

// 表紙で使用可能な用紙種 1C（K）
const COVER_PAPER_TYPES_PRINTED_1C = [
  { group: "上質・色上質・色ファンシー",
    types: ["上質 180kg", "色上質最厚口", "レザック 175kg"] },
  { group: "特殊紙 その他",
    types: ["OKカイゼル 白 155kg", "しこくてんれい ゆき 180kg", "両更クラフト紙 129.5kg"] }
];

// 表紙で使用可能な用紙種類 4C
const COVER_PAPER_TYPES_PRINTED_4C = [
  { group: "上質・色上質・色ファンシー",
    types: ["上質 180kg", "色上質最厚口", "レザック 175kg"] },
  { group: "艶ありコート・アート・キャスト",
    types: ["コート紙 180kg", "アートポスト紙 200kg", "ミラーコート紙 220kg"] },
  { group: "艶なしマットコート・ダル",
    types: ["マットコート紙 135kg", "サテン金藤 180kg", "マットポスト紙 220kg"] },
  { group: "ラフ・エンボス",
    types: ["アラベール スノーホワイト 160kg", "アラベール ナチュラル 160kg", "マーメイド スノーホワイト 175kg"] },
  { group: "特殊紙 パール・シャイン・ラメ",
    types: ["ペルーラ スノーホワイト 180kg", "ミランダ スノーホワイト 170kg", "五感紙粗目 純白キラ 135kg", "新星物語 パウダー 180kg", "エスプリコートVNエンボス アラレ 176.5kg"] },
  { group: "特殊紙 その他",
    types: ["OKカイゼル 白 155kg", "しこくてんれい ゆき 180kg", "レザック82 ろうけつ 白 175kg", "両更クラフト紙 129.5kg"] }
];

// 表紙の用紙種類
const COVER_PAPER_TYPES_GROUP = {
  mono: { coverPaperTypes: COVER_PAPER_TYPES_PRINTED_1C },
  color: { coverPaperTypes: COVER_PAPER_TYPES_PRINTED_4C }
};

// コーティング加工が可能な用紙
const COATING_PROCESS_AVAILABLE = [
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

const ppProcessingTypes = ["クリアPP", "マットPP"];

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
    default: throw new Error("error...");
  }
};

// 本体
const AutoCalc = () => {
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
    coverPrintingMethod: { id: "null", name: null },
    coverPaperType: { name: null },    
  };

  // 状態
  const [state,  dispatch] = useReducer(handleRreducer, initState);
  // console.log(state);

  // 冊子サイズ、本文の印刷方法の選択を変更した場合、
  // 選択している使用本文用紙の種類が選択肢になければ、
  // 使用本文用紙のstateをnullに変更する。
  useEffect(() => {
    const textPaperTypeSelctOptions = TRIM_SIZES_TYPES_RANGE[state.trimSize.id]?.textPaperTypes[state.textPrintingMethod.id];
    // 特定のサイズが選択されたときのみリセット
    if (!textPaperTypeSelctOptions?.includes(state.textPaperType.name)) {
      dispatch({
        item: "textPaperType",
        payload: { name: null },
      });
    }
  }, [state.trimSize.id, 
      state.textPrintingMethod.id, 
      state.textPaperType.name, 
      dispatch
  ]);  
  
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

  // 新書、文庫、変形（大）（小）のサイズを持った配列の生成
  const collectedCustomTrimSizeArr = () => {
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

    // stateに版型のidが登録されていれば、それを変数に格納し、
    const customTrimSize = TRIM_SIZES_TYPES_RANGE[state.trimSize.id];
    // 高さ、幅の始点と差分をオブジェクトにまとめる。
    const { startHeight, heightDiff, startWidth, widthDiff } = handleHeightWidthDiff(customTrimSize);

    // select要素に入れるoptionの値が入った配列を生成する。
    const createRangeArr = (start, diff) => {
      if (start === null && diff === null) {
        return ["---"];
      }
      return Array(diff).fill().reduce((acc, _, idx) => {
        acc.push(start + idx);
        return acc;
      }, ["---"]);  
    };

    const HEIGHT_RANGE_ARR = createRangeArr(startHeight, heightDiff);
    const WIDTH_RANGE_ARR = createRangeArr(startWidth, widthDiff);

    // この関数が発火したら、select要素に入れるoptionの値が入った配列を返す。
    return [HEIGHT_RANGE_ARR, WIDTH_RANGE_ARR];
  };
  
  // 本文の種類  
  const handleTextPaperType = (e) => {
    dispatch({
      item: "textPaperType",
      payload: { name: e.target.name }
    });
  };

  // 本文の印刷方法  
  const handleTextPrintingMethod = (e) => {
    const key = e.target.selectedOptions[0].dataset.key;
    dispatch({
      item: "textPrintingMethod",
      payload: { key: key, name: e.target.value }
    });
  };  

  // 印刷部数
  const handlePrintQuantity = (e) => {
    dispatch({
      item: "printQuantity",
      payload: { name: e.target.name, value: e.target.value }
    });
  };

  // ページ数
  const handlePageCount = (e) => {
    dispatch({
      item: "pageCount",
      payload: { name: e.target.name, value: e.target.value }
    });
  };

  // カラー・ページ数  
  const handleColorPageCount = (e) => {
    dispatch({
      item: "colorPageCount",
      payload: { name: "colorPageCount", value: e.target.value }
    });
  }; 

  // 製本の方法
  const handleBindingMethod = (e) => {
    dispatch({
      item: "bindingMethod",
      payload: { name: e.target.name }
    });
  };

  // 表紙の印刷方法
  const handleCoverPrintingMethod = (e) => {
    dispatch({
      item: "coverPrintingMethod",
      payload: { key: e.target.id, name: e.target.name }
    });
  };
  
  // 表紙の種類
  const handleCoverPaperType = (type) => {
    dispatch({
      item: "coverPaperType",
      payload: { name: type }  // 納得いってないが、クリックしたラジオボタンのtypeをstateにセットさせる。
    });
  };    

  // PP加工関連
  // 選択したキーに紐づく使用可能な紙のタイプSELECTED_COVER_PAPER_TYPESの中にstatetypenameがあれば表示させる作戦
  const RECENT_COLOR = COVER_PAPER_TYPES_GROUP[state.coverPrintingMethod.id];
  const SELECTED_COVER_PAPER_TYPES = RECENT_COLOR 
    ? RECENT_COLOR.coverPaperTypes.reduce((acc, hash) => {
        acc.push(hash.types);
        return acc;
      }, []).flat()
    : [];
  const putAvilablePPMark = (type) => {
    return COATING_PROCESS_AVAILABLE.includes(type);
  };  

  // 製本の方法
  const renderBindingMethodOptions = () => {
    const pageCount = state.pageCount;
    let methods;
    let defaultMethod;

    if (pageCount >= 25 
        || state.trimSize.name === "A6"
        || state.trimSize.name === "B6"
        || state.trimSize.name === "文庫版"
        || state.trimSize.name === "変形サイズ（小）"
        || state.trimSize.name === "変形サイズ（大）") {
      methods = [BINDING_METHOD[0]];
      defaultMethod = BINDING_METHOD[0];
    } else if (pageCount >= 14 && pageCount <= 24) {
      methods = BINDING_METHOD;
      defaultMethod = null; // 状態管理で制御
    } else if (pageCount <= 13) {
      methods = [BINDING_METHOD[1]];
      defaultMethod = BINDING_METHOD[1];
    }

    useEffect(() => {
      if (defaultMethod) {
        dispatch({
          item: "bindingMethod",
          payload: { name: defaultMethod }
        });
      }
    }, [defaultMethod, dispatch]);

    return methods;
  };

  // フルカラー印刷を選択すると『count』を返し、
  // 『count』がある場合は、uesEffectで状態を処理する。
  useEffect(() => {
    if (state.textPrintingMethod.name === "フルカラー印刷" && state.pageCount) {
      dispatch({
        item: "colorPageCount",
        payload: { name: "colorPageCount", value: state.pageCount }
      });
    } else if (state.colorPageCount !== 0) {
      // フルカラー印刷から他の印刷方法に切り替えたときに colorPageCount をリセット
      dispatch({
        item: "colorPageCount",
        payload: { name: "colorPageCount", value: 0 }
      });
    }
  }, [state.textPrintingMethod.name, dispatch]); 

  // カラーページ数
  const renderColorPageCountSelector = () => {
    let count = state.pageCount;
    const _4cMonoCount = count - 1;
    const _4cMonoSpCount = Math.floor(count / 2);
    const makeCountArr = (argCount) => {
      if (argCount <= 0) return []; // ===演算子ではダメみたい。
      return Array(argCount).fill().reduce((acc, _, idx) => {
        acc.push(idx + 1);
        return acc;
      }, [0]);
    };
    const colorPageCountArr = state.textPrintingMethod.name === "カラー・モノクロ混在印刷" || state.textPrintingMethod.name === "カラー・モノクロ混在印刷お得ver."
      ? state.textPrintingMethod.name === "カラー・モノクロ混在印刷"
        ? makeCountArr(_4cMonoCount)
        : makeCountArr(_4cMonoSpCount)
      : state.textPrintingMethod.name === "フルカラー印刷"
        ? [count]
        : null ;

    return colorPageCountArr;
  };

  const handleProcesePP = () => {};

  // とりあえずダミーの関数
  const dummyFunc = (e) => {
  };

  return (
    <>
      {/* <Example /> */}

      <hr />
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

        {/* 新書版・文庫版・変形サイズ（大）（小）入力 */}
        <div className="calc__item-wrapper custom_size">
          <div className="calc__entry">
            新書版・文庫版・変形サイズ入力<span>※</span>
          </div>        
          <div className="calc__content-inner">
            <label className="custom-size-input-value-wrapper">
              <div>
                <span>高さ:&nbsp;</span>
                <select
                  id={state.trimSize.id}
                  name={state.trimSize.name}
                  value={state.trimSize.customTrimSize.height ?? "---"}
                  onChange={handleCustomTrimSize}
                >
                { 
                  collectedCustomTrimSizeArr()[0].map((pageNum) => {
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
                  collectedCustomTrimSizeArr()[1].map((pageNum) => { 
                    return(
                      <option key={pageNum} data-name="width" value={pageNum}>{pageNum}</option>
                    )
                  }) 
                }  
                </select>
                <span>mm</span>
              </div>
            </label>
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

        {/* 本文の印刷方法 */}
        {/* 方法によって可変するテキストが入る */}
        <div className="calc__item-wrapper text_printing_method">
          <div className="calc__entry">
            本文の印刷方法<span>※</span>
          </div>   
          <div className="calc__content-inner">
            <label>
              <select
                name="textPrintingMethod"
                value={state.textPrintingMethod.name}
                onChange={handleTextPrintingMethod}
              >
                { Object.entries(TEXT_PRINTING_METHOD).map(([key, method]) => { 
                  return(
                    <option data-key={key} key={key} value={method}>{method}</option>
                  )
                }) }
              </select>
            </label>          
            {/* カラー・モノクロ混在印刷 */}
              {/* 「カラーページのご指定」欄に何ページ目がカラー印刷になるかデータのページ数で明記して下さい。 */}
              {/* ページ数のご指定方法はコチラでご確認ください。 */}
            {/* カラー・モノクロ混在印刷お得ver. */}
              {/* お得ver.は、カラーページ数が総ページ数の半分以下で、カラーページが巻頭か巻末かで全て連続しているものに限ります。（例：総ページ数80p 内カラーページ8p&emsp;巻頭カラー 1～8P,モノクロ 9～80P） */}
              {/* カラー・モノクロ混在印刷のデータ作成についての注意点はコチラでご確認ください。 */}
          </div>       
        </div>        

        {/* 本文の種類 */}
        {/* 論理 AND 演算子『&&』は、左側が true の場合のみ右側の処理を実行する。 */}
        {/* つまり、state.trimSize.idが『真』であれば、右辺のコードを実行する */}
        {/* ?. は「オプショナルチェーン」演算子で、指定したプロパティが存在する場合のみ次の操作に進む。 */}
        <div className="calc__item-wrapper text_paper_type">
          <div className="calc__entry">
            本文の種類<span>※</span>
          </div>
          <div className="calc__content-inner set-flex">
            {
              state.trimSize.id &&
                Object.values(
                  TRIM_SIZES_TYPES_RANGE[state.trimSize.id]?.textPaperTypes[state.textPrintingMethod.id] || {})
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

        {/* 印刷部数 */}
        <div className="calc__item-wrapper print_quantity">
          <div className="calc__entry">
            印刷部数<span>※</span>
          </div>   
          <div className="calc__content-inner">
            <select
              name="printQuantity"
              value={state.printQuantity}
              onChange={handlePrintQuantity}
            >
              { printQuantityArr.map((num) => { 
                return (
                  <option key={num} value={num}>{num}</option> 
                ) 
              })}
            </select>
          </div>       
        </div>

        {/* ページ数 */}
        <div className="calc__item-wrapper page_count">
          <div className="calc__entry">
            ページ数<span>※</span>
          </div>   
          <div className="calc__content-inner">
            <label htmlFor="">
              <select
                name="pageCount"
                value={state.pageCount}
                onChange={handlePageCount}
              >
                { pageCountArr.map((num) => { 
                  return(
                    <option key={num} value={num}>{num}</option> 
                  )
                })}
              </select>
            </label>
            <ul className="note">
              <li>表紙（表1・2・3・4）を除く本文のページ数</li>
            </ul>

            <div>
              <label>
                <select name="colorPageCount" value={state.colorPageCount} onChange={handleColorPageCount}>
                  {
                    renderColorPageCountSelector()?.map((num) => (
                      <option key={num} value={num}>{num}</option>)
                    )
                  }
                </select>
              </label> 
              <ul className="note">
                <li>内カラーページ数</li>
              </ul>
            </div>
            <ul className="note">
              <li>片面印刷をご希望の方は、下部のオプション加工を選択して下さい。</li>
            </ul>
          </div> 
        </div>

        {/* 製本方法 */}
        <div className="calc__item-wrapper binding_method">
          <div className="calc__entry">
            製本方法<span>※</span>
          </div>   
          <div className="calc__content-inner">
            {
              renderBindingMethodOptions()?.map((method) => {
                return (
                  <label htmlFor={method} key={method}>
                    <input
                      id={method}
                      type="radio"
                      name={method}
                      checked={state.bindingMethod === method}
                      onChange={handleBindingMethod}
                    />
                    {method}
                  </label>            
                )
              })
            }
          </div>
          <ul>
            <li>中とじ製本は4から24ページのみ対応可能です。</li>
            <li>A6、B6、新書、文庫、変形サイズはくるみ製本のみ対応可能</li>
            <li>くるみ製本は14ページ以上から対応可能</li>
          </ul>               
        </div>

        {/* 表紙の印刷方法 */}
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
          <ul className="note">
            <li>表2・表3に印刷をご希望の場合は、下記のオプション加工をお選び下さい。</li>
            <li>表表紙（表1）の裏側を表2、裏表紙(表4)の内側を表3と呼びます。</li>
          </ul>     
        </div>

        {/* 表紙の種類（印刷方法） */}
        <div className="calc__item-wrapper cover_paper_type">
          <div className="calc__entry">
            表紙の種類（印刷方法）<span>※</span>
          </div>
          <div className="calc__content-inner">
            {
              state.coverPrintingMethod.id &&
              COVER_PAPER_TYPES_GROUP[state.coverPrintingMethod.id]?.coverPaperTypes.map((item) => {
                return (
                  <div key={item.group}>
                    <h3>{item.group}</h3>
                    <div className="set-flex">
                      {
                        item.types.map((type) => {
                          return (
                            <label htmlFor={type} key={type}>
                              <input 
                                id={type}
                                type="radio" 
                                name="coverPaperType"  // 全てのラジオボタンで共通のname属性にする
                                checked={state.coverPaperType.name === type}
                                onChange={() => handleCoverPaperType(type)}  // typeを引数に渡す
                              />
                              {putAvilablePPMark(type) ? `${type}★` : `${type}`}
                            </label>
                          )
                        })
                      }
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>   

        {/* オプション加工 */}
        <div className="calc__item-wrapper optional_finishing">
          <div className="calc__entry">
            オプション加工<span>※</span>
          </div>   
          <div className="calc__content-inner">
            {
              COATING_PROCESS_AVAILABLE.includes(state.coverPaperType.name) &&
                <section>
                  <label htmlFor="">
                    <input type="checkbox" id="" value="" onClick={handleProcesePP} />
                    表紙・PP加工（クリアPP）
                  </label>
                  <ul className="note">
                    <li><a href="" target="_blank">「PP加工をされる際の注意点」をご覧ください。</a></li>
                    <li>表表紙（表1）の裏側を表2<br />裏表紙（表4）の内側を表3と呼びます。</li>
                  </ul>
                </section>
            }
            <section>
              <label htmlFor="">
                <input type="checkbox" id="" value="" onChange={dummyFunc} />
                遊び紙（合紙）挿入
              </label>
              <label htmlFor="">
                <input type="checkbox" id="" value="" onChange={dummyFunc} />
                遊び紙に印刷がある場合は、こちらにチェックを入れてください。
              </label>
              <label htmlFor="">
                枚数：<input type="text" id="" value="" onChange={dummyFunc} />枚
              </label>
              <input type="text" value="" onChange={dummyFunc} />
              <button type="button" onClick={dummyFunc} >用紙・色 選択</button>
              <div>遊び紙への印刷ページを記入して下さい。（データのページ数）</div>
              <input type="text" value="" onChange={dummyFunc} />
              <ul className="note example">
                <li>（例：本文の前後とp30-31の間⇒前,30-31,後 [挿入枚数3枚]）</li>
                <li>（P10と11の間、本文p34と35の間⇒10-11,34-35 [挿入枚数2枚]）</li>
              </ul>
            </section>
            <section>
              <label htmlFor="">
                <input type="checkbox" id="" value="" onChange={dummyFunc} />
                表2・3&nbsp;モノクロ印刷
              </label>
              <label htmlFor="">
                <input type="checkbox" id="" value="" onChange={dummyFunc} />
                表2・3&nbsp;フルカラー印刷
              </label>
              <label htmlFor="">
                <input type="checkbox" id="" value="" onChange={dummyFunc} />
                本文片面印刷
              </label>
            </section>
            <section>
              <label htmlFor="">
                <input type="checkbox" id="" value="" onChange={dummyFunc} />
                表紙データ自動塗り足し追加
              </label>
              <label htmlFor="">
                <input type="checkbox" id="" value="" onChange={dummyFunc} />
                本文データ自動塗り足し追加
              </label>
              <ul className="note">
                <li>※必ず<a href="" onClick={dummyFunc}>「自動塗り足し追加サービスの注意点」</a>をご確認・ご了承の上ご注文ください。</li>
              </ul>
            </section>
            <section>
              <label htmlFor="">
                <input type="checkbox" id="" value="" onChange={dummyFunc} />
                分納
              </label>
              <div>納品箇所数：</div>
              <select name="">
                <option value="">1</option>
                <option value="">2</option>
                <option value="">3</option>
                <option value="">4</option>
                <option value="">5</option>
              </select>
              <label htmlFor="">
                <input type="checkbox" id="" value="" onChange={dummyFunc} />
                横綴じ製本
              </label>
              <label htmlFor="">
                <input type="checkbox" id="" value="" onChange={dummyFunc} />
                紙版原稿（紙版原稿入稿選択時は自動選択）
              </label>
              <label htmlFor="">
                <input type="checkbox" id="" value="" onChange={dummyFunc} />
                Word（ワード）入稿（Word入稿選択時は自動選択）
              </label>
            </section>
          </div>       
        </div>
      </div>

      <div>
        <button name="" type="submit" onClick={dummyFunc} >お見積もり</button>
        <button name="" type="reset" >リセット</button>
      </div>
    </>
  );
};

export default AutoCalc;