import { useCalc, useCalcDispatch } from "../context/CalcContext";
import { useEffect } from 'react';

const Reslut = () => {
  const state = useCalc();
  const dispatch = useCalcDispatch();

  // 条件に応じて選択する候補
  const candidates = state.textPrintingMethod.name === "モノクロ印刷" && state.coverPrintingMethod.name === "モノクロ印刷"
    ? [
        { name: state.blackResult.name, value: state.blackResult.value },
        { name: state.onDemandResult.name, value: state.onDemandResult.value }
      ]
    : [
        { name: state.ctpResult.name, value: state.ctpResult.value },
        { name: state.onDemandResult.name, value: state.onDemandResult.value }
      ];

  // 最小値のオブジェクトを選択
  const whichResult = candidates.reduce((min, current) => {
    return current.value < min.value ? current : min
  }, candidates[0]);

  useEffect(() => {
    if (
      state.textPrintingMethod.name,
      state.coverPrintingMethod.name,
      state.blackResult.name,
      state.blackResult.value,
      state.onDemandResult.name,
      state.onDemandResult.value,
      state.ctpResult.name,
      state.ctpResult.value
    )
    // 費用には、販売費及び一般管理費の係数1.45を掛けて最終値を算出する。
    dispatch({
      item: "resultOutPutMethodAndFee",
      payload: { name: whichResult.name, value: whichResult.value * 1.45 }
    });
  }, [
    state.textPrintingMethod.name,
    state.coverPrintingMethod.name,
    state.blackResult.name,
    state.blackResult.value,
    state.onDemandResult.name,
    state.onDemandResult.value,
    state.ctpResult.name,
    state.ctpResult.value, 
    dispatch
  ]);  

  return (
    <>
      <h2>{state.resultOutPutMethodAndFee?.name}</h2>
      <h2>{state.resultOutPutMethodAndFee?.value}</h2>
    </>
  );
};

export default Reslut;