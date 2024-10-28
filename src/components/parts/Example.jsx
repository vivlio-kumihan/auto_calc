import { useReducer } from "react";

const handleRreducer = (prev, { item, payload }) => {
  const { name, value } = payload;
  switch (item) {
    // // 済んだ分 start
    // // 印刷部数
    // case "printQuantity": return { ...prev, [name]: value };
    // // ページ数
    // case "pageCount": {
    //   // 条件分岐が必要な箇所
    //   const maxColorPageCount = Math.floor(value / 2);
    //   // const maxColorPageCount = Math.floor(value - 1);
    //   const tmpArr = [];
    //   for (let i = 1; i <= maxColorPageCount; i++) {
    //     tmpArr.push(i);
    //   }
    //   return { ...prev, [name]: value, colorPageCountArr: tmpArr };
    // };
    // // カラー・ページ数    
    // case "colorPageCount": return { ...prev, [name]: value };
    // // 済んだ分 end
    default: throw new Error("error...");
  }
};

// // 済んだ分 start
// // 印刷部数
// const printQuantityArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
// for (let i = 10; i <= 2000; i += 5) {
//   printQuantityArr.push(i);
// }
// // ページ数
// const pageCountArr = [0, 4, 8];
// for (let i = 10; i <= 500; i += 2) {
//   pageCountArr.push(i);
// }
// // 済んだ分 end

const Example = () => {
  const initState = {
    // // 済んだ分 start
    // // 済んだ分 end
  };
  const [state,  dispatch] = useReducer(handleRreducer, initState);
  // // 済んだ分 start
  // // 印刷部数  
  // // 済んだ分 end

  return (
    <>
      <div className="calc">
        {/* 冊子のサイズ */}
        <div className="calc__item-wrapper trim_size">
          <div className="calc__entry">
            冊子のサイズ<span>※</span>
          </div>
          <div className="calc__content-inner">
            <label htmlFor="">
              <input id="" type="radio" value="" onChange={dummyFunc} />
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