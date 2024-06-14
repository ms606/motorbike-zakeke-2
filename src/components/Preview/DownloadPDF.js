import React from 'react';
import jsPDF from 'jspdf';
// import { useStore } from 'zustand';

import useStore from "../../Store";


const DownloadPDF = () => {

    const { bodyMeasurements, kneeSliders} = useStore();
console.log(kneeSliders,'kneeSliders');
  const downloadPDF = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

      const bodyMeasurement = bodyMeasurements[0]?.bodyMeasurements;
      if (bodyMeasurement) {
        const measurements = [
            `Height: ${bodyMeasurement.height} cms`,
            `Neck: ${bodyMeasurement.neck} cms`,
            `Chest: ${bodyMeasurement.chest} cms`,
            `Waist: ${bodyMeasurement.waist} cms`,
            `Hip: ${bodyMeasurement.hip} cms`,
            `Thigh (Left): ${bodyMeasurement.thighLeft} cms`,
            `Thigh (Right): ${bodyMeasurement.thighRight} cms`,
            `Knee (Left): ${bodyMeasurement.kneeLeft} cms`,
            `Knee (Right): ${bodyMeasurement.kneeRight} cms`,
            `Calf (Left): ${bodyMeasurement.calfLeft} cms`,
            `Calf (Right): ${bodyMeasurement.calfRight} cms`,
            `Ankle (Left): ${bodyMeasurement.ankleLeft} cms`,
            `Ankle (Right): ${bodyMeasurement.ankleRight} cms`,
            // `Black White Sliders: ${kneeSliders.name.Black_white}`,
            // `Green White Sliders: ${kneeSliders.name.Green_white}`,
            // `Orange White Sliders: ${kneeSliders.name.Orange_white}`,
            // `Red White Sliders: ${kneeSliders.name.Red_white}`,
            // `White Red Sliders: ${kneeSliders.name.White_red}`,
            // `Yellow Grey Sliders: ${kneeSliders.name.Yellow_grey}`
        ];
    
        let yOffset = 43; // starting y position
        doc.setFontSize(20);
        doc.setFont("bold"); 
        doc.setFont("italic"); 
        doc.text('MIZURO', 80, 15)
        
        doc.setFont("italic");
        doc.setFontSize(10);
        doc.line(22, 22, 195, 22);
        doc.text(`Printed On: ${Date()}`, 70, 27)
        doc.setFontSize(12).setFont(undefined, 'bold');
        doc.text('* Custom Body Measurements', 10, 33);
        doc.setFontSize(10);
        doc.setFont("normal"); 
        measurements.forEach((measurement, index) => {
             if (measurement.split(': ')[1].trim() !== 'cms') { // check if the value is not empty
                doc.text(`${index + 1}. ${measurement}`, 10, yOffset).setFont(undefined, 'bold');;
                yOffset += 10; // move down for next line
             }
          })

        
          const jsonString = JSON.stringify(measurements, null, 2);

      }

    // Convert JSON object to a formatted string


    // Add content to the PDF
    // doc.text('Body Measurement Details:', 10, 10);
    // doc.text(jsonString, 10, 20);

    // Save the PDF
    doc.save('data.pdf');
  };

  return (
    <div onClick={downloadPDF}>
        <img width="20" height="20" src="https://img.icons8.com/ios-filled/50/length.png" alt="length"/>
        <img width="20" height="20" src="https://img.icons8.com/ios/50/pdf--v1.png" alt="pdf--v1"/>
      {/* <button onClick={downloadPDF}>Download JSON as PDF</button> */}
    </div>
  );
};

export default DownloadPDF;
