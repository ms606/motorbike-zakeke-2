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
    setCamera
  } = useZakeke();
 

  let cameraViews = 
  props.cameras.filter(x => {
    if(x.imageUrl != null){
      return x      
    }
  })

  const idsToRemove = ['full view', 'choose your lining style', 'pant'];
  cameraViews = cameraViews.filter(obj => idsToRemove.includes(obj.name.toLowerCase()));
//  console.log(cameraViews, 'cameraViews');
 
  return !!props.cameras.length ? (
    <div className="camera_root">
      {cameraViews.map(camera => (
        <div
          onClick={(e) => {            
            // console.log(camera);  
              // setCamera(camera?.cameraLocationId);           
            //  props.onSelect(camera.attributes[0].cameraLocationId);
             if (camera.name.toLowerCase() ==='choose your lining style'){
                 console.log(camera,'camera');
                 setExplodedMode(false);
                props.onSelect("40f99229-c293-459b-ddd0-28cc96030ca5")
                props.onSelect(camera.attributes[0].cameraLocationId);
              }
              else {
                props.onSelect(camera?.cameraLocationId)
              }
              {camera.name.toLowerCase() === 'pant' ? setExplodedMode(true) : setExplodedMode(false)}
              
            }}
          key={camera.id}
          data-testid="camera"
          className="cameras_camera"
          style={{filter: "grayscale(1)", cursor: 'pointer'}}
        >
          <div className="camereImage">
          <img
            src={camera.imageUrl || `imgs/camera.png`}
            alt={"CAMERA_ALT"}
          />
        </div>
        </div>
      ))}
    </div>
  ) : null;
});

export default Cameras;
