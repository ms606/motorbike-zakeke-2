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
import Selector from "../../components/selector";
import ExplodeSolid from "../../assets/icons/expand-arrows-alt-solid.js";

import { Icon } from '../../components/Atomic';

const zakekeEnvironment = new ZakekeEnvironment();

const Layout = styled.div`
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    grid-gap: 40px;
    height: 100%;
    padding: 40px;
`;

const ExplodeIcon = styled(Icon)`
	width: 32px;
	height: 32px;
`;

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
    setExplodedMode,
  } = useZakeke();

  return (
    <ZakekeProvider environment={zakekeEnvironment}>
      <Layout>
      <>
      <div className="ff_root">
        <div className="ff_viewer">
          <div className="ff_viewer_left_actions">
            {/* <Cameras cameras={groups} onSelect={onSelectCamera}/> */}
          </div>
          <div className="ff_viewer_right_actions">
          </div>
          <div className="ff_viewer_zakeke">
            <ZakekeViewer />
          </div>


        </div>
      </div>
      </>
      <Selector />
      </Layout>
      
    </ZakekeProvider>
  );
};

export default Viewer;
