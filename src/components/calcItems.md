版型  => trimSize: state.trimSize.name,
部数  => printQuantity: state.printQuantity,
最終出力  => outPutMethod: state.resultOutPutMethodAndFee.name
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
費用  => state.resultOutPutMethodAndFee.value


面付け（表紙）
coverImpositionFee: { unitCost: 100, pageCount: coverPageCount },
面付け（本文）
textImpositionFee: { unitCost: 100, pageCount: state.pageCount },
刷版（表紙）
coverPlateFee: { unitCost: 2500, plateCount: is4CtoCover ? coverPlateCount * 4 : coverPlateCount },
刷版（本文）
textPlateFee: { unitCost: 2500, plateCount: is4CtoText ? textPlateCount * 4 : textPlateCount },
用紙（表紙）
coverStockCost: { unitCost: unitCostOfPaperForKikuSize[state.coverPaperType.name], printQuantity: state.printQuantity },
用紙（本文）
textStockCost: { unitCost: unitCostOfPaperForKikuSize[state.textPaperType.name], impressionCount: Math.ceil(textImpressionCount), printQuantity: state.printQuantity },
印刷（表紙）
coverPrintFee: { unitCost: unitCoverPrint, throughCount: coverPlateCount },
印刷（本文）
TextPrintFee: { unitCost: unitTextPrint, throughCount: textPlateCount },
綴じ代（無線または中綴）
coverWrappingFee: { unitCost: unitCoverWrapping, printQuantity: state.printQuantity },
本文丁合
collationFee: { unitCost: unitBlackCTPCollation[isPlate][unitPagesPerPlate], printQuantity: state.printQuantity },






最終出力をstateに結びつけ必要

fee: impositionFee, unitCost: 100, pageCount: coverPageCount
fee: impositionFee, unitCost: 100, pageCount: state.pageCount
fee: coverPlateFee, unitCost: 2500, plateCount: is4CtoCover ? coverPlateCount * 4 : coverPlateCount
fee: textPlateFee, unitCost: 2500, plateCount: is4CtoText ? textPlateCount * 4 : textPlateCount
fee: coverStockCost, unitCost: unitCostOfPaperForKikuSize[state.coverPaperType.name], printQuantity: state.printQuantity
fee: textStockCost, unitCost: unitCostOfPaperForKikuSize[state.textPaperType.name], impressionCount: Math.ceil(textImpressionCount), printQuantity: state.printQuantity
fee: coverPrintFee, unitCost: unitCoverPrint, throughCount: coverPlateCount
fee: TextPrintFee, unitCost: unitTextPrint, throughCount: textPlateCount
fee: coverWrappingFee, unitCost: unitCoverWrapping, printQuantity: state.printQuantity
fee: collationFee, unitCost: unitBlackCTPCollation[isPlate][unitPagesPerPlate], printQuantity: state.printQuantity
fee: 
fee: 
fee: 