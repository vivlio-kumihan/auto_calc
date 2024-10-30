import { useReducer } from "react";

// 本文の全ての種類
const TEXT_PAPER_TYPE = ["上質 70kg", "上質 90kg", "上質 55kg", "コート 110kg", "マットコート 90kg", "書籍用紙 72.5kg（淡クリームキンマリ）", "書籍用紙 90kg（淡クリームキンマリ）", "書籍用紙 57kg（淡クリームキンマリ）", "ラフクリーム琥珀 71.5kg"];
// 版型ごとに使用できる紙の種類を配列で格納。
// A6, 文庫版
const textPaperType_A6_PocketEdition = ["上質 70kg", "上質 90kg", "上質 55kg", "書籍用紙 72.5kg（淡クリームキンマリ）", "書籍用紙 90kg（淡クリームキンマリ）", "書籍用紙 57kg（淡クリームキンマリ）", "ラフクリーム琥珀 71.5kg"];
// 変形サイズ（小）（大）
const textPaperTypesCustomSize_Sm_Lg = ["上質 70kg", "上質 90kg", "書籍用紙 72.5kg（淡クリームキンマリ）", "書籍用紙 90kg（淡クリームキンマリ）"];
// B6, A5, B5, A4, 新書版
const textPaperTypes_Others = ["上質 70kg", "上質 90kg", "書籍用紙 72.5kg（淡クリームキンマリ）", "書籍用紙 90kg（淡クリームキンマリ）", "ラフクリーム琥珀 71.5kg"];
  
// 冊子のサイズと対応する用紙の種類
const TRIM_SIZES_TYPES = {
  A6: { name: "A6", useTextPaperTypes: textPaperType_A6_PocketEdition },
  B6: { name: "B6", useTextPaperTypes: textPaperTypes_Others },
  A5: { name: "A5", useTextPaperTypes: textPaperTypes_Others },
  B5: { name: "B5", useTextPaperTypes: textPaperTypes_Others },
  A4: { name: "A4", useTextPaperTypes: textPaperTypes_Others },
  stdPaperback: { name: "新書版", useTextPaperTypes: textPaperTypes_Others },
  pocketEdition: { name: "文庫版", useTextPaperTypes: textPaperType_A6_PocketEdition },
  customSizeSm: { name: "変形サイズ（小）", useTextPaperTypes: textPaperTypesCustomSize_Sm_Lg },
  customSizeLg: { name: "変形サイズ（大）", useTextPaperTypes: textPaperTypesCustomSize_Sm_Lg },
};

const handleRreducer = (prev, { item, payload }) => {
  const { key, name, value } = payload;
  switch (item) {
    case "trimSize": return { ...prev, trimSize: { id: key, name: name } };    
    case "textPaperType": return { ...prev, textPaperType: { name: name } };
    default: throw new Error("error...");
  }
};

const Example = () => {
  const initState = {
    trimSize: {},
    textPaperType: {},
  };
  
  const [state,  dispatch] = useReducer(handleRreducer, initState);
  // 状態の確認
  console.log(state, "++++++++++++++++++++++++++++++++++")

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
        {/* 本文の種類 */}
        {/* 論理 AND 演算子『&&』は、左側が true の場合のみ右側の処理を実行する。 */}
        {/* ?. は「オプショナルチェーン」演算子で、指定したプロパティが存在する場合のみ次の操作に進む。 */}
        <div className="calc__item-wrapper text_paper_type">
          <div className="calc__entry">
            本文の種類<span>※</span>
          </div>
          <div className="calc__content-inner">
            {/* {console.log(TRIM_SIZES_TYPES)} */}
            {/* {console.log(state.trimSize.id)} */}
            {/* {console.log(TRIM_SIZES_TYPES[state.trimSize.id])} */}
            {
              state.trimSize.id &&
                TRIM_SIZES_TYPES[state.trimSize.id]?.useTextPaperTypes.map((type) => {
                  {/* console.log(type) */}
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
    </>
  );
};

export default Example;


// console.log(key);
// console.log(value.name);
// console.log(value.useTextPaperTypes);

// 基本サイズ　h176×w103、h182×w112
// 可能範囲　[h172～192]×[w103～138]

// 基本サイズ　h148～152×w105
// 可能範囲　[h138～152]×[w103～115]

// 可能範囲　[h105～210]×[w90～148]

// 可能範囲　[h149～297]×[w149～210]


// // 済んだ分 start
// // 済んだ分 end