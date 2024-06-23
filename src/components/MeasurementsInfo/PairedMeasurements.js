import React from "react";

const PairedMeasurementInput = ({
  nameLeft,
  valueLeft,
  nameRight,
  valueRight,
  onChange,
  onKeyDown,
  handleInputChange,
  measurement_main,
  measurement_sub_head,
  measurement_sub_head_2,
}) => {
  return (
    <div className="measurement_attribute">
      <div className="paired_measurements">
        <div>
          <div className="paired_measurements_fonts">Left</div>

          <input
            className="measurement_inputs_paired"
            type="text"
            name={nameLeft}
            value={valueLeft}
            onKeyDown={onKeyDown}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <div className="paired_measurements_fonts">Right</div>
          <input
            className="measurement_inputs_paired"
            type="text"
            name={nameRight}
            value={valueRight}
            onKeyDown={onKeyDown}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="measurement_title">
        <div className="measurement_main">{measurement_main}</div>
        <div className="measurement_sub_head">{measurement_sub_head}</div>
        <div className="measurement_sub_head-2">{measurement_sub_head_2}</div>
      </div>
    </div>
  );
};

export default PairedMeasurementInput;
