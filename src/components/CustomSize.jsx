import { useCalc, useCalcDispatch } from "../context/CalcContext";
import { useEffect } from "react";

const CustomSize = ({ trimSizeTypesRange }) => {
  const state = useCalc();
  const dispatch = useCalcDispatch();

  // 新書版・文庫版・変形サイズ入力
  const handleCustomTrimSize = (e) => {
    const isHeight = e.target.selectedOptions[0].dataset.name === "height";
    dispatch({
      item: "trimSize",
      payload: {
        key: state.trimSize.id,
        name: state.trimSize.name,
        customTrimSize: { ...state.trimSize.customTrimSize, [isHeight ? 'height' : 'width']: e.target.value },
      }
    });
  };

  // サイズ変更時にcustomTrimSizeをリセットするためのuseEffect
  useEffect(() => {
    // 特定のサイズが選択されたときのみリセット
    if (["stdPaperback", "pocketEdition", "customSizeSm", "customSizeLg"].includes(state.trimSize.id)) {
      dispatch({
        item: "trimSize",
        payload: {
          key: state.trimSize.id,
          name: state.trimSize.name,
          customTrimSize: { height: null, width: null },
        },
      });
    }
  }, [state.trimSize.id]);

  // 新書、文庫、変形（大）（小）のサイズを持った配列の生成
  const collectedCustomTrimSizeArr = () => {
    const handleHeightWidthDiff = (trimSize) => {
      if (trimSize.customTrimSizeRange) {
        const range = trimSize.customTrimSizeRange;
        return {
          // 高の始点の値と差分
          startHeight: range.height[0],
          heightDiff: range.height[1] - range.height[0] + 1,
          // 幅の始点の値と差分
          startWidth: range.width[0],
          widthDiff: range.width[1] - range.width[0] + 1,
        };
      } else {
        return {
          startHeight: null,
          heightDiff: null,
          startWidth: null,
          widthDiff: null
        };
      }
    };

    // stateに版型のidが登録されていれば、それを変数に格納し、
    const customTrimSize = trimSizeTypesRange[state.trimSize.id];
    // 高さ、幅の始点と差分をオブジェクトにまとめる。
    const { startHeight, heightDiff, startWidth, widthDiff } = handleHeightWidthDiff(customTrimSize);

    // select要素に入れるoptionの値が入った配列を生成する。
    const createRangeArr = (start, diff) => {
      if (start === null && diff === null) {
        return ["---"];
      }
      return Array(diff).fill().reduce((acc, _, idx) => {
        acc.push(start + idx);
        return acc;
      }, ["---"]);
    };

    const HEIGHT_RANGE_ARR = createRangeArr(startHeight, heightDiff);
    const WIDTH_RANGE_ARR = createRangeArr(startWidth, widthDiff);

    // この関数が発火したら、select要素に入れるoptionの値が入った配列を返す。
    return [HEIGHT_RANGE_ARR, WIDTH_RANGE_ARR];
  };

  return (
    <div className="calc__item-wrapper custom_size">
      <div className="calc__entry">
        新書版・文庫版・変形サイズ入力<span>※</span>
      </div>
      <div className="calc__content-inner">
        <label className="custom-size-input-value-wrapper">
          <div>
            <span>高さ：&nbsp;</span>
            <select
              id={state.trimSize.id}
              name={state.trimSize.name}
              value={state.trimSize.customTrimSize.height ?? "---"}
              onChange={handleCustomTrimSize}
            >
            {
              collectedCustomTrimSizeArr()[0].map((pageNum) => {
                return(
                  <option key={pageNum} data-name="height" value={pageNum}>{pageNum}</option>
                )
              })
            }
            </select>
            <span>&nbsp;mm</span>
          </div>
          <div>×</div>
          <div>
            <span>幅：&nbsp;</span>
            <select
              id={state.trimSize.id}
              name={state.trimSize.name}
              value={ state.trimSize.customTrimSize.width ?? "---" }
              onChange={handleCustomTrimSize}
            >
            {
              collectedCustomTrimSizeArr()[1].map((pageNum) => {
                return(
                  <option key={pageNum} data-name="width" value={pageNum}>{pageNum}</option>
                )
              })
            }
            </select>
            <span>&nbsp;mm</span>
          </div>
        </label>
      </div>
      {
        state.trimSize.name === "新書版" && (
          <>
            <div className="calc__explanation">基本サイズ：高&nbsp;176&ensp;×&ensp;幅&nbsp;103mm&ensp;または、高&nbsp;182&ensp;×&ensp;幅&nbsp;112mm</div>
            <div className="calc__explanation">可能範囲：［高&nbsp;172～192mm］&ensp;×&ensp;［幅&nbsp;103～138mm］</div>
          </>
        )
      }
      {
        state.trimSize.name === "文庫版" && (
          <>
            <div className="calc__explanation">基本サイズ：高&nbsp;148～152mm&ensp;×&ensp;幅&nbsp;105mm</div>
            <div className="calc__explanation">可能範囲：［高&nbsp;138～152mm］&ensp;×&ensp;［幅&nbsp;103～115mm］</div>
          </>
        )
      }
      {
        state.trimSize.name === "変形サイズ（小）" && (
          <div className="calc__explanation">可能範囲：［高&nbsp;105～210mm］&ensp;×&ensp;［幅&nbsp;90～148mm］</div>
        )
      }
      {
        state.trimSize.name === "変形サイズ（大）" && (
          <div className="calc__explanation">可能範囲：［高&nbsp;149～297mm］&ensp;×&ensp;［幅&nbsp;149～210mm］</div>
        )
      }
    </div>
  );
};

export default CustomSize;