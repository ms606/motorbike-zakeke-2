import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { ZakekeEnvironment, ZakekeViewer, ZakekeProvider } from 'zakeke-configurator-react';
import Selector from './selector';
import Viewer from '../pages/Viewer/Viewer';
import useStore from '../Store';
import LayoutMobile from '../LayoutMobile';
import { DialogsRenderer } from "./dialogs/Dialogs";

// const Layout = styled.div`
//     display: grid;
//     grid-template-columns: 1fr 0.6fr;
//     // grid-gap: 40px;
//     height: 100%;
//     padding: 40px;
// `;


const zakekeEnvironment = new ZakekeEnvironment();

const App: FunctionComponent<{}> = () => {
    const {
		isLoading,
		setPriceFormatter,
		setSelectedAttributeId,
		setSelectedGroupId,
		setSelectedStepId,
		isMobile,
		selectedGroupId,
		setIsMobile,
		setNotifications,
		setLastSelectedItem
	} = useStore();

    return <ZakekeProvider environment={zakekeEnvironment}>
		<LayoutMobile />
        {/* {isMobile ? <LayoutMobile /> : <Viewer /> } */}
        {/* <Layout> */}
            {/* <Viewer /> */}
            {/* <Selector /> */}
        {/* </Layout> */}
		<DialogsRenderer />
    </ZakekeProvider>;
}

export default App; 