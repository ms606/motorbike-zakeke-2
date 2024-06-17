import React from "react";

const ExtraInput = ({src, name, value, onKeyDown, handleInputChange}) => {
  return (
    <div className="extra_sub_box">
      <img
        className="extra_img"
        src={src}
        width="80"
        height="80"
      />
      <div className="extra_sub_input">
        <div className="extra_quality">QUANTITY</div>
        <label>
          <input
            className="extra_quantity_inputs"
            size="30"
            name={name}
            value={value}
            onKeyDown={onKeyDown}
            onChange={handleInputChange}
          />
        </label>
      </div>
    </div>
  );
};

export default ExtraInput;
