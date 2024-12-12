import { useCalc } from "../context/CalcContext";

const MakeJson = ({ }) => {
  const state = useCalc();
  const downloadJSON = () => {
    const jsonData = {
      "オンデマンド合計": state.onDemandResult?.value,
    };

    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'on-demand-result.json';
    link.click();

    URL.revokeObjectURL(url);
  };

  return <button onClick={downloadJSON}>contact form 7で申込フォームを開く</button>;
};

export default MakeJson;
