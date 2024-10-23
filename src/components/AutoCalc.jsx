// ジャンル
const GENRE_OPTIONS = { 
  fiction: "小説",
  essays_personalHistory: "エッセイ・自分史",
  haiku_poetry_anthologies: "句集・歌集・詩集",
  commemorative_companyHistories: "記念誌・社史",
  history_geography: "歴史・地理",
  academicPapers_technicalBooks: "論文集・専門書",
  posthumousWorks: "遺稿集"
};

// 版型
const TRIM_SIZE_OPTIONS = {
  shiroku_ban: "四六判",
  A5: "A5判",
  B5: "B5判",
  A4: "A4判"
};

// 書籍体裁
const BOOK_FORMAT = {
  paperback: "並製本（ソフトカバー）",
  hardcover: "上製本（ハードカバー）"
};

// 本文レイアウト
const LAYOUT = {
  textData_basicLayout: "テキストデータ・簡単なレイアウト",
  textData_advancedLayout: "テキストデータ・高度なレイアウト",
  handwrittenScript_basicLayout: "手書き原稿・簡単なレイアウト",
  handwrittenScript_advancedLayout: "手書き原稿・高度なレイアウト",
  printReady: "完全データ原稿（Ai・Id・PDF）"  
};

// 装丁デザイン
const COVER_DESIGN = {
  professionalCoverDesign: "プロによる装丁デザイン希望",
  supplyingCoverDesignData: "装丁完全データ持ち込み"
};

// 部数
const QUANTITY = {};

// ページ数
const TOTAL_PAGE_COUNT = {};

// 見返し
const ENDPAPER = {
  surpriseMe_chooseSpecialtyPaper: "おまかせ・特殊紙（ラシャ・タントなど）",
  not: "なし"
};

// 表紙
const COVER = {
  specialtyPaper: "特殊紙",
  nomalPaper: "普通紙"
};

// 表紙加工
const COVER_FINISHING = {
  mirrorPP: "ミラーPP",
  mattePP: "マットPP",
  not: "PP加工なし"
};

// 化粧扉
const DECORATIVE_WRAPPER = {
  add: "あり",
  not: "なし"
};

// カバー（4色）・帯
const COVER_BOOK_WRAP = {
  both: "両方あり",
  onlyCover: "カバーのみ",
  not: "両方なし",
};

// 冊子のサイズ: trim_size
// 新書版・文庫版変形サイズ入力: custom_trim_size (e.g., Shinsho or Bunko Variant Size)
// 本文の印刷方法: text_printing_method
// 本文の種類: text_paper_type
// 印刷部数: print_quantity
// ページ数: page_count
// 製本方法: binding_method
// 表紙の印刷方法: cover_printing_method
// 表紙の種類（印刷方法）: cover_type_printing_method
// オプション加工: optional_finishing

// 新書版・文庫版変形サイズ入力
// 新書版
// 基本サイズ　h176×w103、h182×w112
// 可能範囲　[h172～192]×[w103～138]

// 文庫版
// 基本サイズ　h148～152×w105
// 可能範囲　[h138～152]×[w103～115]

// 変形サイズ 小
// 可能範囲　[h105～210]×[w90～148]

// 変形サイズ 大　
// 可能範囲　[h149～297]×[w149～210]

// 本文の印刷方法


const AutoCalc = () => {
  return (
    <>
      <div className="calc">
        {/* 冊子のサイズ */}
        <div className="calc__item-wrapper trim_size">
          <div className="calc__entry">
            冊子のサイズ<span>※</span>
          </div>
          <div className="calc__content-inner">
            <label htmlFor="">
              <input type="radio" id="" value="" onClick="" />
              A6
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick="" />
              B6
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" checked="checked" onClick="" />
              A5
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick="" />
              B5
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick="" />
              A4
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick="" />
              新書版
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick="" />
              文庫版
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick="" />
              変形サイズ 小
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick="" />
              変形サイズ 大
            </label>
          </div>
        </div>
        {/* 新書版・文庫版変形サイズ入力 */}
        {/* 冊子サイズによって可変するテキストが入る */}
        <div className="calc__item-wrapper custom_trim_size">
          <div className="calc__entry">
            新書版・文庫版変形サイズ入力<span>※</span>
          </div>   
          <div className="calc__content-inner">
            <label htmlFor="">
              H（&nbsp;<input id="" type="number" name="" value="" onChange="" />&nbsp;）&nbsp;㎜&nbsp;×&nbsp;
              W（&nbsp;<input id="" type="number" name="" value="" onChange="" />&nbsp;）&nbsp;㎜ 
            </label>
          </div>       
        </div>
        {/* 本文の印刷方法 */}
        {/* 方法によって可変するテキストが入る */}
        <div className="calc__item-wrapper text_printing_method">
          <div className="calc__entry">
            本文の印刷方法<span>※</span>
          </div>   
          <div className="calc__content-inner">
            <select id="" name="" value="" onChange="">
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
        <div className="calc__item-wrapper text_paper_type">
          <div className="calc__entry">
            本文の種類<span>※</span>
          </div>   
          <div className="calc__content-inner">
            <label htmlFor="">
              <input type="radio" id="" value="" />
              上質 70kg
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" />
              上質 90kg
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" />
              上質 55kg
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" />
              コート110kg
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" />
              マットコート90kg
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" />
              書籍用紙 72.5kg（淡クリームキンマリ）
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" />
              書籍用紙 90kg（淡クリームキンマリ）
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" />
              書籍用紙 57kg（淡クリームキンマリ）
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" />
              ラフクリーム琥珀 71.5kg
            </label>
          </div>       
        </div>
        {/* 印刷部数 */}
        {/* 1–10, 5ずつ増加、2000部まで */}
        <div className="calc__item-wrapper print_quantity">
          <div className="calc__entry">
            印刷部数<span>※</span>
          </div>   
          <div className="calc__content-inner">
            <select name="" id="" onChange="">
              <option value="">1</option>
            </select>
          </div>       
        </div>
        {/* ページ数 */}
        {/* 4, 8, 10以降は2ページずつ増加500ページまで */}
        {/* 本文ページ数の範囲で1ページずつカウント */}
        <div className="calc__item-wrapper page_count">
          <div className="calc__entry">
            ページ数<span>※</span>
          </div>   
          <div className="calc__content-inner">
            <label htmlFor="">
              <input type="number" />
              <ul className="note">
                <li>表紙（表1・2・3・4）を除く本文のページ数</li>
              </ul>
            </label>
            <label htmlFor="">
              <input type="number" />
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
              <input type="radio" name="" value="" onClick="" />
              フルカラー印刷
            </label>
            <label htmlFor="">
              <input type="radio" name="" value="" onClick="" />
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
              <input type="radio" id="" value="" onClick="" />
              上質&nbsp;180kg
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick="" />
              色上質最厚口
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick="" />
              レザック&nbsp;175kg<span>★</span>
            </label>

            <div className="calc__entry-title">艶ありコート・アート・キャスト</div>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick="" />
              コート紙&nbsp;180kg
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick="" />
              アートポスト紙&nbsp;200kg<span>★</span>
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick="" />
              ミラーコート紙&nbsp;220kg<span>★</span>
            </label>

            <div className="calc__entry-title">艶なしマットコート・ダル</div>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick="" />
              マットコート紙&nbsp;135kg
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick="" />
              サテン金藤&nbsp;180kg<span>★</span>
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick="" />
              マットポスト紙&nbsp;220kg<span>★</span>
            </label>

            <div className="calc__entry-title">ラフ・エンボス</div>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick="" />
              アラベール&nbsp;スノーホワイト&nbsp;160kg<span>★</span>
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick="" />
              アラベール&nbsp;ナチュラル&nbsp;160kg<span>★</span>
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick="" />
              マーメイド&nbsp;スノーホワイト&nbsp;175kg
            </label>

            <div className="calc__entry-title">特殊紙&nbsp;パール・シャイン・ラメ</div>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick="" />
              ペルーラ&nbsp;スノーホワイト&nbsp;180kg<span>★</span>
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick="" />
              ミランダ&nbsp;スノーホワイト&nbsp;170kg<span>★</span>
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick="" />
              五感紙粗目&nbsp;純白キラ&nbsp;135kg
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick="" />
              新星物語&nbsp;パウダー&nbsp;180kg
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick="" />
              エスプリコートVNエンボス&nbsp;アラレ&nbsp;176.5kg★
            </label>
            <div className="calc__entry-title">特殊紙&nbsp;その他</div>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick="" />
              OKカイゼル&nbsp;白&nbsp;155kg
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick="" />
              しこくてんれい&nbsp;ゆき&nbsp;180kg★
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick="" />
              両更クラフト紙&nbsp;129.5kg（モノクロ印刷）
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick="" />
              レザック82&nbsp;ろうけつ 白 175kg
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick="" />
              両更クラフト紙&nbsp;129.5kg
            </label>

            <div className="calc__entry-title">お持ち込みの場合・本文と同じ用紙を使用する場合</div>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick="" />
              表紙お持込み（印刷済み表紙のご支給）
              <ul className="note">
                <li>詳しくは<a href="faq.html#a18" target="_blank">こちら</a>をご覧ください。</li>
              </ul>
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick="" />
              本文と同じ紙を使用（モノクロ印刷）
            </label>
            <label htmlFor="">
              <input type="radio" id="" value="" onClick="" />
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
                <input type="checkbox" id="" value="" onClick="" />
                表紙・PP加工（クリアPP）
              </label>
              <label htmlFor="">
                <input type="checkbox" id="" value="" onClick="" />
                表紙・PP加工（マットPP）
              </label>
              <ul className="note">
                <li><a href="" target="_blank">「PP加工をされる際の注意点」をご覧ください。</a></li>
                <li>表表紙（表1）の裏側を表2<br />裏表紙（表4）の内側を表3と呼びます。</li>
              </ul>
            </section>
            <section>
              <label htmlFor="">
                <input type="checkbox" id="" value="" />
                遊び紙（合紙）挿入
              </label>
              <label htmlFor="">
                <input type="checkbox" id="" value="" />
                遊び紙に印刷がある場合は、こちらにチェックを入れてください。
              </label>
              <label htmlFor="">
                枚数：<input type="text" id="" value="" />枚
              </label>
              <input type="text" name="" value="" />
              <button type="button" id="" onClick="" >用紙・色 選択</button>
              <div>遊び紙への印刷ページを記入して下さい。（データのページ数）</div>
              <input type="text" name="" />
              <ul className="note example">
                <li>（例：本文の前後とp30-31の間⇒前,30-31,後 [挿入枚数3枚]）</li>
                <li>（P10と11の間、本文p34と35の間⇒10-11,34-35 [挿入枚数2枚]）</li>
              </ul>
            </section>
            <section>
              <label htmlFor="">
                <input type="checkbox" id="" value="" onClick="" />
                表2・3&nbsp;モノクロ印刷
              </label>
              <label htmlFor="">
                <input type="checkbox" id="" value="" onClick="" />
                表2・3&nbsp;フルカラー印刷
              </label>
              <label htmlFor="">
                <input type="checkbox" id="" value="" />
                本文片面印刷
              </label>
            </section>
            <section>
              <label htmlFor="">
                <input type="checkbox" id="" value="" />
                表紙データ自動塗り足し追加
              </label>
              <label htmlFor="">
                <input type="checkbox" id="" value="" />
                本文データ自動塗り足し追加
              </label>
              <ul className="note">
                <li>※必ず<a href="" onClick="">「自動塗り足し追加サービスの注意点」</a>をご確認・ご了承の上ご注文ください。</li>
              </ul>
            </section>
            <section>
              <label htmlFor="">
                <input type="checkbox" id="" value="" />
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
                <input type="checkbox" id="" value="" />
                横綴じ製本
              </label>
              <label htmlFor="">
                <input type="checkbox" id="" value="" />
                紙版原稿（紙版原稿入稿選択時は自動選択）
              </label>
              <label htmlFor="">
                <input type="checkbox" id="" value="" />
                Word（ワード）入稿（Word入稿選択時は自動選択）
              </label>
            </section>
          </div>       
        </div>
      </div>

      <div>
        <button name="" type="submit" onClick="" >お見積もり</button>
        <button name="" type="reset" >リセット</button>
      </div>
    </>
  );
};

export default AutoCalc;