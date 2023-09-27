import React from "react";
import './Camera.css'

export interface CameraInterface {
  attributes: any[];
  attributesAlwaysOpened: boolean;
  cameraLocationId: string | null;
  direction: number;
  displayOrder: number;
  enabled: boolean;
  guid: string;
  icon?: any | null ; // Assuming icon can be null or a string
  id: number;
  imageUrl?: string | null;
  name: string;
  steps: any[]; // You might want to specify a more specific type for steps
  templateGroups?: any | null; 
  }

export type CamerasProps = {
  cameras: CameraInterface[];
  onSelect: any;
  // onSelect: (camera: CameraInterface) => void;
};

const Cameras: React.FC<CamerasProps> = React.memo(props => {

  let cameraViews = 
  props.cameras.filter(x => {
    if(x.imageUrl != null){
      return x      
    }
  })
  
  return !!props.cameras.length ? (
    <div style={{position: "absolute", right: "93%"}}>
      {cameraViews.map(camera => (
        <div
          onClick={(e) => props.onSelect(camera.cameraLocationId)}
          key={camera.id}
          data-testid="camera"
          className="cameras_camera"
        >
          <img
            src={camera.imageUrl || `imgs/camera.png`}
            alt={"CAMERA_ALT"}
          />
        </div>
      ))}
    </div>
  ) : null;
});

export default Cameras;
