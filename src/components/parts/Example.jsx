import { useReducer } from "react";

const TRIM_SIZES = { 
  A6: "A6", B6: "B6", A5: "A5", B5: "B5", A4: "A4",
  stdPaperback: "新書版",
  pocketEdition: "文庫版",
  customSizeSm: "変形サイズ（小）",
  customSizeLg: "変形サイズ（大）"
};

// 新書版
const stdPaperbackVarSizeHights = [];
for (let i = 172; i <= 192; ++i) {
  stdPaperbackVarSizeHights.push(i);
}
const stdPaperbackVarSizeWidths = [];
for (let i = 103; i <= 138; ++i) {
  stdPaperbackVarSizeWidths.push(i);
}

// 文庫版
const pocketEditionVarSizeHights = [];
for (let i = 138; i <= 152; ++i) {
  pocketEditionVarSizeHights.push(i);
}
const pocketEditionVarSizeWidths = [];
for (let i = 103; i <= 115; ++i) {
  pocketEditionVarSizeWidths.push(i);
}

// 変形サイズ（小）
const customSizeSmVarSizeHights = [];
for (let i = 105; i <= 210; ++i) {
  customSizeSmVarSizeHights.push(i);
}
const customSizeSmVarSizeWidths = [];
for (let i = 90; i <= 148; ++i) {
  customSizeSmVarSizeWidths.push(i);
}

// 変形サイズ（大）
const customSizeLgVarSizeHights = [];
for (let i = 149; i <= 297; ++i) {
  customSizeLgVarSizeHights.push(i);
}
const customSizeLgVarSizeWidths = [];
for (let i = 149; i <= 210; ++i) {
  customSizeLgVarSizeWidths.push(i);
}

const handleRreducer = (prev, { item, payload }) => {
  const { name, value } = payload;
  switch (item) {
    case "trimSize": return { ...prev, trimSize: { name: name, value: value } };
    case "customtrimSize": return { ...prev, customtrimSize: { name: name, value: value } };
    default: throw new Error("error...");
  }
};

const Example = () => {
  const initState = {
    trimSize: {},
    customTrimSize: []
  };

  const [state,  dispatch] = useReducer(handleRreducer, initState);

  const handleTrimSize = (e) => {
    dispatch({
      item: "trimSize",
      payload: { name: e.target.name, value: e.target.value }
    });
  };

  const handlecustomTrimSize = (e) => {};

  return (
    <>
      <div className="calc">
        {/* 冊子のサイズ */}
        <div className="calc__item-wrapper trim_size">
          <div className="calc__entry">
            冊子のサイズ<span>※</span>
          </div>
          <div className="calc__content-inner">
            {
              Object.entries(TRIM_SIZES).map(([name, value]) => {
                return (
                  <label htmlFor={name} key={name}>
                    <input
                      id={name}
                      type="radio"
                      name={name}
                      value={value}
                      checked={state.trimSize.name === name}
                      onChange={handleTrimSize} 
                    />
                    {value}
                  </label>
                )
              })
            }
          </div>
        </div> 

        {/* 新書版・文庫版変形サイズ入力 */}
        {/* 冊子サイズによって可変するテキストが入る */}
        <div className="calc__item-wrapper custom_trim_size">
          <div className="calc__entry">
            新書版・文庫版変形サイズ入力<span>※</span>
          </div>   
          <div className="calc__content-inner">
            <label htmlFor="">
              H（&nbsp;<input id="" type="number" name="" value="" />&nbsp;）&nbsp;㎜&nbsp;×&nbsp;
              W（&nbsp;<input id="" type="number" name="" value="" />&nbsp;）&nbsp;㎜ 
            </label>

            <select
              name="customTrimSize"
              value={state.customTrimSize}
              onChange={handlecustomTrimSize}>
              {
                customTrimSizeArr.map((num) => {
                  return (
                    <option key={num} value={num}>{num}</option> 
                  ) 
                }) 
              }
            </select>
            <div className="result">Result: {state.customTrimSize}</div>            
          </div>       
        </div>           
      </div>
    </>
  );
};

export default Example;

// 基本サイズ　h176×w103、h182×w112
// 可能範囲　[h172～192]×[w103～138]

// 基本サイズ　h148～152×w105
// 可能範囲　[h138～152]×[w103～115]

// 可能範囲　[h105～210]×[w90～148]

// 可能範囲　[h149～297]×[w149～210]


// // 済んだ分 start
// // 済んだ分 end