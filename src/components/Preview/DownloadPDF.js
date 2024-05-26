import React from 'react';
import jsPDF from 'jspdf';
// import { useStore } from 'zustand';

import useStore from "../../Store";


const DownloadPDF = () => {

    const { bodyMeasurements, addBodyMeasurements} = useStore();

  const downloadPDF = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

      const bodyMeasurement = bodyMeasurements[0].bodyMeasurements;
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
          `Ankle (Right): ${bodyMeasurement.ankleRight} cms`
      ];
  
      let yOffset = 30; // starting y position
      doc.setFontSize(20);
      doc.text('Body Measurements', 80, 10);
      doc.setFontSize(10);
      doc.line(15, 150, 150, 150);
      measurements.forEach((measurement, index) => {
           if (measurement.split(': ')[1].trim() !== 'cms') { // check if the value is not empty
              doc.text(`${index + 1}. ${measurement}`, 10, yOffset);
              yOffset += 10; // move down for next line
           }
        })

    // Convert JSON object to a formatted string
    const jsonString = JSON.stringify(measurements, null, 2);

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
