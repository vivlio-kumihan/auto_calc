import { useCalc } from "../context/CalcContext";
import { useEffect } from "react";

const SubmitButton = () => {
  const state = useCalc();
  console.log(state);
  const results = [state.onDemandResult, state.blackResult, state.ctpResult];
  results.map(result => {
    // console.log(result);
    // result.name === state.resultOutPutMethodAndFee.name ? console.log("hello") : console.log("bye");
  })

  return (
    <>
      <button className="submit" name="" type="submit">自費出版依頼へ</button>
      <button className="rest" name="" type="reset" >リセット</button>
    </>
  );
};

export default SubmitButton;

// console.log(state);
// console.log(state.resultOutPutMethodAndFee?.name);
// console.log(results);
