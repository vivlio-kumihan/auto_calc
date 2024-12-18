版型 => trimSize: state.trimSize.name,
部数  => printQuantity: state.printQuantity,
最終出力  => outPutMethod: state.resultOutPut.name
表紙の印刷方法  => coverPrintingMethod: state.coverPrintingMethod.name,
本文の印刷方法  => textPrintingMethod: state.textPrintingMethod.name,
表紙ページ数  => coverPageCount: state.coverPrintingMethod.count,
本文ページ数  => textPageCount: state.pageCount,
表紙の用紙  => coverPaperType: state.coverPaperType.name,
本文の用紙  => textPaperType: state.textPaperType.name,
綴じ方向  => bindingDirection: state.bindingDirection,
綴じ方法  => bindingMethod: state.bindingMethod,
表紙PP加工  => ppCoating: state.ppCoating.name,
横綴じ  => horizontalBinding: state.horizontalBinding,
MSWord（ワード）入稿  => submissionInMSWordFormat: state.submissionInMSWordFormat
費用  => state.resultOutPut.value


"面付け（表紙）"
coverImpositionCalcMaterials: 
{ unitCost: 100, pageCount: coverPageCount },
"面付け（本文）"
textImpositionCalcMaterials: 
{ unitCost: 100, pageCount: state.pageCount },
"刷版（表紙）"
coverPlateCalcMaterials: 
{ unitCost: 2500, plateCount: is4CtoCover ? coverPlateCount * 4 : coverPlateCount },
"刷版（本文）"
textPlateCalcMaterials: 
{ unitCost: 2500, plateCount: is4CtoText ? textPlateCount * 4 : textPlateCount },
"用紙（表紙）"
coverStockCostCalcMaterials: 
{ unitCost: unitCostOfPaperForKikuSize[state.coverPaperType.name], printQuantity: state.printQuantity },
"用紙（本文）"
textStockCostCalcMaterials: 
{ unitCost: unitCostOfPaperForKikuSize[state.textPaperType.name], impressionCount: Math.ceil(textImpressionCount), printQuantity: state.printQuantity },
"印刷（表紙）"
coverPrintCalcMaterials: 
{ unitCost: unitCoverPrint, throughCount: coverPlateCount },
"印刷（本文）"
textPrintCalcMaterials: 
{ unitCost: unitTextPrint, throughCount: textPlateCount },
"綴じ代（無線または中綴）"
coverWrappingCalcMaterials: 
{ unitCost: unitCoverWrapping, printQuantity: state.printQuantity },
"本文丁合"
collationCalcMaterials: 
{ unitCost: unitBlackCTPCollation[isPlate][unitPagesPerPlate], printQuantity: state.printQuantity },



const mainOrderSheet = new Map();
mainOrderSheet.set("版型", state.trimSize.name);
mainOrderSheet.set("部数", state.printQuantity);
mainOrderSheet.set("最終出力", state.resultOutPut.nam);
mainOrderSheet.set("表紙の印刷方法", state.coverPrintingMethod.name);
mainOrderSheet.set("本文の印刷方法", state.textPrintingMethod.name);
mainOrderSheet.set("表紙ページ数", state.coverPrintingMethod.count);
mainOrderSheet.set("本文ページ数", state.pageCount);
mainOrderSheet.set("表紙の用紙", state.coverPaperType.name);
mainOrderSheet.set("本文の用紙", state.textPaperType.name);
mainOrderSheet.set("綴じ方向", state.bindingDirection);
mainOrderSheet.set("綴じ方法", state.bindingMethod);
mainOrderSheet.set("表紙PP加工", state.ppCoating.name);
mainOrderSheet.set("横綴じ", state.horizontalBinding);
mainOrderSheet.set("MSWord（ワード）入稿", state.submissionInMSWordFormat);
mainOrderSheet.set("費用", state.resultOutPut.value);


const otherOrderSheet = new Map();

"面付け（表紙）"
const coverImposition = new Map();
coverImposition.set("単価", 100);
coverImposition.set("ページ数", coverPageCount);
coverImposition.set("小計", 100 * coverPageCount);
"面付け（本文）"
const textImposition = new Map();
textImposition.set("単価", 100);
textImposition.set("ページ数", state.pageCount);
textImposition.set("小計", 100 * coverPageCount);
"刷版（表紙）"
const coverPlate = new Map();
coverPlate.set("単価", 2500);
coverPlate.set("版数", is4CtoCover ? coverPlateCount * 4 : coverPlateCount);
coverPlate.set("小計", 2500 * is4CtoCover ? coverPlateCount * 4 : coverPlateCount);
"刷版（本文）"
const textPlate = new Map();
textPlate.set("単価", 2500);
textPlate.set("版数", is4CtoText ? textPlateCount * 4 : textPlateCount);
textPlate.set("小計", 2500 * is4CtoText ? textPlateCount * 4 : textPlateCount);
"用紙（表紙）"
const coverStockCostCalcMaterials = new Map();
coverStockCostCalcMaterials.set("単価", unitCostOfPaperForKikuSize[state.coverPaperType.name]);
coverStockCostCalcMaterials.set("部数", state.printQuantity);
coverStockCostCalcMaterials.set("小計", unitCostOfPaperForKikuSize[state.coverPaperType.name] * state.printQuantity);
"用紙（本文）"
const textStockCostCalcMaterials = new Map();
textStockCostCalcMaterials.set("単価", unitCostOfPaperForKikuSize[state.textPaperType.name]);
textStockCostCalcMaterials.set("枚数", Math.ceil(textImpressionCount));
textStockCostCalcMaterials.set("部数", state.printQuantity);
textStockCostCalcMaterials.set("小計", unitCostOfPaperForKikuSize[state.textPaperType.name] * Math.ceil(textImpressionCount) * state.printQuantity);
"印刷（表紙）"
const coverPrint = new Map();
coverPrint.set("単価", unitCoverPrint);
coverPrint.set("通し", coverPlateCount);
coverPrint.set("小計", unitCoverPrint * coverPlateCount);
"印刷（本文）"
const textPrint = new Map();
textPrint.set("単価", unitTextPrint);
textPrint.set("通し", textPlateCount);
textPrint.set("小計", unitTextPrint * textPlateCount);
"綴じ代（無線または中綴）"
const coverWrapping = new Map();
coverWrapping.set("単価", unitCoverWrapping);
coverWrapping.set("部数", state.printQuantity);
coverWrapping.set("小計", unitCoverWrapping * state.printQuantity);
"本文丁合"
const collation = new Map();
collation.set("単価", unitBlackCTPCollation[isPlate][unitPagesPerPlate]);
collation.set("部数", state.printQuantity);
collation.set("小計", unitBlackCTPCollation[isPlate][unitPagesPerPlate] * state.printQuantity);

otherOrderSheet.set("面付け（表紙）", coverImposition);
otherOrderSheet.set("面付け（本文）", textImposition);
otherOrderSheet.set("刷版（表紙）", coverPlate);
otherOrderSheet.set("刷版（本文）", textPlate);
otherOrderSheet.set("用紙（表紙）", coverStockCostCalcMaterials);
otherOrderSheet.set("用紙（本文）", textStockCostCalcMaterials);
otherOrderSheet.set("印刷（表紙）", coverPrint);
otherOrderSheet.set("印刷（本文）", textPrint);
otherOrderSheet.set("綴じ代（無線または中綴）", coverWrapping);
otherOrderSheet.set("本文丁合", collation);

console.log(otherOrderSheet);


最終出力をstateに結びつけ必要

fee: impositionFee, unitCost: 100, pageCount: coverPageCount
fee: impositionFee, unitCost: 100, pageCount: state.pageCount
fee: coverPlateCalcMaterials, unitCost: 2500, plateCount: is4CtoCover ? coverPlateCount * 4 : coverPlateCount
fee: textPlateCalcMaterials, unitCost: 2500, plateCount: is4CtoText ? textPlateCount * 4 : textPlateCount
fee: coverStockCostCalcMaterials, unitCost: unitCostOfPaperForKikuSize[state.coverPaperType.name], printQuantity: state.printQuantity
fee: textStockCostCalcMaterials, unitCost: unitCostOfPaperForKikuSize[state.textPaperType.name], impressionCount: Math.ceil(textImpressionCount), printQuantity: state.printQuantity
fee: coverPrintCalcMaterials, unitCost: unitCoverPrint, throughCount: coverPlateCount
fee: textPrintCalcMaterials, unitCost: unitTextPrint, throughCount: textPlateCount
fee: coverWrappingCalcMaterials, unitCost: unitCoverWrapping, printQuantity: state.printQuantity
fee: collationCalcMaterials, unitCost: unitBlackCTPCollation[isPlate][unitPagesPerPlate], printQuantity: state.printQuantity
fee: 
fee: 
fee: 