import { useCalc, useCalcDispatch } from "../context/CalcContext";
import { useEffect } from "react";

const ResultCTP = ({
  getUnitCTPPrintingObject,
  unitCostOfPaperForKikuSize,
  getUnitCoverWrappingObject,
  unitBlackCTPCollation }) => {
  const state = useCalc();
  const dispatch = useCalcDispatch();

  // Black, CTP判定
  const isCTP = "CTP";
  
  // A4判定用フラグ
  const isA4 = state.trimSize.name === "A4";
  // カラー・モノクロ判定フラグ
  const is4CtoCover = state.coverPrintingMethod.name === "フルカラー印刷";
  const is4CtoText = state.textPrintingMethod.name === "フルカラー印刷";

  // 表紙のページ数 
  //   表1、2 => 2ページ
  //   表1、2、3、4 => 4ページ
  let coverPageCount = state.coverPrintingMethod.count ?? null;
  // 版型による1台に面付けするページ数の単位
  const unitPagesPerPlate = isA4 ? 8 : 16;

  // 表紙の台数はわざわざ算出しない。値は『1』です。
  // 表紙の通し数
  const coverPlateCount = coverPageCount / 2;
  // 本文の台数
  // 台の裏の半分のページ数なら2台に繰り上げる
  const textImpressionCount = state.pageCount % unitPagesPerPlate === 6 || state.pageCount % unitPagesPerPlate === 14
    ?  state.pageCount / unitPagesPerPlate + 0.125
    : state.pageCount / unitPagesPerPlate;
  // 本文の通し数
  const textPlateCount = textImpressionCount * 2;
  const unitCTPPrinting1C = getUnitCTPPrintingObject(state.printQuantity)
  const unitCTPPrinting4C = unitCTPPrinting1C * 4

  // 面付代
  const impositionFee = (coverPageCount + state.pageCount) * 100;
  // 刷版代
  const coverPlateFee = is4CtoCover ? coverPlateCount * 2500 * 4 : coverPlateCount * 2500;
  const textPlateFee = is4CtoText ? textPlateCount * 2500 * 4 : textPlateCount * 2500;
  const platesFee = coverPlateFee + textPlateFee;
  // 印刷代
  //   表紙台
  const unitCoverPrint = is4CtoCover ? unitCTPPrinting4C : unitCTPPrinting1C;
  const coverPrintFee = coverPlateCount * unitCoverPrint;
  //   本文
  const unitTextPrint = is4CtoText ? unitCTPPrinting4C : unitCTPPrinting1C;
  const TextPrintFee = textPlateCount * unitTextPrint;
  const printFee = coverPrintFee + TextPrintFee;
  // 用紙代
  const coverStockCost = state.coverPaperType.name
    ? unitCostOfPaperForKikuSize[state.coverPaperType.name] * state.printQuantity
    : null;
  const textStockCost = state.textPaperType.name
    ?  Math.ceil(textImpressionCount) * unitCostOfPaperForKikuSize[state.textPaperType.name] * state.printQuantity * 2
    : null;
  // 丁合代
  console.log()
  const collationFee = unitBlackCTPCollation[isCTP][unitPagesPerPlate] * state.printQuantity ;
  // 表紙巻代
  const unitCoverWrapping = getUnitCoverWrappingObject(state.printQuantity)[state.trimSize.name];
  const coverWrappingFee =  state.printQuantity * unitCoverWrapping;
  // 合計
  const resultFee = impositionFee + platesFee + printFee + coverStockCost + textStockCost + collationFee + coverWrappingFee;

  useEffect(() => {
    // stateの任意のプロパティが更新されると反応
    if (
      state.trimSize &&
      coverPageCount && 
      state.pageCount && 
      state.textPrintingMethod.name && 
      state.printQuantity
    ) {
      dispatch({
        item: "ctpResult",
        payload: { value: resultFee }
      });
    }
  }, [
    state.trimSize,
    coverPageCount,
    state.pageCount,
    state.textPrintingMethod.name,
    state.printQuantity,
    dispatch
  ]);

  return (
    <>
      <h3>CTP印刷</h3>
      <ul>
        <li>部数：{state.printQuantity}</li> 
        <li>表紙台の頁数：{state.coverPrintingMethod.count}</li> 
        <li>本文の頁数：{state.pageCount}</li> 
        <li>表紙通し数：{coverPlateCount}</li> 
        <li>本文通し数：{textPlateCount}</li> 
        <li>用紙代算出するため表紙台数：1</li> 
        <li>用紙代算出するため本文台数：{Math.ceil(textImpressionCount)}</li>
      </ul>
      <ul>
        <li>面付代：{impositionFee}円／単価（100円）× 総ページ数（{state.pageCount + coverPageCount}P）</li>
        <li>表紙台刷版代：{coverPlateFee}円／単価（2500円）× 版数（{is4CtoCover ? coverPlateCount * 4 : coverPlateCount}版）</li>
        <li>本文刷版代：{textPlateFee}円／単価（2500円）× 版数（{is4CtoText ? textPlateCount * 4 : textPlateCount}版）</li>
        <li>刷版代：{platesFee}円</li>
        <li>表紙台印刷代：{coverPrintFee}円／単価（{unitCoverPrint}円）× 通し数（{coverPlateCount}）</li>
        <li>本文印刷代：{TextPrintFee}円／単価（{unitTextPrint}円）× 通し数（{textPlateCount}）</li>
        <li>印刷代：{printFee}円／表紙台（{coverPrintFee}円）+ 本文（{TextPrintFee}円）</li>
        <li>表紙台用紙代：{coverStockCost}円／単価（{unitCostOfPaperForKikuSize[state.coverPaperType.name]}円）× 部数（{state.printQuantity}部）</li>
        <li>本文用紙代： {textStockCost}円／単価（{unitCostOfPaperForKikuSize[state.textPaperType.name]}円）× 台数（{Math.ceil(textImpressionCount)}）× 部数（{state.printQuantity}部）</li>
        <li>表紙巻代：{coverWrappingFee}円／単価（{unitCoverWrapping}円）× 部数（{state.printQuantity}部）</li>
        <li>丁合代：{collationFee}円／単価（{unitBlackCTPCollation[isCTP][unitPagesPerPlate]}円）× 部数（{state.printQuantity}部）</li>
        <li>小計：{state.ctpResult?.value}</li> 
      </ul>
    </>
  );
};

export default ResultCTP;

// console.log(state.textPaperType.name);
// console.log("部数", state.printQuantity);
// console.log("表紙台の頁数", state.coverPrintingMethod.count);
// console.log("表紙台の頁数", state.pageCount);
// console.log("表紙台数", coverPlateCount);
// console.log("本文台数", textImpressionCount);
// console.log("本文台数 = 本文通し数", textPlateCount);
// console.log("表紙用紙", state.coverPaperType.name);
// console.log("用紙単価", unitCostOfPaperForKikuSize[state.coverPaperType.name] ?? null);
// console.log("表紙用紙代", coverStockCost);
// console.log("本文用紙", state.textPaperType.name ?? null);
// console.log("用紙単価", unitCostOfPaperForKikuSize[state.textPaperType.name] ?? null);
// console.log("本文用紙代", textStockCost);
// console.log("面付け代", impositionFee);
// console.log("印刷代", printFee);
// console.log("表紙巻代", coverWrappingFee);
// console.log("丁合代", collationFee);