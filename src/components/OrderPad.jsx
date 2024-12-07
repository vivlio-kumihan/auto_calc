import { useCalc, useCalcDispatch } from "../context/CalcContext";

const OrderPad = ({}) => {
  const state = useCalc();

  return (
    <ul className="order-pad">
      <li className="order-pad__list">
        <div className="order-pad__item">冊子の版型</div>
        <div className="order-pad__inputed-content">{state.trimSize.name}</div>
      </li>
      <li className="order-pad__list">
        <div className="order-pad__item">新書版・文庫版・<br />変形サイズ</div>
        <div className="flex-wrapper">
          <div className="order-pad__inputed-content"><span>高：</span>{state.trimSize.customTrimSize.height}mm</div>
          <div className="order-pad__inputed-content"><span>幅：</span>{state.trimSize.customTrimSize.width}mm</div>
        </div>
      </li>
      <li className="order-pad__list">
        <div className="order-pad__item">印刷部数</div>
        <div className="order-pad__inputed-content">{state.printQuantity}部</div>
      </li>
      <li className="order-pad__list">
        <div className="order-pad__item">本文の印刷方法</div>
        <div className="order-pad__inputed-content">{state.textPrintingMethod.name}</div>
      </li>
      <li className="order-pad__list">
        <div className="order-pad__item">本文用紙の種類</div>
        <div className="order-pad__inputed-content">{state.textPaperType.name}</div>
      </li>
      <li className="order-pad__list">
        <div className="order-pad__item">本文総ページ数</div>
        <div className="order-pad__inputed-content">{state.pageCount}頁</div>
      </li>
      <li className="order-pad__list">
        <div className="order-pad__item">本文内の<br />カラー・ページ数</div>
        <div className="order-pad__inputed-content">{state.colorPageCount}頁</div>
      </li>
      <li className="order-pad__list">
        <div className="order-pad__item">製本方法</div>
        <div className="order-pad__inputed-content">{state.bindingMethod}</div>
      </li>
      <li className="order-pad__list">
        <div className="order-pad__item">表紙の印刷方法</div>
        <div className="order-pad__inputed-content">{state.coverPrintingMethod.name}</div>
      </li>
      <li className="order-pad__list">
        <div className="order-pad__item">表紙用紙の種類</div>
        <div className="order-pad__inputed-content">{state.coverPaperType.name}</div>
      </li>
    </ul>
  );
};

export default OrderPad;