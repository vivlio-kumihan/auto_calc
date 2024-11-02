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
const TRIM_SIZES_TYPES = {
  A6: {
    name: "A6", 
    textPaperTypes: {
      _1C: TEXT_PAPER_TYPE_1C_A6_PocketEdition, 
      _4C_MONO: TEXT_PAPER_TYPE_4C_4cMono_OTHERS,  
      _4CSP: TEXT_PAPER_TYPE_1C_4cMonoSP_OTHERS,
      _4C: TEXT_PAPER_TYPE_4C_4cMono_OTHERS,
    } 
  },
  B6: {
    name: "B6", 
    textPaperTypes: {
      _1C: TEXT_PAPER_TYPE_1C_4cMonoSP_OTHERS, 
      _4C_MONO: TEXT_PAPER_TYPE_4C_4cMono_OTHERS,      
      _4CSP: TEXT_PAPER_TYPE_1C_4cMonoSP_OTHERS,
      _4C: TEXT_PAPER_TYPE_4C_4cMono_OTHERS, 
    } 
  },
  A5: {
    name: "A5", 
    textPaperTypes: {
      _1C: TEXT_PAPER_TYPE_1C_4cMonoSP_OTHERS,
      _4C_MONO: TEXT_PAPER_TYPE_4C_4cMono_OTHERS,      
      _4CSP: TEXT_PAPER_TYPE_1C_4cMonoSP_OTHERS ,
      _4C: TEXT_PAPER_TYPE_4C_4cMono_OTHERS,
    } 
  },
  B5: {
    name: "B5", 
    textPaperTypes: {
      _1C: TEXT_PAPER_TYPE_1C_4cMonoSP_OTHERS,
      _4C_MONO: TEXT_PAPER_TYPE_4C_4cMono_OTHERS,      
      _4CSP: TEXT_PAPER_TYPE_1C_4cMonoSP_OTHERS,
      _4C: TEXT_PAPER_TYPE_4C_4cMono_OTHERS,
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
      _4C: TEXT_PAPER_TYPE_4C_4cMono_OTHERS,
    } 
  },
  pocketEdition: {
    name: "文庫版", 
    textPaperTypes: {
      _1C: TEXT_PAPER_TYPE_1C_A6_PocketEdition,
      _4C_MONO: TEXT_PAPER_TYPE_4C_4cMono_OTHERS,      
      _4CSP: TEXT_PAPER_TYPE_1C_4cMonoSP_OTHERS,
      _4C: TEXT_PAPER_TYPE_4C_4cMono_OTHERS,
    } 
  },
  customSizeSm: {
    name: "変形サイズ（小）", 
    textPaperTypes: {
      _1C: TEXT_PAPER_TYPES_1C_4cMonoSP_CustomSizeSmLg,
      _4C_MONO: TEXT_PAPER_TYPE_4C_CustomSizeSmLg,
      _4CSP: TEXT_PAPER_TYPES_1C_4cMonoSP_CustomSizeSmLg,
      _4C: TEXT_PAPER_TYPE_4C_CustomSizeSmLg,
    } 
  },
  customSizeLg: {
    name: "変形サイズ（大）", 
    textPaperTypes: {
      _1C: TEXT_PAPER_TYPES_1C_4cMonoSP_CustomSizeSmLg,
      _4C_MONO: TEXT_PAPER_TYPE_4C_CustomSizeSmLg,      
      _4CSP: TEXT_PAPER_TYPES_1C_4cMonoSP_CustomSizeSmLg,
      _4C: TEXT_PAPER_TYPE_4C_CustomSizeSmLg,
    } 
  }
};

// 本文印刷方法
const TEXT_PRINTING_METHOD = { _1C: "モノクロ印刷", _4C_MONO: "カラー・モノクロ混在印刷", _4CSP: "カラー・モノクロ混在印刷お得ver.", _4C: "フルカラー印刷" };

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

const BINDING_METHOD = ["くるみ製本", "中とじ製本"];

// 表紙の印刷方法
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

// 関数Reducer
const handleRreducer = (prev, { item, payload }) => {
  const { key, name, value } = payload;
  switch (item) {
    case "trimSize": return { ...prev, trimSize: { id: key, name: name } };    
    case "textPaperType": return { ...prev, textPaperType: { name: name } };
    case "textPrintingMethod": return { ...prev, textPrintingMethod: { id: key, name: name } };    
    case "printQuantity": return { ...prev, [name]: value };
    case "pageCount": {
      // 課題　条件分岐が必要
      const maxColorPageCount = Math.floor(value / 2);
      // const maxColorPageCount = Math.floor(value - 1);
      const tmpArr = [];
      for (let i = 1; i <= maxColorPageCount; i++) {
        tmpArr.push(i);
      }
      return { ...prev, [name]: value, colorPageCountArr: tmpArr };
    };
    case "colorPageCount": return { ...prev, [name]: value };
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
    trimSize: { id: "B5", name: "B5"},
    textPaperType: {},
    textPrintingMethod: { id: "_1C", name: "モノクロ印刷" },    
    printQuantity: 1,
    pageCount: 16,
    colorPageCount: 0,
    colorPageCountArr: [],
    coverPrintingMethod: {},
    coverPaperType: {},    
  };

  // 状態
  const [state,  dispatch] = useReducer(handleRreducer, initState);
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
      payload: { name: e.target.name, value: e.target.value }
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

  // とりあえずダミーの関数
  const dummyFunc = (e) => {
    dispatch({ dummyCount: e.target.value })
  };

  const renderBindingMethodOptions = () => {
    const pageCount = parseInt(state.pageCount);
    let method;
    let defaultMethod;

    if (pageCount >= 25 
        || state.trimSize.name === "A6"
        || state.trimSize.name === "B6"
        || state.trimSize.name === "文庫版"
        || state.trimSize.name === "変形サイズ（小）"
        || state.trimSize.name === "変形サイズ（大）") {
      method = [BINDING_METHOD[0]];
      defaultMethod = BINDING_METHOD[0];
    } else if (pageCount >= 14 && pageCount <= 24) {
      method = BINDING_METHOD;
      defaultMethod = null; // 状態管理で制御
    } else if (pageCount <= 13) {
      method = [BINDING_METHOD[1]];
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

    return method.map((method) => (
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
    ));
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
                {/* {console.log(trimSize)} */}
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
          <div className="calc__content-inner set-flex">
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
            <div className="result">Result: {state.printQuantity}</div>
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
            <div className="result">{state.pageCount}</div>
            <ul className="note">
              <li>表紙（表1・2・3・4）を除く本文のページ数</li>
            </ul>
            <label htmlFor="">
              <select name="colorPageCount" value={state.colorPageCount} onChange={handleColorPageCount}>
                { state.colorPageCountArr.map((num) => { 
                  return(
                    <option key={num} value={num}>{num}</option> 
                  ) 
                })}
              </select>
              <ul className="note">
                <li>内カラーページ数</li>
              </ul>
            </label>
          </div> 
          <ul className="note">
            <li>片面印刷をご希望の方は、下部のオプション加工を選択して下さい。</li>
          </ul>
        </div>

        {/* 製本方法 */}
        <div className="calc__item-wrapper binding_method">
          <div className="calc__entry">
            製本方法<span>※</span>
          </div>   
          <div className="calc__content-inner">
            {renderBindingMethodOptions()}
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

        {/* オプション加工 */}
        <div className="calc__item-wrapper optional_finishing">
          <div className="calc__entry">
            オプション加工<span>※</span>
          </div>   
          <div className="calc__content-inner">
            <section>
              <label htmlFor="">
                <input type="checkbox" id="" value="" onClick={dummyFunc} />
                表紙・PP加工（クリアPP）
              </label>
              <label htmlFor="">
                <input type="checkbox" id="" value="" onClick={dummyFunc} />
                表紙・PP加工（マットPP）
              </label>
              <ul className="note">
                <li><a href="" target="_blank">「PP加工をされる際の注意点」をご覧ください。</a></li>
                <li>表表紙（表1）の裏側を表2<br />裏表紙（表4）の内側を表3と呼びます。</li>
              </ul>
            </section>
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

export default Example;