import React, { useEffect, useState } from "react";
import useStore from "../../Store";
import ExtraInput from "./ExtraInput";
import "./extra.css";

const Extra = () => {
  const { kneeSliders, addKneeSliders } = useStore();

  const [name, setName] = useState({
    Black_white: "",
    Green_white: "",
    Orange_white: "",
    Red_white: "",
    White_red: "",
    Yellow_grey: "",
  });

  const handleInputChange = (e) => {
    console.log(e.target,'eeeee');
    setName({ ...name, [e.target.name]: e.target.value });
    //   console.log(name, 'vavvvv');
    addKneeSliders({ name });
  };

  const onKeyDown = (e) => {
    setName({ ...name, [e.target.name]: e.target.value });
    console.log(name, "vavvvv");
  };

  return (
    <div>
      <div className="extra_header">
        <h1>Knee Sliders</h1>
      </div>
      <div className="extra_main_box">
        <ExtraInput 
          src="./knee_sliders/RISC Knee Slider - Black_white.png"
          name="Black_white"
          value={name.Black_white}
          onKeyDown={onKeyDown}
          handleInputChange={handleInputChange}
        />

        <ExtraInput 
          src="./knee_sliders/RISC Knee Slider - Green_white.png"
          name="Green_white"
          value={name.Green_white}
          onKeyDown={onKeyDown}
          handleInputChange={handleInputChange}
        />
     
        <ExtraInput 
          src="./knee_sliders/RISC Knee Slider - Orange_white.png"
          name="Orange_white"
          value={name.Orange_white}
          onKeyDown={onKeyDown}
          handleInputChange={handleInputChange}
        />

        {/* <div className="extra_sub_box">
          <img
            className="extra_img"
            src="./knee_sliders/RISC Knee Slider - Green_white.png"
            width="90"
            height="90"
          />
          <div className="extra_sub_input">
            <div className="extra_quality">QUANTITY</div>
            <label>
              <input
                className="extra_quantity_inputs"
                size="30"
                name="Green_white"
                value={name.Green_white}
                //onKeyDown={onKeyDown}
                onChange={handleInputChange}
              />
            </label>
          </div>
        </div>

        <div className="extra_sub_box">
          <img
            className="extra_img"
            src="./knee_sliders/RISC Knee Slider - Orange_white.png"
            width="90"
            height="90"
          />
          <div className="extra_sub_input">
            <div className="extra_quality">QUANTITY</div>
            <label>
              <input
                className="extra_quantity_inputs"
                size="30"
                //name={name} value={value} onKeyDown={onKeyDown} onChange={handleInputChange}
              />
            </label>
          </div>
        </div> */}

        <div className="extra_sub_box">
          <img
            className="extra_img"
            src="./knee_sliders/RISC Knee Slider - Red_white.png"
            width="90"
            height="90"
          />
          <div className="extra_sub_input">
            <div className="extra_quality">QUANTITY</div>
            <label>
              <input
                className="extra_quantity_inputs"
                size="30"
                //name={name} value={value} onKeyDown={onKeyDown} onChange={handleInputChange}
              />
            </label>
          </div>
        </div>

        <div className="extra_sub_box">
          <img
            className="extra_img"
            src="./knee_sliders/RISC Knee Slider - White_red.png"
            width="90"
            height="90"
          />
          <div className="extra_sub_input">
            <div className="extra_quality">QUANTITY</div>
            <label>
              <input
                className="extra_quantity_inputs"
                size="30"
                //name={name} value={value} onKeyDown={onKeyDown} onChange={handleInputChange}
              />
            </label>
          </div>
        </div>

        <div className="extra_sub_box">
          <img
            className="extra_img"
            src="./knee_sliders/RISC Knee Slider - Yellow_grey.png"
            width="90"
            height="90"
          />
          <div className="extra_sub_input">
            <div className="extra_quality">QUANTITY</div>
            <label>
              <input
                className="extra_quantity_inputs"
                size="30"
                //name={name} value={value} onKeyDown={onKeyDown} onChange={handleInputChange}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Extra;
