import { useCalc, useCalcDispatch } from "../context/CalcContext";
import { useEffect } from "react";

const ResultOnDemand = ({ unitCostOfPaper, getUnitCoverWrappingObject }) => {
  const state = useCalc();
  const dispatch = useCalcDispatch();
  
  // A4判定用フラグ
  const isA4 = state.trimSize.name === "A4";
  // 表紙のページ数 
  //   表1、2 => 2ページ
  //   表1、2、3、4 => 4ページ
  let coverPageCount = state.coverPrintingMethod.count ?? null;
  // 版型による1台に面付けするページ数の単位
  const unitPagesPerPlate = isA4 ? 4 : 8;

  // 表紙の台数はわざわざ算出しない。値は『1』です。
  // 表紙の通し数
  const coverPlateCount = coverPageCount / 2;
  // 本文の台数
  // 台の裏の半分のページ数なら2台に繰り上げる
  const textImpressionCount = state.pageCount % unitPagesPerPlate === 6
    ? state.pageCount / unitPagesPerPlate + 0.25
    : state.pageCount / unitPagesPerPlate;
  // 本文の通し数
  const textPlateCount = textImpressionCount * 2;

  // 面付代
  const impositionFee = (coverPageCount + state.pageCount) * 20;
  // 印刷代
  const unitCoverPrint = state.coverPrintingMethod.name === "フルカラー印刷" ? 30 : 10;
  const coverPrintFee = coverPlateCount * unitCoverPrint * state.printQuantity;
  const unitMonoPrint = state.textPrintingMethod.name === "フルカラー印刷" ? 30 : 10;
  const TextPrintFee = textPlateCount * unitMonoPrint * state.printQuantity;
  const printFee = coverPrintFee + TextPrintFee;
  // 用紙代
  const coverStockCost = state.coverPaperType.name
    ? unitCostOfPaper[state.coverPaperType.name] * state.printQuantity
    : null;
  const textStockCost = state.textPaperType.name
    ?  Math.ceil(textImpressionCount) * unitCostOfPaper[state.textPaperType.name] * state.printQuantity
    : null;
  // 丁合代
  const collationFee = state.printQuantity * 1;
  // 表紙巻代
  const unitCoverWrapping = getUnitCoverWrappingObject(state.printQuantity)[state.trimSize.name];
  const coverWrappingFee =  state.printQuantity * unitCoverWrapping;
  // 合計
  const resultFee = impositionFee + printFee + coverStockCost + textStockCost + collationFee + coverWrappingFee;

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
        item: "onDemandResult",
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
      <h3>オンデマンド印刷</h3>
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
        <li>面付代：{impositionFee}円／単価（20円）× 総ページ数（{state.pageCount + coverPageCount}P）</li>
        <li>表紙台印刷代：{coverPrintFee}円／単価（{unitCoverPrint}円）× 通し数（{coverPlateCount}）× 部数({state.printQuantity}部)</li>
        <li>本文印刷代：{TextPrintFee}円／単価（{unitMonoPrint}円）× 通し数（{textPlateCount}）× 部数({state.printQuantity}部)</li>
        <li>印刷代：{printFee}円／表紙台（{coverPrintFee}円）+ 本文（{TextPrintFee}円）</li>
        <li>表紙台用紙代：{coverStockCost}円／単価（{unitCostOfPaper[state.coverPaperType.name]}円）× 部数({state.printQuantity}部)</li>
        <li>本文用紙代：{textStockCost}円／台数（{Math.ceil(textImpressionCount)}）× 単価（{unitCostOfPaper[state.textPaperType.name]}円）× 部数({state.printQuantity}部)</li>
        <li>表紙巻代：{coverWrappingFee}円／単価（{unitCoverWrapping}円）× 部数({state.printQuantity}部)</li>
        <li>丁合代：{collationFee}円／単価（1円）× 部数({state.printQuantity}部)</li>
        <li>小計：{state.onDemandResult?.value}</li> 
      </ul>
    </>
  );
};

export default ResultOnDemand;

// console.log(state.textPaperType.name);
// console.log("部数", state.printQuantity);
// console.log("表紙台の頁数", state.coverPrintingMethod.count);
// console.log("表紙台の頁数", state.pageCount);
// console.log("表紙台数", coverPlateCount);
// console.log("本文台数", textImpressionCount);
// console.log("本文台数 = 本文通し数", textPlateCount);
// console.log("表紙用紙", state.coverPaperType.name);
// console.log("用紙単価", unitCostOfPaper[state.coverPaperType.name] ?? null);
// console.log("表紙用紙代", coverStockCost);
// console.log("本文用紙", state.textPaperType.name ?? null);
// console.log("用紙単価", unitCostOfPaper[state.textPaperType.name] ?? null);
// console.log("本文用紙代", textStockCost);
// console.log("面付け代", impositionFee);
// console.log("印刷代", printFee);
// console.log("表紙巻代", coverWrappingFee);
// console.log("丁合代", collationFee);