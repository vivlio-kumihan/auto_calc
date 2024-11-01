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

// 本文の全ての種類
// 版型ごとに使用できる紙の種類を配列で格納。
const TEXT_PAPER_TYPE = { 1: "上質 70kg", 2: "上質 90kg", 3: "上質 55kg", 4: "コート 110kg", 5: "マットコート 90kg", 6: "書籍用紙 72.5kg（淡クリームキンマリ）", 7: "書籍用紙 90kg（淡クリームキンマリ）", 8: "書籍用紙 57kg（淡クリームキンマリ）", 9: "ラフクリーム琥珀 71.5kg" };
const BASIC_TEXT_PAPER_TYPE = { 1: "上質 70kg", 2: "上質 90kg", 6: "書籍用紙 72.5kg（淡クリームキンマリ）", 7: "書籍用紙 90kg（淡クリームキンマリ）" };
// 本文：モノクロ
// 本文：モノクロ, A6, 文庫版
const tmp_TEXT_PAPER_TYPE_1C_A6_POCKETEDITION = { ...BASIC_TEXT_PAPER_TYPE, 3: "上質 55kg", 8: "書籍用紙 57kg（淡クリームキンマリ）", 9: "ラフクリーム琥珀 71.5kg" };
const TEXT_PAPER_TYPE_1C_A6_POCKETEDITION = corectPaperTypeToArr(tmp_TEXT_PAPER_TYPE_1C_A6_POCKETEDITION);
// 本文：モノクロ, 変形サイズ（小）（大）
const tmp_TEXT_PAPER_TYPES_1C_CUSTOMSIZE_SM_LG = { ...BASIC_TEXT_PAPER_TYPE };
const TEXT_PAPER_TYPES_1C_CUSTOMSIZE_SM_LG = corectPaperTypeToArr(tmp_TEXT_PAPER_TYPES_1C_CUSTOMSIZE_SM_LG);
// 本文：モノクロ, B6, A5, B5, A4, 新書版
const tmp_TEXT_PAPER_TYPES_1C_OTHERS = { ...BASIC_TEXT_PAPER_TYPE, 9: "ラフクリーム琥珀 71.5kg" };
const TEXT_PAPER_TYPES_1C_OTHERS = corectPaperTypeToArr(tmp_TEXT_PAPER_TYPES_1C_OTHERS);
// 本文：カラー
// 本文：カラー, A6, B6, A5, B5, A4, 新書版, 文庫版
const tmp_TEXT_PAPER_TYPE_4C_OTHERS = { ...BASIC_TEXT_PAPER_TYPE, 4: "コート 110kg", 5: "マットコート 90kg",  9: "ラフクリーム琥珀 71.5kg" };
const TEXT_PAPER_TYPE_4C_OTHERS = corectPaperTypeToArr(tmp_TEXT_PAPER_TYPE_4C_OTHERS);
// 本文：カラー, 変形サイズ（小）（大）
const tmp_TEXT_PAPER_TYPE_4C_CUSTOMSIZE_SM_LG = { ...BASIC_TEXT_PAPER_TYPE, 4: "コート 110kg", 5: "マットコート 90kg" };
const TEXT_PAPER_TYPE_4C_CUSTOMSIZE_SM_LG = corectPaperTypeToArr(tmp_TEXT_PAPER_TYPE_4C_CUSTOMSIZE_SM_LG);
// 本文：カラー・お得
// 本文：カラー・お得, A6, B6, A5, B5, A4, 新書版, 文庫版
const tmp_TEXT_PAPER_TYPE_4C_OTHERS_SPECIAL = { ...BASIC_TEXT_PAPER_TYPE, 9: "ラフクリーム琥珀 71.5kg" };
const TEXT_PAPER_TYPE_4C_OTHERS_SPECIAL = corectPaperTypeToArr(tmp_TEXT_PAPER_TYPE_4C_OTHERS_SPECIAL);
// 本文：カラー・お得, 変形サイズ（小）（大）
const tmp_TEXT_PAPER_TYPE_4C_CUSTOMSIZE_SM_LG_4C_SPECIAL = { ...BASIC_TEXT_PAPER_TYPE };
const TEXT_PAPER_TYPE_4C_CUSTOMSIZE_SM_LG_4C_SPECIAL = corectPaperTypeToArr(tmp_TEXT_PAPER_TYPE_4C_CUSTOMSIZE_SM_LG_4C_SPECIAL);

// 冊子のサイズと対応する用紙の種類
const TRIM_SIZES_TYPES = {
  A6: { name: "A6", textPaperTypes: TEXT_PAPER_TYPE_1C_A6_POCKETEDITION },
  B6: { name: "B6", textPaperTypes: TEXT_PAPER_TYPES_1C_OTHERS },
  A5: { name: "A5", textPaperTypes: TEXT_PAPER_TYPES_1C_OTHERS },
  B5: { name: "B5", textPaperTypes: TEXT_PAPER_TYPES_1C_OTHERS },
  A4: { name: "A4", textPaperTypes: TEXT_PAPER_TYPES_1C_OTHERS },
  stdPaperback: { name: "新書版", textPaperTypes: TEXT_PAPER_TYPES_1C_OTHERS },
  pocketEdition: { name: "文庫版", textPaperTypes: TEXT_PAPER_TYPE_1C_A6_POCKETEDITION },
  customSizeSm: { name: "変形サイズ（小）", textPaperTypes: TEXT_PAPER_TYPES_1C_CUSTOMSIZE_SM_LG },
  customSizeLg: { name: "変形サイズ（大）", textPaperTypes: TEXT_PAPER_TYPES_1C_CUSTOMSIZE_SM_LG },
};

// 印刷方法
const COVER_PRINTING_METHOD = { mono: "モノクロ印刷", color: "フルカラー印刷" };

// 表紙の種類1C（K）
const COVER_PAPER_TYPES_PRINTED_1C = [
  { group: "上質・色上質・色ファンシー" , types: ["上質 180kg", "色上質最厚口", "レザック 175kg"] },
  { group: "特殊紙 その他" , types: ["OKカイゼル 白 155kg", "しこくてんれい ゆき 180kg", "両更クラフト紙 129.5kg"] }
];
// 表紙の種類4C
const COVER_PAPER_TYPES_PRINTED_4C = [
  { group: "上質・色上質・色ファンシー" , types: ["上質 180kg", "色上質最厚口", "レザック 175kg"] },
  { group: "艶ありコート・アート・キャスト" , types: ["コート紙 180kg", "アートポスト紙 200kg", "ミラーコート紙 220kg"] },
  { group: "艶なしマットコート・ダル" , types: ["マットコート紙 135kg", "サテン金藤 180kg", "マットポスト紙 220kg"] },
  { group: "ラフ・エンボス" , types: ["アラベール スノーホワイト 160kg", "アラベール ナチュラル 160kg", "マーメイド スノーホワイト 175kg"] },
  { group: "特殊紙 パール・シャイン・ラメ" , types: ["ペルーラ スノーホワイト 180kg", "ミランダ スノーホワイト 170kg", "五感紙粗目 純白キラ 135kg", "新星物語 パウダー 180kg", "エスプリコートVNエンボス アラレ 176.5kg"] },
  { group: "特殊紙 その他" , types: ["OKカイゼル 白 155kg", "しこくてんれい ゆき 180kg", "レザック82 ろうけつ 白 175kg", "両更クラフト紙 129.5kg"] }
];
// 表紙の種類
const COVER_PAPER_TYPES_GROUP = {
  mono: { coverPaperTypes: COVER_PAPER_TYPES_PRINTED_1C },
  color: { coverPaperTypes: COVER_PAPER_TYPES_PRINTED_4C }
};

const handleRreducer = (prev, { item, payload }) => {
  const { key, name, value } = payload;
  switch (item) {
    case "trimSize": return { ...prev, trimSize: { id: key, name: name } };    
    case "textPaperType": return { ...prev, textPaperType: { name: name } };
    case "coverPrintingMethod": return { ...prev, coverPrintingMethod: { id: key, name: name } };
    case "coverPaperType": return { ...prev, coverPaperType: { name: name } };
    default: throw new Error("error...");
  }
};

const Example = () => {
  const initState = {
    trimSize: {},
    textPaperType: {},    
    coverPrintingMethod: {},
    coverPaperType: {},
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
      payload: { name: type }  // クリックしたラジオボタンのtypeをstateにセット
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
            <select id="" name="" value="" >
              <option value="">モノクロ印刷</option>
              <option value="">カラー・モノクロ混在印刷</option>
              <option value="">カラー・モノクロ混在印刷お得ver.</option>
              <option value="">フルカラー印刷</option>
            </select>
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
        {/* ?. は「オプショナルチェーン」演算子で、指定したプロパティが存在する場合のみ次の操作に進む。 */}
        <div className="calc__item-wrapper text_paper_type">
          <div className="calc__entry">
            本文の種類<span>※</span>
          </div>
          <div className="calc__content-inner">
            {
              state.trimSize.id &&
                TRIM_SIZES_TYPES[state.trimSize.id]?.textPaperTypes.map((type) => {
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
                      <ul>
                        {
                          item.types.map((type) => {
                            return (
                              <li key={type}>
                                <label htmlFor={type}>
                                  <input 
                                    id={type}
                                    type="radio" 
                                    name="coverPaperType"  // 全てのラジオボタンで共通のname属性にする
                                    checked={state.coverPaperType.name === type}
                                    onChange={() => handleCoverPaperType(type)}  // typeを引数に渡す
                                  />
                                  {type}
                                </label>
                              </li>
                            )
                          })
                        }
                      </ul>
                    </div>
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