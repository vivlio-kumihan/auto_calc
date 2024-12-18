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

("版型", state.trimSize.name)
("部数", state.printQuantity)
("最終出力", state.resultOutPut.nam)
("表紙の印刷方法", state.coverPrintingMethod.name)
("本文の印刷方法", state.textPrintingMethod.name)
("表紙ページ数", state.coverPrintingMethod.count)
("本文ページ数", state.pageCount)
("表紙の用紙", state.coverPaperType.name)
("本文の用紙", state.textPaperType.name)
("綴じ方向", state.bindingDirection)
("綴じ方法", state.bindingMethod)
("表紙PP加工", state.ppCoating.name)
("横綴じ", state.horizontalBinding)
("MSWord（ワード）入稿", state.submissionInMSWordFormat)
("費用", state.resultOutPut.value)


const outerMap = new Map();

const innerMap1 = new Map();
innerMap1.set("名前", "山田太郎");
innerMap1.set("年齢", 30);

const innerMap2 = new Map();
innerMap2.set("名前", "鈴木花子");
innerMap2.set("年齢", 25);

outerMap.set("社員1", innerMap1);
outerMap.set("社員2", innerMap2);

console.log(outerMap);


面付け（表紙）
coverImpositionCalcMaterials: { unitCost: 100, pageCount: coverPageCount },
面付け（本文）
textImpositionCalcMaterials: { unitCost: 100, pageCount: state.pageCount },
刷版（表紙）
coverPlateCalcMaterials: { unitCost: 2500, plateCount: is4CtoCover ? coverPlateCount * 4 : coverPlateCount },
刷版（本文）
textPlateCalcMaterials: { unitCost: 2500, plateCount: is4CtoText ? textPlateCount * 4 : textPlateCount },
用紙（表紙）
coverStockCostCalcMaterials: { unitCost: unitCostOfPaperForKikuSize[state.coverPaperType.name], printQuantity: state.printQuantity },
用紙（本文）
textStockCostCalcMaterials: { unitCost: unitCostOfPaperForKikuSize[state.textPaperType.name], impressionCount: Math.ceil(textImpressionCount), printQuantity: state.printQuantity },
印刷（表紙）
coverPrintCalcMaterials: { unitCost: unitCoverPrint, throughCount: coverPlateCount },
印刷（本文）
textPrintCalcMaterials: { unitCost: unitTextPrint, throughCount: textPlateCount },
綴じ代（無線または中綴）
coverWrappingCalcMaterials: { unitCost: unitCoverWrapping, printQuantity: state.printQuantity },
本文丁合
collationCalcMaterials: { unitCost: unitBlackCTPCollation[isPlate][unitPagesPerPlate], printQuantity: state.printQuantity },






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