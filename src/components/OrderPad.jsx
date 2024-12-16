import { useCalc } from "../context/CalcContext";

const OrderPad = ({}) => {
  const state = useCalc();

  return (
    <ul className="order-pad">
      <li className="order-pad__list">
        <div className="order-pad__item">冊子の版型</div>
        <div className="order-pad__inputed-content">{state.trimSize.name}</div>
      </li>
      <li className="order-pad__list">
        <div className="order-pad__item">印刷部数</div>
        <div className="order-pad__inputed-content">{state.printQuantity}部</div>
      </li>
      <li className="order-pad__list">
        <div className="order-pad__item">表紙台の印刷方法</div>
        <div className="order-pad__inputed-content">{state.coverPrintingMethod.name}</div>
      </li>
      <li className="order-pad__list">
        <div className="order-pad__item">表紙台ページ数</div>
        <div className="order-pad__inputed-content">{state.coverPrintingMethod.count}頁</div>
      </li>
      <li className="order-pad__list">
        <div className="order-pad__item">表紙台用紙の種類</div>
        <div className="order-pad__inputed-content">{state.coverPaperType.name}</div>
      </li>
      <li className="order-pad__list">
        <div className="order-pad__item">表紙加工</div>
        <div className="order-pad__inputed-content">{state.ppCoating.name}</div>
      </li>
      <li className="order-pad__list">
        <div className="order-pad__item">本文の印刷方法</div>
        <div className="order-pad__inputed-content">{state.textPrintingMethod.name}</div>
      </li>
      <li className="order-pad__list">
        <div className="order-pad__item">本文ページ数</div>
        <div className="order-pad__inputed-content">{state.pageCount}頁</div>
      </li>
      <li className="order-pad__list">
        <div className="order-pad__item">本文用紙の種類</div>
        <div className="order-pad__inputed-content">{state.textPaperType.name}</div>
      </li>
      {/* 
      <li className="order-pad__list">
        <div className="order-pad__item">本文内の<br />カラー・ページ数</div>
        <div className="order-pad__inputed-content">{state.colorPageCount}頁</div>
      </li>
       */}
      <li className="order-pad__list">
        <div className="order-pad__item">綴じ方向</div>
        <div className="order-pad__inputed-content">{state.bindingDirection}</div>
      </li>
      <li className="order-pad__list">
        <div className="order-pad__item">縦本／横本</div>
        <div className="order-pad__inputed-content">{state.horizontalBinding ? "横本" : "縦本"}</div>
      </li>
      <li className="order-pad__list">
        <div className="order-pad__item">製本方法</div>
        <div className="order-pad__inputed-content">{state.bindingMethod}</div>
      </li>
    </ul>
  );
};

export default OrderPad;