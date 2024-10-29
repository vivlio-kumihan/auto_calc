import { useReducer } from "react";

import Example from './parts/Example.jsx'

// 本文の全ての種類
// const TEXT_PAPER_TYPE = ["上質 70kg", "上質 90kg", "上質 55kg", "コート 110kg", "マットコート 90kg", "書籍用紙 72.5kg（淡クリームキンマリ）", "書籍用紙 90kg（淡クリームキンマリ）", "書籍用紙 57kg（淡クリームキンマリ）", "ラフクリーム琥珀 71.5kg"];
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

// 関数Reducer
const handleRreducer = (prev, { item, payload }) => {
  const { name, value } = payload;
  switch (item) {
    case "trimSize": return { ...prev, trimSize: { name: value } };    
    case "textPaperType": return { ...prev, textPaperType: { name: value } };
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
    default: throw new Error("error...");
  }
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

// 本体
const AutoCalc = () => {
  const initState = {
    trimSize: {},
    textPaperType: {},
    printQuantity: 0,
    pageCount: 0,
    colorPageCount: 0,
    colorPageCountArr: [],
  };
  const [state,  dispatch] = useReducer(handleRreducer, initState);
  // 冊子のサイズ
  const handleTrimSize = (e) => {
    dispatch({
      item: "trimSize",
      payload: { name: e.target.name, value: e.target.value }
    });
  };   
  // 本文の種類  
  const handleTextPaperType = (e) => {
    dispatch({
      item: "textPaperType",
      payload: { value: e.target.value }
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
  // とりあえずダミーの関数
  const dummyFunc = (e) => {
    dispatch({ dummyCount: e.target.value })
  };

  return (
    <>
      <Example />

      <div className="calc">
        {/* 冊子のサイズ */}
        <div className="calc__item-wrapper trim_size">
          <div className="calc__entry">
            冊子のサイズ<span>※</span>
          </div>
            <div className="calc__content-inner">

            {
              Object.entries(TRIM_SIZES_TYPES).map(([key, value]) => {
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

        {/* 本文の印刷方法 */}
        {/* 方法によって可変するテキストが入る */}
        <div className="calc__item-wrapper text_printing_method">
          <div className="calc__entry">
            本文の印刷方法<span>※</span>
          </div>   
          <div className="calc__content-inner">
            <select id="" name="" value="" onChange={dummyFunc}>
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
              state.trimSize.name &&
                TRIM_SIZES_TYPES[state.trimSize.name]?.useTextPaperTypes.map((type) => {
                  return (
                    <label htmlFor={type} key={type}>
                      <input
                        id={type}
                        type="radio"
                        name="textPaperType"
                        value={type}
                        checked={state.textPaperType.value === type}
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
            <select name="printQuantity" value={state.printQuantity} onChange={handlePrintQuantity}>
              { printQuantityArr.map((num) => { return <option key={num} value={num}>{num}</option> }) }
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
              <select name="pageCount" value={state.pageCount} onChange={handlePageCount}>
                { pageCountArr.map((num) => { return <option key={num} value={num}>{num}</option> }) }
              </select>
            </label>
            <div className="result">{state.pageCount}</div>
            <ul className="note">
              <li>表紙（表1・2・3・4）を除く本文のページ数</li>
            </ul>
            <label htmlFor="">
              <select  name="colorPageCount" value={state.colorPageCount} onChange={handleColorPageCount}>
                { state.colorPageCountArr.map((num) => { return <option key={num} value={num}>{num}</option> }) }
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
            <select name="" id="">
              <option value="">くるみ製本</option>
              <option value="">中とじ製本</option>
            </select>
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
            <label htmlFor="">
              <input type="radio" name="" value="" onClick={dummyFunc} />
              フルカラー印刷
            </label>
            <label htmlFor="">
              <input type="radio" name="" value="" onClick={dummyFunc} />
              モノクロ印刷
            </label>
          </div>  
          <ul className="note">
            <li>表2・表3に印刷をご希望の場合は、下記のオプション加工をお選び下さい。</li>
            <li>表表紙（表1）の裏側を表2、裏表紙(表4)の内側を表3と呼びます。</li>
          </ul>     
        </div>

        {/* 表紙の種類（印刷方法） */}
        <div className="calc__item-wrapper cover_type_printing_method">
          <div className="calc__entry">
            表紙の種類（印刷方法）<span>※</span>
          </div>   
          <div className="calc__content-inner">
            <div className="calc__entry-title">上質・色上質・色ファンシー</div>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick={dummyFunc} />
              上質&nbsp;180kg
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick={dummyFunc} />
              色上質最厚口
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick={dummyFunc} />
              レザック&nbsp;175kg<span>★</span>
            </label>

            <div className="calc__entry-title">艶ありコート・アート・キャスト</div>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick={dummyFunc} />
              コート紙&nbsp;180kg
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick={dummyFunc} />
              アートポスト紙&nbsp;200kg<span>★</span>
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick={dummyFunc} />
              ミラーコート紙&nbsp;220kg<span>★</span>
            </label>

            <div className="calc__entry-title">艶なしマットコート・ダル</div>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick={dummyFunc} />
              マットコート紙&nbsp;135kg
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick={dummyFunc} />
              サテン金藤&nbsp;180kg<span>★</span>
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick={dummyFunc} />
              マットポスト紙&nbsp;220kg<span>★</span>
            </label>

            <div className="calc__entry-title">ラフ・エンボス</div>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick={dummyFunc} />
              アラベール&nbsp;スノーホワイト&nbsp;160kg<span>★</span>
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick={dummyFunc} />
              アラベール&nbsp;ナチュラル&nbsp;160kg<span>★</span>
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick={dummyFunc} />
              マーメイド&nbsp;スノーホワイト&nbsp;175kg
            </label>

            <div className="calc__entry-title">特殊紙&nbsp;パール・シャイン・ラメ</div>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick={dummyFunc} />
              ペルーラ&nbsp;スノーホワイト&nbsp;180kg<span>★</span>
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick={dummyFunc} />
              ミランダ&nbsp;スノーホワイト&nbsp;170kg<span>★</span>
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick={dummyFunc} />
              五感紙粗目&nbsp;純白キラ&nbsp;135kg
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick={dummyFunc} />
              新星物語&nbsp;パウダー&nbsp;180kg
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick={dummyFunc} />
              エスプリコートVNエンボス&nbsp;アラレ&nbsp;176.5kg★
            </label>
            <div className="calc__entry-title">特殊紙&nbsp;その他</div>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick={dummyFunc} />
              OKカイゼル&nbsp;白&nbsp;155kg
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick={dummyFunc} />
              しこくてんれい&nbsp;ゆき&nbsp;180kg★
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick={dummyFunc} />
              両更クラフト紙&nbsp;129.5kg（モノクロ印刷）
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick={dummyFunc} />
              レザック82&nbsp;ろうけつ 白 175kg
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick={dummyFunc} />
              両更クラフト紙&nbsp;129.5kg
            </label>

            <div className="calc__entry-title">お持ち込みの場合・本文と同じ用紙を使用する場合</div>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick={dummyFunc} />
              表紙お持込み（印刷済み表紙のご支給）
              <ul className="note">
                <li>詳しくは<a href="faq.html#a18" target="_blank">こちら</a>をご覧ください。</li>
              </ul>
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick={dummyFunc} />
              本文と同じ紙を使用（モノクロ印刷）
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick={dummyFunc} />
              本文と同じ紙を使用
            </label>
            <ul className="note">
              <li>★が付いている表紙がPP加工可能です。</li>
              <li>表紙に使う用紙については、「<a href="" target="_blank">制作に使う紙について</a>」をご覧ください。</li>
            </ul>
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

export default AutoCalc;