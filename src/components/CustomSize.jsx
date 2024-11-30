const CustomSize = () => {
  return (
    <>
      {/* 新書版・文庫版・変形サイズ（大）（小）入力 */}
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
    </>
  );
};

export default CustomSize;