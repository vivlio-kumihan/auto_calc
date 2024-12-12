import { useCalc } from "../context/CalcContext";

const Reslut = () => {
  const state = useCalc();
  const whichFee = state.textPrintingMethod.name === "モノクロ印刷" && state.coverPrintingMethod.name === "モノクロ印刷"
    ? Math.min(state.blackResult.value, state.onDemandResult.value)
    : Math.min(state.ctpResult.value, state.onDemandResult.value);

  return(
    <>
      <h1>{whichFee}</h1>
    </>
  );
};

export default Reslut;