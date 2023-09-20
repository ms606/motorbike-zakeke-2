import React from "react";

export interface CameraInterface {
    id: string;
    imageUrl?: string;
    // Add other properties specific to CameraInterface here
  }

export type CamerasProps = {
  cameras: CameraInterface[];
  onSelect: (camera: CameraInterface) => void;
};

const Cameras: React.FC<CamerasProps> = React.memo(props => {
  return !!props.cameras.length ? (
    <div>
      {props.cameras.map(camera => (
        <div
          onClick={() => props.onSelect(camera)}
          key={camera.id}
          data-testid="camera"
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
