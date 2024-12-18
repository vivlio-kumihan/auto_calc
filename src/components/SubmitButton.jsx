import { useCalc } from "../context/CalcContext";
import { useEffect } from "react";

const SubmitButton = () => {
  const state = useCalc();

  console.log(state);
  // console.log(state.resultOutPut.itemToCalc.coverWrappingCalcMaterials);
  const ic = state.resultOutPut.itemToCalc ?? {};
  // const coverImposition = ic.coverImpositionCalcMaterials;
  // const textImposition = ic.textImpositionCalcMaterials;
  // const coverPlate = ic.coverPlateCalcMaterials;
  // const textPlate = ic.textPlateCalcMaterials;
  // const coverStockCost = ic.coverStockCostCalcMaterials;
  // const textStockCost = ic.textStockCostCalcMaterials;
  // const coverPrint = ic.coverPrintCalcMaterials;
  // const textPrint = ic.textPrintCalcMaterials;
  // const coverWrapping = ic.coverWrappingCalcMaterials;
  // const collation = ic.collationCalcMaterials;
  // console.log(coverPlate);

  // 計算するためのシート
  const otherOrderSheet = new Map();

  // "面付け（表紙）"
  const coverImposition = new Map();
  const coverImpositionUnitCost = ic.coverImpositionCalcMaterials?.unitCost ?? null;
  const coverImpositionPageCount = ic.coverImpositionCalcMaterials?.pageCount ?? null;
  coverImposition.set("単価", coverImpositionUnitCost);
  coverImposition.set("ページ数", coverImpositionPageCount);
  coverImposition.set("小計", coverImpositionUnitCost * coverImpositionPageCount);
  // "面付け（本文）"
  const textImposition = new Map();
  const textImpositionUnitCost = ic.textImpositionCalcMaterials?.unitCost ?? null;
  const textImpositionPageCount = ic.textImpositionCalcMaterials?.pageCount ?? null;
  textImposition.set("単価", textImpositionUnitCost);
  textImposition.set("ページ数", textImpositionPageCount);
  textImposition.set("小計", textImpositionUnitCost * textImpositionPageCount);
  // "刷版（表紙）"
  const coverPlate = new Map();
  const coverPlateCost = ic.coverPlateCalcMaterials?.unitCost ?? null;
  const coverPlateCount = ic.coverPlateCalcMaterials?.plateCount ?? null;
  coverPlate.set("単価", coverPlateCost);
  coverPlate.set("版数", coverPlateCount);
  coverPlate.set("小計", coverPlateCost * coverPlateCount);
  // "刷版（本文）"
  const textPlate = new Map();
  const textCost = ic.textPlateCalcMaterials?.unitCost ?? null;
  const textCount = ic.textPlateCalcMaterials?.plateCount ?? null;
  textPlate.set("単価", textCost);
  textPlate.set("版数", textCount);
  textPlate.set("小計", textCost * textCount);
  // "用紙（表紙）"
  const coverStockCost = new Map();
  const coverStockCostUnitCost = ic.coverStockCostCalcMaterials?.unitCost ?? null;
  const coverStockCostPrintQuantity = ic.coverStockCostCalcMaterials?.printQuantity ?? null;
  const coverStockCostsparePapers = ic.coverStockCostCalcMaterials?.sparePapers ?? null;
  coverStockCost.set("単価", coverStockCostUnitCost);
  coverStockCost.set("部数", coverStockCostPrintQuantity);
  coverStockCost.set("予備紙枚数", coverStockCostsparePapers);
  coverStockCost.set("小計", coverStockCostUnitCost * coverStockCostPrintQuantity * coverStockCostsparePapers);
  // "用紙（本文）"
  const textStockCost = new Map();
  const textStockCostUnitCost = ic.textStockCostCalcMaterials?.unitCost ?? null;
  const textStockCostImpressionCount = ic.textStockCostCalcMaterials?.impressionCount ?? null;
  const textStockCostPrintQuantity = ic.textStockCostCalcMaterials?.printQuantity ?? null;
  const textStockCostSparePapers = ic.textStockCostCalcMaterials?.sparePapers ?? null;
  textStockCost.set("単価", textStockCostUnitCost);
  textStockCost.set("枚数", textStockCostImpressionCount);
  textStockCost.set("部数", textStockCostPrintQuantity);
  textStockCost.set("予備紙枚数", textStockCostSparePapers);
  textStockCost.set("小計",  textStockCostUnitCost * textStockCostImpressionCount * textStockCostPrintQuantity + textStockCostUnitCost * textStockCostSparePapers);
  
  // "印刷（表紙）"
  const coverPrint = new Map();
  const coverPrintUnitCost = ic.coverPrintCalcMaterials?.unitCost ?? null;
  const coverPrintThroughCount = ic.coverPrintCalcMaterials?.throughCount ?? null;
  const coverPrintPrintQuantity = ic.coverPrintCalcMaterials?.printQuantity ?? null;
  coverPrint.set("単価", coverPrintUnitCost);
  coverPrint.set("通し", coverPrintThroughCount);
  coverPrint.set("部数", coverPrintPrintQuantity);
  coverPrint.set("小計", coverPrintUnitCost * coverPrintThroughCount * coverPrintPrintQuantity);
  // "印刷（本文）"
  const textPrint = new Map();
  const textPrintUnitCost = ic.textPrintCalcMaterials?.unitCost ?? null;
  const textPrintThroughCount = ic.textPrintCalcMaterials?.throughCount ?? null;
  const textPrintPrintQuantity = ic.textPrintCalcMaterials?.printQuantity ?? null;
  textPrint.set("単価", textPrintUnitCost);
  textPrint.set("通し", textPrintThroughCount);
  textPrint.set("部数", textPrintPrintQuantity);
  textPrint.set("小計", textPrintUnitCost * textPrintThroughCount * textPrintPrintQuantity);
  // "綴じ代（無線または中綴）"
  const coverWrapping = new Map();
  const coverWrappingUnitCost = ic.coverWrappingCalcMaterials?.unitCost ?? null;
  const coverWrappingPrintQuantity = ic.coverWrappingCalcMaterials?.printQuantity ?? null;
  coverWrapping.set("単価", coverWrappingUnitCost);
  coverWrapping.set("部数", coverWrappingPrintQuantity);
  coverWrapping.set("小計", coverWrappingUnitCost * coverWrappingPrintQuantity);
  
  // "本文丁合"
  const collation = new Map();
  const collationUnitCost = ic.collationCalcMaterials?.unitCost ?? null;
  const collationImpressionCount = ic.collationCalcMaterials?.impressionCount ?? null;
  const collationPrintQuantity = ic.collationCalcMaterials?.printQuantity ?? null;

  collation.set("単価", collationUnitCost);
  collation.set("通し", collationImpressionCount);
  collation.set("部数", collationPrintQuantity);
  collation.set("小計", collationUnitCost * collationImpressionCount * collationPrintQuantity);

  otherOrderSheet.set("面付け（表紙）", coverImposition);
  otherOrderSheet.set("面付け（本文）", textImposition);
  otherOrderSheet.set("刷版（表紙）", coverPlate);
  otherOrderSheet.set("刷版（本文）", textPlate);
  otherOrderSheet.set("用紙（表紙）", coverStockCost);
  otherOrderSheet.set("用紙（本文）", textStockCost);
  otherOrderSheet.set("印刷（表紙）", coverPrint);
  otherOrderSheet.set("印刷（本文）", textPrint);
  otherOrderSheet.set("綴じ代（無線または中綴）", coverWrapping);
  otherOrderSheet.set("本文丁合", collation);

  console.log(otherOrderSheet);

  return (
    <>
      <button className="submit" name="" type="submit">自費出版依頼へ</button>
      <button className="rest" name="" type="reset" >リセット</button>
    </>
  );
};

export default SubmitButton;
