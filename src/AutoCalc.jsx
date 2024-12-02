import { CalcProvider } from "./context/CalcContext";

import TrimSize from "./components/TrimSize.jsx";
import CustomSize from "./components/CustomSize.jsx";
import TextPrintingMethod from "./components/TextPrintingMethod.jsx";
import TextPaperType from "./components/TextPaperType.jsx";
import PrintQuantity from "./components/PrintQuantity.jsx";
import PageCount from "./components/PageCount.jsx";
import BindingMethod from "./components/BindingMethod.jsx";
import CoverPrintingMethod from "./components/CoverPrintingMethod.jsx";
import CoverPaperType from "./components/CoverPaperType.jsx";
import InsideCoverPrintingMethod from "./components/InsideCoverPrintingMethod.jsx";
import OptionalFinishing from "./components/OptionalFinishing.jsx";
import OrderPad from "./components/OrderPad.jsx";

// 本文用紙の種類
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

// 冊子の版型と対応する用紙の種類
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
const COATING_AVAILABLE = [
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

// 本体
const AutoCalc = () => {
  return (
    <>
      <div className="calc content-width">
        <h1>自動お見積もり</h1>
        <CalcProvider>
          <div className="order">
            <div className="order__sheet">
              {/* 冊子の版型 */}
              <TrimSize trimSizeTypesRange={TRIM_SIZES_TYPES_RANGE} />
              {/* 新書版・文庫版・変形サイズ（大）（小）入力 */}
              <CustomSize trimSizeTypesRange={TRIM_SIZES_TYPES_RANGE} />
              {/* 印刷部数 */}
              <PrintQuantity />
              {/* 本文の印刷方法 */}
              <TextPrintingMethod />
              {/* 本文用紙の種類 */}
              <TextPaperType trimSizeTypesRange={TRIM_SIZES_TYPES_RANGE} />
              {/* 本文ページ数 */}
              <PageCount />
              {/* 製本方法 */}
              <BindingMethod />
              {/* 表紙の印刷方法 */}
              <CoverPrintingMethod coverPaperTypesGroup={COVER_PAPER_TYPES_GROUP} />
              {/* 表紙用紙の種類 */}
              <CoverPaperType coverPaperTypesGroup={COVER_PAPER_TYPES_GROUP} coatingAvaiLable={COATING_AVAILABLE} />
              {/* 表紙用紙の種類 */}
              <InsideCoverPrintingMethod />
              {/* オプション加工 */}
              <OptionalFinishing coatingAvaiLable={COATING_AVAILABLE} />
            </div>
            <div className="order__pad">
              {/* 表紙用紙の種類 */}
              <OrderPad />
            </div>
          </div>
        </CalcProvider>
        <div className="btn">
          <button className="submit" name="" type="submit">お見積もり</button>
          <button className="rest" name="" type="reset" >リセット</button>
        </div>
      </div>
    </>
  );
};

export default AutoCalc;