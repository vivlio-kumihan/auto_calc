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
const Example = () => {
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
  console.log(state);

  // 選択したキーに紐づく使用可能な紙のタイプ
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

  return (
    <>
      <hr />
      <div className="calc">
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
                              {
                                putAvilablePPMark(type) 
                                ? `${type}★` 
                                : `${type}`
                              }
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
      </div>
    </>
  );
};

export default Example;