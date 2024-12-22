import { useCalc, useCalcDispatch } from "../context/CalcContext";
import { useEffect } from "react";

const ResultBlack = ({
  unitBlackPrinting,
  getUnitCtpBlackPrintingObject,
  unitCostOfPaperForASize,
  coloredBondPaper150180Asize,
  getUnitColoredBondPaper,
  unitBlackCTPCollation,
  getCoverWrappingItem
  }) => {
  const state = useCalc();
  const dispatch = useCalcDispatch();

  // Black, CTP判定
  const isPlate = "BLACK";
  
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
  const unitBlackPlatePrinting = getUnitCtpBlackPrintingObject(state.printQuantity, unitBlackPrinting)

  // 面付代
  const impositionFee = (coverPageCount + state.pageCount) * 100;
  // 刷版代
  const coverPlateCalcFee = coverPlateCount * 350;
  const textPlateFee = textPlateCount * 350;
  const platesFee = coverPlateCalcFee + textPlateFee;
  // 印刷代
  //   表紙台
  const coverPrintFee = coverPlateCount * unitBlackPlatePrinting;
  //   本文
  const textPrintFee = textPlateCount * unitBlackPlatePrinting;
  const printFee = coverPrintFee + textPrintFee;
  // 用紙代
  const coverPaperUnitCost = state.coverPaperType.name === "色上質最厚口"
    ? getUnitColoredBondPaper(state.printQuantity, coloredBondPaper150180Asize)
    : unitCostOfPaperForASize[state.coverPaperType.name];
  const coverStockCostFee = state.coverPaperType.name
    ? coverPaperUnitCost * state.printQuantity + coverPaperUnitCost * 50
    : null;
  const textPaperCost = unitCostOfPaperForASize[state.textPaperType.name];
  const textStockCostFee = state.textPaperType.name
    ? Math.ceil(textImpressionCount) * textPaperCost * state.printQuantity + textPaperCost * 50
    : null;
  // 丁合代
  // 4がけで300部以下ならという条件で単価を振り分ける。
  const unitBlackCollation = unitPagesPerPlate === 4 
    ? state.printQuantity <= 300
      ? unitBlackCTPCollation[isPlate][4][0]
      : unitBlackCTPCollation[isPlate][4][1]
    : unitBlackCTPCollation[isPlate][8];
  const collationFee = Math.ceil(textImpressionCount) * unitBlackCollation * state.printQuantity; 
  // 綴じ代
  const coverWrappingItem = getCoverWrappingItem(
    state.bindingMethod.name, 
    state.printQuantity, 
    state.trimSize.name, 
  );
  // 綴じ単価
  const unitCoverWrapping = coverWrappingItem.unitCoverWrap;
  // 綴じ合計
  const coverWrappingFee = coverWrappingItem.sumResult;
  // 合計
  const resultFee = impositionFee + platesFee + printFee + coverStockCostFee + textStockCostFee + collationFee + coverWrappingFee;

    // 見積もり計算で必要になるprops
  const blackOutCalcItems = {
    // 面付け（表紙）
    coverImpositionCalcMaterials: { unitCost: 100, pageCount: coverPageCount },
    // 面付け（本文）
    textImpositionCalcMaterials: { unitCost: 100, pageCount: state.pageCount },
    // 刷版（表紙）
    coverPlateCalcMaterials: { unitCost: 350, plateCount: coverPlateCount },
    // 刷版（本文）
    textPlateCalcMaterials: { unitCost: 350, plateCount: textPlateCount },
    // 用紙（表紙）
    coverStockCostCalcMaterials: { 
      unitCost: unitCostOfPaperForASize[state.coverPaperType.name]
        ? unitCostOfPaperForASize[state.coverPaperType.name]
        : null, 
      printQuantity: state.printQuantity, 
      sparePapers: 50 
    },
    // 用紙（本文）
    textStockCostCalcMaterials: { 
      unitCost: unitCostOfPaperForASize[state.textPaperType.name]
        ? unitCostOfPaperForASize[state.textPaperType.name]
        : null, 
      impressionCount: Math.ceil(textImpressionCount), 
      printQuantity: state.printQuantity, 
      sparePapers: 50 
    },
    // 印刷（表紙）
    coverPrintCalcMaterials: { unitCost: unitBlackPlatePrinting, throughCount: coverPlateCount },
    // 印刷（本文）
    textPrintCalcMaterials: { unitCost: unitBlackPlatePrinting, throughCount: textPlateCount },
    // 綴じ代（無線または中綴）
    coverWrappingCalcMaterials: { unitCost: unitCoverWrapping, printQuantity: state.printQuantity },
    // 本文丁合
    collationCalcMaterials: { 
      unitCost: unitBlackCollation, 
      impressionCount: Math.ceil(textImpressionCount), 
      printQuantity: state.printQuantity },
  };

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
        payload: { name: "ブラックマスター出力", value: resultFee, blackOutCalcItems: blackOutCalcItems }
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
        <li>表紙台刷版代：{coverPlateCalcFee}円／単価（350円）× 版数（{coverPlateCount}版）</li>
        <li>本文刷版代：{textPlateFee}円／単価（350円）× 版数（{textPlateCount}版）</li>
        <li>刷版代：{platesFee}円</li>
        <li>表紙台印刷代：{coverPrintFee}円／単価（{unitBlackPlatePrinting}円）× 通し数（{coverPlateCount}）</li>
        <li>本文印刷代：{textPrintFee}円／単価（{unitBlackPlatePrinting}円）× 通し数（{textPlateCount}）</li>
        <li>印刷代：{printFee}円／表紙台（{coverPrintFee}円）+ 本文（{textPrintFee}円）</li>
        <li>表紙台用紙代：{coverStockCostFee}円／単価（{coverPaperUnitCost}円）× 部数（{state.printQuantity}部）</li>
        <li>本文用紙代： {textStockCostFee}円／単価（{unitCostOfPaperForASize[state.textPaperType.name]}円）× 台数（{Math.ceil(textImpressionCount)}）× 部数（{state.printQuantity}部）</li>
        <li>綴じ代（無線または中綴）：{coverWrappingFee}円／単価（{unitCoverWrapping}円）× 部数（{state.printQuantity}部）</li>
        <li>丁合代：{collationFee}円／単価（{unitBlackCollation}円）× 台数（{Math.ceil(textImpressionCount)}台）× 部数（{state.printQuantity}部）</li>
        
        <li>小計：{state.blackResult?.value}</li> 
      </ul>
    </>
  );
};

export default ResultBlack;