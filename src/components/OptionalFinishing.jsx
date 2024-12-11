import { useCalc, useCalcDispatch } from "../context/CalcContext";

// 「Polypropylene (PP) Lamination」または「PP Coating」
// Gloss PP Lamination：ラミネーション
// Matte PP Lamination：PPラミネーション
const PP_COATING_TYPES = ["グロス（光沢）PP", "マット（艶消し）PP"];

const OptionalFinishing = ({ coatingAvailable }) => {
  const state = useCalc();
  const dispatch = useCalcDispatch();

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
            coatingAvailable.includes(state.coverPaperType.name) &&
              <section>
                {
                  PP_COATING_TYPES.map((coating) => {
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
              {/* <li><a href="" target="_blank">「PP加工をされる際の注意点」をご覧ください。</a></li> */}
              <li>おもて表紙（表1）の裏側を表2<br />裏表紙（表4）の内側を表3と呼びます。</li>
            </ul>
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
              Word（ワード）入稿
            </label>            
          </section>
        </div>
      </div>
    </>
  );
};

export default OptionalFinishing;





// // 今後、搭載予定のProps

// 関数
// const handleAddBreedAutoCover = () => {
//   dispatch({
//     item: "addBreedAutoCover",
//     payload: !state.addBreedAutoCover
//   });
// };

// const handleAddBreedAutoText = () => {
//   dispatch({
//     item: "addBreedAutoText",
//     payload: !state.addBreedAutoText
//   });
// };

// 構造
// <section>
//   <label htmlFor="">
//     <input type="checkbox" id="" value=""/>
//     扉がある　※扉の定義必要
//     ない

//     本文紙種と同じ
//     色紙にする

//     奇数ページを指定させる　指定ページの前が扉を前提

//     本本文ページ数のstate
//     1から始まる本文ページ数までの奇数を集めた配列
//     これをselect要素で表示

//   </label>
//   <button type="button">用紙・色 選択</button>
//   <div>扉への印刷ページを記入して下さい。（データの本文ページ数）</div>
// </section>
// <section>
//   <label htmlFor="addBreedAutoCover">
//     <input
//       type="checkbox"
//       id="addBreedAutoCover"
//       checked={state.addBreedAutoCover}
//       onChange={handleAddBreedAutoCover} 
//     />
//     表紙データ自動塗り足し追加
//   </label>
//   <label htmlFor="addBreedAutoText">
//     <input
//       type="checkbox"
//       id="addBreedAutoText"
//       checked={state.addBreedAutoText}
//       onChange={handleAddBreedAutoText} 
//     />
//     本文データ自動塗り足し追加
//   </label>
//   <ul className="calc__explanation">
//     <li>※必ず<a href="">「自動塗り足し追加サービスの注意点」</a>をご確認・ご了承の上ご注文ください。</li>
//   </ul>
// </section>