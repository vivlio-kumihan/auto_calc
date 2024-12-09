import { useCalc, useCalcDispatch } from "../context/CalcContext";
import { useEffect } from "react";

const ResultBlack = ({
  unitBlackPrinting,
  getUnitCtpBlackPrintingObject,
  unitCostOfPaperForASize,
  getUnitCoverWrappingObject,
  unitBlackCTPCollation,
  }) => {
  const state = useCalc();
  const dispatch = useCalcDispatch();

  // Black, CTP判定
  const isCTP = "BLACK";
  
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
    ?  state.pageCount / unitPagesPerPlate + 0.25
    : state.pageCount / unitPagesPerPlate;
  // 本文の通し数
  const textPlateCount = textImpressionCount * 2;
  const unitBlackPlatePrinting = getUnitCtpBlackPrintingObject(state.printQuantity, unitBlackPrinting)

  // 面付代
  const impositionFee = (coverPageCount + state.pageCount) * 100;
  // 刷版代
  const coverPlateFee = coverPlateCount * 350;
  const textPlateFee = textPlateCount * 350;
  const platesFee = coverPlateFee + textPlateFee;
  // 印刷代
  //   表紙台
  const coverPrintFee = coverPlateCount * unitBlackPlatePrinting;
  //   本文
  const TextPrintFee = textPlateCount * unitBlackPlatePrinting;
  const printFee = coverPrintFee + TextPrintFee;
  // 用紙代
  const coverStockCost = state.coverPaperType.name
    ? unitCostOfPaperForASize[state.coverPaperType.name] * state.printQuantity
    : null;
  const textStockCost = state.textPaperType.name
    ?  Math.ceil(textImpressionCount) * unitCostOfPaperForASize[state.textPaperType.name] * state.printQuantity * 2
    : null;
  // 丁合代
  // 4がけで300部以下ならという条件で単価を振り分ける。
  const unitBlackCollation = unitPagesPerPlate === 4 
    ? state.printQuantity <= 300
      ? unitBlackCTPCollation[isCTP][4][0]
      : unitBlackCTPCollation[isCTP][4][1]
    : unitBlackCTPCollation[isCTP][8];
  const collationFee = unitBlackCollation * textImpressionCount * state.printQuantity; 
  // 綴じ代
  // 表紙巻の単価
  const unitCoverWrapping = state.bindingMethod === "無線綴じ製本"
    ? getUnitCoverWrappingObject(state.printQuantity)[state.trimSize.name]
    : 3;
  // 綴じ代合計
  const coverWrappingFee = unitCoverWrapping * Math.ceil(textImpressionCount) * state.printQuantity;
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
        item: "blackResult",
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
      <h3>Black印刷</h3>
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
        <li>表紙台刷版代：{coverPlateFee}円／単価（350円）× 版数（{coverPlateCount}版）</li>
        <li>本文刷版代：{textPlateFee}円／単価（350円）× 版数（{textPlateCount}版）</li>
        <li>刷版代：{platesFee}円</li>
        <li>表紙台印刷代：{coverPrintFee}円／単価（{unitBlackPlatePrinting}円）× 通し数（{coverPlateCount}）</li>
        <li>本文印刷代：{TextPrintFee}円／単価（{unitBlackPlatePrinting}円）× 通し数（{textPlateCount}）</li>
        <li>印刷代：{printFee}円／表紙台（{coverPrintFee}円）+ 本文（{TextPrintFee}円）</li>
        <li>表紙台用紙代：{coverStockCost}円／単価（{unitCostOfPaperForASize[state.coverPaperType.name]}円）× 部数（{state.printQuantity}部）</li>
        <li>本文用紙代： {textStockCost}円／単価（{unitCostOfPaperForASize[state.textPaperType.name]}円）× 台数（{Math.ceil(textImpressionCount)}）× 部数（{state.printQuantity}部）</li>
        <li>綴じ代（無線または中綴）：{coverWrappingFee}円／単価（{unitCoverWrapping}円）× 台数（{Math.ceil(textImpressionCount)}台）× 部数（{state.printQuantity}部）</li>
        <li>丁合代：{collationFee}円／単価（{unitBlackCollation}円）× 台数（{textImpressionCount}台）× 部数（{state.printQuantity}部）</li>
        <li>小計：{state.blackResult?.value}</li> 
      </ul>
    </>
  );
};

export default ResultBlack;