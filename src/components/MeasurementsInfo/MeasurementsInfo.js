import React from 'react'

const MeasurementsInfo = ({name, value, measurement_main, measurement_sub_head, measurement_sub_head_2, onKeyDown, handleInputChange}) => {
    return (
        <div className="measurement_attribute">
          <label>
            <input className="measurement_inputs"  size="40" name={name} value={value} onKeyDown={onKeyDown} onChange={handleInputChange}/>
          </label>
          <div className="measurement_title">
            <div className="measurement_main">{measurement_main}</div>
            <div className="measurement_sub_head">
                {measurement_sub_head}
            </div>
            <div className="measurement_sub_head-2">
                {measurement_sub_head_2}
            </div>
          </div>
        </div>
        
        )
}

export default MeasurementsInfo;