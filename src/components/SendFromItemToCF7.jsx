import { useCalc } from "../context/CalcContext";

const SendFromItemToCF7 = () => {
  const state = useCalc();
  const openFormWithJson = () => {
    const jsonData = {
      "onDemandTotal": state.onDemandResult?.value,
    };
    // URLエンコードされたクエリパラメーターを生成させる。
    const queryPrams = new URLSearchParams(jsonData).toString();
    // ContactForm7のフォームページにリダイレクト
    // deploy用はこちら
    // window.location.href = `/self-publishing-order-form?${queryPrams}`;
    // 開発環境のローカルではこちら
    window.location.href = `/hokuto-bs/self-publishing-order-form?${queryPrams}`;
  };
  return <button onClick={openFormWithJson}>contact form 7で申込フォームを開く</button>
};

export default SendFromItemToCF7;

// 簡単お見積もり => Quick Quote
