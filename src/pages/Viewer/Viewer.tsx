import React, { FunctionComponent } from "react";
import styled from "styled-components";
import {
  ZakekeEnvironment,
  ZakekeViewer,
  ZakekeProvider,
  useZakeke,
} from "zakeke-configurator-react";
import Cameras from "../../components/Cameras/Cameras";
import  "./Viewer.css"

const zakekeEnvironment = new ZakekeEnvironment();

const Viewer: FunctionComponent<{}> = () => {
  const {
    isSceneLoading,
    isAddToCartLoading,
    price,
    groups,
    selectOption,
    addToCart,
    templates,
    setTemplate,
    setCamera,
  } = useZakeke();

  return (
    <ZakekeProvider environment={zakekeEnvironment}>
      <div className="ff_root">
        <div className="ff_viewer">
          <div className="ff_viewer_left_actions">
            <Cameras cameras={groups} />
          </div>
          <div className="ff_viewer_zakeke">
            <ZakekeViewer />
          </div>            
        </div>
      </div>
    </ZakekeProvider>
  );
};

export default Viewer;
