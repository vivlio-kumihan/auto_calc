import { useCalc } from "../context/CalcContext";

const SendInBundleBTN = () => {
  const state = useCalc();
  const ITEM_TO_CALC = state.resultOutPut.itemToCalc ?? {};

  // お客様用の計算項目を表記させたシート
  const mainOrderSheetArr = [
    { key: "trimSize", value: state.trimSize.name }, // => 冊子の版型
    { key: "printQuantity", value: state.printQuantity }, // => 印刷部数
    { key: "coverPrintingMethodName", value: state.coverPrintingMethod.name }, // => 表紙台の印刷方法
    { key: "coverPrintingMethodCount", value: state.coverPrintingMethod.count }, // => 表紙台ページ数
    { key: "coverPaperType", value: state.coverPaperType.name }, // => 表紙台用紙の種類
    { key: "ppCoating", value: state.ppCoating.name ? state.ppCoating.name : null }, // => 表紙加工
    { key: "textPrintingMethodName", value: state.textPrintingMethod.name }, // => 本文の印刷方法
    { key: "textPrintingMethodCount", value: state.pageCount }, // => 本文ページ数
    { key: "textPaperType", value: state.textPaperType.name }, // => 本文用紙の種類
    { key: "bindingDirection", value: state.bindingDirection.name }, // => 綴じ方向
    { key: "horizontalBinding", value: state.horizontalBinding ? "横本" : "縦本" }, // => 縦本／横本
    { key: "submissionInMSWordFormat", value: state.submissionInMSWordFormat ? "ワード入稿あり" : null }, // => ワード入稿
    { key: "resultOutPutFee", value: state.resultOutPut.value }, // => 印刷代金小計
  ];

  // フォームにデータを送る関数定義
  const openFormWithData = () => {
    const queryParams = new URLSearchParams();
    mainOrderSheetArr.forEach(({ key, value }) => {
      if (value !== null && value !== undefined) {
        queryParams.append(key, value);
      }
    });
    // フォームページにリダイレクト
    window.location.href = `/hokuto-bs/self-publishing-order-form?${queryParams.toString()}`;
  };

  // // JSON化
  // // mainOrderSheet
  // const tempMOS = mainOrderSheetArr.reduce((acc, item) => {
  //   if (item.key !== null && item.value !== null) {
  //     acc[item.key] = item.value;
  //   }
  //   return acc;
  // }, {});
  // const mainOrderSheet = JSON.stringify(tempMOS);  

  // 社内用の計算項目を表記させたシート
  const otherOrderSheetArr = [
    {
      key: "面付け（表紙）",
      data: ITEM_TO_CALC.coverImpositionCalcMaterials,
      fields: ["unitCost", "pageCount"],
      labels: ["単価", "ページ数"],
      subtotal: (data) => data.unitCost * data.pageCount,
    },
    {
      key: "面付け（本文）",
      data: ITEM_TO_CALC.textImpositionCalcMaterials,
      fields: ["unitCost", "pageCount"],
      labels: ["単価", "ページ数"],
      subtotal: (data) => data.unitCost * data.pageCount,
    },
    {
      key: "刷版（表紙）",
      data: ITEM_TO_CALC.coverPlateCalcMaterials,
      fields: ["unitCost", "plateCount"],
      labels: ["単価", "版数"],
      subtotal: (data) => data.unitCost * data.plateCount,
    },
    {
      key: "刷版（本文）",
      data: ITEM_TO_CALC.textPlateCalcMaterials,
      fields: ["unitCost", "plateCount"],
      labels: ["単価", "版数"],
      subtotal: (data) => data.unitCost * data.plateCount,
    },
    {
      key: "用紙（表紙）",
      data: ITEM_TO_CALC.coverStockCostCalcMaterials,
      fields: ["unitCost", "printQuantity", "sparePapers"],
      labels: ["単価", "部数", "予備紙枚数"],
      subtotal: (data) =>
        data.unitCost * data.printQuantity * data.sparePapers,
    },
    {
      key: "用紙（本文）",
      data: ITEM_TO_CALC.textStockCostCalcMaterials,
      fields: [ "unitCost", "impressionCount", "printQuantity", "sparePapers"],
      labels: ["単価", "枚数", "部数", "予備紙枚数"],
      subtotal: (data) =>
        data.unitCost * data.impressionCount * data.printQuantity +
        data.unitCost * data.sparePapers,
    },
    {
      key: "印刷（表紙）",
      data: ITEM_TO_CALC.coverPrintCalcMaterials,
      fields: ["unitCost", "throughCount", "printQuantity"],
      labels: ["単価", "通し", "部数"],
      subtotal: (data) =>
        data.unitCost * data.throughCount * data.printQuantity,
    },
    {
      key: "印刷（本文）",
      data: ITEM_TO_CALC.textPrintCalcMaterials,
      fields: ["unitCost", "throughCount", "printQuantity"],
      labels: ["単価", "通し", "部数"],
      subtotal: (data) =>
        data.unitCost * data.throughCount * data.printQuantity,
    },
    {
      key: "綴じ代（無線または中綴）",
      data: ITEM_TO_CALC.coverWrappingCalcMaterials,
      fields: ["unitCost", "printQuantity"],
      labels: ["単価", "部数"],
      subtotal: (data) => data.unitCost * data.printQuantity,
    },
    {
      key: "本文丁合",
      data: ITEM_TO_CALC.collationCalcMaterials,
      fields: ["unitCost", "impressionCount", "printQuantity"],
      labels: ["単価", "通し", "部数"],
      subtotal: (data) => data.unitCost * data.impressionCount * data.printQuantity,
    },
  ];
  
  // JSON化
  // otherOrderSheet
  // 構造が2次的なので複雑め。ただし、これがフォーマットと考え方と流れを暗記。
  const tmpOOS = otherOrderSheetArr.reduce((acc, item) => {
    // 初期値がnudefinedの場合にエラーで真っ白になるから。
    // item.dataを読み切ったらまとめたaccを返す。
    if (!item.data) return acc;
    const fieldsData = item.fields.reduce((fieldsAcc, field, index) => {
      // keyと値の紐付け
      fieldsAcc[item.labels[index]] = item.data[field] ?? null;
      return fieldsAcc;
    }, {});
    // スプレッド演算子で小計を追加。
    acc[item.key] = { ...fieldsData, 小計: item.subtotal(item.data) };
    return acc;
  }, {});
  const otherOrderSheet = JSON.stringify(tmpOOS);

  const checkState = [
    { key: "表紙台の印刷方法", value: state.coverPrintingMethod }, 
    { key: "表紙台用紙の種類", value: state.coverPaperType }, 
    { key: "本文用紙の種類", value: state.textPaperType }, 
    { key: "綴じ方向", value: state.bindingDirection }];

  const hasInvalidInput = checkState.some((st) => st.value.name === null);
  const note = checkState
    .filter((st) => st.value.name === null)
    .map((st, idx) => (
      <li key={idx}>『{st.key}』の入力をご確認ください。</li>
    )
  );

  return (
    <>
      <ul>
        {note}
      </ul>
      <div className="note">
        下の『この依頼内容で申し込みフォームへ』ボタンで自費出版依頼のフォームへページ遷移いたします。<br />
        ページ遷移後は現在の内容はリセットされます。依頼内容を今一度ご確認の上、次のステップへお進みください。
      </div>
      <button onClick={openFormWithData} className="submit" type="submit" disabled={hasInvalidInput}>
        この依頼内容で申し込みフォームへ
      </button>
      <button className="rest" type="reset">
        リセット
      </button>
    </>
  );
};

export default SendInBundleBTN;