import { useCalc, useCalcDispatch } from "../context/CalcContext";
import { useEffect } from "react";


const OptionalFinishing = ({ coatingAvaiLable, indieFrontBackCoverColor, ppCoatingTypes }) => {
  const state = useCalc();
  const dispatch = useCalcDispatch();

  const handleAddBreedAutoCover = () => {
    dispatch({
      item: "addBreedAutoCover",
      payload: !state.addBreedAutoCover
    });
  };
  
  const handleAddBreedAutoText = () => {
    dispatch({
      item: "addBreedAutoText",
      payload: !state.addBreedAutoText
    });
  };

  const handleHorizontalBinding = () => {
    dispatch({
      item: "horizontalBinding",
      payload: !state.horizontalBinding
    });
  };
  
  const handleSubmissionInMSWordFormat = () => {
    dispatch({
      item: "submissionInMSWordFormat",
      payload: !state.submissionInMSWordFormat
    });
  };

  const handleInsideFrontBackCoverColor = (e) => {
    dispatch({
      item: "insideFrontBackCoverColor",
      payload: { name: e.target.name }
    });
  };

  useEffect(() => {
    (state.coverPrintingMethod.id === "mono"
    && state.insideFrontBackCoverColor.name === "フルカラー印刷") &&
      dispatch({
        item: "insideFrontBackCoverColor",
        payload: { name: "モノクロ印刷" }
    });
  }, [state.coverPrintingMethod.id, state.insideFrontBackCoverColor.name, dispatch]);

  const handleAddPPCoating = (e) => {
    dispatch({
      item: "ppCoating",
      payload: { name: e.target.value }
    });
  }; 

  return (
    <>
      <div className="calc__item-wrapper optional_finishing">
        <div className="calc__entry">
          オプション加工<span>※</span>
        </div>
        <div className="calc__content-inner">
          {
            coatingAvaiLable.includes(state.coverPaperType.name) &&
              <section>
                {
                  ppCoatingTypes.map((coating) => {
                    return (
                      <label htmlFor={coating} key={coating}>
                        <input
                          id={coating}
                          type="radio"
                          name="pp-coating"
                          value={coating}
                          onClick={handleAddPPCoating} />
                        {coating}
                      </label>
                    )
                  })
                }
              </section>
          }
            <ul className="calc__explanation">
              <li><a href="" target="_blank">「PP加工をされる際の注意点」をご覧ください。</a></li>
              <li>表表紙（表1）の裏側を表2<br />裏表紙（表4）の内側を表3と呼びます。</li>
            </ul>
          <section>
            <label htmlFor="">
              <input type="checkbox" id="" value=""/>
              扉がある　※扉の定義必要
              ない

              本文紙種と同じ
              色紙にする

              奇数ページを指定させる　指定ページの前が扉を前提

              本文ページ数のstate
              1から始まるページ数までの奇数を集めた配列
              これをselect要素で表示

            </label>
            <button type="button">用紙・色 選択</button>
            <div>扉への印刷ページを記入して下さい。（データのページ数）</div>
          </section>
          <section>
            {
              state.coverPrintingMethod.id === "color" &&
              indieFrontBackCoverColor.map((color) => {
                return (
                  <label htmlFor={color} key={color}>
                    <input
                      id={color}
                      type="radio"
                      name={color}
                      checked={state.insideFrontBackCoverColor.name === color}
                      onChange={handleInsideFrontBackCoverColor} />
                    {color}
                  </label>
                )
              })
            }
          </section>
          <section>
            <label htmlFor="addBreedAutoCover">
              <input
                type="checkbox"
                id="addBreedAutoCover"
                checked={state.addBreedAutoCover}
                onChange={handleAddBreedAutoCover} 
              />
              表紙データ自動塗り足し追加
            </label>
            <label htmlFor="addBreedAutoText">
              <input
                type="checkbox"
                id="addBreedAutoText"
                checked={state.addBreedAutoText}
                onChange={handleAddBreedAutoText} 
              />
              本文データ自動塗り足し追加
            </label>
            <ul className="calc__explanation">
              <li>※必ず<a href="">「自動塗り足し追加サービスの注意点」</a>をご確認・ご了承の上ご注文ください。</li>
            </ul>
          </section>
          <section>
            <label htmlFor="horizontalBinding">
              <input
                type="checkbox"
                id="horizontalBinding"
                checked={state.horizontalBinding}
                onChange={handleHorizontalBinding} 
              />
              横綴じ製本
            </label>            
            <label htmlFor="submissionInMSWordFormat">
              <input
                type="checkbox"
                id="submissionInMSWordFormat"
                checked={state.submissionInMSWordFormat}
                onChange={handleSubmissionInMSWordFormat} 
              />
              Word（ワード）入稿（Word入稿選択時は自動選択）
            </label>            
          </section>
        </div>
      </div>
    </>
  );
};

export default OptionalFinishing;
