import React, { useState, useEffect } from "react";
import "./measurements.css";
import MeasurementsInfo from "../MeasurementsInfo/MeasurementsInfo";
import PairedMeasurementInput from "../MeasurementsInfo/PairedMeasurements";
import useStore from "../../Store";

const Measurements = () => {
  const { bodyMeasurements, addBodyMeasurements } = useStore();
  // console.log(bodyMeasurements,'bodyMeasurementsbodyMeasurements');
  const [measurements, setMeasurements] = useState({
    height: "0",
    neck: "0",
    chest: "0",
    waist: "0",
    hip: "0",
    thighLeft: "0",
    thighRight: "0",
    kneeLeft: "0",
    kneeRight: "0",
    calfLeft: "0",
    calfRight: "0",
    ankleLeft: "0",
    ankleRight: "0",
    armLeft: "0",
    armRight: "0",
    foreArmLeft: "0",
    foreArmRight: "0",
    wristLeft: "0",
    wristRight: "0",
    shoulderWidth: "0",
    neckToWristLeft: "0",
    neckToWristRight: "0",
    sleeveLengthLeft: "0",
    sleeveLengthRight: "0",
    shoulderToElbowLeft: "0",
    shoulderToElbowRight: "0",
    elbowToWristLeft: "0",
    elbowToWristRight: "0",
    spineLength: "0",
    waistToAnkle: "0",
    spineLength: "0",
    kneeToAnkleLeft: "0",
    kneeToAnkleRight: "0",
    groinToGround: "0",
    groinToKnee: "0",
    weight: "0",
  });

  useEffect(() => {
    if (bodyMeasurements) {
      setMeasurements(bodyMeasurements);
    }
  }, [bodyMeasurements]);

  const handleInputKeyDown = (event) => {
    const { name, value } = event.target;
    const numericKeys = /^[0-9]$/;

    // Allow only numeric keys, backspace, and delete
    if (
      !numericKeys.test(event.key) &&
      event.key !== "Backspace" &&
      event.key !== "Delete"
    ) {
      event.preventDefault();
    }
    // addBodyMeasurements(measurements)
  };

  // Generic handler to update state on input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMeasurements({
      ...measurements,
      [name]: value,
    });

    addBodyMeasurements(measurements);
  };

  return (
    <div className="measurements">
      <MeasurementsInfo
        name="height"
        value={measurements.height}
        measurement_main="Height (CM)"
        measurement_sub_head="Measure the height of the person, clothing excluded."
        measurement_sub_head_2=""
        onKeyDown={handleInputKeyDown}
        handleInputChange={handleInputChange}
      />

      <MeasurementsInfo
        name="neck"
        value={measurements.neck}
        measurement_main="NECK CIRCUMFERENCE"
        measurement_sub_head="Measure the neck circumference at the base of the neck."
        measurement_sub_head_2="Make sure the measuring tape is not too tight nor too loose."
        onKeyDown={handleInputKeyDown}
        handleInputChange={handleInputChange}
      />

      <MeasurementsInfo
        name="chest"
        value={measurements.chest}
        measurement_main="CHEST CIRCUMFERENCE"
        measurement_sub_head="Measure the chest circumference at the widest point. The person"
        measurement_sub_head_2="should be standing, breathing normally, and keeping his arms at his sides."
        onKeyDown={handleInputKeyDown}
        handleInputChange={handleInputChange}
      />

      <MeasurementsInfo
        name="waist"
        value={measurements.waist}
        measurement_main="WAIST CIRCUMFERENCE"
        measurement_sub_head="Measure the waist circumference at the navel."
        onKeyDown={handleInputKeyDown}
        handleInputChange={handleInputChange}
      />

      <MeasurementsInfo
        name="hip"
        value={measurements.hip}
        measurement_main="HIP CIRCUMFERENCE"
        measurement_sub_head="Measure the circumference at the widest point of the pelvis itself,"
        measurement_sub_head_2="at the most protruding part of the buttocks, or at the most protruded part of the hips if the hips are more pronounced than the buttocks. should be standing, breathing normally, and keeping his arms at his sides."
        onKeyDown={handleInputKeyDown}
        handleInputChange={handleInputChange}
      />

      <PairedMeasurementInput
        nameLeft="thighLeft"
        valueLeft={measurements.thighLeft}
        nameRight="thighRight"
        valueRight={measurements.thighRight}
        measurement_main="THIGH CIRCUMFERENCE"
        measurement_sub_head="Measure the circumference of the thigh at the widest point."
        onKeyDown={handleInputKeyDown}
        handleInputChange={handleInputChange}
      />

      <PairedMeasurementInput
        nameLeft="kneeLeft"
        valueLeft={measurements.kneeLeft}
        nameRight="kneeRight"
        valueRight={measurements.kneeRight}
        measurement_main="KNEE CIRCUMFERENCE"
        measurement_sub_head="Measure the circumference of each knee at the widest point"
        measurement_sub_head_2="whilst remaining in a standing position."
        onKeyDown={handleInputKeyDown}
        handleInputChange={handleInputChange}
      />

      <PairedMeasurementInput
        nameLeft="ankleLeft"
        valueLeft={measurements.ankleLeft}
        nameRight="ankleRight"
        valueRight={measurements.ankleRight}
        measurement_main="ANKLE CIRCUMFERENCE"
        measurement_sub_head="Measure the circumference of each ankle just above the ankle bone."
        measurement_sub_head_2=""
        onKeyDown={handleInputKeyDown}
        handleInputChange={handleInputChange}
      />

      <PairedMeasurementInput
        nameLeft="armLeft"
        valueLeft={measurements.armLeft}
        nameRight="armRight"
        valueRight={measurements.armRight}
        measurement_main="ARM CIRCUMFERENCE"
        measurement_sub_head="Measure the circumference of each upper arm whilst keeping the bicep muscle slightly tensioned."
        measurement_sub_head_2=""
        onKeyDown={handleInputKeyDown}
        handleInputChange={handleInputChange}
      />

      <PairedMeasurementInput
        nameLeft="foreArmLeft"
        valueLeft={measurements.foreArmLeft}
        nameRight="foreArmRight"
        valueRight={measurements.foreArmRight}
        measurement_main="FOREARM CIRCUMFERENCE"
        measurement_sub_head="Measure the circumference of the lower arm at the widest point whilst gently squeezing your"
        measurement_sub_head_2=" hand to keep the muscles slightly tensioned."
        onKeyDown={handleInputKeyDown}
        handleInputChange={handleInputChange}
      />

      <PairedMeasurementInput
        nameLeft="wristLeft"
        valueLeft={measurements.wristLeft}
        nameRight="wristRight"
        valueRight={measurements.wristRight}
        measurement_main="WRIST CIRCUMFERENCE"
        measurement_sub_head="Measure the circumference of the wrist just before the wrist bone."
        measurement_sub_head_2=""
        onKeyDown={handleInputKeyDown}
        handleInputChange={handleInputChange}
      />

      <MeasurementsInfo
        name="shoulderWidth"
        value={measurements.shoulderWidth}
        measurement_main="SHOULDER WIDTH"
        measurement_sub_head="Measure the width of the shoulders from right humerus to left humerus – the most protruding bones of the shoulders"
        measurement_sub_head_2="– and do so in a straight line, not following the curvature of 
        the back."
        onKeyDown={handleInputKeyDown}
        handleInputChange={handleInputChange}
      />

      <PairedMeasurementInput
        nameLeft="neckToWristLeft"
        valueLeft={measurements.neckToWristLeft}
        nameRight="neckToWristRight"
        valueRight={measurements.neckToWristRight}
        measurement_main="NECK TO WRIST"
        measurement_sub_head="Measure the distance between the back of the neck and the 
        wrist – via the shoulder and elbow up until the wrist bone."
        measurement_sub_head_2=""
        onKeyDown={handleInputKeyDown}
        handleInputChange={handleInputChange}
      />

      <PairedMeasurementInput
        nameLeft="sleeveLengthLeft"
        valueLeft={measurements.sleeveLengthLeft}
        nameRight="sleeveLengthRight"
        valueRight={measurements.sleeveLengthRight}
        measurement_main="SLEEVE LENGTH"
        measurement_sub_head="Measure the length of both arms, starting at the shoulder, all the way down to the wrist bone."
        measurement_sub_head_2=""
        onKeyDown={handleInputKeyDown}
        handleInputChange={handleInputChange}
      />

      <PairedMeasurementInput
        nameLeft="shoulderToElbowLeft"
        valueLeft={measurements.shoulderToElbowLeft}
        nameRight="shoulderToElbowRight"
        valueRight={measurements.shoulderToElbowRight}
        measurement_main="SHOULDER TO ELBOW"
        measurement_sub_head="Measure the distance between the shoulder and the elbow."
        measurement_sub_head_2=""
        onKeyDown={handleInputKeyDown}
        handleInputChange={handleInputChange}
      />

      <PairedMeasurementInput
        nameLeft="elbowToWristLeft"
        valueLeft={measurements.elbowToWristLeft}
        nameRight="elbowToWristRight"
        valueRight={measurements.elbowToWristRight}
        measurement_main="ELBOW TO WRIST"
        measurement_sub_head="Measure the distance between the elbow and the wrist bone."
        measurement_sub_head_2=""
        onKeyDown={handleInputKeyDown}
        handleInputChange={handleInputChange}
      />

      <MeasurementsInfo
        name="spineLength"
        value={measurements.spineLength}
        measurement_main="SPINE LENGTH"
        measurement_sub_head="Measure the distance between the waistline and the base of the back. The waistline is most easily identified by tying"
        measurement_sub_head_2="a lace at navel height."
        onKeyDown={handleInputKeyDown}
        handleInputChange={handleInputChange}
      />

      <MeasurementsInfo
        name="waistToAnkle"
        value={measurements.waistToAnkle}
        measurement_main="WAIST TO ANKLE"
        measurement_sub_head="Measure the distance between the waistline and the ankle bone."
        measurement_sub_head_2="The waistline is most easily identified by tying a lace at navel height."
        onKeyDown={handleInputKeyDown}
        handleInputChange={handleInputChange}
      />

      <MeasurementsInfo
        name="spineLength"
        value={measurements.spineLength}
        measurement_main="WAIST TO GROUND"
        measurement_sub_head="Measure the distance between the waistline and the ground."
        measurement_sub_head_2="The waistline is most easily identified by tying a lace at navel height."
        onKeyDown={handleInputKeyDown}
        handleInputChange={handleInputChange}
      />

      <PairedMeasurementInput
        nameLeft="kneeToAnkleLeft"
        valueLeft={measurements.kneeToAnkleLeft}
        nameRight="kneeToAnkleRight"
        valueRight={measurements.kneeToAnkleRight}
        measurement_main="KNEE TO ANKLE"
        measurement_sub_head="Measure the distance between the knee and the ankle bone."
        measurement_sub_head_2=""
        onKeyDown={handleInputKeyDown}
        handleInputChange={handleInputChange}
      />

      <MeasurementsInfo
        name="groinToGround"
        value={measurements.groinToGround}
        measurement_main="GROIN TO GROUND"
        measurement_sub_head="Measure the distance between the groin and the ground."
        measurement_sub_head_2=""
        onKeyDown={handleInputKeyDown}
        handleInputChange={handleInputChange}
      />

      <MeasurementsInfo
        name="groinToKnee"
        value={measurements.groinToKnee}
        measurement_main="GROIN TO KNEE"
        measurement_sub_head="Measure the distance between the groin and the knee."
        measurement_sub_head_2=""
        onKeyDown={handleInputKeyDown}
        handleInputChange={handleInputChange}
      />

      <MeasurementsInfo
        name="weight"
        value={measurements.weight}
        measurement_main="WEIGHT (KG)"
        measurement_sub_head="Fill in the weight of the person, clothing excluded."
        measurement_sub_head_2=""
        onKeyDown={handleInputKeyDown}
        handleInputChange={handleInputChange}
      />
    </div>
  );
};

export default Measurements;
