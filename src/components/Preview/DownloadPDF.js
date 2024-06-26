import React from 'react';
import jsPDF from 'jspdf';
// import { useStore } from 'zustand';

import useStore from "../../Store";


const DownloadPDF = () => {

  const { bodyMeasurements, kneeSliders} = useStore();
  const downloadPDF = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();
console.log(kneeSliders,'kneeSliders');
      const bodyMeasurement = bodyMeasurements; //[0]?.bodyMeasurements;
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
            `Arm (Left): ${bodyMeasurement.armLeft} cms`,
            `Arm (Right): ${bodyMeasurement.armRight} cms`,
            `Forearm (Left): ${bodyMeasurement.foreArmLeft} cms`,
            `Forearm (Right): ${bodyMeasurement.foreArmRight} cms`,
            `Wrist (Left): ${bodyMeasurement.wristLeft} cms`,
            `Wrist (Right): ${bodyMeasurement.wristRight} cms`,
            `Shoulder Width: ${bodyMeasurement.shoulderWidth} cms`,
            `Neck to Wrist (Left): ${bodyMeasurement.neckToWristLeft} cms`,
            `Neck to Wrist (Right): ${bodyMeasurement.neckToWristRight} cms`,
            `Sleeve Length (Left): ${bodyMeasurement.sleeveLengthLeft} cms`,
            `Sleeve Length (Right): ${bodyMeasurement.sleeveLengthRight} cms`,
            `Shoulder to Elbow (Left): ${bodyMeasurement.shoulderToElbowLeft} cms`,
            `Shoulder to Elbow (Right): ${bodyMeasurement.shoulderToElbowRight} cms`,
            `Elbow to Wrist (Left): ${bodyMeasurement.elbowToWristLeft} cms`,
            `Elbow to Wrist (Right): ${bodyMeasurement.elbowToWristRight} cms`,
            `Spine Length: ${bodyMeasurement.spineLength} cms`,
            `Waist to Ankle: ${bodyMeasurement.waistToAnkle} cms`,
            `Knee to Ankle (Left): ${bodyMeasurement.kneeToAnkleLeft} cms`,
            `Knee to Ankle (Right): ${bodyMeasurement.kneeToAnkleRight} cms`,
            `Groin to Ground: ${bodyMeasurement.groinToGround} cms`,
            `Groin to Knee: ${bodyMeasurement.groinToKnee} cms`,
            `Weight: ${bodyMeasurement.weight} kgs`,
            `Black White Sliders: ${kneeSliders.Black_white}`,
            `Green White Sliders: ${kneeSliders.Green_white}`,
            `Orange White Sliders: ${kneeSliders.Orange_white}`,
            `Red White Sliders: ${kneeSliders.Red_white}`,
            `White Red Sliders: ${kneeSliders.White_red}`,
            `Yellow Grey Sliders: ${kneeSliders.Yellow_grey}`
        ];
    
        let yOffset = 43; // starting y position
        let pageHeight = doc.internal.pageSize.height; // page height
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
              if (yOffset > pageHeight - 20) { // if the yOffset is greater than the page height - margin
                doc.addPage();
                yOffset = 20; // reset yOffset for the new page
            }
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
