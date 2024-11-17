import { useZakeke } from 'zakeke-configurator-react';
import useStore from '../../Store';
import styled from 'styled-components';
import { ReactComponent as PdfSolid } from '../../assets/icons/file-pdf-regular.svg';
import { useDialogManager } from '../dialog/Dialogs';
import ErrorDialog from '../dialog/ErrorDialog';
import PdfDialog from '../dialog/PdfDialog';
// import PDF from '../../assets/images/PDF.png';

import React, { useEffect, useRef, useState } from 'react';

const FooterMobileIcon = styled.div<{
	isHidden?: boolean;
	color?: string;
	backgroundColor?: string;
	iconColor?: string;
	isCart?: boolean;
	disabled?: boolean;
	gridArea?: string;
}>`
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px transparent solid;
	font-size: 14px;
	text-transform: uppercase;
	text-align: center;
	display: inline-flex;
	min-height: 38px;
	border: none;
	border-right: 3px #f4f4f4 solid;
	cursor: pointer;

	svg {
		width: 32px;
		height: 32px;
	}
`;

const ZakekePDF = () => {

    const {
		useLegacyScreenshot,
		setCameraByName,
		getPDF,
		isSceneLoading,
		eventMessages,
	} = useZakeke();

	const {
		setIsLoading,
		selectedGroupId,
		setSelectedGroupId,
		selectedAttributeId,
		setSelectedTemplateGroupId,
		selectedTemplateGroupId,
		selectedStepId,
		setSelectedAttributeId,
		priceFormatter,
		setIsQuoteLoading,
		isQuoteLoading,
		isViewerMode,
		isDraftEditor,
		isEditorMode,
		// setTryOnMode,
		// tryOnRef,
		setIsPDStartedFromCart,
		pdValue,
		isMobile
	} = useStore();

    const { showDialog, closeDialog } = useDialogManager();

const showError = (error: string) => {
    showDialog('error', <ErrorDialog error={error} onCloseClick={() => closeDialog('error')} />);
};

// const handleShareClick = async () => {
// 	setCameraByName('buy_screenshot_camera', false, false);
// 	showDialog('share', <ShareDialog />);
// };

// const handleSaveClick = async () => {
// 	showDialog('save', <SaveDesignsDraftDialog onCloseClick={() => closeDialog('save')} />);
// };

const handlePdfClick = async () => {
    try {
        setIsLoading(true);
        const url = await getPDF();
        showDialog('pdf', <PdfDialog url={url} onCloseClick={() => closeDialog('pdf')} />);
    } catch (ex) {
        console.log(ex);
        showError('Failed PDF generation');
    } finally {
        setIsLoading(false);
    }
};

return (
    <>
        {!isSceneLoading && ( 
        <div style={{width: '40px', height: '40px', overflow: 'hidden' }} onClick={handlePdfClick}>
            <FooterMobileIcon>
             <PdfSolid />
			 {/* <div >
			 <img style={{ maxWidth: '100%',  maxHeight: '100%',  objectFit: 'contain'}} src={PDF} alt='pdf' />
			 </div> */}
            </FooterMobileIcon>
        </div>
        )}
    </>
);
};


export default ZakekePDF;