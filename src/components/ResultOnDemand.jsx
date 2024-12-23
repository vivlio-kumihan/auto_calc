import { useCalc, useCalcDispatch } from "../context/CalcContext";
import { useEffect } from "react";

const ResultOnDemand = ({ 
  unitCostOfPaperForASize, 
  coloredBondPaper150180Asize,
  getUnitColoredBondPaper,
  getCoverWrappingItem
  }) => {
  const state = useCalc();
  const dispatch = useCalcDispatch();
  
  // オンデマンド印刷というだけで1000円チャージ料金発生。この分を増額。
  const basicFee = 1000;
  // A4判定用フラグ　真偽値が入る。
  const isA4B5 = state.trimSize.name === "A4" || state.trimSize.name === "B5";
  // 表紙のページ数 
  //   表1、2 => 2ページ
  //   表1、2、3、4 => 4ページ
  let coverPageCount = state.coverPrintingMethod.count ?? null;
  // 版型によって1台に面付けできるページ数
  const unitPagesPerPlate = isA4B5 ? 4 : 8;

  // 表紙の台数はわざわざ算出しない。値は『1』です。
  // 表紙の通し数
  //   表1、2 => 表面だけ『1回』通したら印刷できる。
  //   表1、2、3、4 => 裏表面の『2回』通したら印刷できる。
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
  const unitTextPrint = state.textPrintingMethod.name === "フルカラー印刷" ? 30 : 10;
  const textPrintFee = textPlateCount * unitTextPrint * state.printQuantity;
  const printFee = coverPrintFee + textPrintFee;
  // 用紙代
  const coverPaperUnitCost = state.coverPaperType.name === "色上質最厚口"
    ? getUnitColoredBondPaper(state.printQuantity, coloredBondPaper150180Asize)
    : unitCostOfPaperForASize[state.coverPaperType.name];
  const coverStockCostFee = state.coverPaperType.name
    ? isA4B5 
      ? coverPaperUnitCost * state.printQuantity + coverPaperUnitCost * 20
      : coverPaperUnitCost * (state.printQuantity / 2) + coverPaperUnitCost * 20
    : null;
  const textPaperCost = unitCostOfPaperForASize[state.textPaperType.name];
  const textStockCostFee = state.textPaperType.name
    ? textPaperCost * Math.ceil(textImpressionCount) * state.printQuantity + textPaperCost * 20
    : null;
  // 丁合代の単価『1円』
  const collationFee = 1 * Math.ceil(textImpressionCount) * state.printQuantity;
  // 綴じ代
  const coverWrappingItem = getCoverWrappingItem(
                              state.bindingMethod.name, 
                              state.printQuantity, 
                              state.trimSize.name, 
                              textImpressionCount
  );
  const unitCoverWrapping = coverWrappingItem.unitCoverWrap;
  const coverWrappingFee = coverWrappingItem.sumResult;
  // 合計
  const resultFee = basicFee 
                    + impositionFee 
                    + printFee 
                    + coverStockCostFee 
                    + textStockCostFee 
                    + collationFee 
                    + coverWrappingFee;

  // 見積もり計算で必要になるprops
  const ondemandOutCalcItems = {
    // 面付け（表紙）
    coverImpositionCalcMaterials: { unitCost: 20, pageCount: coverPageCount },
    // 面付け（本文）
    textImpositionCalcMaterials: { unitCost: 20, pageCount: state.pageCount },
    // 用紙（表紙）
    coverStockCostCalcMaterials: { 
      unitCost: coverPaperUnitCost ? coverPaperUnitCost : null, 
      printQuantity: isA4B5 ? state.printQuantity : state.printQuantity / 2, 
      sparePapers: 20 },
    // 用紙（本文）
    textStockCostCalcMaterials: { 
      unitCost: textPaperCost ? textPaperCost : null, 
      impressionCount: Math.ceil(textImpressionCount), 
      printQuantity: state.printQuantity, 
      sparePapers: 20 },
    // 印刷（表紙）
    coverPrintCalcMaterials: { 
      unitCost: state.textPrintingMethod.name === "フルカラー印刷" ? 30 : 10, 
      throughCount: coverPlateCount, 
      printQuantity: state.printQuantity },
    // 印刷（本文）
    textPrintCalcMaterials: { 
      unitCost: state.textPrintingMethod.name === "フルカラー印刷" ? 30 : 10, 
      throughCount: textPlateCount, 
      printQuantity: state.printQuantity },
    // 綴じ代（無線または中綴）
    coverWrappingCalcMaterials: { unitCost: unitCoverWrapping, printQuantity: state.printQuantity },
    // 本文丁合
    collationCalcMaterials: { 
      unitCost: 1, 
      impressionCount: Math.ceil(textImpressionCount), 
      printQuantity: state.printQuantity },
  };

  useEffect(() => {
    // stateの任意のプロパティが更新されると反応
    // !== => 非同期の対応
    // なお、これをすると、入力をしないと小計は0になる。
    if (
      coverPaperUnitCost !== undefined &&
      textPaperCost !== undefined &&  
      coverWrappingItem.unitCoverWrap !== undefined &&  
      state.trimSize &&
      coverPageCount && 
      state.pageCount && 
      state.textPrintingMethod.name && 
      state.printQuantity
    ) {
      dispatch({
        item: "onDemandResult",
        payload: { name: "オンデマンド出力", value: resultFee, ondemandOutCalcItems: ondemandOutCalcItems }
      });
    }
  }, [
    coverPaperUnitCost,
    textPaperCost,
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
        <li>表紙用紙費用を算出するための枚数：1</li> 
        <li>本文用紙費用を算出するための枚数：{Math.ceil(textImpressionCount)}</li>
      </ul>
      <ul>
        <li>面付費用：{impositionFee}円／単価（20円）× 総ページ数（{state.pageCount + coverPageCount}P）</li>
        <li>表紙台印刷費用：{coverPrintFee}円／単価（{unitCoverPrint}円）× 通し数（{coverPlateCount}）× 部数（{state.printQuantity}部）</li>
        <li>本文印刷費用：{textPrintFee}円／単価（{unitTextPrint}円）× 通し数（{textPlateCount}）× 部数（{state.printQuantity}部）</li>
        <li>印刷費用：{printFee}円／表紙台（{coverPrintFee}円）+ 本文（{textPrintFee}円）</li>
        <li>表紙台用紙費用：{coverStockCostFee}円／単価（{coverPaperUnitCost}円）× 枚数（{isA4B5 ? state.printQuantity : state.printQuantity / 2}枚）</li>
        <li>本文用紙費用：{textStockCostFee}円／単価（{textPaperCost}円）× 枚数（{Math.ceil(textImpressionCount)}枚）× 部数（{state.printQuantity}部）</li>
        <li>綴じ費用（無線または中綴）：{coverWrappingFee}円／単価（{unitCoverWrapping}円）× 部数（{state.printQuantity}部）</li>        
        <li>丁合費用：{collationFee}円／単価（1円）× 台数（{Math.ceil(textImpressionCount)}台）× 部数（{state.printQuantity}部）</li>        
        <li>小計：{state.onDemandResult?.value}</li> 
      </ul>
    </>
  );
};

export default ResultOnDemand;