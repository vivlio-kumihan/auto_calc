import { useReducer } from "react";

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
// const TEXT_PAPER_TYPE = { 1: "上質 70kg", 2: "上質 90kg", 3: "上質 55kg", 4: "コート 110kg", 5: "マットコート 90kg", 6: "書籍用紙 72.5kg（淡クリームキンマリ）", 7: "書籍用紙 90kg（淡クリームキンマリ）", 8: "書籍用紙 57kg（淡クリームキンマリ）", 9: "ラフクリーム琥珀 71.5kg" };
const BASIC_TEXT_PAPER_TYPE = { 1: "上質 70kg", 2: "上質 90kg", 6: "書籍用紙 72.5kg（淡クリームキンマリ）", 7: "書籍用紙 90kg（淡クリームキンマリ）" };
// 本文：モノクロ
// 本文：モノクロ, A6, 文庫版
const TEXT_PAPER_TYPE_1C_A6_POCKETEDITION = corectPaperTypeToArr(
  { ...BASIC_TEXT_PAPER_TYPE, 3: "上質 55kg", 8: "書籍用紙 57kg（淡クリームキンマリ）", 9: "ラフクリーム琥珀 71.5kg" }
);
// 本文：モノクロ, 変形サイズ（小）（大）
const TEXT_PAPER_TYPES_1C_CUSTOMSIZE_SM_LG = corectPaperTypeToArr(
  { ...BASIC_TEXT_PAPER_TYPE }
);
// 本文：モノクロ, B6, A5, B5, A4, 新書版
const TEXT_PAPER_TYPES_1C_OTHERS = corectPaperTypeToArr(
  { ...BASIC_TEXT_PAPER_TYPE, 9: "ラフクリーム琥珀 71.5kg" }
);

// 本文：カラー, カラー・モノクロ混在
// 本文：カラー, A6, B6, A5, B5, A4, 新書版, 文庫版
const TEXT_PAPER_TYPE_4C_OTHERS = corectPaperTypeToArr(
  { ...BASIC_TEXT_PAPER_TYPE, 4: "コート 110kg", 5: "マットコート 90kg",  9: "ラフクリーム琥珀 71.5kg" }
);
// 本文：カラー, 変形サイズ（小）（大）
const TEXT_PAPER_TYPE_4C_CUSTOMSIZE_SM_LG = corectPaperTypeToArr(
  { ...BASIC_TEXT_PAPER_TYPE, 4: "コート 110kg", 5: "マットコート 90kg" }
);

// 本文：カラー・モノクロ混在・お得
// 本文：カラー・モノクロ混在・お得, A6, B6, A5, B5, A4, 新書版, 文庫版
const TEXT_PAPER_TYPE_4C_OTHERS_SPECIAL = corectPaperTypeToArr(
  { ...BASIC_TEXT_PAPER_TYPE, 9: "ラフクリーム琥珀 71.5kg" }
);
// 本文：カラー・お得, 変形サイズ（小）（大）
const TEXT_PAPER_TYPE_4C_CUSTOMSIZE_SM_LG_4C_SPECIAL = corectPaperTypeToArr(
  { ...BASIC_TEXT_PAPER_TYPE }
);

// 冊子のサイズと対応する用紙の種類
const TRIM_SIZES_TYPES = {
  A6: {
    name: "A6", 
    textPaperTypes: {
      _1C: TEXT_PAPER_TYPE_1C_A6_POCKETEDITION, 
      _4C_MONO: TEXT_PAPER_TYPE_4C_OTHERS,  
      _4CSP: TEXT_PAPER_TYPE_4C_OTHERS_SPECIAL,
      _4C: TEXT_PAPER_TYPE_4C_OTHERS,
    } 
  },
  B6: {
    name: "B6", 
    textPaperTypes: {
      _1C: TEXT_PAPER_TYPES_1C_OTHERS, 
      _4C_MONO: TEXT_PAPER_TYPE_4C_OTHERS,      
      _4CSP: TEXT_PAPER_TYPE_4C_OTHERS_SPECIAL,
      _4C: TEXT_PAPER_TYPE_4C_OTHERS, 
    } 
  },
  A5: {
    name: "A5", 
    textPaperTypes: {
      _1C: TEXT_PAPER_TYPES_1C_OTHERS,
      _4C_MONO: TEXT_PAPER_TYPE_4C_OTHERS,      
      _4CSP: TEXT_PAPER_TYPE_4C_OTHERS_SPECIAL ,
      _4C: TEXT_PAPER_TYPES_1C_OTHERS,
    } 
  },
  B5: {
    name: "B5", 
    textPaperTypes: {
      _1C: TEXT_PAPER_TYPES_1C_OTHERS,
      _4C_MONO: TEXT_PAPER_TYPE_4C_OTHERS,      
      _4CSP: TEXT_PAPER_TYPE_4C_OTHERS_SPECIAL,
      _4C: TEXT_PAPER_TYPE_4C_OTHERS,
    } 
  },
  A4: {
    name: "A4", 
    textPaperTypes: {
      _1C: TEXT_PAPER_TYPES_1C_OTHERS,
      _4C_MONO: TEXT_PAPER_TYPE_4C_OTHERS,
      _4CSP: TEXT_PAPER_TYPE_4C_OTHERS_SPECIAL,
      _4C: TEXT_PAPER_TYPE_4C_OTHERS
    } 
  },
  stdPaperback: {
    name: "新書版", 
    textPaperTypes: {
      _1C: TEXT_PAPER_TYPES_1C_OTHERS,
      _4C_MONO: TEXT_PAPER_TYPE_4C_OTHERS,      
      _4CSP: TEXT_PAPER_TYPE_4C_OTHERS_SPECIAL,
      _4C: TEXT_PAPER_TYPE_4C_OTHERS,
    } 
  },
  pocketEdition: {
    name: "文庫版", 
    textPaperTypes: {
      _1C: TEXT_PAPER_TYPE_1C_A6_POCKETEDITION,
      _4C_MONO: TEXT_PAPER_TYPE_4C_OTHERS,      
      _4CSP: TEXT_PAPER_TYPE_4C_OTHERS_SPECIAL,
      _4C: TEXT_PAPER_TYPE_4C_OTHERS,
    } 
  },
  customSizeSm: {
    name: "変形サイズ（小）", 
    textPaperTypes: {
      _1C: TEXT_PAPER_TYPES_1C_CUSTOMSIZE_SM_LG,
      _4C_MONO: TEXT_PAPER_TYPE_4C_CUSTOMSIZE_SM_LG,
      _4CSP: TEXT_PAPER_TYPE_4C_CUSTOMSIZE_SM_LG_4C_SPECIAL,
      _4C: TEXT_PAPER_TYPE_4C_CUSTOMSIZE_SM_LG,
    } 
  },
  customSizeLg: {
    name: "変形サイズ（大）", 
    textPaperTypes: {
      _1C: TEXT_PAPER_TYPES_1C_CUSTOMSIZE_SM_LG,
      _4C_MONO: TEXT_PAPER_TYPE_4C_CUSTOMSIZE_SM_LG,      
      _4CSP: TEXT_PAPER_TYPE_4C_CUSTOMSIZE_SM_LG_4C_SPECIAL,
      _4C: TEXT_PAPER_TYPE_4C_CUSTOMSIZE_SM_LG,
    } 
  }
};

const TEXT_PRINTING_METHOD = { _1C: "モノクロ印刷", _4C_MONO: "カラー・モノクロ混在印刷", _4CSP: "カラー・モノクロ混在印刷お得ver.", _4C: "フルカラー印刷" };

const handleRreducer = (prev, { item, payload }) => {
  const { key, name, value } = payload;
  switch (item) {
    case "trimSize": return { ...prev, trimSize: { id: key, name: name } };    
    case "textPaperType": return { ...prev, textPaperType: { name: name } };
    case "textPrintingMethod": return { ...prev, textPrintingMethod: { id: key, name: name } };
    default: throw new Error("error...");
  }
};

const Example = () => {
  const initState = {
    trimSize: { id: "A6", name: "A6"},
    textPaperType: {},
    textPrintingMethod: { id: "_1C", name: "モノクロ印刷" }
  };
  
  const [state, dispatch] = useReducer(handleRreducer, initState);
  console.log(state);

  // 冊子のサイズ
  const handleTrimSize = (e) => {
    dispatch({
      item: "trimSize",
      payload: { key: e.target.id, name: e.target.name }
    });
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
  
  return (
    <>
      <div className="calc">
        {/* 冊子のサイズ */}
        <div className="calc__item-wrapper trim_size">
          <div className="calc__entry">
            冊子のサイズ<span>※</span>
          </div>
          <div className="calc__content-inner">
            {
              Object.entries(TRIM_SIZES_TYPES).map(([key, item]) => {
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

        {/* 本文の印刷方法 */}
        {/* 方法によって可変するテキストが入る */}
        <div className="calc__item-wrapper text_printing_method">
          <div className="calc__entry">
            本文の印刷方法<span>※</span>
          </div>   
          <div className="calc__content-inner">
            <label htmlFor="">
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
            {/* 共通 */}
            <ul className="note">
              <li>※本文で高彩度印刷をお選び頂いた場合で表紙もカラーを選択される場合、自動的に表紙も高彩度印刷になります。</li>
            </ul> 
            {/* カラー・モノクロ混在印刷 */}
              {/* ※「カラーページのご指定」欄に何ページ目がカラー印刷になるかデータのページ数で明記して下さい。 */}
              {/* ページ数のご指定方法はコチラ */}
            {/* カラー・モノクロ混在印刷お得ver. */}
              {/* ※お得ver.は、カラーページ数が総ページ数の半分以下で、カラーページが巻頭か巻末かで全て連続しているものに限ります。（例：総ページ数80p 内カラーページ8p&emsp;巻頭カラー 1～8P,モノクロ 9～80P） */}
              {/* ※カラー・モノクロ混在印刷のデータ作成についての注意点をこちらでご確認ください。 */}
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
          <div className="calc__content-inner">
            {
              state.trimSize.id &&
                Object.values(
                  TRIM_SIZES_TYPES[state.trimSize.id]?.textPaperTypes[state.textPrintingMethod.id] || {})
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
      </div>
      <hr />
    </>
  );
};

export default Example;