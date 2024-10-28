import { useReducer } from "react";

const handleRreducer = (prev, { item, payload }) => {
  const { name, value } = payload;
  switch (item) {
    case "trimSize": return { ...prev, [name]: value };
    default: throw new Error("error...");
  }
};

const Example = () => {
  const initState = {

  };
  const [state,  dispatch] = useReducer(handleRreducer, initState);

  const handleTrimSize = () => {
    dispatch({
      item: "trimSize",
      payload: { name: e.target.name, value: e.taget.value }
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
              Object.entries(TRIM_SIZES).map(([key,size]) => {
                return (
                  <label htmlFor="" key={size}>
                    <div>{console.log(size)}</div>
                    <input id="" type="radio" value={size} checked="" onChange={handlerTrimSize} />
                    {size}
                  </label>
                )
              })
            }          
            <label htmlFor="">
              <input id="" type="radio" value="" onChange={handleTrimSize} />
              A6
            </label>
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
              H（&nbsp;<input id="" type="number" name="" value="" onChange={dummyFunc} />&nbsp;）&nbsp;㎜&nbsp;×&nbsp;
              W（&nbsp;<input id="" type="number" name="" value="" onChange={dummyFunc} />&nbsp;）&nbsp;㎜ 
            </label>
          </div>       
        </div>      
      </div>
    </>
  );
};

export default Example;

// // 済んだ分 start
// // 済んだ分 end