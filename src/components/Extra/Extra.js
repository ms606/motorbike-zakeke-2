import React, { useEffect, useState } from "react";
import useStore from "../../Store";
import ExtraInput from "./ExtraInput";
import "./extra.css";

const Extra = () => {
  const { kneeSliders, addKneeSliders } = useStore();
 
  console.log(kneeSliders, 'knewwwwwww');

  const [kneeSlidersCounts, setKneeSlidersCounts] = useState({
    Black_white: '0',
    Green_white: '0',
    Orange_white: '0',
    Red_white: '0',
    White_red: '0',
    Yellow_grey: '0',
  });

  useEffect(() => {
     if (kneeSliders) { 
      setKneeSlidersCounts(kneeSliders)
 }

    
  },[kneeSliders])

  const handleInputChange = (e) => {
   // console.log(kneeSlidersCounts,e.target,'eeeee');
    setKneeSlidersCounts({ ...kneeSlidersCounts, [e.target.name]: e.target.value });
    //   console.log(kneeSliders, 'vavvvv');
    addKneeSliders(kneeSlidersCounts);
  };

  const onKeyDown = (e) => {
    setKneeSlidersCounts({ ...kneeSlidersCounts, [e.target.name]: e.target.value });
    addKneeSliders(kneeSlidersCounts);
    // console.log(kneeSlidersCounts, "vavvvv");
  };

  return (
    <div>
      <div className="extra_header">
        <h1>KNEE SLIDERS</h1>
      </div>
      <div className="extra_main_box">
        <ExtraInput 
          src="./knee_sliders/RISC Knee Slider - Black_white.png"
          name="Black_white"
          value={kneeSlidersCounts.Black_white}
        //   onKeyDown={onKeyDown}
          handleInputChange={handleInputChange}
        />

        <ExtraInput 
          src="./knee_sliders/RISC Knee Slider - Green_white.png"
          name="Green_white"
          value={kneeSlidersCounts.Green_white}
        //  onKeyDown={onKeyDown}
          handleInputChange={handleInputChange}
        />
     
        <ExtraInput 
          src="./knee_sliders/RISC Knee Slider - Orange_white.png"
          name="Orange_white"
          value={kneeSlidersCounts.Orange_white}
        //  onKeyDown={onKeyDown}
          handleInputChange={handleInputChange}
        />

        <ExtraInput 
          src="./knee_sliders/RISC Knee Slider - Red_white.png"
          name="Red_white"
          value={kneeSlidersCounts.Red_white}
        //  onKeyDown={onKeyDown}
          handleInputChange={handleInputChange}
        />

        <ExtraInput 
          src="./knee_sliders/RISC Knee Slider - White_red.png"
          name="White_red"
          value={kneeSlidersCounts.White_red}
        //  onKeyDown={onKeyDown}
          handleInputChange={handleInputChange}
        />      

        <ExtraInput 
          src="./knee_sliders/RISC Knee Slider - Yellow_grey.png"
          name="Yellow_grey"
          value={kneeSlidersCounts.Yellow_grey}
       //   onKeyDown={onKeyDown}
          handleInputChange={handleInputChange}
        />  
      </div>
    </div>
  );
};

export default Extra;
