import React from "react";
import './Camera.css'
import { useZakeke } from "zakeke-configurator-react";

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
  
  const {
    setExplodedMode,
    hasExplodedMode,
  } = useZakeke();
 

  let cameraViews = 
  props.cameras.filter(x => {
    if(x.imageUrl != null){
      return x      
    }
  })

  const idsToRemove = ['full view', 'blazer', 'pant'];

  cameraViews = cameraViews.filter(obj => idsToRemove.includes(obj.name.toLowerCase()));

  return !!props.cameras.length ? (
    <div className="camera_root">
      {cameraViews.map(camera => (
        <div
          onClick={(e) => {
            //  console.log(camera);
              if (camera.name.toLowerCase() === 'blazer'){
                props.onSelect(camera.steps[camera.steps.length -1].cameraLocationID);
              }
              else {
                props.onSelect(camera.cameraLocationId)
              }
              {camera.name.toLowerCase() === 'pant' ? setExplodedMode(true) : setExplodedMode(false)}
              
            }}
          key={camera.id}
          data-testid="camera"
          className="cameras_camera"
          style={{filter: "grayscale(1)", cursor: 'pointer'}}
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
