import { useReducer } from "react";

const TRIM_SIZES = { 
  A6: "A6", B6: "B6", A5: "A5", B5: "B5", A4: "A4",
  stdPaperback: "新書版",
  pocketEdition: "文庫版",
  customSizeSm: "変形サイズ（小）",
  customSizeLg: "変形サイズ（大）"
};

const handleRreducer = (prev, { item, payload }) => {
  const { name, value } = payload;
  switch (item) {
    case "trimSize": return { ...prev, trimSize: { name: name, value: value } };
    default: throw new Error("error...");
  }
};

const Example = () => {
  const initState = {
    trimSize: {}
  };

  const [state,  dispatch] = useReducer(handleRreducer, initState);

  const handleTrimSize = (e) => {
    dispatch({
      item: "trimSize",
      payload: { name: e.target.name, value: e.target.value }
    });
  };

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
      </div>
    </>
  );
};

export default Example;



// {/* 新書版・文庫版変形サイズ入力 */}
// {/* 冊子サイズによって可変するテキストが入る */}
// <div className="calc__item-wrapper custom_trim_size">
//   <div className="calc__entry">
//     新書版・文庫版変形サイズ入力<span>※</span>
//   </div>   
//   <div className="calc__content-inner">
//     <label htmlFor="">
//       H（&nbsp;<input id="" type="number" name="" value="" onChange={dummyFunc} />&nbsp;）&nbsp;㎜&nbsp;×&nbsp;
//       W（&nbsp;<input id="" type="number" name="" value="" onChange={dummyFunc} />&nbsp;）&nbsp;㎜ 
//     </label>
//   </div>       
// </div> 

// // 済んだ分 start
// // 済んだ分 end