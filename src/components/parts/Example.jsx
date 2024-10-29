import { useReducer } from "react";

// 本文の全ての種類
const TEXT_PAPER_TYPE = {
  _1_highQualityPaper_70kg: "上質 70kg",
  _2_highQualityPaper_90kg: "上質 90kg",
  _3_highQualityPaper_55kg: "上質 55kg",
  _4_coatedPaper_110kg: "コート 110kg",
  _5_matteCoatePaper_90kg: "マットコート 90kg",
  _6_bookPaper_72dot5kg: "書籍用紙 72.5kg（淡クリームキンマリ）",
  _7_bookPaper_90kg: "書籍用紙 90kg（淡クリームキンマリ）",
  _8_bookPaper_57kg: "書籍用紙 57kg（淡クリームキンマリ）",
  _9_roughCreamPaper_71dot5kg: "ラフクリーム琥珀 71.5kg",
};
// 版型それぞれに使用できる用紙の種類を生成する。
function geneTextPaperType(obj,
  items) {
  return items.reduce((newObj, key) => {
    if (obj[key] !== undefined) {
      newObj[key] = obj[key];
    }
    return newObj;
  }, {});
}
// A6
const caseA6 = geneTextPaperType(
  TEXT_PAPER_TYPE,
  [
    "_1_highQualityPaper_70kg",
    "_2_highQualityPaper_90kg",
    "_3_highQualityPaper_55kg",
    "_6_bookPaper_72dot5kg",
    "_7_bookPaper_90kg",
    "_8_bookPaper_57kg",
    "_9_roughCreamPaper_71dot5kg",
  ]);
// B6
const caseB6 = geneTextPaperType(
  TEXT_PAPER_TYPE,
  [
    "_1_highQualityPaper_70kg",
    "_2_highQualityPaper_90kg",
    "_6_bookPaper_72dot5kg",
    "_7_bookPaper_90kg",
    "_9_roughCreamPaper_71dot5kg",
  ]);
// A5
const caseA5 = geneTextPaperType(
  TEXT_PAPER_TYPE,
  [
    "_1_highQualityPaper_70kg",
    "_2_highQualityPaper_90kg",
    "_6_bookPaper_72dot5kg",
    "_7_bookPaper_90kg",
    "_9_roughCreamPaper_71dot5kg",
  ]);
// B5
const caseB5 = geneTextPaperType(
  TEXT_PAPER_TYPE,
  [
    "_1_highQualityPaper_70kg",
    "_2_highQualityPaper_90kg",
    "_6_bookPaper_72dot5kg",
    "_7_bookPaper_90kg",
    "_9_roughCreamPaper_71dot5kg",
  ]);
// A4
const caseA4 = geneTextPaperType(
  TEXT_PAPER_TYPE,
  [
    "_1_highQualityPaper_70kg",
    "_2_highQualityPaper_90kg",
    "_6_bookPaper_72dot5kg",
    "_7_bookPaper_90kg",
    "_9_roughCreamPaper_71dot5kg",
  ]);
// 新書版
const caseStdPaperback = geneTextPaperType(
  TEXT_PAPER_TYPE,
  [
    "_1_highQualityPaper_70kg",
    "_2_highQualityPaper_90kg",
    "_6_bookPaper_72dot5kg",
    "_7_bookPaper_90kg",
    "_9_roughCreamPaper_71dot5kg",
  ]);
// 文庫版
const casePocketEdition = geneTextPaperType(
  TEXT_PAPER_TYPE,
  [
    "_1_highQualityPaper_70kg",
    "_2_highQualityPaper_90kg",
    "_3_highQualityPaper_55kg",
    "_6_bookPaper_72dot5kg",
    "_7_bookPaper_90kg",
    "_8_bookPaper_57kg",
    "_9_roughCreamPaper_71dot5kg",
  ]);
// 変形サイズ（小）
const caseCustomSizeSm = geneTextPaperType(
  TEXT_PAPER_TYPE,
  [
    "_1_highQualityPaper_70kg",
    "_2_highQualityPaper_90kg",
    "_6_bookPaper_72dot5kg",
    "_7_bookPaper_90kg",
  ]);
// 変形サイズ（大）
const caseCustomSizeLg = geneTextPaperType(
  TEXT_PAPER_TYPE,
  [
    "_1_highQualityPaper_70kg",
    "_2_highQualityPaper_90kg",
    "_6_bookPaper_72dot5kg",
    "_7_bookPaper_90kg",
  ]);
  
// 冊子のサイズと対応する用紙の種類
const TRIM_SIZES_TYPE = { 
  A6: { name: "A6", paper_type: caseA6 },
  B6: { name: "B6", paper_type: caseB6 },
  A5: { name: "A5", paper_type: caseA5 },
  B5: { name: "B5", paper_type: caseB5 },
  A4: { name: "A4", paper_type: caseA4 },
  stdPaperback: { name: "新書版", paper_type: caseStdPaperback },
  pocketEdition: { name: "文庫版", paper_type: casePocketEdition },
  customSizeSm: { name: "変形サイズ（小）", paper_type: caseCustomSizeSm },
  customSizeLg: { name: "変形サイズ（大）", paper_type: caseCustomSizeLg },
};

const handleRreducer = (prev, { item, payload }) => {
  const { name, value } = payload;
  switch (item) {
    case "trimSize": return { ...prev, trimSize: { name: value } };    
    case "textPaperType": return { ...prev, textPaperType: { name: name, value: value } };
    default: throw new Error("error...");
  }
};

const Example = () => {
  const initState = {
    trimSize: {},    
    textPaperType: {},
  };

  const [state,  dispatch] = useReducer(handleRreducer, initState);

  // 冊子のサイズ
  const handleTrimSize = (e) => {
    dispatch({
      item: "trimSize",
      payload: { value: e.target.value }
    });
  }; 
  // 本文の種類    
  const handleTextPaperType = (e) => {
    dispatch({
      item: "textPaperType",
      payload: { name: e.target.name, value: e.target.value }
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
              console.log(state)
            }
            {
              Object.entries(TRIM_SIZES_TYPE).map(([key, value]) => {
                return (
                  <label htmlFor={key} key={key}>
                    <input
                      id={key}
                      type="radio"
                      name={key}
                      value={value.name}
                      checked={state.trimSize.name === key}
                      onChange={handleTrimSize} 
                    />
                    {value.name}
                  </label>
                )
              })
            }
          </div>
        </div>      
        {/* 本文の種類 */}
        <div className="calc__item-wrapper text_paper_type">
          <div className="calc__entry">
            本文の種類<span>※</span>
          </div>
          <div className="calc__content-inner">
            {
              Object.entries(TRIM_SIZES_TYPE).map(([key, value]) => {
                console.log(key)
                console.log(value.paper_type)
                return (
                  <label htmlFor={key} key={key}>
                    <input
                      id={key}
                      type="radio"
                      name={key}
                      value={value}
                      checked={state.textPaperType === key}
                      onChange={handleTrimSize} 
                    />
                    {value.name}
                  </label>
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

// 基本サイズ　h176×w103、h182×w112
// 可能範囲　[h172～192]×[w103～138]

// 基本サイズ　h148～152×w105
// 可能範囲　[h138～152]×[w103～115]

// 可能範囲　[h105～210]×[w90～148]

// 可能範囲　[h149～297]×[w149～210]


// // 済んだ分 start
// // 済んだ分 end