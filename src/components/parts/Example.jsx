import { useReducer, useEffect } from "react";

// 関数Reducer
const handleRreducer = (prev, { item, payload }) => {
  const { key, name, value, customTrimSize } = payload;
  switch (item) {
    case "addBreedAutoCover": return { ...prev, addBreedAutoCover: payload };
    case "addBreedAutoText": return { ...prev, addBreedAutoText: payload };    
    default: throw new Error("error...");
  }
};

// 本体
const Example = () => {
  // 初期値
  const initState = {
    addBreedAutoCover: false,
    addBreedAutoText: false    
  };  

  // 状態
  const [state,  dispatch] = useReducer(handleRreducer, initState);
  console.log(state);

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

  return (
    <section>
      <label htmlFor="addBreedAutoCover">
        <input
          type="checkbox"
          id="addBreedAutoCover"
          checked={state.addBreedAutoCover}
          onChange={handleAddBreedAutoCover} />
        表紙データ自動塗り足し追加
      </label>
      <label htmlFor="addBreedAutoText">
        <input
          type="checkbox"
          id="addBreedAutoText"
          checked={state.addBreedAutoText}
          onChange={handleAddBreedAutoText} />
        本文データ自動塗り足し追加
      </label>
      <ul className="note">
        <li>※必ず<a href="">「自動塗り足し追加サービスの注意点」</a>をご確認・ご了承の上ご注文ください。</li>
      </ul>
    </section>
  );
}
export default Example;