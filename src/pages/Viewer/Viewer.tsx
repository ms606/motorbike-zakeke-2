import React, { FunctionComponent, useRef } from "react";
import styled from "styled-components";
import {
  ZakekeEnvironment,
  ZakekeViewer,
  useZakeke,
} from "zakeke-configurator-react";
import Cameras from "../../components/Cameras/Cameras";
import  "./Viewer.css"
import Selector from "../../components/selector";
import ExplodeSolid from "../../assets/icons/expand-arrows-alt-solid.js";

import { Icon } from '../../components/Atomic';
import Zoom from "../../components/Zoom/Zoom";
// import Zoom from "../../Zoom/Zoom";


const zakekeEnvironment = new ZakekeEnvironment();

// const Layout = styled.div`
//     padding: 12px 24px 60px;
//     display: grid;
//     grid-template-columns: 1.2fr 1fr;
//     grid-gap: 40px;
//     height: 100%;
// `;

const ExplodeIcon = styled(Icon)`
	width: 32px;
	height: 32px;
`;

const Viewer: FunctionComponent<{}> = () => {
  const {
    isSceneLoading,
    zoomIn,
    zoomOut,
    setCamera
  } = useZakeke();

  const viewElement = useRef<HTMLDivElement | null>(null);
  
  const fullScreen = () => {
    (viewElement.current!).requestFullscreen()
  }
  
  return (
    <>
      <div className="layout">
      <>
      <div className="ff_root">
        <div
          className="left-keys"
          style={{
            display: "flex",
            position: "absolute",
            left: "3%",
            flexDirection: "column",
            top: "40%",
            zIndex: "5"
          }}
        >
          <div className='reset' onClick={() => setCamera('ccd7c458-76ca-41ae-a2e3-c90f9fd063f4')}>[Reset View]</div>
          
          <Zoom zoomIn={zoomIn} zoomOut={zoomOut} />
        </div>
        <div className="ff_viewer">
          {/* <div className="ff_viewer_left_actions"> */}
            {/* <Cameras cameras={groups} onSelect={onSelectCamera}/> */}
          {/* </div> */}
          <div className="ff_viewer_right_actions">
          </div>
          <div className="ff_viewer_zakeke" ref={viewElement}>
          {!isSceneLoading && <ZakekeViewer />}
          </div>
        </div>
      </div>
      </>
      <Selector refViewer={viewElement} fullScreen={() =>fullScreen()} />
      </div>
      
    </>
  );
};

export default Viewer;
