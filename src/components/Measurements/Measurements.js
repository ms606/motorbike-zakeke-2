import React, { useState} from "react";
import "./measurements.css";
import MeasurementsInfo from "../MeasurementsInfo/MeasurementsInfo";
import PairedMeasurementInput  from "../MeasurementsInfo/PairedMeasurements";
import useStore from "../../Store";

const Measurements = () => {
    const {bodyMeasurements, addBodyMeasurements} = useStore();

    const [measurements, setMeasurements] = useState({
        height: '0',
        neck: '0',
        chest: '0', 
        waist: '0',
        hip: '0',
        thighLeft: '0',
        thighRight: '0',
        kneeLeft: '0',
        kneeRight: '0',
        calfLeft: '0',
        calfRight: '0',
        ankleLeft: '0',
        ankleRight: '0',
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
        name='neck'
        value={measurements.neck}
        measurement_main= 'NECK CIRCUMFERENCE'
        measurement_sub_head='Measure the neck circumference at the base of the neck.'
        measurement_sub_head_2='Make sure the measuring tape is not too tight nor too loose.'
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

      <PairedMeasurementInput 
        nameLeft='thighLeft'
        valueLeft={measurements.thighLeft}
        nameRight='thighRight'
        valueRight={measurements.thighRight}
        measurement_main='THIGH CIRCUMFERENCE'
        measurement_sub_head='Measure the circumference of the thigh at the widest point.'
        onKeyDown={handleInputKeyDown}
        handleInputChange={handleInputChange}
      /> 
      
      <PairedMeasurementInput 
        nameLeft='kneeLeft'
        valueLeft={measurements.kneeLeft}
        nameRight='kneeRight'
        valueRight={measurements.kneeRight}
        measurement_main='KNEE CIRCUMFERENCE'
        measurement_sub_head='Measure the circumference of each knee at the widest point'
        measurement_sub_head_2='whilst remaining in a standing position.'
        onKeyDown={handleInputKeyDown}
        handleInputChange={handleInputChange}
      /> 

      <PairedMeasurementInput 
        nameLeft='ankleLeft'
        valueLeft={measurements.ankleLeft}
        nameRight='ankleRight'
        valueRight={measurements.ankleRight}
        measurement_main='ANKLE CIRCUMFERENCE'
        measurement_sub_head=''
        measurement_sub_head_2=''
        onKeyDown={handleInputKeyDown}
        handleInputChange={handleInputChange}
      />       

    </div>
  );
};

export default Measurements;
