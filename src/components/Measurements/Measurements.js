import React, { useState, useMemo, useEffect } from "react";
import "./measurements.css";
import { useZakeke } from "zakeke-configurator-react";
import MeasurementsInfo from "../MeasurementsInfo/MeasurementsInfo";
import useStore from "../../Store";

const Measurements = () => {
    // const [height, setHeight] = useState('');
    // const [neck, setNeck] = useState('');

    const { bodyMeasurements, addBodyMeasurements} = useStore();


    const [measurements, setMeasurements] = useState({
        height: '',
        neck: '',
        chest: '', 
        waist: '',
        hip: '',
        thighLeft: '',
        thighRight: '',
        kneeLeft: '',
        kneeRight: '',
        calfLeft: '',
        calfRight: '',
        ankleLeft: '',
        ankleRight: '',
    })

        const handleInputKeyDown = (event) => {
            const { name, value } = event.target;
            const numericKeys = /^[0-9]$/;
        
            // Allow only numeric keys, backspace, and delete
            if (!numericKeys.test(event.key) && event.key !== 'Backspace' && event.key !== 'Delete') {
             event.preventDefault();
            }  
        addBodyMeasurements(measurements)
    }
     
    // Generic handler to update state on input change
    const handleInputChange = (event) => {

        console.log(event.target.value);
        const { name, value } = event.target;
        setMeasurements({
        ...measurements,
        [name]: value,
        });

        addBodyMeasurements(measurements)
    };

  return (
    <div className="measurements">
    

      <MeasurementsInfo 
        name='height'
        value={measurements.height}
        measurement_main= 'Height (CM)'
        measurement_sub_head='Measure the height of the person, clothing excluded.'
        measurement_sub_head_2=''
        onKeyDown={handleInputKeyDown}
        handleInputChange={handleInputChange}
      /> 

      <MeasurementsInfo 
        name='chest'
        value={measurements.chest}
        measurement_main= 'CHEST CIRCUMFERENCE'
        measurement_sub_head='Measure the chest circumference at the widest point. The person'
        measurement_sub_head_2='should be standing, breathing normally, and keeping his arms at his sides.'
        onKeyDown={handleInputKeyDown}
        handleInputChange={handleInputChange}
      />   

      <MeasurementsInfo 
        name='waist'
        value={measurements.waist}
        measurement_main= 'WAIST CIRCUMFERENCE'
        measurement_sub_head='Measure the waist circumference at the navel.'
        onKeyDown={handleInputKeyDown}
        handleInputChange={handleInputChange}
      />   
      
      <MeasurementsInfo 
        name='hip'
        value={measurements.hip}
        measurement_main='HIP CIRCUMFERENCE'
        measurement_sub_head='Measure the circumference at the widest point of the pelvis itself,'
        measurement_sub_head_2='at the most protruding part of the buttocks, or at the most protruded part of the hips if the hips are more pronounced than the buttocks. should be standing, breathing normally, and keeping his arms at his sides.'
        onKeyDown={handleInputKeyDown}
        handleInputChange={handleInputChange}
      />   

      <MeasurementsInfo 
        name='thigh'
        value={measurements.hip}
        measurement_main='HIP CIRCUMFERENCE'
        measurement_sub_head='Measure the circumference at the widest point of the pelvis itself,'
        measurement_sub_head_2='at the most protruding part of the buttocks, or at the most protruded part of the hips if the hips are more pronounced than the buttocks. should be standing, breathing normally, and keeping his arms at his sides.'
        onKeyDown={handleInputKeyDown}
        handleInputChange={handleInputChange}
      /> 
      

    </div>
  );
};

export default Measurements;
