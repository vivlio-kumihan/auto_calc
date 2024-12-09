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
import ResultOnDemand from "./components/ResultOnDemand.jsx";
import ResultCTP from "./components/ResultCTP.jsx";
import ResultBlack from "./components/ResultBlack.jsx";

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
    types: ["上質 135kg", "色上質最厚口", "レザック 175kg"] },
  { group: "特殊紙 その他",
    types: ["OKカイゼル 白 155kg", "しこくてんれい ゆき 180kg", "両更クラフト紙 129.5kg"] }
];

// 表紙で使用可能な用紙種類 4C
const COVER_PAPER_TYPES_PRINTED_4C = [
  { group: "上質・色上質・色ファンシー",
    types: ["上質 135kg", "色上質最厚口", "レザック 175kg"] },
  { group: "艶ありコート・アート・キャスト",
    types: ["コート 110kg", "コート 135kg", "アートポスト 200kg", "ミラーコート 220kg"] },
  { group: "艶なしマットコート・ダル",
    types: ["マットコート 90kg", "マットコート 135kg", "サテン金藤 180kg", "マットポスト 220kg"] },
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
  "アートポスト 200kg",
  "ミラーコート 220kg",
  "サテン金藤 180kg",
  "マットポスト 220kg",
  "アラベール スノーホワイト 160kg",
  "アラベール ナチュラル 160kg",
  "ペルーラ スノーホワイト 180kg",
  "ミランダ スノーホワイト 170kg",
  "エスプリコートVNエンボス アラレ 176.5kg",
  "しこくてんれい ゆき 180kg"
];

const UNIT_COST_OF_PAPER_FOR_ASize = {
  "上質 55kg": 2.6, "上質 70kg": 3.1, "上質 90kg": 4.1, "上質 135kg": 6.0,
  "コート 90kg": 4.2, "コート 110kg": 5.1, "コート 135kg": 6.1,
  "マットコート 90kg": 4.3, "マットコート 110kg": 5.2, "マットコート 135kg": 6.3,
};

const UNIT_COST_OF_PAPER_FOR_KikuSize = {
  "上質 55kg": 5.6, "上質 70kg": 6.6, "上質 90kg": 8.8, "上質 135kg": 12.8,
  "コート 90kg": 9.2, "コート 110kg": 11, "コート 135kg": 13.2,
  "マットコート 90kg": 9.4, "マットコート 110kg": 11.2, "マットコート 135kg": 13.6,
};

// 表紙巻の単価　部数『未満』の値
const UNIT_COVER_WRAPPING = {
  500: { A4: 15, B5: 14, A5: 13, A6: 13, B6: 13 },
  600: { A4: 14, B5: 13, A5: 12, A6: 12, B6: 12 },
  700: { A4: 13, B5: 12, A5: 11, A6: 11, B6: 11 },
  800: { A4: 12, B5: 11, A5: 10, A6: 10, B6: 10 },
  900: { A4: 11, B5: 10, A5: 9,  A6: 9, B6:9 },
  1000: { A4: 10, B5: 9, A5: 8,  A6: 8, B6:8 },
};

function getUnitCoverWrappingObject(value) {
  if (value < 500) return UNIT_COVER_WRAPPING[500];
  if (value >= 1000) return UNIT_COVER_WRAPPING[1000];

  // 計算して対応するキーを選択
  // 3桁以下の数字しか入らないことを前提。
  const key = Math.ceil(value / 100) * 100;
  return UNIT_COVER_WRAPPING[key];
}

const UNIT_CTP_PRINTING = {
  500: 2200, 600: 2300, 700: 2400, 800: 2500, 900: 2600, 
  1000: 2700, 1100: 2800, 1200: 2900, 1300: 3000, 1400: 3100, 1500: 3200, 1600: 3300, 1700: 3400, 1800: 3500, 1900: 3600, 
  2000: 3700, 2100: 3800, 2200: 3900, 2300: 4000, 2400: 4200, 2500: 4200, 2600: 4300, 2700: 4400, 2800: 4500, 2900: 4600, 
  3000: 4700, 4000: 5450, 5000: 6150, 6000: 6800, 7000: 7400, 8000: 7800, 9000: 8200, 10000: 8500,
};

const UNIT_BLACK_PRINTING = {
  100: 400, 200: 500, 300: 600, 400: 700, 500: 800, 600: 900, 700: 1000, 800: 1080, 900: 1150, 
  1000: 1230, 2000: 1500
};

function getUnitCtpBlackPrintingObject(value, obj) {
  const keys = Object.keys(obj).map(Number).sort((a, b) => a - b);
  const closestKey = keys.find(key => key >= value);
  return closestKey !== undefined ? obj[closestKey] : null;
}

const UNIT_BLACK_CTP_COLLATION = {
  BLACK: { 4: [1.7, 1.6], 8: 2.5 },
  CTP: { 8: 3, 16: 3.3}
};

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
              {/* 注文内容 */}
              <OrderPad />
              <ResultBlack
                unitBlackPrinting={UNIT_BLACK_PRINTING}
                getUnitCtpBlackPrintingObject={getUnitCtpBlackPrintingObject}
                unitCostOfPaperForASize={UNIT_COST_OF_PAPER_FOR_ASize}
                getUnitCoverWrappingObject= {getUnitCoverWrappingObject}
                unitBlackCTPCollation= {UNIT_BLACK_CTP_COLLATION}
              />
              <ResultCTP 
                unitCtpPrinting={UNIT_CTP_PRINTING}
                getUnitCtpBlackPrintingObject={getUnitCtpBlackPrintingObject}
                unitCostOfPaperForKikuSize={UNIT_COST_OF_PAPER_FOR_KikuSize}
                getUnitCoverWrappingObject= {getUnitCoverWrappingObject}
                unitBlackCTPCollation= {UNIT_BLACK_CTP_COLLATION}
              />
              <ResultOnDemand 
                unitCostOfPaperForASize={UNIT_COST_OF_PAPER_FOR_ASize}
                getUnitCoverWrappingObject= {getUnitCoverWrappingObject}
              />
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